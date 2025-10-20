import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StoryCardProps {
  image: string
  category: string
  title: string
  excerpt: string
  href: string
  date?: string
  className?: string
}

export function StoryCard({ image, category, title, excerpt, href, date, className }: StoryCardProps) {
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {category}
          </Badge>
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {excerpt}
        </CardDescription>
        <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent hover:text-primary" asChild>
          <a href={href} className="flex items-center gap-2">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}