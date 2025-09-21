import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
// Card not used; using glass-card containers like Contact page
import { Input } from "./ui/input";
import { Minus, Plus, IndianRupee, Heart } from "lucide-react";

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
  { key: "SPONSOR_CHILD", title: "Sponsor a child", description: "Sponsor a Child to facilitate their all-round development by fulfilling their educational and health needs.", defaultAmount: 11880 },
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
  // Simple reveal hook (same pattern as Contact page)
  const useReveal = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setVisible(true)
          })
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, [])
    return { ref, visible }
  }

  const infoReveal = useReveal()
  const leftReveal = useReveal()
  const formReveal = useReveal()
  // Form state
  const [donorType, setDonorType] = useState<DonorType>("indian");
  const [program, setProgram] = useState<ProgramKey>("SPONSOR_CHILD");
  const [frequency, setFrequency] = useState<Frequency>("ONE_TIME");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState<number>(PROGRAMS[0].defaultAmount);

  useEffect(() => {
    const selected = PROGRAMS.find((p) => p.key === program)!;
    if (selected.key !== "GENERAL") setAmount(selected.defaultAmount);
  }, [program]);

  const total = useMemo(() => {
    if (program === "GENERAL") return Math.max(0, Math.floor(amount));
    return Math.max(0, Math.floor(amount)) * Math.max(1, Math.floor(quantity));
  }, [program, amount, quantity]);
  const isGeneralAmountValid = useMemo(() => {
    return program !== "GENERAL" || amount >= 1000;
  }, [program, amount]);
  return (
    <>
      {/* Hero Section (matches reference design) */}
      <section className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
        <img
          src="/footer-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        {/* Single full-width gradient overlay: transparent on left → solid site orange on right */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,117,24,0)_0%,rgba(255,117,24,0)_45%,rgba(255,117,24,0.6)_52%,rgba(255,117,24,0.9)_58%,rgba(255,117,24,1)_100%)]"
        />
        <div className="relative z-10 h-full">
          <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
            {/* Constrain text within the colored half on the right */}
            <div className="ml-auto w-full sm:w-2/3 lg:w-1/2 text-white max-w-3xl pr-2 sm:pr-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight uppercase">DONATE TODAY</h1>
              <p className="mt-2 text-base sm:text-xl font-semibold uppercase text-center">AND</p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-semibold leading-tight uppercase">HELP CHANGE A CHILD'S LIFE</h2>
              {/* CTA removed as this is already the Donation page */}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom orange strip tagline (site primary) */}
      <section className="w-full bg-primary-solid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-white text-sm sm:text-base font-medium tracking-wide">
            Donate online and help change a child's life.
          </p>
        </div>
      </section>

      {/* Main content styled like Contact page */}
      <section className="relative bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left: Info panel with glass-card and reveal */}
            <div className="group rounded-xl shadow-sm p-5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-transparent" ref={leftReveal.ref}>
              <div className={`glass-card rounded-lg p-4 text-foreground transition-all duration-500 ${leftReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <h3 className="text-xl font-semibold text-foreground">Why your support matters</h3>
                <p className="mt-2 text-foreground/80">
                  Families experiencing crisis may have difficulty caring adequately for their children. By becoming a sponsor, you can help provide children with access to education, healthcare, and a safe, loving environment so they can reach their full potential.
                </p>
              </div>
            </div>

            {/* Right: Donation form in glass-card with reveal */}
            <div className="group rounded-xl shadow-sm p-5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-transparent lg:col-span-1" ref={formReveal.ref}>
              <div className={`glass-card rounded-lg p-4 text-foreground transition-all duration-500 ${formReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                  <h3 className="text-base font-semibold">CHOOSE DONOR TYPE</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="donorType" checked={donorType === "indian"} onChange={() => setDonorType("indian")} />
                      Indian Donor
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="donorType" checked={donorType === "foreign"} onChange={() => setDonorType("foreign")} />
                      Foreign/NRI Donors (PIO/OCI/NRI)
                    </label>
                  </div>

                  {/* Program buttons */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROGRAMS.filter((p) => p.key !== "GENERAL").map((p) => (
                      <Button
                        key={p.key}
                        type="button"
                        variant={program === p.key ? "default" : "outline"}
                        onClick={() => setProgram(p.key)}
                        className={`${program === p.key ? "bg-primary text-white" : "bg-white"} h-auto min-h-[56px] whitespace-normal break-words leading-snug text-center flex items-center justify-center px-3 py-3`}
                      >
                        {p.title}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={program === "GENERAL" ? "default" : "outline"}
                      onClick={() => setProgram("GENERAL")}
                      className={`${program === "GENERAL" ? "bg-primary text-white" : "bg-white"} col-span-1 sm:col-span-2 h-auto min-h-[56px] whitespace-normal break-words leading-snug text-center flex items-center justify-center px-3 py-3`}
                    >
                      General Donation
                    </Button>
                  </div>

                  {/* Description */}
                  <div className="mt-3 text-sm text-foreground/80 border-t border-dashed pt-3">
                    {PROGRAMS.find((p) => p.key === program)?.description}
                  </div>

                  {/* Frequency */}
                  <div className="mt-4">
                    {donorType === "foreign" ? (
                      // Only One Time for foreign donors
                      <div className="inline-flex rounded-md overflow-hidden border">
                        <span className="px-4 py-2 text-sm bg-primary text-white select-none">One Time</span>
                      </div>
                    ) : (
                      <div className="inline-flex rounded-md overflow-hidden border">
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm ${frequency === "ONE_TIME" ? "bg-primary text-white" : "bg-white"}`}
                          onClick={() => setFrequency("ONE_TIME")}
                        >
                          One Time
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm ${frequency === "MONTHLY" ? "bg-primary text-white" : "bg-white"}`}
                          onClick={() => setFrequency("MONTHLY")}
                        >
                          Give Monthly
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dashed divider like reference */}
                  <div className="mt-3 border-t border-dashed" />

                  {/* Quantity or amount (hidden for foreign donors per reference) */}
                  {donorType === "indian" && (
                    program !== "GENERAL" ? (
                      <div className="mt-4">
                        <Label className="text-sm">Number of Children</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-10 text-center">{quantity}</div>
                          <Button type="button" variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                          <div className="ml-auto text-sm">
                            Total Amount <span className="ml-2"><Money value={total} /></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <Label className="text-sm">Enter donation amount</Label>
                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            type="number"
                            min={1000}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={`w-40 bg-white/70 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40 ${amount < 1000 ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/40'}`}
                          />
                          <div className="ml-auto text-sm">
                            Total Amount <span className="ml-2"><Money value={total} /></span>
                          </div>
                        </div>
                        {amount < 1000 && (
                          <p className="mt-1 text-xs text-red-600">Minimum amount for General Donation is 
                            <span className="ml-1 inline-flex items-center"><IndianRupee className="h-3 w-3" />1,000</span>.
                          </p>
                        )}
                      </div>
                    )
                  )}

                  {/* Donate button */}
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        // Submit action placeholder; hook up to backend if desired
                        console.log({ donorType, program, frequency, quantity, amount, total });
                      }}
                      className="w-full h-11 rounded-full bg-primary hover:opacity-90 flex items-center justify-center gap-2 text-white"
                      disabled={donorType === "indian" ? (program === "GENERAL" ? amount < 1000 : total <= 0) : false}
                    >
                      <Heart className="h-4 w-4" /> donate now
                    </Button>
                    {donorType === "foreign" && (
                      <div className="mt-2 text-[11px] text-foreground/60 flex items-center gap-2">
                        <span>powered by</span>
                        <span className="font-semibold text-emerald-600">danamojo</span>
                      </div>
                    )}
                    <p className="mt-3 text-[11px] text-foreground/60">
                      We will never ask for your card PIN or net banking password. Payments are processed securely.
                    </p>
                  </div>
              </div>

              {/* Info under form: liquid glass animation on 80G note */}
              <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-foreground/80">
                <div className="group" ref={infoReveal.ref}>
                  <div className={`glass-card rounded-xl border shadow-sm p-4 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${infoReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                    <p className="m-0 text-foreground/90 font-medium">
                      All Donations are tax-exempt under Section 80G(5) of the Income Tax Act, 1961
                    </p>
                  </div>
                </div>
                <p>
                  <b>Please Note:</b> For any enquiries/support, kindly mail us at{' '}
                  <a href="mailto:mahiministriesindia@gmail.com" className="underline text-secondary-foreground bg-secondary px-1 py-0.5 rounded">
                    mahiministriesindia@gmail.com
                  </a>
                </p>
                <p className="text-foreground/70">
                  <b><i>Data privacy:</i></b> <i>We take utmost care of your personal information and will never share or sell your details to third parties. All your sensitive information like credit card or bank details are not stored in our system and we never call donors to ask for their Debit or Credit Card PIN or Net banking password.</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DonationPage;
