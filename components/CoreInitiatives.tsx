import { GraduationCap, Heart, HandHeart, Wrench, TreePine } from 'lucide-react';

export function CoreInitiatives() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full">
        {/* Header section with stripe + heading to match Sitemap */}
        <div className="py-6 px-8">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-semibold text-primary">
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
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            {/* Focus area cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] hover:bg-primary">
                <div className="flex justify-center mb-3">
                  <GraduationCap className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-medium text-card-foreground group-hover:text-primary-foreground transition-colors">
                  Child Welfare & Education
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] hover:bg-primary">
                <div className="flex justify-center mb-3">
                  <Heart className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-medium text-card-foreground group-hover:text-primary-foreground transition-colors">
                  Old-Aged Welfare
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] hover:bg-primary">
                <div className="flex justify-center mb-3">
                  <Wrench className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-medium text-card-foreground group-hover:text-primary-foreground transition-colors">
                  Youth Skilling
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] hover:bg-primary">
                <div className="flex justify-center mb-3">
                  <HandHeart className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-medium text-card-foreground group-hover:text-primary-foreground transition-colors">
                  Disabled Care
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] hover:bg-primary">
                <div className="flex justify-center mb-3">
                  <TreePine className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-medium text-card-foreground group-hover:text-primary-foreground transition-colors">
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
  );
}