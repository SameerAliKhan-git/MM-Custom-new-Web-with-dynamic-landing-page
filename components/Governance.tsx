import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImages = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg",
];

export function Governance() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

  // simple scroll-in animation hook (same pattern as Contact page)
  const useReveal = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setVisible(true);
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    return { ref, visible } as const;
  };

  // Auto-play every 4.5s, pause on hover (match About)
  useEffect(() => {
    if (!api) return;
    const start = () => {
      stop();
      intervalRef.current = window.setInterval(() => {
        api.scrollNext();
      }, 4500);
    };
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    start();
    const viewport = (api as any)?.rootNode() as HTMLElement | undefined;
    if (viewport) {
      viewport.addEventListener("mouseenter", stop);
      viewport.addEventListener("mouseleave", start);
    }
    return () => {
      stop();
      if (viewport) {
        viewport.removeEventListener("mouseenter", stop);
        viewport.removeEventListener("mouseleave", start);
      }
    };
  }, [api]);

  // Reveal controllers per section (match Contact.tsx pattern)
  const boardReveal = useReveal();
  const leadershipReveal = useReveal();
  const policyReveal = useReveal();
  const reportReveal = useReveal();
  const contactReveal = useReveal();

  return (
    <section id="governance" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Our Governance</h1>
        </div>
      </div>

      {/* Hero Carousel (match About) */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Carousel setApi={setApi} className="group">
              <CarouselContent>
                {heroImages.map((src, i) => (
                  <CarouselItem key={i}>
                    <div className="relative h-[220px] sm:h-[320px] md:h-[420px]">
                      <ImageWithFallback
                        src={src}
                        alt={`Governance hero ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/90 text-foreground hover:bg-white left-3" />
              <CarouselNext className="bg-white/90 text-foreground hover:bg-white right-3" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Board of Directors */}
        <div className="group" ref={boardReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${boardReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Board of Directors</h2>
          </div>
          <p className="text-foreground/90 mb-4">
            Our Board provides strategic direction, ensures accountability, and upholds our mission and values.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-xl border bg-white/60 backdrop-blur p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                <div className="h-32 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 mb-3" />
                <div className="font-semibold">Board Member {i}</div>
                <div className="text-sm text-muted-foreground">Role / Expertise</div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="group" ref={leadershipReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${leadershipReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2].map((i) => (
              <div key={i} className="rounded-xl border bg-white/60 backdrop-blur p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                <div className="font-semibold">Leader {i}</div>
                <p className="text-sm text-foreground/90">Brief about responsibilities and experience.</p>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Policies & Compliance */}
        <div className="group" ref={policyReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${policyReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Policies & Compliance</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-foreground/90">
            <li><a className="underline hover:text-primary" href="/safeguarding">Child Safeguarding Policy</a></li>
            <li><a className="underline hover:text-primary" href="/privacy">Privacy & Data Protection</a></li>
            <li><a className="underline hover:text-primary" href="/financial">Financial Controls & Anti-Fraud</a></li>
          </ul>
          </div>
        </div>

        {/* Reporting & Transparency */}
        <div className="group" ref={reportReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${reportReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Reporting & Transparency</h2>
          </div>
          <p className="text-foreground/90 mb-4">We publish our annual reports, audited financials, and key programme outcomes.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/reports" className="rounded-full px-5 py-2.5 bg-primary text-white hover:opacity-90 shadow">Annual Reports</a>
            <a href="/financial" className="rounded-full px-5 py-2.5 bg-white text-foreground border hover:bg-white/80 shadow">Financial Information</a>
          </div>
          </div>
        </div>

        {/* Contact Governance */}
        <div className="group" ref={contactReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${contactReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Contact the Board/Office</h2>
          </div>
          <p className="text-foreground/90">For governance-related queries, please <a href="/contact" className="underline hover:text-primary"><u>contact us</u></a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
