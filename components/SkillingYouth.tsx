import { useEffect, useRef, useState } from "react"
import { Heart, Wrench, Briefcase, GraduationCap, Users, TrendingUp, Target, Award, Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import useEmblaCarousel from "embla-carousel-react"

export function SkillingYouth() {
  const heroImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
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
      {/* Static Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
          alt="Skilling Youth" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Skilling Youth</h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Empowering young people with skills, training, and opportunities for a brighter future
            </p>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>Our Programmes</span>
              <span>/</span>
              <span className="font-semibold">Skilling Youth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Original Hero - Hidden but preserved */}
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
            Skilling Youth
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Empowering young people with skills, training, and opportunities for a brighter future
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
          {/* Our Approach */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Approach</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                We empower youth from underprivileged backgrounds with market-relevant skills, vocational training, and career guidance. Through hands-on training, mentorship, and job placement support, we help young people build sustainable livelihoods and achieve economic independence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Wrench, label: 'Vocational Training', desc: 'Practical skills in trades, technology, and crafts' },
                { icon: GraduationCap, label: 'Career Guidance', desc: 'Counseling, resume building, and interview prep' },
                { icon: Briefcase, label: 'Job Placement', desc: 'Connecting youth with employers and opportunities' },
                { icon: Users, label: 'Mentorship', desc: 'Ongoing support from industry professionals' }
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
          </section>

          {/* Key Stats */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: '2,500+', label: 'Youth Trained' },
                { value: '85%', label: 'Employment Rate' },
                { value: '15+', label: 'Skill Programs' }
              ].map((s, idx) => (
                <div key={idx} className="rounded-lg bg-primary text-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="opacity-90 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Training Programmes */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Training Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Technical Skills',
                  desc: 'Computer literacy, digital marketing, web development, and IT support training for the modern workplace.',
                  icon: GraduationCap,
                  img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop'
                },
                {
                  title: 'Vocational Trades',
                  desc: 'Hands-on training in plumbing, electrical work, carpentry, tailoring, and other skilled trades with certification.',
                  icon: Wrench,
                  img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1600&auto=format&fit=crop'
                },
                {
                  title: 'Entrepreneurship',
                  desc: 'Business skills, financial literacy, and startup support for aspiring young entrepreneurs.',
                  icon: TrendingUp,
                  img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
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

          {/* Success Story */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Story of Transformation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop" alt="Success Story" className="h-64 w-full object-cover" />
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Rajesh's Journey</h3>
                <p className="mt-2 text-gray-700">
                  From dropout to employed professional—Rajesh's journey through our digital marketing training program changed his life. Today he works at a growing startup, supports his family, and mentors other youth in his community. Skills training opens doors to opportunity.
                </p>
                <div className="mt-4">
                  <a href="/donate">
                    <Button className="rounded-full">
                      <Heart className="h-4 w-4 mr-2" /> Empower More Youth
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Measuring Our Impact */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Measuring Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Target, value: '95%', label: 'Course Completion' },
                { icon: Award, value: '2,100+', label: 'Certifications Awarded' },
                { icon: Briefcase, value: '85%', label: 'Placed in Jobs' },
                { icon: TrendingUp, value: '40%', label: 'Income Increase' }
              ].map((stat, idx) => {
                const Icon: any = stat.icon
                return (
                  <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
                    <div className="flex justify-center mb-3">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-700">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-12 bg-primary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold">Help Us Build Skills for Tomorrow</h3>
          <p className="mt-2 opacity-90">Your support provides training, tools, and opportunities that transform young lives.</p>
          <div className="mt-5">
            <a href="/donate">
              <Button className="rounded-full bg-white text-primary hover:bg-white/90">Support Youth Training</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkillingYouth
