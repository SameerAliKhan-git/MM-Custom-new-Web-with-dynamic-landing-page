import { useEffect, useState } from "react";
import { logout, verifySession, getRole } from "./auth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const session = await verifySession();
      if (!mounted) return;
      if (!session.authenticated || session.role !== "admin") {
        nav("/login", { replace: true });
        return;
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [nav]);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-accent">
        <div className="bg-secondary-solid text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold">Admin Dashboard</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="glass-card rounded-2xl p-6">Verifying access…</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] bg-accent">
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Admin Dashboard</h1>
          <Button
            onClick={() => {
              logout().finally(() => nav("/login"));
            }}
            className="bg-white text-secondary-color hover:opacity-90 rounded-full"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-foreground">
            Logged in as: <b>{getRole() ?? "guest"}</b>
          </p>
          <p className="mt-2 text-foreground/80">
            Replace this placeholder with real admin tools when ready.
          </p>
        </div>
      </div>
    </section>
  );
}
