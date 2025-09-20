import { useEffect, useMemo, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Minus, Plus, IndianRupee, Globe2, Heart } from "lucide-react";
import { toast } from "sonner";
import { getRole, isLoggedIn, loginWithPassword, verifySession } from "./auth";

type DonorType = "indian" | "foreign";
type Frequency = "ONE_TIME" | "MONTHLY";

type ProgramKey =
  | "SPONSOR_CHILD"
  | "SPONSOR_EDUCATION"
  | "SUPPORT_FAMILY"
  | "SKILL_YOUTH"
  | "GENERAL";

type ProgramOption = {
  key: ProgramKey;
  title: string;
  description: string;
  defaultAmount: number; // INR per unit (yearly guidance for one-time)
};

const PROGRAMS: ProgramOption[] = [
  { key: "SPONSOR_CHILD", title: "Sponsor a child", description: "Facilitate all-round development for a child.", defaultAmount: 11880 },
  { key: "SPONSOR_EDUCATION", title: "Sponsor a child's education", description: "Support a child's education for a year.", defaultAmount: 28200 },
  { key: "SUPPORT_FAMILY", title: "Support an under privileged family in a community", description: "Help families become self-reliant.", defaultAmount: 20160 },
  { key: "SKILL_YOUTH", title: "Support Education and Skilling of a Youth", description: "Provide skill-based education for employability.", defaultAmount: 9000 },
  { key: "GENERAL", title: "General Donation", description: "Let us allocate your donation where it's needed most.", defaultAmount: 0 },
];

function Money({ value }: { value: number }) {
  const formatted = useMemo(() => new Intl.NumberFormat("en-IN").format(value), [value]);
  return (
    <span className="inline-flex items-center gap-1 tabular-nums">
      <IndianRupee className="h-4 w-4" /> {formatted}
    </span>
  );
}

export function DonationPage() {
  const [donorType, setDonorType] = useState<DonorType>("indian");
  const [program, setProgram] = useState<ProgramKey>("SPONSOR_CHILD");
  const [frequency, setFrequency] = useState<Frequency>("ONE_TIME");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState<number>(PROGRAMS[0].defaultAmount);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Ensure session/CSRF cookie
    verifySession();
  }, []);

  useEffect(() => {
    const selected = PROGRAMS.find(p => p.key === program)!;
    // Reset amount when program changes, except general donation which is free-form
    if (selected.key !== "GENERAL") setAmount(selected.defaultAmount);
  }, [program]);

  const total = useMemo(() => {
    if (program === "GENERAL") return Math.max(0, Math.floor(amount));
    return Math.max(0, Math.floor(amount)) * Math.max(1, Math.floor(quantity));
  }, [program, amount, quantity]);

  async function onDonate() {
    if (!isLoggedIn()) {
      toast.info("Please log in to continue.");
      window.location.href = "/login";
      return;
    }
    const role = getRole();
    if (role !== "donor" && role !== "admin") {
      toast.error("You must be logged in as donor.");
      return;
    }
    if (total <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setSubmitting(true);
    try {
      // Map to backend DonationType
      const type = frequency === "ONE_TIME" ? "ONE_TIME" : "MONTHLY";
      const res = await fetch("/api/donations", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: donorType === "foreign" ? "USD" : "INR",
          type,
          programId: null, // optional mapping to a Program row if desired
        }),
      });
      if (!res.ok) {
        const j = await safeJson(res);
        throw new Error(j?.message || `Failed (${res.status})`);
      }
      toast.success("Thank you for your generous support!");
    } catch (e: any) {
      toast.error(e?.message || "Donation failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative bg-accent">
      {/* Banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Donate Online to Help Children in Need</h1>
        </div>
      </div>

      {/* Page content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Placeholder for storytelling content or imagery */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card p-4">
            <CardContent className="space-y-3 pt-4">
              <h2 className="text-lg font-semibold">How Your Support Helps</h2>
              <p className="text-sm text-foreground/80">Your contribution supports education, healthcare, and family strengthening to help children thrive.</p>
              <ul className="text-sm list-disc pl-5 text-foreground/80 space-y-1">
                <li>Education & Skilling</li>
                <li>Health & Nutrition</li>
                <li>Family Support & Community Care</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right: Donation widget */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl border shadow-sm p-4">
            <div className="mb-3">
              <h3 className="text-base font-semibold">CHOOSE DONOR TYPE</h3>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="donorType" checked={donorType === "indian"} onChange={() => setDonorType("indian")} /> Indian Donor
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="donorType" checked={donorType === "foreign"} onChange={() => setDonorType("foreign")} /> Foreign/NRI Donors (PIO, OCI, NRI)
                </label>
              </div>
            </div>

            {/* Program buttons */}
            <div className="grid grid-cols-2 gap-3">
              {PROGRAMS.filter(p => p.key !== "GENERAL").map((p) => (
                <Button key={p.key} type="button" variant={program === p.key ? "default" : "outline"} onClick={() => setProgram(p.key)} className={`${program === p.key ? "bg-primary text-white" : "bg-white/70"} h-11`}>{p.title}</Button>
              ))}
              <Button type="button" variant={program === "GENERAL" ? "default" : "outline"} onClick={() => setProgram("GENERAL")} className={`${program === "GENERAL" ? "bg-primary text-white" : "bg-white/70"} col-span-2 h-11`}>General Donation</Button>
            </div>

            {/* Description */}
            <div className="mt-3 text-sm text-foreground/80">
              {PROGRAMS.find(p => p.key === program)?.description}
            </div>

            {/* Frequency */}
            <div className="mt-4">
              <div className="inline-flex rounded-md overflow-hidden border">
                <button type="button" className={`px-4 py-2 text-sm ${frequency === "ONE_TIME" ? "bg-primary text-white" : "bg-white/70"}`} onClick={() => setFrequency("ONE_TIME")}>One Time</button>
                <button type="button" className={`px-4 py-2 text-sm ${frequency === "MONTHLY" ? "bg-primary text-white" : "bg-white/70"}`} onClick={() => setFrequency("MONTHLY")}>Give Monthly</button>
              </div>
            </div>

            {/* Quantity or amount */}
            {program !== "GENERAL" ? (
              <div className="mt-4">
                <Label className="text-sm">Number of Children</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                  <div className="w-10 text-center">{quantity}</div>
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
                  <div className="ml-auto text-sm">Total Amount <span className="ml-2"><Money value={total} /></span></div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <Label className="text-sm">Enter donation amount</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="bg-white/70 border-white/40 w-40" />
                  <div className="ml-auto text-sm">Total Amount <span className="ml-2"><Money value={total} /></span></div>
                </div>
              </div>
            )}

            {/* Donate button */}
            <div className="mt-6">
              <Button onClick={onDonate} disabled={submitting} className="w-full h-11 rounded-full bg-primary hover:opacity-90 flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" /> Donate
              </Button>
              <p className="mt-3 text-[11px] text-foreground/60">
                All donations are eligible for tax exemption as per applicable laws. Your payment is processed securely. We never ask for card PINs or banking passwords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null; }
}

export default DonationPage;
