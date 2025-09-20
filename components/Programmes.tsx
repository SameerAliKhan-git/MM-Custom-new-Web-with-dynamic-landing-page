import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImages = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg",
];

type Card = {
  icon: string;
  title: string;
  description: string;
  href?: string;
};

const cards: Card[] = [
  { icon: "👨‍👩‍👧", title: "Family Strengthening", description: "Helping vulnerable families to become self-reliant to afford quality care for their children", href: "/programmes#family-strengthening" },
  { icon: "👨‍👩‍👧", title: "Kinship Care", description: "Facilitating parental care among next of kin families", href: "/programmes#kinship-care" },
  { icon: "🧒", title: "Individual Foster Care", description: "Making way for quality childcare in certified foster families", href: "/programmes#foster-care" },
  { icon: "🆘", title: "Emergency Child Care", description: "Providing relief and rehabilitation to families affected by calamities/emergencies", href: "/programmes#emergency-care" },
  { icon: "📚", title: "Education & Youth Skilling", description: "Ensuring quality education and supporting youth in skilling for self-reliance", href: "/youth-skills" },
  { icon: "🏠", title: "Family Like Care", description: "Committed to provide a caring family to every child without parental care", href: "/programmes#family-like-care" },
  { icon: "🛏️", title: "Short Stay Homes", description: "Creating safe spaces for children in distress", href: "/programmes#short-stay" },
  { icon: "♿", title: "Special Needs Childcare", description: "Specialised long-term care for differently abled children without parental care", href: "/programmes#special-needs" },
];

export function Programmes() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

  // simple scroll-in reveal used in Contact glass cards
  const useReveal = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    return { ref, visible };
  };

  // Hero autoplay + pause on hover
  useEffect(() => {
    if (!api) return;
    const start = () => {
      stop();
      intervalRef.current = window.setInterval(() => api.scrollNext(), 4500);
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
    <section id="programmes" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Our Programmes</h1>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Carousel setApi={setApi} className="group">
              <CarouselContent>
                {heroImages.map((src, i) => (
                  <CarouselItem key={i}>
                    <div className="relative h-[220px] sm:h-[320px] md:h-[420px]">
                      <ImageWithFallback src={src} alt={`Programmes hero ${i+1}`} className="w-full h-full object-cover" />
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

      {/* Intro */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-foreground/80 max-w-4xl">
          Our customised care interventions are designed to transform and enable children and caregivers to become self-reliant members of society. We empower vulnerable families to create safe and nurturing spaces for children under their care.
        </p>
      </div>

      {/* Programmes grid with liquid glass animation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((c, idx) => {
            const cardReveal = useReveal();
            return (
              <div key={c.title} className="group" ref={cardReveal.ref}>
                <a
                  href={c.href || "#"}
                  className={`block rounded-2xl border shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 glass-card p-5 ${cardReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-12 w-12 rounded-full bg-secondary-solid/20 flex items-center justify-center text-2xl">
                      <span aria-hidden>{c.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/80">
                        {c.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Read more <span aria-hidden>➜</span></span>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
