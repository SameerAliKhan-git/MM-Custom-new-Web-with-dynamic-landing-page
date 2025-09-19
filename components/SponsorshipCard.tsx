import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Heart, MapPin } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface SponsorshipCardProps {
  image: string
  name: string
  age?: number
  location: string
  story: string
  program: string
  monthlyAmount: string
  urgent?: boolean
  className?: string
}

export function SponsorshipCard({ 
  image, 
  name, 
  age, 
  location, 
  story, 
  program, 
  monthlyAmount, 
  urgent = false,
  className 
}: SponsorshipCardProps) {
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="aspect-[3/4] overflow-hidden relative">
        <ImageWithFallback
          src={image}
          alt={`${name}'s photo`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {urgent && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            Urgent
          </Badge>
        )}
      </div>
      
      <CardHeader className="space-y-3">
        <div className="space-y-2">
          <CardTitle className="flex items-center justify-between">
            <span>{name}</span>
            {age && <span className="text-muted-foreground">{age}y</span>}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
        </div>
        
        <Badge variant="outline" className="w-fit">
          {program}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {story}
        </CardDescription>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Monthly Sponsorship</span>
            <span className="font-semibold text-primary">{monthlyAmount}</span>
          </div>
          
          <Button className="w-full bg-primary hover:bg-primary/90 group/btn">
            <Heart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            Sponsor {name}
          </Button>
          
          <Button variant="outline" className="w-full">
            Learn More About {name}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}