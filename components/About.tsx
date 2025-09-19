import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { CheckCircle } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

const achievements = [
  "20 years of humanitarian work",
  "50,000+ lives directly impacted",
  "5 states served across India",
  "98% of donations go to programs"
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">About Us</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                We believe every person deserves 
                <span className="text-primary"> hope and dignity</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Founded in 2005, Mahima Ministries has been dedicated to creating lasting change through comprehensive programs in child welfare & education, old-aged welfare, disabled care, skilling youth, and social activities across India.
              </p>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button size="lg">Read Our Story</Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NTgxMTg0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Children in education program"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats overlay */}
            <div className="absolute -top-6 -right-6 bg-background rounded-xl p-6 shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">States</div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 bg-background rounded-xl p-6 shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Lives Changed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}