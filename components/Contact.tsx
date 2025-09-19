import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Mail, Phone, MapPin, Heart } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "info@hopefoundation.org",
    subtitle: "Send us a message"
  },
  {
    icon: Phone,
    title: "Phone",
    description: "+1 (555) 123-HOPE",
    subtitle: "Call our helpline"
  },
  {
    icon: MapPin,
    title: "Office",
    description: "123 Charity Avenue, New York",
    subtitle: "Visit our headquarters"
  },
  {
    icon: Heart,
    title: "Volunteer",
    description: "Join our mission",
    subtitle: "Make a difference"
  }
]

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or partner with us, we'd love to hear from you. Together, we can create lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon
            return (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{info.title}</CardTitle>
                  <CardDescription>{info.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{info.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Get Involved</CardTitle>
              <CardDescription>
                Let us know how you'd like to support our mission. We'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Interest</Label>
                <Input id="subject" placeholder="Volunteer, Donate, Partnership..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how you'd like to help make a difference..."
                  rows={5}
                />
              </div>
              
              <Button className="w-full" size="lg">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}