import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { Menu, Heart, GraduationCap, Users, Wrench, TreePine, HandHeart, Target, ChevronDown } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md bg-white supports-[backdrop-filter]:bg-white ${
      isScrolled ? 'border-b shadow-sm' : ''
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 p-[5px] mx-[5px] my-[0px] bg-[rgba(235,152,3,0)] rounded-[50px]">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Mahima Ministries Logo" 
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105">Who we are</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    {[
                      { title: "About us", href: "/about", description: "Learn about our organization and story", icon: Users },
                      { title: "Vision | Mission | Values", href: "/vision-mission-values", description: "Our guiding principles and purpose", icon: Target },
                      { title: "Our governance", href: "/governance", description: "Leadership structure and accountability", icon: Users }
                    ].map((item) => {
                      const IconComponent = item.icon
                      return (
                        <NavigationMenuLink
                          key={item.title}
                          href={item.href}
                          className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-sm focus:bg-accent focus:text-accent-foreground block"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <div className="font-medium leading-none">{item.title}</div>
                          </div>
                          <p className="line-clamp-2 leading-snug text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      )
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105">Our Work</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[900px] grid-cols-3 gap-6 p-4">
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                      {[
                        { title: "Child Welfare & Education", href: "/child-welfare", description: "Supporting children's development and education", icon: GraduationCap },
                        { title: "Old-Aged Welfare", href: "/elderly-care", description: "Caring for our senior community members", icon: Users },
                        { title: "Disabled Care", href: "/disabled-care", description: "Supporting individuals with disabilities", icon: HandHeart },
                        { title: "Skilling Youth", href: "/youth-skills", description: "Empowering youth with valuable skills", icon: Wrench },
                        { title: "Social Activities", href: "/social-activities", description: "Community engagement and social programs", icon: TreePine },
                        { title: "Our Programmes", href: "/programmes", description: "Comprehensive overview of all our programs", icon: Heart },
                        { title: "Where We Work", href: "/programmes", description: "Our operational areas and communities", icon: GraduationCap },
                        { title: "Sustainability", href: "/sustainability", description: "Our commitment to sustainable practices", icon: TreePine },
                        { title: "Media", href: "/media", description: "Press releases and media coverage", icon: HandHeart }
                      ].map((item) => {
                        const IconComponent = item.icon
                        return (
                          <NavigationMenuLink
                            key={item.title}
                            href={item.href}
                            className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-sm focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-primary" />
                              <div className="font-medium leading-none text-sm">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 leading-snug text-muted-foreground text-xs">
                              {item.description}
                            </p>
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                    <div className="space-y-3">
                      <div className="font-medium text-primary border-b border-border pb-2">Financial Transparency</div>
                      {[
                        { title: "Government Partnerships/Schemes", href: "/partnerships", description: "Collaborative government initiatives", icon: Users },
                        { title: "Financial Information", href: "/financial", description: "Transparency in our financial operations", icon: Wrench },
                        { title: "Annual Reports", href: "/reports", description: "Yearly impact and financial reports", icon: GraduationCap }
                      ].map((item) => {
                        const IconComponent = item.icon
                        return (
                          <NavigationMenuLink
                            key={item.title}
                            href={item.href}
                            className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-sm focus:bg-accent focus:text-accent-foreground block"
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-3 w-3 text-primary" />
                              <div className="font-medium leading-none text-sm">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 leading-snug text-muted-foreground text-xs">
                              {item.description}
                            </p>
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuLink href="/donor-portal" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Donor Portal
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105">Ways to Give</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[700px] grid-cols-2 gap-3 p-4">
                    <div className="space-y-3">
                      {[
                        { title: "Philanthropy", href: "/philanthropy", description: "Large-scale giving opportunities for major donors" },
                        { title: "Partnerships", href: "/partnerships", description: "Corporate and institutional partnerships" },
                        { title: "Give in Celebration", href: "/give-celebration", description: "Celebrate special occasions with giving" },
                        { title: "Make a Donation", href: "/donate", description: "Direct financial contributions to our cause" }
                      ].map((item) => (
                        <NavigationMenuLink
                          key={item.title}
                          href={item.href}
                          className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-sm focus:bg-accent focus:text-accent-foreground block"
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-primary" />
                            <div className="font-medium leading-none">{item.title}</div>
                          </div>
                          <p className="line-clamp-2 leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="font-medium text-primary border-b border-border pb-2">Other Ways To Give</div>
                      {[
                        { title: "Legacy", href: "/legacy", description: "Leave a lasting impact through legacy giving" },
                        { title: "Payroll Giving", href: "/payroll-giving", description: "Make regular donations through your employer" },
                        { title: "Employee Engagement", href: "/employee-engagement", description: "Corporate employee volunteering programs" },
                        { title: "Cause in Memory", href: "/memory", description: "Honor loved ones through memorial giving" }
                      ].map((item) => (
                        <NavigationMenuLink
                          key={item.title}
                          href={item.href}
                          className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-sm focus:bg-accent focus:text-accent-foreground block"
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="h-3 w-3 text-primary" />
                            <div className="font-medium leading-none text-sm">{item.title}</div>
                          </div>
                          <p className="line-clamp-2 leading-snug text-muted-foreground text-xs">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <a href="/login" className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold bg-secondary-solid text-white hover:opacity-90 transition-all shadow-sm">
              Login
            </a> */}
            <Button size="lg" className="relative bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 group overflow-hidden" onClick={() => (window.location.href = "/donate")}>
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="h-5 w-5 group-hover:animate-pulse" />
                Donate Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md" 
              onClick={() => (window.location.href = "/donate")}
            >
              <Heart className="h-4 w-4 mr-1" />
              Donate
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 touch-manipulation">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[400px] flex flex-col p-0 h-full">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu for Mahima Ministries website
                </SheetDescription>
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/logo.png" 
                      alt="Mahima Ministries Logo" 
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-6 py-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <nav className="space-y-3 pb-24">
                  {/* Who we are - Accordion */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => toggleSection('who-we-are')}
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    >
                      <span>Who we are</span>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expandedSection === 'who-we-are' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'who-we-are' && (
                      <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                        {[
                          { title: "About us", href: "/about", icon: Users },
                          { title: "Vision | Mission | Values", href: "/vision-mission-values", icon: Target },
                          { title: "Our governance", href: "/governance", icon: Users }
                        ].map((item) => {
                          const IconComponent = item.icon
                          return (
                            <a 
                              key={item.title}
                              href={item.href} 
                              className="flex items-center gap-3 py-3 px-3 text-base rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 touch-manipulation"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <IconComponent className="h-5 w-5 flex-shrink-0" />
                              <span className="flex-1">{item.title}</span>
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Our Work - Accordion */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => toggleSection('our-work')}
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    >
                      <span>Our Work</span>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expandedSection === 'our-work' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'our-work' && (
                      <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                        {[
                          { title: "Child Welfare & Education", href: "/child-welfare", icon: GraduationCap },
                          { title: "Old-Aged Welfare", href: "/elderly-care", icon: Users },
                          { title: "Disabled Care", href: "/disabled-care", icon: HandHeart },
                          { title: "Skilling Youth", href: "/youth-skills", icon: Wrench },
                          { title: "Social Activities", href: "/social-activities", icon: TreePine },
                          { title: "Our Programmes", href: "/programmes", icon: Heart },
                          { title: "Where We Work", href: "/programmes", icon: GraduationCap },
                          { title: "Sustainability", href: "/sustainability", icon: TreePine },
                          { title: "Media", href: "/media", icon: HandHeart }
                        ].map((item) => {
                          const IconComponent = item.icon
                          return (
                            <a 
                              key={item.title}
                              href={item.href} 
                              className="flex items-center gap-3 py-3 px-3 text-base rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 touch-manipulation"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <IconComponent className="h-5 w-5 flex-shrink-0" />
                              <span className="flex-1">{item.title}</span>
                            </a>
                          )
                        })}
                        <div className="space-y-2 mt-3 pt-3 border-t border-border">
                          <div className="text-sm font-semibold text-secondary px-3">Financial Transparency</div>
                          {[
                            { title: "Government Partnerships/Schemes", href: "/partnerships", icon: Users },
                            { title: "Financial Information", href: "/financial", icon: Wrench },
                            { title: "Annual Reports", href: "/reports", icon: GraduationCap }
                          ].map((item) => {
                            const IconComponent = item.icon
                            return (
                              <a 
                                key={item.title}
                                href={item.href} 
                                className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 touch-manipulation"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <IconComponent className="h-4 w-4 flex-shrink-0" />
                                <span className="flex-1">{item.title}</span>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* <a href="/donor-portal" className="block py-2 hover:text-primary transition-all duration-300 hover:translate-x-2">Donor Portal</a> */}
                  {/* Ways to Give - Accordion */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => toggleSection('ways-to-give')}
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    >
                      <span>Ways to Give</span>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expandedSection === 'ways-to-give' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'ways-to-give' && (
                      <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                        {[
                          { title: "Philanthropy", href: "/philanthropy" },
                          { title: "Partnerships", href: "/partnerships" },
                          { title: "Give in Celebration", href: "/give-celebration" },
                          { title: "Make a Donation", href: "/donate" }
                        ].map((item) => (
                          <a 
                            key={item.title}
                            href={item.href} 
                            className="flex items-center gap-3 py-3 px-3 text-base rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 touch-manipulation"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Heart className="h-5 w-5 flex-shrink-0" />
                            <span className="flex-1">{item.title}</span>
                          </a>
                        ))}
                        <div className="space-y-2 mt-3 pt-3 border-t border-border">
                          <div className="text-sm font-semibold text-secondary px-3">Other Ways To Give</div>
                          {[
                            { title: "Legacy", href: "/legacy" },
                            { title: "Payroll Giving", href: "/payroll-giving" },
                            { title: "Employee Engagement", href: "/employee-engagement" },
                            { title: "Cause in Memory", href: "/memory" }
                          ].map((item) => (
                            <a 
                              key={item.title}
                              href={item.href} 
                              className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 touch-manipulation"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Heart className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1">{item.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact - Direct link */}
                  <a 
                    href="/contact" 
                    className="flex items-center justify-between py-3 px-4 text-base font-semibold text-primary rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Contact</span>
                  </a>
                  {/* <a href="/login" className="block py-2 hover:text-primary transition-all duration-300 hover:translate-x-2">Login</a> */}
                  
                    <div className="pt-6 pb-2">
                      <Button className="w-full relative bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation" onClick={() => { setMobileMenuOpen(false); window.location.href = "/donate"; }}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Heart className="h-6 w-6" />
                          Donate Now
                        </span>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}