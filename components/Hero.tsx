import React, { useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "./ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"

const heroImages = [
  "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c07?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
]

export function Hero() {
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
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
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
      (entries) => {
        const visible = entries[0].isIntersecting
        setInView(visible)
      },
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
    <section
      ref={sectionRef as any}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

      {/* Readability overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

      {/* Prev/Next Controls - Removed as per user request */}

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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

      {/* Content overlay */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white">
              Creating Hope for 
              <span className="text-primary"> Every Child's Future</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Through education, care, and community support, we're building a world where every child, elder, and person with disabilities can thrive with dignity and hope.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                <Link to="/donate">
                  Make an Impact
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">15,000+</div>
              <div className="text-sm lg:text-base text-white/80">Children Educated</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">3,200+</div>
              <div className="text-sm lg:text-base text-white/80">Elders Supported</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">8,500+</div>
              <div className="text-sm lg:text-base text-white/80">Youth Skilled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating achievement card - Removed as per user request */}
    </section>
  )
}