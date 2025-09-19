import { StoryCard } from "./StoryCard"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const featuredStories = [
  {
    image: "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODAzMjQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Child Welfare & Education",
    title: "From Street to School: Priya's Journey",
    excerpt: "Once a street child begging for food, Priya is now a confident 12-year-old who dreams of becoming a doctor. Her transformation began when our outreach team found her...",
    href: "/stories/priya-journey",
    date: "2 days ago"
  },
  {
    image: "https://images.unsplash.com/photo-1751977979590-3554dd691c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMHN1cHBvcnQlMjBoZWxwaW5nfGVufDF8fHx8MTc1ODExODc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Elderly Care",
    title: "Grandmother's Second Chapter",
    excerpt: "At 78, Kamala Devi thought her days of purpose were over. Our elderly care program not only provided her healthcare but also connected her with young learners...",
    href: "/stories/kamala-devi-story",
    date: "1 week ago"
  },
  {
    image: "https://images.unsplash.com/photo-1690356107486-0796de806f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx5b3V0aCUyMHNraWxscyUyMHRyYWluaW5nJTIwdm9jYXRpb25hbHxlbnwxfHx8fDE3NTgxMTg3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Skilling Youth",
    title: "From Unemployed to Entrepreneur",
    excerpt: "Raj's digital marketing course with us didn't just give him a job—it inspired him to start his own agency. Now he employs five other youth from his village...",
    href: "/stories/raj-entrepreneur",
    date: "2 weeks ago"
  }
]

interface StoriesOfImpactProps {
  showAll?: boolean
  className?: string
}

export function StoriesOfImpact({ showAll = false, className }: StoriesOfImpactProps) {
  const displayStories = showAll ? featuredStories : featuredStories.slice(0, 3)

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Stories of Hope & Transformation</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Behind every statistic is a human story. Meet the individuals whose lives have been transformed through our programs and the communities that supported them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayStories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="group" asChild>
              <a href="/stories">
                Read More Stories
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        )}

        {/* Impact quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-muted-foreground max-w-4xl mx-auto">
            "Every child deserves a chance to dream, every elder deserves dignity, and every person deserves hope. Together, we make this possible."
          </blockquote>
          <cite className="block mt-4 font-semibold">— Mahima Ministries Team</cite>
        </div>
      </div>
    </section>
  )
}