import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImages = [
  { src: '/hero/hero-1.jpg', alt: 'Children learning and growing' },
  { src: '/hero/hero-2.jpg', alt: 'Community outreach in action' },
  { src: '/hero/hero-3.jpg', alt: 'Support and care for elderly' },
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
    const viewport = api?.rootNode() as HTMLElement | undefined;
    if (viewport) {
      viewport.addEventListener('mouseenter', stop);
      viewport.addEventListener('mouseleave', start);
    }
    return () => {
      stop();
      if (viewport) {
        viewport.removeEventListener('mouseenter', stop);
        viewport.removeEventListener('mouseleave', start);
      }
    };
  }, [api]);

  return (
    <section id="vmv" className="relative">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Vision | Mission | Values</h1>
          <div className="hidden sm:flex gap-3">
            <a href="/about" className="underline/50 hover:underline">About us</a>
            <span aria-hidden>•</span>
            <a href="/programmes" className="underline/50 hover:underline">Our Programmes</a>
          </div>
        </div>
      </div>

      {/* Hero Carousel - match About Us styling */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Carousel setApi={setApi} className="group">
              <CarouselContent>
                {heroImages.map((img, i) => (
                  <CarouselItem key={img.src}>
                    <div className="relative h-[220px] sm:h-[320px] md:h-[420px]">
                      <ImageWithFallback
                        src={img.src}
                        alt={img.alt}
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

      {/* Mission Statement section (after hero, before VMV cards) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="group" ref={statementReveal.ref}>
          <div className={`mx-auto max-w-5xl transition-all duration-500 ${statementReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our mission statement</h2>
              <span className="hidden md:block h-1 bg-primary/80 rounded-full flex-1" />
            </div>
            <div className="space-y-4 text-foreground/90">
              <p>
                We strive to ensure that every child and vulnerable person has access to care, education, and the opportunity to thrive. Through community-rooted programmes, we support families, strengthen youth, and care for the elderly and people in need with dignity and compassion.
              </p>
              <p>
                Our work spans multiple initiatives led by a dedicated team and supported by partners and well-wishers. Transparency and accountability guide how we plan, implement, and report our impact.
              </p>
              <h3 className="text-lg md:text-xl font-semibold">As an independent, non-governmental social development organisation:</h3>
              <ul className="mt-2 space-y-2 text-foreground/90">
                <li className="flex gap-3"><span className="text-primary">—</span><span>We support children in need of care and protection.</span></li>
                <li className="flex gap-3"><span className="text-primary">—</span><span>We respect diverse cultures and work with communities for sustainable development.</span></li>
                <li className="flex gap-3"><span className="text-primary">—</span><span>We uphold child rights and safeguarding across all programmes.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* VMV Sections - glass cards with reveal (uniform heights) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-3 items-stretch">
          <div className="group h-full" ref={visionReveal.ref}>
            <article className={`h-full glass-card rounded-2xl border shadow-sm p-6 flex flex-col transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${visionReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">Vision</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            A world where every child and vulnerable person thrives with dignity, education, and opportunity.
          </p>
            </article>
          </div>

          <div className="group h-full" ref={missionReveal.ref}>
            <article className={`h-full glass-card rounded-2xl border shadow-sm p-6 flex flex-col transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${missionReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            To deliver compassionate care, quality education, and sustainable livelihood support through community-driven programmes and transparent stewardship.
          </p>
            </article>
          </div>

          <div className="group h-full" ref={valuesReveal.ref}>
            <article className={`h-full glass-card rounded-2xl border shadow-sm p-6 flex flex-col transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${valuesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">Values</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Dignity and Respect</li>
            <li>Integrity and Transparency</li>
            <li>Child Safety First</li>
            <li>Collaboration and Inclusion</li>
            <li>Stewardship and Accountability</li>
          </ul>
            </article>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="group" ref={ctaReveal.ref}>
          <div className={`glass-card rounded-2xl border shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div>
            <h3 className="text-lg font-semibold">Explore our work</h3>
            <p className="text-sm text-muted-foreground">See programmes and stories aligned to our Vision, Mission, and Values.</p>
          </div>
          <div className="flex gap-3">
            <a href="/programmes" className="rounded-full px-5 py-2.5 bg-primary text-white hover:opacity-90 shadow">Our Programmes</a>
            <a href="/stories-change" className="rounded-full px-5 py-2.5 bg-white text-foreground border hover:bg-white/80 shadow">Stories of Change</a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
