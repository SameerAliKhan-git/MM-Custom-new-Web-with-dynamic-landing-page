import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImages = [
  '/about-1.jpg',
  '/about-2.jpg',
  '/about-3.jpg',
  '/about-4.jpg',
];

export function AboutPage() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Auto-play every 4.5s
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
    // Pause on hover
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
    <section id="about" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">About Us</h1>
        </div>
      </div>

      {/* Hero Carousel */}
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
                        alt={`About hero ${i + 1}`}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Intro */}
        <div className="mb-8 glass-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">About Us</h2>
          </div>
          <p className="text-foreground/90">
            Mahima Ministries is a non-government organization working at the grass roots level by caring for and touching the lives of people who are in distress.
          </p>
        </div>

        {/* Focus Groups */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Our main focus is serving the following groups:</h3>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Orphans & abandoned, SC/ST & BPL children</li>
              <li>Mentally ill and destitute elderly adults</li>
              <li>HIV/AIDS patients without anyone to care for them</li>
              <li>Community care and development</li>
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-foreground/90">
              We are committed to care irrespective of religion, caste, creed or ethnicity, by providing them counseling, food, shelter, clothing, education and medical treatment with a holistic approach. Our community work focuses on providing good drinking water and awareness seminars in rural areas.
            </p>
          </div>
        </div>

        {/* History */}
        <div className="mb-8 glass-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">History</h2>
          </div>
          <div className="space-y-3 text-foreground/90">
            <p>
              In the year 2005, an old lady by name Mallamma was in need of shelter. People in the neighbourhood were wondering where to place this lady. Mr Maharaju responded the call and opened his house for her stay. This act of benevolence laid the foundation for the future work. Slowly Subdramma along with Sruthi were added. During this time Maharaju got a divine prompt for the work that was just initiated as "Mahima Ministries", with main focus of the work “to look after orphans and widows in their distress"
            </p>
            <p>Mahima in Indian languages means "Glory".</p>
            <p>
              The number started increasing day by day with old aged people, HIV-infected and affected, Orphans and semi orphans. . As the number grew up to 70 they took a rented house in Arjun Reddy Colony. All this while Mr. Maharaju was using up his salary for the sake of the work, with the support of his friends and well-wishers. In the year 2009, there was no money to pay the rent and as they has to vacate the rented premises, finding nowhere to go they approached Mr. Pandurangareddy MPTC. He understanding the situation told that he couldn’t help financially but gave permission to set up a tin sheet shed in this present Ameenpur camps area in the year 2009. During that time an acre land was given to Maharaju at Vikarabad. The old age, Destitute and HIV infected and affected people moved to that place. With the support of I VY Compt Tech an MNC, the proper building was constructed at Kothagadi, Vikarabad. In 2011, another acre land was added to Mahima Ministries at Sidloor, Vikarabad. Which is developed into Community center and a CCI.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="glass-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Our Projects</h2>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-foreground/90">
            <li>Mahima Ministries CCI for Boys and Girls – Ameenpur</li>
            <li>Mahima Ministries UP School -Ameenpur</li>
            <li>Mahima Ministries Old Age Home – Kothagadi, VIkarabad</li>
            <li>Mahima Ministries Community Centre – Sidloor, Vikarabad</li>
            <li>Mahima Ministries Open Shelter Home for Boys – Sangareddy</li>
            <li>Mahima Ministries Vocational training for CCI Children</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
