import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

const footerLinks = {
  "About": [
    { name: "Our Story", href: "/about" },
    { name: "Leadership Team", href: "/team" },
    { name: "Annual Reports", href: "/reports" },
    { name: "Financials", href: "/financials" },
    { name: "Careers", href: "/careers" }
  ],
  "Our Work": [
    { name: "Child Welfare & Education", href: "/child-welfare" },
    { name: "Old-Aged Welfare", href: "/elderly-care" },
    { name: "Disabled Care", href: "/disabled-care" },
    { name: "Skilling Youth", href: "/youth-skills" },
    { name: "Social Activities", href: "/social-activities" }
  ],
  "Get Involved": [
    { name: "Donate Now", href: "/donate" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Corporate Partnership", href: "/partnerships" },
    { name: "Fundraise", href: "/fundraise" },
    { name: "Sponsor a Child", href: "/sponsor" }
  ],
  "Resources": [
    { name: "Stories of Impact", href: "/stories" },
    { name: "News & Updates", href: "/news" },
    { name: "Events", href: "/events" },
    { name: "Photo Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" }
  ]
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
]

const contactInfo = [
  { icon: Mail, text: "info@mahimaministries.org" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: MapPin, text: "Mahima Complex, Service Road, New Delhi 110001" }
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/footer-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Dark gradient + subtle blur for strong text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/50 to-black/20 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and mission */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Mahima Ministries Logo" 
                className="h-16 w-auto"
              />
            </div>
            
            <p className="text-white/80 max-w-md">
              For 20 years, Mahima Ministries has been creating lasting positive change through child welfare & education, old-aged welfare, disabled care, skilling youth, and social activities across India.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                    <IconComponent className="h-4 w-4 opacity-80" />
                    <span>{contact.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white/80 hover:text-primary transition-colors p-2 hover:bg-white/10 rounded-lg"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="font-semibold text-white">Stay Updated with Our Impact</h3>
            <p className="text-sm text-white/80">
              Get monthly updates about our programs, success stories, and ways to help.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 focus-visible:ring-white/40"
              />
              <Button className="bg-primary hover:bg-primary/90 shrink-0 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/70">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-white/70">
          <div className="flex flex-col sm:flex-row gap-4">
            <p>© 2025 Mahima Ministries. All rights reserved.</p>
            <p>Registered NGO • 20 Years of Creating Lasting Change</p>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="/transparency" className="hover:text-primary transition-colors">
              Transparency
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}