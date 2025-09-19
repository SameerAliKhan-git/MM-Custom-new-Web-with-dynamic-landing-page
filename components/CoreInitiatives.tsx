import { ProgramCard } from "./ProgramCard"
import { GraduationCap, Heart, HandHeart, Wrench, TreePine } from "lucide-react"

const initiatives = [
  {
    icon: GraduationCap,
    title: "Child Welfare & Education",
    description: "Providing quality education, healthcare, nutrition, and protection for vulnerable children in underserved communities.",
    href: "/child-welfare",
    stats: "15,000+ children supported"
  },
  {
    icon: Heart,
    title: "Old-Aged Welfare",
    description: "Ensuring dignity, healthcare, companionship, and support for senior citizens who need care and community.",
    href: "/elderly-care", 
    stats: "3,200+ elders cared for"
  },
  {
    icon: HandHeart,
    title: "Disabled Care",
    description: "Empowering individuals with disabilities through inclusive programs, accessibility, and community integration.",
    href: "/disabled-care",
    stats: "2,100+ individuals supported"
  },
  {
    icon: Wrench,
    title: "Skilling Youth",
    description: "Providing vocational training, job placement, and entrepreneurship opportunities for unemployed youth.",
    href: "/youth-skills",
    stats: "8,500+ youth trained"
  },
  {
    icon: TreePine,
    title: "Social Activities",
    description: "Building stronger communities through events, festivals, awareness campaigns, and social development programs.",
    href: "/social-activities",
    stats: "150+ communities engaged"
  }
]

export function CoreInitiatives() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full">
        {/* Header section with stripe + heading to match Sitemap */}
        <div className="py-6 px-8">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-[#e74c3c] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#e74c3c]">
              Mahima Ministries: Caring for Communities
            </h1>
          </div>
        </div>

        {/* Main content section */}
        <div className="bg-muted py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                Our key areas of focus
              </h2>
              <div className="w-16 h-1 bg-[#e74c3c]"></div>
            </div>

            {/* Focus area cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex justify-center mb-3">
                  <GraduationCap className="h-12 w-12 text-[#e74c3c]" />
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  Child Welfare & Education
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex justify-center mb-3">
                  <Heart className="h-12 w-12 text-[#e74c3c]" />
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  Old-Aged Welfare
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex justify-center mb-3">
                  <Wrench className="h-12 w-12 text-[#e74c3c]" />
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  Youth Skilling
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex justify-center mb-3">
                  <HandHeart className="h-12 w-12 text-[#e74c3c]" />
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  Disabled Care
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex justify-center mb-3">
                  <TreePine className="h-12 w-12 text-[#e74c3c]" />
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  Social Activities
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Ready to make a difference? Choose how you'd like to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/donate" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 font-medium transition-colors">
                  Donate Now
                </a>
                <a href="/get-involved" className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8 font-medium transition-colors">
                  Volunteer With Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}