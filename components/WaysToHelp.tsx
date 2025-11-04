import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Heart, Users, HandHeart, ArrowRight } from "lucide-react"

const ways = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your financial contribution directly supports our programs and helps us reach more people in need.",
    amount: "Starting from ₹500",
    action: "Donate Now",
    href: "/donate",
    color: "bg-red-50 text-red-600",
    hoverColor: "hover:bg-red-100"
  },
  {
    icon: HandHeart,
    title: "Sponsor",
    description: "Create a personal connection by sponsoring a child's education, elder's healthcare, or youth's training.",
    amount: "From ₹2,500/month",
    action: "Start Sponsoring",
    href: "/sponsor",
    color: "bg-blue-50 text-blue-600",
    hoverColor: "hover:bg-blue-100"
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Share your time, skills, and passion to make a hands-on difference in our communities.",
    amount: "2-4 hours/week",
    action: "Join Us",
    href: "/volunteer",
    color: "bg-green-50 text-green-600",
    hoverColor: "hover:bg-green-100"
  }
]

export function WaysToHelp() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Three Ways to Make a Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you want to contribute financially, create personal connections, or volunteer your time, there's a meaningful way for you to join our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ways.map((way, index) => {
            const IconComponent = way.icon
            return (
              <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div className={`h-16 w-16 rounded-full ${way.color} ${way.hoverColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {way.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-left">
                    {way.description}
                  </CardDescription>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium text-primary">{way.amount}</span>
                  </div>
                  
                  <Button className={`w-full group/btn relative overflow-hidden rounded-full py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${
                    way.title === 'Donate' 
                      ? 'bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white hover:scale-105' 
                      : 'bg-primary hover:bg-primary/90 hover:scale-105'
                  }`} asChild>
                    <a href={way.href}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {way.title === 'Donate' && <Heart className="h-4 w-4 group-hover/btn:animate-pulse" />}
                        {way.action}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                      {way.title === 'Donate' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Highlighted Direct Impact */}
        <div className="mt-16 flex justify-center">
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 text-teal-800 font-medium shadow-lg shadow-teal-500/10 text-sm border border-teal-200">
            <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
            Tax-deductible donations under Section 80G
          </div>
          <p className="text-muted-foreground">
            All donations are secure, transparent, and directly support our beneficiaries.
          </p>
        </div>
      </div>
    </section>
  )
}