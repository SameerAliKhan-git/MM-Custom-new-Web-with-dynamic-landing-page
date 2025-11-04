import { useEffect, useRef, useState } from "react";
import { Heart, Users, GraduationCap, HandHeart, Wrench } from "lucide-react";
import { Button } from "./ui/button";

type Card = {
  icon: any;
  title: string;
  description: string;
  href: string;
};

const cards: Card[] = [
  { 
    icon: GraduationCap, 
    title: "Child Welfare & Education", 
    description: "Comprehensive support for children including education, healthcare, nutrition, and protection services to ensure holistic development.",
    href: "/child-welfare" 
  },
  { 
    icon: Users, 
    title: "Old Age Welfare", 
    description: "Providing dignified care, healthcare services, nutritious meals, and social support for senior citizens in need.",
    href: "/elderly-care" 
  },
  { 
    icon: HandHeart, 
    title: "Disabled Care", 
    description: "Specialized care, rehabilitation services, and support for differently-abled individuals to lead independent lives.",
    href: "#disabled-care" 
  },
  { 
    icon: Wrench, 
    title: "Skilling Youth", 
    description: "Vocational training, career guidance, and job placement support to empower youth with market-relevant skills.",
    href: "/youth-skills" 
  },
];

export function Programmes() {
  // simple scroll-in reveal
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

  return (
    <section id="programmes" className="relative bg-white">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Our Programmes</h1>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Intro */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Empowering Communities</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Mahima Ministries is dedicated to serving vulnerable communities through comprehensive welfare programmes. 
                We work across multiple areas including child welfare, elderly care, disability support, and youth empowerment. 
                Our holistic approach ensures that every individual receives the care, dignity, and opportunities they deserve.
              </p>
            </div>
          </section>

          {/* Programmes grid */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Focus Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((c) => {
                const cardReveal = useReveal();
                const Icon = c.icon;
                return (
                  <div key={c.title} className="group" ref={cardReveal.ref}>
                    <a
                      href={c.href}
                      className={`block rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1 p-6 h-full ${cardReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {c.title}
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {c.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                            Learn more <span aria-hidden>→</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Map embed: Branches */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Branches</h2>
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
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

          {/* Call to Action */}
          <section className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Support Our Programmes</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                Your contribution helps us reach more lives and create lasting impact in communities. 
                Join us in our mission to bring hope, dignity, and opportunity to those in need.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/donate">
                  <Button size="lg" className="rounded-full">
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full border-gray-300">
                    Get Involved
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
