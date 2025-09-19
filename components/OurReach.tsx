import { useEffect, useState } from "react"
// import mapImage from "figma:asset/4129531b54ca28454989b0bd4a5721d9e6b42769.png"

// Counter component for animated numbers
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 50)
    
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        if (next >= end) {
          clearInterval(timer)
          return end
        }
        return next
      })
    }, 50)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>{Math.floor(count)}{suffix}</span>
  )
}

const reachStats = [
  {
    number: 31,
    suffix: "",
    label: "SOS Children's Villages"
  },
  {
    number: 27,
    suffix: "",
    label: "Family Strengthening Projects"
  },
  {
    number: 10000,
    suffix: "+",
    label: "Families strengthened via capacity building activities"
  },
  {
    number: 15000,
    suffix: "+",
    label: "Vulnerable women integrated into Self Help Groups"
  },
  {
    number: 11,
    suffix: "",
    label: "Kinship Care Projects"
  },
  {
    number: 10,
    suffix: "",
    label: "Vocational Training Centres"
  }
]

export function OurReach() {
  /* TODO: OurReach Section - Complete implementation commented out for future updates
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Our reach
            </h2>
            <div className="absolute -bottom-1 left-0 w-24 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full">
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-auto max-w-3xl mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="telanganaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e74c3c" />
                      <stop offset="100%" stopColor="#c0392b" />
                    </linearGradient>
                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="3" dy="6" stdDeviation="4" floodOpacity="0.25"/>
                    </filter>
                  </defs>
                  
                  <path
                    d="M150 80 L200 75 L260 80 L320 85 L380 90 L420 100 L450 120 L470 150 L475 180 L470 210 L460 240 L445 270 L425 295 L400 315 L370 330 L340 335 L310 330 L280 325 L250 315 L220 300 L190 280 L165 255 L145 225 L135 195 L140 165 L145 135 L150 105 Z"
                    fill="url(#telanganaGrad)"
                    stroke="#a93226"
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-500 hover:brightness-110"
                    filter="url(#dropShadow)"
                  />
                  
                  <g stroke="#fff" strokeWidth="1" strokeOpacity="0.3" fill="none">
                    <path d="M200 120 L350 125 L380 180 L320 220 L250 200 L200 160 Z" />
                    <path d="M250 200 L320 220 L340 280 L280 300 L220 280 L250 240 Z" />
                    <path d="M350 125 L420 140 L440 200 L380 230 L350 180 Z" />
                    <path d="M380 230 L440 200 L460 260 L400 290 L360 270 Z" />
                  </g>
                  
                  <g className="branches">
                    <g className="branch-hyderabad">
                      <circle cx="300" cy="200" r="12" fill="white" stroke="#e74c3c" strokeWidth="4" className="animate-pulse drop-shadow-lg" />
                      <circle cx="300" cy="200" r="6" fill="#e74c3c" />
                      <text x="320" y="195" className="fill-white font-bold drop-shadow-md" fontSize="16">Hyderabad</text>
                      <text x="320" y="212" className="fill-white text-sm drop-shadow-md" fontSize="12">Main Office</text>
                    </g>
                    <g className="branch-warangal">
                      <circle cx="400" cy="180" r="8" fill="white" stroke="#e74c3c" strokeWidth="3" className="drop-shadow-md" />
                      <circle cx="400" cy="180" r="4" fill="#e74c3c" />
                      <text x="415" y="175" className="fill-white font-semibold drop-shadow-md" fontSize="14">Warangal</text>
                    </g>
                    <g className="branch-nizamabad">
                      <circle cx="220" cy="140" r="8" fill="white" stroke="#e74c3c" strokeWidth="3" className="drop-shadow-md" />
                      <circle cx="220" cy="140" r="4" fill="#e74c3c" />
                      <text x="235" y="135" className="fill-white font-semibold drop-shadow-md" fontSize="14">Nizamabad</text>
                    </g>
                    <g className="branch-karimnagar">
                      <circle cx="320" cy="130" r="7" fill="white" stroke="#e74c3c" strokeWidth="3" className="drop-shadow-md" />
                      <circle cx="320" cy="130" r="3.5" fill="#e74c3c" />
                      <text x="335" y="125" className="fill-white font-semibold drop-shadow-md" fontSize="13">Karimnagar</text>
                    </g>
                    <g className="branch-nalgonda">
                      <circle cx="350" cy="240" r="7" fill="white" stroke="#e74c3c" strokeWidth="2" className="drop-shadow-md" />
                      <circle cx="350" cy="240" r="3.5" fill="#e74c3c" />
                      <text x="365" y="235" className="fill-white font-medium drop-shadow-md" fontSize="12">Nalgonda</text>
                    </g>
                    <g className="branch-khammam">
                      <circle cx="420" cy="220" r="6" fill="white" stroke="#e74c3c" strokeWidth="2" className="drop-shadow-md" />
                      <circle cx="420" cy="220" r="3" fill="#e74c3c" />
                      <text x="435" y="215" className="fill-white font-medium drop-shadow-md" fontSize="12">Khammam</text>
                    </g>
                  </g>
                  
                  <text x="300" y="320" className="fill-white font-bold drop-shadow-lg" fontSize="24" textAnchor="middle">TELANGANA</text>
                  <text x="300" y="340" className="fill-white/80 font-medium drop-shadow-md" fontSize="14" textAnchor="middle">Our Operating Region</text>
                  
                  <g className="connections" stroke="white" strokeWidth="2" strokeDasharray="6,4" opacity="0.4">
                    <line x1="300" y1="200" x2="400" y2="180" className="animate-pulse"/>
                    <line x1="300" y1="200" x2="220" y2="140" className="animate-pulse"/>
                    <line x1="300" y1="200" x2="320" y2="130" className="animate-pulse"/>
                    <line x1="300" y1="200" x2="350" y2="240" className="animate-pulse"/>
                    <line x1="300" y1="200" x2="420" y2="220" className="animate-pulse"/>
                  </g>
                  
                  <g className="coverage-rings" fill="none" stroke="white" strokeWidth="1" opacity="0.2">
                    <circle cx="300" cy="200" r="80" className="animate-pulse" style={{ animationDuration: '3s' }}/>
                    <circle cx="300" cy="200" r="120" className="animate-pulse" style={{ animationDuration: '4s' }}/>
                    <circle cx="300" cy="200" r="160" className="animate-pulse" style={{ animationDuration: '5s' }}/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-8">
              {reachStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          <Counter end={stat.number} suffix={stat.suffix} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors duration-300"></div>
                  </div>
                  
                  <p className="text-sm text-gray-700 font-medium leading-tight max-w-[140px] mx-auto group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive network spans across multiple states in India, reaching thousands of families and communities with our integrated approach to child welfare, education, and social development.
          </p>
        </div>
      </div>
    </section>
  );
  */
  
  // Section is temporarily disabled - will be updated later
  return <></>;
}