import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { Menu, Heart, GraduationCap, Users, Wrench, TreePine, HandHeart, Target } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
                        { title: "Child Safeguarding", href: "/safeguarding", description: "Protecting children's rights and safety", icon: HandHeart },
                        { title: "Stories of Change", href: "/stories-change", description: "Real impact stories from our work", icon: Heart },
                        { title: "Sustainability", href: "/sustainability", description: "Our commitment to sustainable practices", icon: TreePine },
                        { title: "Blog", href: "/blog", description: "Latest updates and insights", icon: Users },
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

              <NavigationMenuItem>
                <NavigationMenuLink href="/donor-portal" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Donor Portal
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105">Ways to Give</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[700px] grid-cols-2 gap-3 p-4">
                    <div className="space-y-3">
                      {[
                        { title: "Philanthropy", href: "/philanthropy", description: "Large-scale giving opportunities for major donors" },
                        { title: "Partnerships", href: "/partnerships", description: "Corporate and institutional partnerships" },
                        { title: "Give in Celebration", href: "/give-celebration", description: "Celebrate special occasions with giving" },
                        { title: "School Buddy Programme", href: "/school-buddy", description: "Support a child's education journey" },
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
                        { title: "Cause Related Management (CRM)", href: "/crm", description: "Strategic cause marketing partnerships" },
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
            <a href="/login" className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold bg-secondary-solid text-white hover:opacity-90 transition-all shadow-sm">
              Login
            </a>
            <Button size="lg" className="relative bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="h-5 w-5 group-hover:animate-pulse" />
                Donate Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu for Mahima Ministries website
                </SheetDescription>
                <div className="flex items-center justify-between mb-6 px-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/logo.png" 
                      alt="Mahima Ministries Logo" 
                      className="h-8 w-auto"
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-1 px-4">
                  <nav className="space-y-4 pb-4">
                  <div className="space-y-2">
                    <div className="py-2 font-medium">Who we are</div>
                    <div className="pl-4 space-y-2">
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
                            className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-all duration-300 hover:translate-x-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <IconComponent className="h-4 w-4" />
                            {item.title}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="py-2 font-medium">Our Work</div>
                    <div className="pl-4 space-y-2">
                      {[
                        { title: "Child Welfare & Education", href: "/child-welfare", icon: GraduationCap },
                        { title: "Old-Aged Welfare", href: "/elderly-care", icon: Users },
                        { title: "Disabled Care", href: "/disabled-care", icon: HandHeart },
                        { title: "Skilling Youth", href: "/youth-skills", icon: Wrench },
                        { title: "Social Activities", href: "/social-activities", icon: TreePine },
                        { title: "Our Programmes", href: "/programmes", icon: Heart },
                        { title: "Where We Work", href: "/programmes", icon: GraduationCap },
                        { title: "Child Safeguarding", href: "/safeguarding", icon: HandHeart },
                        { title: "Stories of Change", href: "/stories-change", icon: Heart },
                        { title: "Sustainability", href: "/sustainability", icon: TreePine },
                        { title: "Blog", href: "/blog", icon: Users },
                        { title: "Media", href: "/media", icon: HandHeart }
                      ].map((item) => {
                        const IconComponent = item.icon
                        return (
                          <a 
                            key={item.title}
                            href={item.href} 
                            className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-all duration-300 hover:translate-x-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <IconComponent className="h-4 w-4" />
                            {item.title}
                          </a>
                        )
                      })}
                      <div className="space-y-2 mt-4">
                        <div className="py-2 font-medium text-primary">Financial Transparency</div>
                        <div className="pl-4 space-y-2">
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
                                className="flex items-center gap-2 py-1 text-xs hover:text-primary transition-all duration-300 hover:translate-x-2"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <IconComponent className="h-3 w-3" />
                                {item.title}
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <a href="/donor-portal" className="block py-2 hover:text-primary transition-all duration-300 hover:translate-x-2">Donor Portal</a>
                  <div className="space-y-2">
                    <div className="py-2 font-medium">Ways to Give</div>
                    <div className="pl-4 space-y-2">
                      {[
                        { title: "Philanthropy", href: "/philanthropy" },
                        { title: "Partnerships", href: "/partnerships" },
                        { title: "Give in Celebration", href: "/give-celebration" },
                        { title: "School Buddy Programme", href: "/school-buddy" },
                        { title: "Make a Donation", href: "/donate" }
                      ].map((item) => (
                        <a 
                          key={item.title}
                          href={item.href} 
                          className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-all duration-300 hover:translate-x-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Heart className="h-4 w-4" />
                          {item.title}
                        </a>
                      ))}
                      <div className="space-y-2">
                        <div className="py-2 font-medium text-primary">Other Ways To Give</div>
                        <div className="pl-4 space-y-2">
                          {[
                            { title: "Legacy", href: "/legacy" },
                            { title: "Payroll Giving", href: "/payroll-giving" },
                            { title: "Employee Engagement", href: "/employee-engagement" },
                            { title: "Cause Related Management (CRM)", href: "/crm" },
                            { title: "Cause in Memory", href: "/memory" }
                          ].map((item) => (
                            <a 
                              key={item.title}
                              href={item.href} 
                              className="flex items-center gap-2 py-1 text-xs hover:text-primary transition-all duration-300 hover:translate-x-2"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Heart className="h-3 w-3" />
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="/contact" className="block py-2 hover:text-primary transition-all duration-300 hover:translate-x-2">Contact</a>
                  <a href="/login" className="block py-2 hover:text-primary transition-all duration-300 hover:translate-x-2">Login</a>
                  
                    <div className="pt-4">
                      <Button className="w-full relative bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Heart className="h-5 w-5 group-hover:animate-pulse" />
                          Donate Now
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </div>
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}