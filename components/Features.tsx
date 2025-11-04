import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { GraduationCap, Droplets, Heart, Home, Utensils, TreePine } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Building schools and providing quality education to children in remote communities."
  },
  {
    icon: Droplets,
    title: "Clean Water",
    description: "Installing wells and water systems to provide safe drinking water for entire villages."
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Mobile clinics and health centers bringing medical care to underserved areas."
  },
  {
    icon: Home,
    title: "Housing",
    description: "Constructing safe, sustainable homes for families in need of shelter."
  },
  {
    icon: Utensils,
    title: "Nutrition",
    description: "Food security programs and nutrition education for malnourished communities."
  },
  {
    icon: TreePine,
    title: "Environment",
    description: "Reforestation and sustainable farming initiatives to protect our planet."
  }
]

export function Features() {
  return (
    <section id="programs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Our Programs Make a Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Through our comprehensive programs, we address the most critical needs in communities worldwide, creating lasting positive change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}