import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Leaf, Droplets, Recycle, Sun, Users, TrendingUp, Award, Heart } from "lucide-react";
import { Button } from "./ui/button";

export function Sustainability() {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const embla = emblaRef;
    if (!embla) return;

    const interval = setInterval(() => {
      const engine = (embla as any).current?.engine;
      if (engine) {
        engine.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaRef]);

  // Scroll reveal hook
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

  const heroImages = [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=800&fit=crop",
  ];

  const initiatives = [
    {
      icon: Leaf,
      title: "Organic Farming",
      description: "Training communities in sustainable agricultural practices to ensure food security and environmental conservation."
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description: "Implementing rainwater harvesting and water management systems to address water scarcity in rural areas."
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      description: "Promoting solar power and clean energy solutions for sustainable development and reduced carbon footprint."
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "Education and implementation of recycling programs and waste reduction strategies in communities."
    }
  ];

  const programmes = [
    {
      title: "Livelihood Training",
      description: "Empowering communities with skills for sustainable income generation through eco-friendly practices.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
      icon: Users
    },
    {
      title: "Environmental Education",
      description: "Raising awareness about environmental conservation and sustainable living practices among youth and communities.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
      icon: Award
    },
    {
      title: "Community Development",
      description: "Building resilient communities through sustainable development projects and capacity building initiatives.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
          alt="Sustainability"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Sustainability</h1>
            <p className="text-lg md:text-xl opacity-90">
              Building a greener future through sustainable practices and community empowerment
            </p>
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Overview Section */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Commitment to Sustainability</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                At Mahima Ministries, we believe that true development must be sustainable and environmentally responsible. 
                Our sustainability initiatives focus on empowering communities with knowledge and resources to create 
                self-sufficient, eco-friendly livelihoods while preserving our planet for future generations. Through 
                integrated programmes in agriculture, renewable energy, and environmental conservation, we're building 
                resilient communities that thrive in harmony with nature.
              </p>
            </div>
          </section>

          {/* Key Initiatives Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Key Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative, idx) => {
                const cardReveal = useReveal();
                const Icon = initiative.icon;
                return (
                  <div
                    key={idx}
                    ref={cardReveal.ref}
                    className={`bg-gray-50 rounded-lg p-6 shadow-sm text-center transition-all duration-500 ${
                      cardReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{initiative.title}</h3>
                    <p className="text-gray-700 text-sm">{initiative.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Key Statistics */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { number: "1,200+", label: "Families Trained", sublabel: "In sustainable practices" },
                { number: "50+", label: "Villages Impacted", sublabel: "Across rural India" },
                { number: "15+", label: "Years of Service", sublabel: "Environmental stewardship" }
              ].map((stat, idx) => {
                const statReveal = useReveal();
                return (
                  <div
                    key={idx}
                    ref={statReveal.ref}
                    className={`rounded-lg bg-primary text-white p-8 text-center shadow-sm transition-all duration-500 ${
                      statReveal.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm opacity-90">{stat.sublabel}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Programmes Section */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Sustainability Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programmes.map((programme, idx) => {
                const progReveal = useReveal();
                const Icon = programme.icon;
                return (
                  <div
                    key={idx}
                    ref={progReveal.ref}
                    className={`rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md ${
                      progReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={programme.image}
                        alt={programme.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{programme.title}</h3>
                      <p className="text-gray-700">{programme.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Success Story */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Story of Impact</h2>
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className="h-full">
                  <img
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop"
                    alt="Success story"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-semibold mb-4 text-primary">
                    Transforming Lives Through Sustainable Farming
                  </h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In a small village in rural Maharashtra, our sustainable agriculture programme helped 
                    transform the lives of 150 farming families. Through training in organic farming, water 
                    conservation, and sustainable pest management, the community not only increased their 
                    crop yields by 40% but also restored the health of their soil and local ecosystem.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    "Before Mahima Ministries came to our village, we were struggling with failing crops and 
                    depleted soil. Now, we're growing healthier crops, earning better income, and preserving 
                    our land for our children. This is truly sustainable development." - Ramesh Patil, Farmer
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Impact Metrics */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Measuring Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Leaf, stat: "30,000+", label: "Trees Planted" },
                { icon: Droplets, stat: "85%", label: "Water Saved" },
                { icon: Sun, stat: "200+", label: "Solar Installations" },
                { icon: Users, stat: "5,000+", label: "Lives Impacted" }
              ].map((item, idx) => {
                const impactReveal = useReveal();
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    ref={impactReveal.ref}
                    className={`bg-gray-50 rounded-lg p-6 shadow-sm text-center transition-all duration-500 ${
                      impactReveal.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                    <div className="text-gray-700">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Call to Action */}
          <section className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-12 shadow-sm text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join Our Sustainability Movement
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Together, we can create a sustainable future for communities across India. 
                Your support helps us expand our environmental programmes and empower more families 
                with eco-friendly livelihoods.
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
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sustainability;
