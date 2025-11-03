import { Button } from "./ui/button"
import { Mail, Gift, Heart, Cake } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Simple reveal animation hook matching Contact/VMV pages
const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export function GiveInCelebration() {
  // State for active celebration type
  const [activeCelebration, setActiveCelebration] = useState<'birthday' | 'wedding' | 'occasions' | null>(null)

  const birthdayReveal = useReveal()
  const weddingReveal = useReveal()
  const occasionsReveal = useReveal()
  const ctaReveal = useReveal()

  const handleCelebrationClick = (type: 'birthday' | 'wedding' | 'occasions') => {
    setActiveCelebration(type)
    // Scroll to content after a brief delay
    setTimeout(() => {
      const contentElement = document.getElementById('celebration-content')
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen">
      {/* Teal Banner - matching Programmes page style */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Give in Celebration</h1>
        </div>
      </div>

      {/* Intro Section - matching About page style */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Transform Your Special Day</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dedicate your birthday, wedding, or other special occasion to create lasting impact. Help vulnerable children, support elderly care, empower youth with skills, and strengthen communities through Mahima Ministries' programmes.
            </p>
          </div>
        </div>
      </section>

      {/* Three Celebration Cards - matching Partnerships page style */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Birthday Card */}
            <div 
              className={`relative group cursor-pointer transition-all rounded-lg ${activeCelebration === 'birthday' ? 'ring-4 ring-primary ring-offset-4 shadow-xl' : ''}`}
              onClick={() => handleCelebrationClick('birthday')}
              ref={birthdayReveal.ref}
            >
              <div className={`relative rounded-lg overflow-hidden ${activeCelebration === 'birthday' ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-500 ${birthdayReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <div className="text-center">
                    <Cake className="h-20 w-20 text-primary mx-auto mb-4" />
                    <div className="bg-white px-6 py-3 rounded-lg shadow-md inline-block transform -rotate-2">
                      <p className="text-2xl font-bold text-primary">CELEBRATE</p>
                      <p className="text-xl font-semibold text-foreground">YOUR</p>
                      <p className="text-2xl font-bold text-foreground">BIRTHDAY</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-secondary-solid">
                  <p className="text-white font-semibold text-base leading-relaxed">
                    Turn your birthday into a celebration that changes lives—support education, care, and hope
                  </p>
                  <button className="mt-3 bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-colors text-sm">
                    READ MORE
                  </button>
                </div>
              </div>
              {/* Active Indicator Arrow */}
              {activeCelebration === 'birthday' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg"></div>
                </div>
              )}
            </div>

            {/* Wedding Card */}
            <div 
              className={`relative group cursor-pointer transition-all rounded-lg ${activeCelebration === 'wedding' ? 'ring-4 ring-primary ring-offset-4 shadow-xl' : ''}`}
              onClick={() => handleCelebrationClick('wedding')}
              ref={weddingReveal.ref}
            >
              <div className={`relative rounded-lg overflow-hidden ${activeCelebration === 'wedding' ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-500 ${weddingReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <Heart className="h-20 w-20 text-primary" />
                </div>
                <div className="p-5 bg-secondary-solid">
                  <p className="text-white font-semibold text-base leading-relaxed">
                    Make your wedding day meaningful—share your joy with vulnerable communities
                  </p>
                  <button className="mt-3 bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-colors text-sm">
                    READ MORE
                  </button>
                </div>
              </div>
              {/* Active Indicator Arrow */}
              {activeCelebration === 'wedding' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg"></div>
                </div>
              )}
            </div>

            {/* Special Occasions Card */}
            <div 
              className={`relative group cursor-pointer transition-all rounded-lg ${activeCelebration === 'occasions' ? 'ring-4 ring-primary ring-offset-4 shadow-xl' : ''}`}
              onClick={() => handleCelebrationClick('occasions')}
              ref={occasionsReveal.ref}
            >
              <div className={`relative rounded-lg overflow-hidden ${activeCelebration === 'occasions' ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-500 ${occasionsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <Gift className="h-20 w-20 text-primary" />
                </div>
                <div className="p-5 bg-secondary-solid">
                  <p className="text-white font-semibold text-base leading-relaxed">
                    Anniversary, achievement, or milestone—dedicate your special occasion to community impact
                  </p>
                  <button className="mt-3 bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-colors text-sm">
                    READ MORE
                  </button>
                </div>
              </div>
              {/* Active Indicator Arrow */}
              {activeCelebration === 'occasions' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Donation Details - Only show when birthday is active */}
      {activeCelebration === 'birthday' && (
        <div id="celebration-content">
          <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Celebrate Your Birthday with Purpose</h2>
            </div>
            
            <div className="space-y-4 text-foreground leading-relaxed mb-8">
              <p>
                Transform your birthday into a celebration that creates lasting change. Whether you're turning 25, 40, or 65, dedicate your special day to supporting Mahima Ministries' work in child welfare, elderly care, youth skilling, and community development.
              </p>
              <p>
                Your birthday wish can bring education to children, dignity to elders, skills to youth, and support to persons with disabilities. Make this birthday one you'll always remember—for the lives you've touched.
              </p>
            </div>

            <div className="glass-card rounded-2xl border shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                Three Ways to Donate Your Birthday
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Facebook Fundraiser:</span>
                    <span> Create a birthday fundraiser and invite friends to contribute instead of giving gifts</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Crowdfunding Platform:</span>
                    <span> Start a campaign on Give India, Ketto, or similar platforms (we'll guide you) and share with your network</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Direct Donation:</span>
                    <span> Make a personal contribution in honor of your birthday and inspire others to join</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl border shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                Your Impact & Benefits
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Support education for 15,000+ vulnerable children</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Provide care and dignity for 3,200+ senior citizens</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Enable vocational training for 8,500+ unemployed youth</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Empower 2,100+ individuals with disabilities</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Tax exemption benefits on your contribution</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Regular updates and stories of impact through our newsletters</span>
                </div>
              </div>
              <p className="mt-6 text-foreground font-medium">
                Make your birthday count—for you and for those who need it most.
              </p>
              <p className="mt-4 text-muted-foreground">
                Contact us: {" "}
                <a href="mailto:mahimaministriesindia@gmail.com" className="text-primary hover:underline font-semibold">
                  mahimaministriesindia@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
        </div>
      )}

      {/* Wedding Donation Details - Only show when wedding is active */}
      {activeCelebration === 'wedding' && (
        <div id="celebration-content">
          <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Wedding with Purpose</h2>
            </div>
            
            <div className="space-y-4 text-foreground leading-relaxed mb-8">
              <p>
                Your wedding day is about celebrating love and commitment. Why not extend that love to vulnerable communities? A philanthropic wedding allows you to share your joy with children, elders, youth, and persons with disabilities who need support and hope.
              </p>
              <p>
                Every aspect of your wedding—from invitations to favors—presents an opportunity to give back. Request donations to Mahima Ministries instead of traditional gifts, or dedicate a portion of your celebration budget to programmes that create lasting change.
              </p>
            </div>

            <div className="glass-card rounded-2xl border shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                How We Support Your Giving Wedding
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We work with couples passionate about making their big day generous. Choose from our five core focus areas:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">—</span>
                    <span><strong>Child Welfare & Education:</strong> Support quality education and care for vulnerable children</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">—</span>
                    <span><strong>Old-Aged Welfare:</strong> Provide dignity and healthcare for senior citizens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">—</span>
                    <span><strong>Youth Skilling:</strong> Empower unemployed youth with vocational training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">—</span>
                    <span><strong>Disabled Care:</strong> Enable inclusive programs for persons with disabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">—</span>
                    <span><strong>Social Activities:</strong> Strengthen communities through development programs</span>
                  </li>
                </ul>
                <p className="mt-4">
                  Your guests can donate to their preferred cause as wedding gifts. We'll facilitate the entire process, providing donation options and receipts for tax exemption.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <p className="text-foreground mb-4">
                Begin your journey together by making a difference
              </p>
              <p className="text-muted-foreground">
                Contact us at{" "}
                <a href="mailto:mahimaministriesindia@gmail.com" className="text-primary hover:underline font-semibold">
                  mahimaministriesindia@gmail.com
                </a>
                {" "}to plan your giving wedding
              </p>
            </div>
          </div>
        </div>
      </section>
        </div>
      )}

      {/* Special Occasions & Milestones - Only show when occasions is active */}
      {activeCelebration === 'occasions' && (
        <div id="celebration-content">
          <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Special Occasions & Milestones</h2>
            </div>
            
            <p className="text-foreground leading-relaxed mb-8">
              Anniversaries, achievements, company milestones, or personal victories—dedicate any special occasion to creating community impact through Mahima Ministries.
            </p>

            <div className="space-y-6">
              {/* Foundation Day */}
              <div className="glass-card rounded-2xl border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                  Foundation Day & Anniversaries
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Celebrate your organization's foundation day or anniversary by giving back. Since 2005, Mahima Ministries has celebrated its mission annually through community events, cultural programs, and service activities. Partner with us to mark your milestone with meaningful impact—sponsor an event, support a programme, or organize a community drive.
                </p>
              </div>

              {/* Achievement Celebrations */}
              <div className="glass-card rounded-2xl border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                  Achievement Celebrations
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Promotion, award, business success, or personal achievement? Honor your milestone by supporting vulnerable communities. Your celebration can provide education materials for children, healthcare for elders, vocational training equipment for youth, or accessibility aids for persons with disabilities. Make your success a catalyst for others' growth.
                </p>
              </div>

              {/* Community & Cultural Events */}
              <div className="glass-card rounded-2xl border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-block h-1 w-10 bg-primary rounded-full" />
                  Community & Cultural Events
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Throughout the year, we organize festivals, health camps, skill-building workshops, and awareness campaigns across communities. These events bring together children, elders, youth, and families for:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Cultural performances and talent showcases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Health and wellness camps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Educational workshops and competitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Sports tournaments and team-building activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Awareness campaigns on child safety, elder care, and inclusion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      )}

      {/* Ways to Collaborate & Support - Show for all active celebrations */}
      {activeCelebration && (
        <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Ways to Collaborate & Support</h2>
            </div>
            
            <div className="glass-card rounded-2xl border shadow-sm p-6 mb-8">
              <div className="space-y-4 text-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <div>
                    <span className="font-semibold">Event Sponsorship:</span>
                    <span className="text-muted-foreground"> Sponsor our Foundation Day, annual celebrations, or community events</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <div>
                    <span className="font-semibold">Child/Elder Sponsorship:</span>
                    <span className="text-muted-foreground"> Directly support a child's education or an elder's care on your special day</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <div>
                    <span className="font-semibold">Programme Support:</span>
                    <span className="text-muted-foreground"> Fund specific programmes—child welfare, elderly care, youth skilling, disability support</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <div>
                    <span className="font-semibold">In-Kind Donations:</span>
                    <span className="text-muted-foreground"> Contribute products, supplies, or services for our celebrations and programmes</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <div>
                    <span className="font-semibold">Volunteer Your Time:</span>
                    <span className="text-muted-foreground"> Organize a celebration activity or skill-sharing session with our communities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section - Show for all active celebrations */}
      {activeCelebration && (
        <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="group" ref={ctaReveal.ref}>
              <div className={`glass-card rounded-2xl border shadow-sm p-8 text-center transition-all duration-500 group-hover:shadow-md ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <h3 className="text-2xl font-semibold mb-4">Ready to Make Your Celebration Count?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether it's a birthday, wedding, anniversary, or any special moment—let's turn your celebration into lasting impact for vulnerable communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => window.location.href = 'mailto:mahimaministriesindia@gmail.com'}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get Started
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => window.location.href = '/donate'}
                  >
                    Donate Now
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Contact: <a href="mailto:mahimaministriesindia@gmail.com" className="text-primary hover:underline font-semibold">mahimaministriesindia@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  )
}
