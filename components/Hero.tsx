import { Button } from "./ui/button"
import { ArrowRight, Play, Heart } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODAzMjQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Children learning in classroom"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white">
              Creating Hope for 
              <span className="text-primary"> Every Child's Future</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Through education, care, and community support, we're building a world where every child, elder, and person with disabilities can thrive with dignity and hope.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group bg-primary hover:bg-primary/90 text-lg px-8 py-4">
              Make an Impact
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">15,000+</div>
              <div className="text-sm lg:text-base text-white/80">Children Educated</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">3,200+</div>
              <div className="text-sm lg:text-base text-white/80">Elders Supported</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl lg:text-4xl text-white">8,500+</div>
              <div className="text-sm lg:text-base text-white/80">Youth Skilled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating achievement card */}
      <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Heart className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="font-semibold">New School Built</div>
            <div className="text-sm text-muted-foreground">500 children enrolled</div>
          </div>
        </div>
      </div>

      {/* Floating impact stat */}

    </section>
  )
}