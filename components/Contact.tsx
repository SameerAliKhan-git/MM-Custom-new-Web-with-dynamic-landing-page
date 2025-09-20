import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { toast } from "sonner"

const org = {
  email: "mahimaministriesindia@gmail.com ; rdmaharaju@gmail.com",
  phone1: "+91 9246502264",
  phone2: "+91 9246272675",
  phone3: "040-23032675",
  address:
    "HEAD OFFICE: H.No: 2-38/8/2/9/4/1 Mahima Ministries, NTR Nagar colony, Ameenpur(Mandal), Sangareddy(District), Telangana. Postal Code : 502032",
}

export function Contact() {
  // simple scroll-in animation hook
  const useReveal = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setVisible(true)
          })
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, [])
    return { ref, visible }
  }

  const locReveal = useReveal()
  const emailReveal = useReveal()
  const phoneReveal = useReveal()
  const formReveal = useReveal()

  const [donate, setDonate] = useState<string | undefined>(undefined)

  return (
    <section id="contact" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Contact us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Subheading with left stripe */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-medium">Leave your details below</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Info panel */}
          <div className="space-y-4">
            {/* Location card (glass) */}
            <div className="group" ref={locReveal.ref}>
              <div className={`glass-card rounded-xl border shadow-sm p-4 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${locReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-9 w-9 rounded-full bg-secondary-solid/20 text-secondary-color flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Location</div>
                    <div className="text-sm leading-relaxed text-foreground/80">{org.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email card (glass) */}
            <div className="group" ref={emailReveal.ref}>
              <div className={`glass-card rounded-xl border shadow-sm p-4 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${emailReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-9 w-9 rounded-full bg-secondary-solid/20 text-secondary-color flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-sm leading-relaxed text-foreground/80">{org.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone card (glass) */}
            <div className="group" ref={phoneReveal.ref}>
              <div className={`glass-card rounded-xl border shadow-sm p-4 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5 ${phoneReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-9 w-9 rounded-full bg-secondary-solid/20 text-secondary-color flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-sm text-foreground/80">{org.phone1}</div>
                    <div className="text-sm text-foreground/80">{org.phone2}</div>
                    <div className="text-sm text-foreground/80">{org.phone3}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="group rounded-xl shadow-sm p-5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-transparent" ref={formReveal.ref}>
            <div className={`glass-card rounded-lg p-4 text-foreground transition-all duration-500 ${formReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone No.</Label>
                <Input id="phone" placeholder="Your phone number" className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Do you wish to donate?</Label>
                <RadioGroup value={donate} onValueChange={setDonate} className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="donate-yes" value="Yes" />
                    <Label htmlFor="donate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="donate-no" value="No" />
                    <Label htmlFor="donate-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="donate-maybe" value="Maybe" />
                    <Label htmlFor="donate-maybe">Maybe</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Your message" className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              </div>
            </div>
            <div className="pt-4">
              <Button
                className="bg-secondary-solid hover:opacity-90"
                onClick={() => {
                  toast.success("Thanks! We received your message.")
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>

        {/* Map embed: Head Office */}
        <div className="mt-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h3 className="text-lg sm:text-xl font-medium">Head Office</h3>
          </div>
          <div className="group glass-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
            <div className="w-full h-[450px]">
              <iframe
                title="Head Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.043828887272!2d78.31539882500472!3d17.52363516068404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb929a78e90b15%3A0x99908c88209689d4!2sMahima%20Ministries!5e0!3m2!1sen!2sin!4v1758301017824!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Map embed: Branches */}
        <div className="mt-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h3 className="text-lg sm:text-xl font-medium">Branches</h3>
          </div>
          <div className="group glass-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
            <div className="w-full h-[450px]">
              <iframe
                title="Mahima Ministries Branches"
                src="https://www.google.com/maps/d/u/0/embed?mid=1Lo6VCadzKNTqci16XyQe6sF5Q_C6fGI&ehbc=2E312F"
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

