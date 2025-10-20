import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImages = [
  '/about-1.jpg',
  '/about-2.jpg',
  '/about-3.jpg',
];

// Removed "Our Programmes" cards section per request

export function WhereWeWork() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

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
    <section id="where-we-work" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Where We Work</h1>
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
                      <ImageWithFallback src={src} alt={`Where hero ${i+1}`} className="w-full h-full object-cover" />
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

      {/* "Our Programmes" section and elements removed as requested */}

      {/* Head Office map (from Contact page) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h3 className="text-lg sm:text-xl font-medium">Head Office</h3>
          </div>
          <div className="group glass-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
            <div className="w-full h-[450px]">
              <iframe
                title="Head Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.043828887272!2d78.31539882500472!3d17.52363516068404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb929a78e90b15%3A0x99908c88209689d4!2sMahima%20Ministries!5e0!3m2!1sen!2sin!4v1758301017824!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Branches map (from Contact page) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h3 className="text-lg sm:text-xl font-medium">Branches</h3>
          </div>
          <div className="group glass-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
            <div className="w-full h-[450px]">
              <iframe
                title="Mahima Ministries Branches"
                src="https://www.google.com/maps/d/u/0/embed?mid=1Lo6VCadzKNTqci16XyQe6sF5Q_C6fGI&ehbc=2E312F"
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
