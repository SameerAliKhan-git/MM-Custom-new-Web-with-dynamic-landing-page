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
    <section id="governance" className="relative bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="/about-1.jpg"
          alt="Our Governance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Governance</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>About Us</span>
              <span>/</span>
              <span>Governance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Board of Directors */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Board of Directors</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-6">
                Our Board provides strategic direction, ensures accountability, and upholds our mission and values.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
                    <div className="h-32 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 mb-3" />
                    <div className="font-semibold text-gray-900">Board Member {i}</div>
                    <div className="text-sm text-gray-600">Role / Expertise</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leadership Team</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2].map((i) => (
                  <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
                    <div className="font-semibold text-gray-900 mb-2">Leader {i}</div>
                    <p className="text-sm text-gray-700">Brief about responsibilities and experience.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Policies & Compliance */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Policies & Compliance</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><a className="underline hover:text-primary" href="/safeguarding">Child Safeguarding Policy</a></li>
                <li><a className="underline hover:text-primary" href="/privacy">Privacy & Data Protection</a></li>
                <li><a className="underline hover:text-primary" href="/financial">Financial Controls & Anti-Fraud</a></li>
              </ul>
            </div>
          </section>

          {/* Reporting & Transparency */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Reporting & Transparency</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-6">We publish our annual reports, audited financials, and key programme outcomes.</p>
              <div className="flex flex-wrap gap-3">
                <a href="/reports" className="rounded-full px-5 py-2.5 bg-primary text-white hover:opacity-90 shadow-sm transition-opacity">Annual Reports</a>
                <a href="/financial" className="rounded-full px-5 py-2.5 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 shadow-sm transition-colors">Financial Information</a>
              </div>
            </div>
          </section>

          {/* Contact Governance */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact the Board/Office</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700">For governance-related queries, please <a href="/contact" className="underline hover:text-primary">contact us</a>.</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
