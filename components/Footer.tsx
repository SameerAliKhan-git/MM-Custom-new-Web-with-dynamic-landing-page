import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

const footerLinks = {
  'About': [
    { name: 'Our Story', href: '/about' },
    { name: 'Leadership Team', href: '/team' },
    { name: 'Annual Reports', href: '/reports' },
    { name: 'Financials', href: '/financials' },
    { name: 'Careers', href: '/careers' }
  ],
  'Our Work': [
    { name: 'Child Welfare & Education', href: '/child-welfare' },
    { name: 'Old-Aged Welfare', href: '/elderly-care' },
    { name: 'Disabled Care', href: '/disabled-care' },
    { name: 'Skilling Youth', href: '/youth-skills' },
    { name: 'Social Activities', href: '/social-activities' }
  ],
  'Get Involved': [
    { name: 'Donate Now', href: '/donate' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Corporate Partnership', href: '/partnerships' },
    { name: 'Fundraise', href: '/fundraise' },
    { name: 'Sponsor a Child', href: '/sponsor' }
  ],
  'Resources': [
    { name: 'Stories of Impact', href: '/stories' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Events', href: '/events' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Donor portal', href: '/donor-portal' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Sitemap', href: '/sitemap' }
  ]
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

const contactInfo = [
  { icon: Mail, text: 'mahimaministriesindia@gmail.com' },
  { icon: Phone, text: '+91 9246502264'  },
  { icon: MessageCircle, text: '+91 9246272675' },
  { icon : Phone, text: '040-23032675' },
  { icon: MapPin, text: 'H.No: 2-38/8/2/9/4/1 Mahima Ministries, NTR Nagar colony, Ameenpur(Mandal), Sangareddy(District), Telangana. Postal Code : 502032' }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Teal top bar for brand balance */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-solid z-20" />
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
              <Link to="/" aria-label="Go to Home">
                <img 
                  src="/logo.png" 
                  alt="Mahima Ministries Logo" 
                  className="h-16 w-auto hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            
            <p className="text-white/80 max-w-md">
              For 20 years, Mahima Ministries has been creating lasting positive change through child welfare & education, old-aged welfare, disabled care, skilling youth, and social activities across India.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                    <IconComponent className={`${contact.icon === MapPin ? 'h-8 w-8' : 'h-4 w-4'} opacity-80`} />
                    <span>{contact.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white/80 hover:text-secondary-color transition-colors p-2 hover:bg-white/10 rounded-lg"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
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
                      className="text-white/80 hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors text-sm px-1 py-0.5"
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
              <Button className="bg-secondary-solid hover:opacity-90 shrink-0 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/70">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-transparent" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-white/70">
          <div className="flex flex-col sm:flex-row gap-4">
            <p>© 2025 Mahima Ministries. All rights reserved.</p>
            <p>Registered NGO • 20 Years of Creating Lasting Change</p>
          </div>
          <div className="flex space-x-6">
            <a href="/sitemap" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Sitemap
            </a>
            <a href="/disclaimer" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Disclaimer
            </a>
            <a href="/privacy" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Terms of Service
            </a>
            <a href="/transparency" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Transparency
            </a>
            <a href="/login" className="hover:text-primary focus-visible:text-primary focus-visible:underline hover:bg-white/10 rounded transition-colors px-1 py-0.5">
              Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}