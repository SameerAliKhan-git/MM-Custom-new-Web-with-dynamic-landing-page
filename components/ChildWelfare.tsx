import { Heart, GraduationCap, Users, BookOpen, Stethoscope, Soup, Target, Leaf, HandHeart, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import useEmblaCarousel from "embla-carousel-react"
import React, { useEffect, useRef, useState } from "react"

export function ChildWelfare() {
  const heroImages = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c07?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?auto=format&fit=crop&w=1600&q=80",
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
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
          alt="Child Welfare and Education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Banner Section */}
      <div className="bg-secondary-solid text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Child Welfare & Education</h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
              <span>Home</span>
              <span>/</span>
              <span>Our Programmes</span>
              <span>/</span>
              <span>Child Welfare</span>
            </div>
          </div>
        </div>
      </div>

      {/* Original Hero Section - now converted to banner above */}
      <section
        ref={sectionRef as any}
        className="hidden"
        style={{ minHeight: "calc(100vh - 96px)" }}
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {/* Background slider */}
        <div ref={emblaRef} className="absolute inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x select-none">
          <div className="flex h-full">
            {heroImages.map((src, i) => (
              <div key={i} className="relative h-full flex-[0_0_100%] min-w-0">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

  {/* Removed global dark shade overlay per request */}

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

        {/* No overlay text/buttons — hero shows only images and controls */}
      </section>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Approach</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                We focus on child-centric care with strong family engagement. Through education support, health & nutrition, protection, and life-skills, we help children thrive from early years into youth.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[{icon:BookOpen,label:'Education Support',desc:'Access to schooling, tutoring, and learning material'},{icon:Stethoscope,label:'Health & Nutrition',desc:'Regular checkups, counseling, and cooked meals'},{icon:Users,label:'Family Strengthening',desc:'Parenting workshops and livelihoods support'},{icon:Target,label:'Life Skills & Mentoring',desc:'Confidence, communication, and career guidance'}].map((item,idx)=>{
                  const Icon:any=item.icon
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
              {[{value:'15,000+',label:'Children Educated'},{value:'1,200+',label:'Scholarships Supported'},{value:'95%',label:'School Retention'}].map((s,idx)=> (
                <div key={idx} className="rounded-lg bg-primary text-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="opacity-90 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Programmes */}
          <section id="programmes" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{
                title:'School Reinforcement',
                desc:'After-school tutoring, remedial classes and digital learning labs.',
                icon:GraduationCap,
                img:'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop'
              },{
                title:'Mid-day & Community Meals',
                desc:'Nutritious meals to improve attentiveness and health.',
                icon:Soup,
                img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop'
              },{
                title:'Child Protection & Care',
                desc:'Counseling, safeguarding, and safe spaces with caring adults.',
                icon:HandHeart,
                img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop'
              }].map((p,idx)=>{
                const Icon:any=p.icon
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

          {/* Stories */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Story of Change</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="Success story" className="h-64 w-full object-cover" />
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Asha's Journey</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  From struggling with attendance to topping her class—Asha's journey shows what consistent support and encouragement can do. Today she mentors junior students and dreams of becoming a teacher.
                </p>
                <div className="mt-4">
                  <a href="/donate"><Button className="rounded-full"><Heart className="h-4 w-4 mr-2" /> Donate to Empower</Button></a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="py-12 bg-primary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold">Help us keep children learning</h3>
          <p className="mt-2 opacity-90">Your support provides books, meals, and mentorship that change lives.</p>
          <div className="mt-5">
            <a href="/donate"><Button className="rounded-full bg-white text-primary hover:bg-white/90">Donate for Education</Button></a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChildWelfare
