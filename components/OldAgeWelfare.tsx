import { useEffect, useRef, useState } from "react"
import { Heart, Users, Home, Utensils, Stethoscope, Handshake, Phone, Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import useEmblaCarousel from "embla-carousel-react"

export function OldAgeWelfare() {
  const heroImages = [
    "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80",
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 })
  const sectionRef = useRef<HTMLElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [inView, setInView] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slidesCount, setSlidesCount] = useState(heroImages.length)

  const start = () => {
    if (!emblaApi || !inView || timerRef.current) return
    timerRef.current = setInterval(() => emblaApi.scrollNext(), 3500)
  }
  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    if (!emblaApi) return
    const onPointerDown = () => stop()
    const onPointerUp = () => start()
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onReInit = () => {
      setSlidesCount(emblaApi.slideNodes().length)
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on("pointerDown", onPointerDown)
    emblaApi.on("pointerUp", onPointerUp)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onReInit)
    return () => {
      emblaApi.off("pointerDown", onPointerDown)
      emblaApi.off("pointerUp", onPointerUp)
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onReInit)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.4 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    stop()
    if (inView) start()
    return () => stop()
  }, [inView, emblaApi])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1600&q=80"
          alt="Old Age Welfare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Old Age Welfare</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>Our Programmes</span>
              <span>/</span>
              <span>Old Age Welfare</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Original Hero Section */}
      <section
        ref={sectionRef as any}
        className="hidden relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 96px)" }}
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {/* Background slider */}
        <div ref={emblaRef} className="absolute inset-0 z-0 overflow-hidden select-none">
          <div className="flex h-full touch-pan-x">
            {heroImages.map((src, i) => (
              <div key={i} className="relative h-full flex-[0_0_100%] min-w-0">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Readability overlay */}
        <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Old Age Welfare
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Honoring our elders with dignity, compassion, and comprehensive care
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/donate">
              <Button size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg">
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 shadow-lg">
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </a>
          </div>
        </div>

        {/* Prev/Next Controls - Hidden on mobile, visible on desktop */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 z-40 place-items-center h-10 w-10 rounded-full bg-white/90 hover:bg-white text-black shadow pointer-events-auto"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 z-40 place-items-center h-10 w-10 rounded-full bg-white/90 hover:bg-white text-black shadow pointer-events-auto"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
          {Array.from({ length: slidesCount }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                selectedIndex === i ? "bg-white w-5" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Approach</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                We provide holistic care and support to elderly individuals, ensuring they live with dignity, receive proper healthcare, maintain social connections, and experience the love and respect they deserve in their later years.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Heart, label: 'Compassionate Care', desc: 'Providing loving attention and emotional support to every senior' },
                  { icon: Stethoscope, label: 'Healthcare Services', desc: 'Regular health check-ups and medical support' },
                  { icon: Users, label: 'Community Building', desc: 'Creating meaningful connections and social engagement' },
                  { icon: Handshake, label: 'Dignity & Respect', desc: 'Honoring the wisdom and experience of our elders' }
                ].map((item, idx) => {
                  const Icon: any = item.icon
                  return (
                    <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div className="font-medium text-gray-900">{item.label}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Key Stats */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: '500+', label: 'Seniors Supported' },
                { value: '15+', label: 'Years of Service' },
                { value: '24/7', label: 'Care Available' }
              ].map((s, idx) => (
                <div key={idx} className="rounded-lg bg-primary text-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="opacity-90 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Services & Programmes */}
          <section id="services" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Residential Care',
                  desc: 'Safe and comfortable accommodation with 24/7 supervision, clean facilities with home-like environment and personalized care plans.',
                  icon: Home,
                  img: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1600&auto=format&fit=crop'
                },
                {
                  title: 'Healthcare Services',
                  desc: 'Regular health check-ups, medication management, and access to medical professionals with specialized care for chronic conditions.',
                  icon: Stethoscope,
                  img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop'
                },
                {
                  title: 'Nutritious Meals',
                  desc: 'Balanced, nutritious meals prepared with dietary requirements in mind, including special diets for medical conditions.',
                  icon: Utensils,
                  img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1600&auto=format&fit=crop'
                }
              ].map((p, idx) => {
                const Icon: any = p.icon
                return (
                  <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
                    <img src={p.img} alt="" className="h-40 w-full object-cover" />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <div className="font-semibold text-gray-900">{p.title}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 flex-1">{p.desc}</p>
                      <div className="mt-4">
                        <a href="/donate">
                          <Button className="w-full rounded-full">Support</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Additional Services */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Social Activities & Emotional Support</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1559839914-17aae19cf610?q=80&w=1600&auto=format&fit=crop" alt="Social Activities" className="h-64 w-full object-cover" />
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Recreation programs, group activities, and social gatherings keep minds active and spirits high. Our counseling services and companionship programs create a supportive environment where seniors feel valued, connected, and loved.
                </p>
                <div className="mt-4">
                  <a href="/donate">
                    <Button className="rounded-full">
                      <Heart className="h-4 w-4 mr-2" /> Support Our Elders
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-12 bg-primary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold">Help Us Honor Our Elders</h3>
          <p className="mt-2 opacity-90">Your support provides care, dignity, and companionship that brings joy to our seniors.</p>
          <div className="mt-5">
            <a href="/donate">
              <Button className="rounded-full bg-white text-primary hover:bg-white/90">Donate for Elder Care</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
