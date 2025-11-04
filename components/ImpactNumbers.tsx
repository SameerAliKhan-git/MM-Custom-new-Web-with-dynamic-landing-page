import { useEffect, useState } from "react"
import { Baby, Users, GraduationCap, Wrench, BriefcaseBusiness, Heart, Home, Shield, HandHeart, TreePine, Activity, Accessibility, Crown, UserCheck, Cross } from "lucide-react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = end / (duration / 16) // 60fps approximation
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

const stats = [
  {
    number: 15000,
    suffix: "+",
    label: "Children Educated",
    description: "From basic literacy to higher education"
  },
  {
    number: 3200,
    suffix: "+", 
    label: "Elders Supported",
    description: "Healthcare and companionship provided"
  },
  {
    number: 8500,
    suffix: "+",
    label: "Youth Skilled",
    description: "Vocational training completed"
  },
  {
    number: 2100,
    suffix: "+",
    label: "Disabled Empowered",
    description: "Through inclusive programs"
  },
  {
    number: 150,
    suffix: "+",
    label: "Communities Served",
    description: "Across rural and urban areas"
  },
  {
    number: 98,
    suffix: "%",
    label: "Direct Impact",
    description: "Of donations reach beneficiaries"
  }
]

export function ImpactNumbers() {
  // Update CSS variables on hover to shift gradient focal point
  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--x', `${x}%`)
    el.style.setProperty('--y', `${y}%`)
  }

  return (
    <section className="py-20">
      <div className="bg-primary text-primary-foreground px-4 py-16">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block h-1.5 w-16 bg-primary-foreground rounded-full" />
              <h2 className="text-3xl lg:text-4xl font-semibold text-primary-foreground">Our Impact: transforming lives</h2>
            </div>
            <p className="text-lg opacity-80">2024-25</p>
          </div>

          {/* Impact cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Child Welfare & Education (uniform size) */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 backface-hidden">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex space-x-2">
                      <Baby className="h-12 w-12 text-primary-foreground/80" />
                      <GraduationCap className="h-12 w-12 text-primary-foreground/80" />
                      <Users className="h-12 w-12 text-primary-foreground/80" />
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">CHILD WELFARE & EDUCATION</p>
                    <div className="text-5xl font-bold mb-2">
                      <Counter end={12500} />
                    </div>
                    <p className="text-sm text-primary-foreground/80">children educated and cared for</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Home className="h-6 w-6 mx-auto mb-2 text-primary-foreground/60" />
                      <div className="text-2xl font-bold"><Counter end={850} /></div>
                      <p className="text-xs text-primary-foreground/70">children welcomed to new homes</p>
                    </div>
                    <div>
                      <Heart className="h-6 w-6 mx-auto mb-2 text-primary-foreground/60" />
                      <div className="text-2xl font-bold"><Counter end={420} /></div>
                      <p className="text-xs text-primary-foreground/70">children reunited with family</p>
                    </div>
                    <div>
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary-foreground/60" />
                      <div className="text-2xl font-bold"><Counter end={680} /></div>
                      <p className="text-xs text-primary-foreground/70">youth achieving independent living</p>
                    </div>
                  </div>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <div className="mb-6">
                    <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary-foreground" />
                    <h3 className="text-xl font-bold text-primary-foreground mb-4">Child Welfare & Education</h3>
                    <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
                      We provide comprehensive care, education, and support to vulnerable children, ensuring they have safe homes, quality education, and opportunities for a brighter future. Our programs focus on holistic development, family reunification, and independent living skills.
                    </p>
                  </div>
                  <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* Youth Skilling card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 text-center backface-hidden">
                  <div className="flex justify-center mb-3">
                    <div className="flex space-x-1">
                      <Wrench className="h-10 w-10 text-primary-foreground/80" />
                      <BriefcaseBusiness className="h-10 w-10 text-primary-foreground/80" />
                    </div>
                  </div>
                  <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">YOUTH SKILLING</p>
                  <div className="text-4xl font-bold mb-2">
                    <Counter end={2840} />
                  </div>
                  <p className="text-sm text-primary-foreground/80">youth trained for employment</p>
                  
                  <div className="mt-4">
                    <BriefcaseBusiness className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                    <div className="text-xl font-bold"><Counter end={1620} /></div>
                    <p className="text-xs text-primary-foreground/70">found employment</p>
                  </div>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <BriefcaseBusiness className="h-12 w-12 mx-auto mb-3 text-primary-foreground" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">Youth Skilling</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    Empowering young people with practical skills and vocational training for sustainable employment and entrepreneurship opportunities.
                  </p>
                  <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* Old Age Welfare card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 text-center backface-hidden">
                  <div className="flex justify-center mb-3">
                    <div className="flex space-x-1">
                      <UserCheck className="h-10 w-10 text-primary-foreground/80" />
                      <Users className="h-10 w-10 text-primary-foreground/80" />
                    </div>
                  </div>
                  <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">OLD-AGED WELFARE</p>
                  <div className="text-4xl font-bold mb-2">
                    <Counter end={950} />
                  </div>
                  <p className="text-sm text-primary-foreground/80">elderly cared for</p>
                  
                  <div className="mt-4">
                    <Home className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                    <div className="text-xl font-bold"><Counter end={285} /></div>
                    <p className="text-xs text-primary-foreground/70">families supported</p>
                  </div>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <UserCheck className="h-12 w-12 mx-auto mb-3 text-primary-foreground" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">Old-Aged Welfare</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    Providing dignified care, healthcare services, and emotional support to elderly community members who need assistance with daily living.
                  </p>
                  <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* Short Stay Homes card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 backface-hidden">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-2">
                      <Shield className="h-10 w-10 text-primary-foreground/80" />
                      <Home className="h-10 w-10 text-primary-foreground/80" />
                      <Heart className="h-10 w-10 text-primary-foreground/80" />
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">EMERGENCY CARE HOMES</p>
                    <div className="text-4xl font-bold">
                      <Counter end={235} />
                    </div>
                    <p className="text-sm text-primary-foreground/80">children received emergency care</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Shield className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                      <div className="text-xl font-bold"><Counter end={140} /></div>
                      <p className="text-xs text-primary-foreground/70">children received short-term care</p>
                    </div>
                    <div>
                      <Home className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                      <div className="text-xl font-bold"><Counter end={320} /></div>
                      <p className="text-xs text-primary-foreground/70">children transitioned to permanent care</p>
                    </div>
                    <div>
                      <Heart className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                      <div className="text-xl font-bold"><Counter end={95} /></div>
                      <p className="text-xs text-primary-foreground/70">children welcomed into long-term care</p>
                    </div>
                  </div>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <div className="mb-4">
                    <Shield className="h-14 w-14 mx-auto mb-3 text-primary-foreground" />
                    <h3 className="text-xl font-bold text-primary-foreground mb-4">Emergency Care Homes</h3>
                    <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
                      Safe haven for children in crisis situations. Our emergency care homes provide immediate protection, counseling, and transition support to permanent care solutions.
                    </p>
                  </div>
                  <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* Disabled Care card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 text-center backface-hidden">
                  <div className="flex justify-center mb-3">
                    <Accessibility className="h-10 w-10 text-primary-foreground/80" />
                  </div>
                  <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">DISABLED CARE</p>
                  <div className="text-4xl font-bold mb-2">
                    <Counter end={180} />
                  </div>
                  <p className="text-sm text-primary-foreground/80">individuals supported</p>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <Accessibility className="h-12 w-12 mx-auto mb-3 text-primary-foreground" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">Disabled Care</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    Comprehensive support services for individuals with disabilities, including therapy, skill development, and community integration programs.
                  </p>
                  <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* Social Activities card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 text-center backface-hidden">
                  <div className="flex justify-center mb-3">
                    <div className="flex space-x-1">
                      <TreePine className="h-10 w-10 text-primary-foreground/80" />
                      <Activity className="h-10 w-10 text-primary-foreground/80" />
                    </div>
                  </div>
                  <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">SOCIAL ACTIVITIES</p>
                  <div className="text-4xl font-bold mb-2">
                    <Counter end={350} />
                  </div>
                  <p className="text-sm text-primary-foreground/80">community programs conducted</p>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary/90 border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-primary-foreground" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">Social Activities</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    Community engagement programs promoting social awareness, environmental conservation, and cultural activities for holistic development.
                  </p>
                  <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>

            {/* HIV/AIDS Care card */}
            <div className="group perspective-1000 h-[360px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div onMouseMove={handleMove} className="absolute inset-0 glass-card rounded-lg p-6 text-center backface-hidden">
                  <div className="flex justify-center mb-3">
                    <div className="flex space-x-1">
                      <Cross className="h-10 w-10 text-primary-foreground/80" />
                      <Heart className="h-10 w-10 text-primary-foreground/80" />
                    </div>
                  </div>
                  <p className="text-sm uppercase tracking-wide text-primary-foreground/70 mb-2">HIV/AIDS CARE</p>
                  <div className="text-4xl font-bold mb-2">
                    <Counter end={125} />
                  </div>
                  <p className="text-sm text-primary-foreground/80">individuals receiving support & treatment</p>
                  
                  <div className="mt-4">
                    <Shield className="h-5 w-5 mx-auto mb-1 text-primary-foreground/60" />
                    <div className="text-xl font-bold"><Counter end={85} /></div>
                    <p className="text-xs text-primary-foreground/70">families provided counseling</p>
                  </div>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 bg-primary border border-primary-foreground/20 rounded-lg p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <Cross className="h-12 w-12 mx-auto mb-3 text-primary-foreground" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">HIV/AIDS Care</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    Compassionate healthcare, counseling services, and family support for individuals and families affected by HIV/AIDS.
                  </p>
                  <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                    Know more...
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary-foreground/80" />
                <div className="font-bold text-xl">15 Years</div>
                <div className="text-sm text-primary-foreground/80">Of dedicated service</div>
              </div>
              <div className="space-y-2">
                <Home className="h-8 w-8 mx-auto mb-2 text-primary-foreground/80" />
                <div className="font-bold text-xl">5 States</div>
                <div className="text-sm text-primary-foreground/80">Presence across India</div>
              </div>
              <div className="space-y-2">
                <Heart className="h-8 w-8 mx-auto mb-2 text-primary-foreground/80" />
                <div className="font-bold text-xl">100% Transparent</div>
                <div className="text-sm text-primary-foreground/80">Financial reporting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}