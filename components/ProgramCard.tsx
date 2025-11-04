import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ArrowRight, LucideIcon } from "lucide-react"

interface ProgramCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  stats?: string
  className?: string
}

export function ProgramCard({ icon: Icon, title, description, href, stats, className }: ProgramCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardHeader className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats && (
          <div className="text-sm font-medium text-primary">{stats}</div>
        )}
        {href && (
          <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent hover:text-primary" asChild>
            <a href={href} className="flex items-center gap-2">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}