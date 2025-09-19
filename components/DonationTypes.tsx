import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel"
import * as React from "react"
import { cn } from "./ui/utils"

type DonationCard = {
  title: string
  image: string
  href?: string
}

const donations: DonationCard[] = [
  {
    title: "Partnerships",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Philanthropy",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Give In Celebrations",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "School Buddy Programme",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Make a Donation",
    image: "https://images.unsplash.com/photo-1593113598332-cc7f8a3b4d05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Other Ways to Give",
    image: "https://images.unsplash.com/photo-1513624334153-8a43f07e7656?q=80&w=1200&auto=format&fit=crop",
  },
]

export function DonationTypes() {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const sectionRef = React.useRef<HTMLElement | null>(null)

  // Autoplay when in view (and not interacting)
  React.useEffect(() => {
    if (!api) return

    let autoplayTimer: number | null = null
    let inView = false
    let userInteracting = false

    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting
        schedule()
      },
      { threshold: 0.4 }
    )
    observer.observe(el)

    const onPointerDown = () => { userInteracting = true; clearAutoplay() }
    const onPointerUp = () => { userInteracting = false; schedule() }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    function clearAutoplay(){
      if (autoplayTimer) { window.clearInterval(autoplayTimer); autoplayTimer = null }
    }

    function schedule(){
      clearAutoplay()
      if (!inView || userInteracting) return
      autoplayTimer = window.setInterval(() => {
        api?.scrollNext()
      }, 3500)
    }

    schedule()

    return () => {
      observer.disconnect()
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      clearAutoplay()
    }
  }, [api])
  return (
    <section ref={sectionRef} className="bg-primary-solid py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="inline-block h-1.5 w-16 bg-white rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How You Can Support</h2>
        </div>

        <div className="relative">
          <Carousel opts={{ align: "start" }} setApi={setApi} className="mx-auto max-w-7xl">
            <CarouselContent className="-ml-2 md:-ml-4">
              {donations.map((d, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 basis-4/5 sm:basis-2/5 lg:basis-1/4 xl:basis-1/5 max-w-[260px]">
                  <article className="h-full rounded-[16px] bg-white shadow-md overflow-hidden">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img src={d.image} alt={d.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="bg-primary-gradient text-white text-center px-3 py-4">
                      <div className="font-semibold text-base">{d.title}</div>
                      <div className="text-white/90 text-xs">read more</div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex bg-white/90 hover:bg-white text-[#0f456b] shadow size-10 left-0" />
            <CarouselNext className="hidden sm:flex bg-white/90 hover:bg-white text-[#0f456b] shadow size-10 right-0" />
          </Carousel>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2 w-6 rounded-full inline-block dot-primary-active" />
            <span className="h-2 w-2 rounded-full inline-block dot-primary-inactive" />
          </div>
        </div>
      </div>
      {/* Donation legal/info text */}
      <div className="mt-10 text-center px-4 space-y-3">
        {/* Bright, eye-catching pill for 80G notice */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 text-teal-800 font-medium shadow-lg shadow-teal-500/10 text-sm border border-teal-200">
          <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
          Tax-deductible donations under Section 80G(5) of the Income Tax Act,1961
        </div>
        {/* Blurred bar for transparency message */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-800 font-medium shadow-lg shadow-sky-500/10 text-sm border border-sky-200">
          <div className="h-2 w-2 bg-sky-500 rounded-full"></div>
          All donations are secure, transparent, and directly support our beneficiaries.
        </div>
      </div>
    </section>
  )
}
