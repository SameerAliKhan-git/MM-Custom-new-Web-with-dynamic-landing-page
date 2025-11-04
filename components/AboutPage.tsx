import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImages = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg",
  "/about-4.jpg",
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
    <section id="about" className="relative bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="/about-1.jpg"
          alt="About Mahima Ministries"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Intro */}
          <section className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Mahima Ministries is a non-government organization working at the grass roots level by caring for and touching the lives of people who are in distress.
            </p>
          </section>

          {/* Focus Groups */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Our main focus is serving the following groups:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Orphans & abandoned, SC/ST & BPL children</li>
                  <li>Mentally ill and destitute elderly adults</li>
                  <li>HIV/AIDS patients without anyone to care for them</li>
                  <li>Community care and development</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  We are committed to care irrespective of religion, caste, creed or ethnicity, by providing them counseling, food, shelter, clothing, education and medical treatment with a holistic approach. Our community work focuses on providing good drinking water and awareness seminars in rural areas.
                </p>
              </div>
            </div>
          </section>

          {/* History */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">History</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
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
        <div className="mb-8 glass-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold">Our Projects</h2>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                {/* <li>Mahima Ministries CCI for Boys and Girls – Ameenpur</li> */}
                <li>Mahima Ministries UP School -Ameenpur</li>
                <li>Mahima Ministries Destitute and Elderly Care Home – Ameenpur, Hyderabad</li>
                <li>Mahima Ministries Vocational training for Youth - Ameenpur</li>
                <li>Mahima Ministries Skill Development Centre – Ameenpur</li>
                <li>Mahima Ministries Old Age Home – Kothagadi, Vikarabad</li>
                <li>Mahima Ministries Community Centre – Sidloor, Vikarabad</li>
                <li>Mahima Ministries Open Shelter Home for Boys – Sangareddy</li>
              </ul>
            </div>
          </section>

          {/* Branches Map */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Branches</h2>
            <div className="rounded-lg overflow-hidden shadow-sm">
              <div className="w-full h-[450px]">
                <iframe
                  title="Mahima Ministries Branches"
                  src="https://www.google.com/maps/d/u/3/embed?mid=1x7xByMF2oAfOY3AZv98XNPdNaR_yfYo&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  className="border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
