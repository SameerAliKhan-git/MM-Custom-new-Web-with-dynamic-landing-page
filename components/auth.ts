export type Role = "admin" | "donor";

// In-memory cache to support quick UI checks; actual source of truth is the server.
let currentSession: { authenticated: boolean; role: Role | null } = {
  authenticated: false,
  role: null,
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function getCsrfToken(): string | null {
  // Expect backend to set a CSRF cookie like `XSRF-TOKEN`
  return readCookie("XSRF-TOKEN");
}

export async function verifySession(): Promise<{ authenticated: boolean; role: Role | null }>
{
  try {
    const res = await fetch("/api/session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });
    if (!res.ok) throw new Error("session verify failed");
    const data = (await res.json()) as { authenticated: boolean; role?: Role };
    currentSession = { authenticated: !!data.authenticated, role: (data.role ?? null) as Role | null };
  } catch {
    currentSession = { authenticated: false, role: null };
  }
  return currentSession;
}

export async function loginWithPassword(params: { role: Role; email: string; password: string }): Promise<{ ok: boolean; role?: Role; error?: string }>
{
  try {
    // Always prime CSRF on a safe GET to refresh masked token
    await fetch("/api/session", { method: "GET", credentials: "include" });
    let csrf = getCsrfToken();
    const doPost = async () => fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(csrf
          ? {
              // send common header variants accepted by csurf
              "X-CSRF-Token": csrf,
              "X-XSRF-Token": csrf,
              "CSRF-Token": csrf,
              "XSRF-Token": csrf,
              "X-Requested-With": "XMLHttpRequest",
            }
          : {}),
      },
      body: JSON.stringify(params),
    });
    let res = await doPost();
    if (res.status === 403) {
      // Retry once with a fresh token in case the cookie was stale
      await fetch("/api/session", { method: "GET", credentials: "include" });
      csrf = getCsrfToken();
      res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(csrf
            ? {
                "X-CSRF-Token": csrf,
                "X-XSRF-Token": csrf,
                "CSRF-Token": csrf,
                "XSRF-Token": csrf,
                "X-Requested-With": "XMLHttpRequest",
              }
            : {}),
        },
        body: JSON.stringify(params),
      });
    }
    if (!res.ok) {
      const err = await safeJson(res);
      return { ok: false, error: err?.message ?? `Login failed (${res.status})` };
    }
    const data = (await res.json()) as { role?: Role };
    await verifySession();
    return { ok: true, role: data.role };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Network error" };
  }
}

export async function logout(): Promise<void> {
  try {
    // Prime CSRF and then post; retry on 403
    await fetch("/api/session", { method: "GET", credentials: "include" });
    let csrf = getCsrfToken();
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        ...(csrf
          ? {
              "X-CSRF-Token": csrf,
              "X-XSRF-Token": csrf,
              "CSRF-Token": csrf,
              "XSRF-Token": csrf,
              "X-Requested-With": "XMLHttpRequest",
            }
          : {}),
      },
    });
    if (res.status === 403) {
      await fetch("/api/session", { method: "GET", credentials: "include" });
      csrf = getCsrfToken();
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          ...(csrf
            ? {
                "X-CSRF-Token": csrf,
                "X-XSRF-Token": csrf,
                "CSRF-Token": csrf,
                "XSRF-Token": csrf,
                "X-Requested-With": "XMLHttpRequest",
              }
            : {}),
        },
      });
    }
  } finally {
    currentSession = { authenticated: false, role: null };
  }
}

export function isLoggedIn(): boolean {
  return currentSession.authenticated;
}

export function getRole(): Role | null {
  return currentSession.role;
}

async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
