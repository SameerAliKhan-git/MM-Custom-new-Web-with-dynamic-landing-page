import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImages = [
  { src: "/hero/hero-1.jpg", alt: "Children learning and growing" },
  { src: "/hero/hero-2.jpg", alt: "Community outreach in action" },
  { src: "/hero/hero-3.jpg", alt: "Support and care for elderly" },
];

export function VisionMissionValues() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Contact-like reveal animation hook
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

  // Reveal instances for sections
  const visionReveal = useReveal();
  const missionReveal = useReveal();
  const valuesReveal = useReveal();
  const ctaReveal = useReveal();
  const statementReveal = useReveal();

  // Match About Us: autoplay every 4.5s and pause on hover
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

  return (
    <section id="vmv" className="relative bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="/hero/hero-1.jpg"
          alt="Vision Mission Values"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Vision | Mission | Values</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>About Us</span>
              <span>/</span>
              <span>Vision Mission Values</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement section (after hero, before VMV cards) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our mission statement</h2>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
              <p>
                We strive to ensure that every child and vulnerable person has access to care, education, and the opportunity to thrive. Through community-rooted programmes, we support families, strengthen youth, and care for the elderly and people in need with dignity and compassion.
              </p>
              <p>
                Our work spans multiple initiatives led by a dedicated team and supported by partners and well-wishers. Transparency and accountability guide how we plan, implement, and report our impact.
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 pt-2">As an independent, non-governmental social development organisation:</h3>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>We support children in need of care and protection.</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>We respect diverse cultures and work with communities for sustainable development.</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>We uphold child rights and safeguarding across all programmes.</span></li>
              </ul>
            </div>
          </section>

          {/* VMV Sections - clean cards with white background */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
                <h2 className="text-xl font-semibold text-gray-900">Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A world where every child and vulnerable person thrives with dignity, education, and opportunity.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
                <h2 className="text-xl font-semibold text-gray-900">Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To deliver compassionate care, quality education, and sustainable livelihood support through community-driven programmes and transparent stewardship.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
                <h2 className="text-xl font-semibold text-gray-900">Values</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Dignity and Respect</li>
                <li>Integrity and Transparency</li>
                <li>Child Safety First</li>
                <li>Collaboration and Inclusion</li>
                <li>Stewardship and Accountability</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Explore our work</h3>
                <p className="text-sm text-gray-600">See programmes and stories aligned to our Vision, Mission, and Values.</p>
              </div>
              <div className="flex gap-3">
                <a href="/programmes" className="rounded-full px-5 py-2.5 bg-primary text-white hover:opacity-90 shadow-sm transition-opacity">Our Programmes</a>
                <a href="/contact" className="rounded-full px-5 py-2.5 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 shadow-sm transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
