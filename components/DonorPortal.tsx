import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, FileDown, History, Settings, Mail, Shield, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function DonorPortal() {
  const features = [
    { icon: FileDown, title: "View / Save Donation Receipts", desc: "Download receipts for each donation for your records and tax purposes." },
    { icon: History, title: "View Donation History", desc: "See a timeline of your past donations with amounts, dates, and modes of payment." },
    { icon: FileDown, title: "Annual Donation Statement", desc: "Get a consolidated yearly statement for accounting and tax filing." },
    { icon: Settings, title: "Manage Recurring Donations", desc: "Update frequency, amount, or pause/resume your recurring contributions." },
    { icon: Shield, title: "Update Contact & Preferences", desc: "Keep your address, phone, and email up to date; choose what updates you receive." },
    { icon: HelpCircle, title: "Raise a Support Ticket", desc: "Create and track queries related to your donations or receipts." },
  ];

  return (
    <section id="donor-portal" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Donor portal</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Subheading with left stripe */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-medium">Everything you need, in one place</h2>
        </div>

        <p className="text-muted-foreground max-w-3xl">
          Details of your donations and downloadable receipts are just a click away. Log in with your registered email/phone
          to access your dashboard. Child-related profile or progress items are not included here; this portal focuses on
          donor-specific actions only.
        </p>

        {/* Feature cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="glass-card rounded-xl border shadow-sm">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary-solid/15 text-secondary-color flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-foreground/80">{f.desc}</CardContent>
              </Card>
            );
          })}
        </div>

        {/* Login block */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <Card className="glass-card rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Quick access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/80">
              <p>Use your registered email or phone to log in and download your receipts and statements.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-secondary-solid hover:opacity-90">
                  <a href="#" aria-disabled>
                    Login to Donor Portal
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-secondary/30 text-secondary-color hover:bg-secondary-solid hover:text-white">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Note: If your portal access is not yet provisioned, please request access using the support option.</p>
            </CardContent>
          </Card>

          {/* Unable to login */}
          <Card className="glass-card rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Unable to login?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/80">
              <p>
                Send us an email with your registered phone number and recent donation details so we can verify and assist.
              </p>
              <a className="inline-flex items-center gap-2 text-secondary-color hover:underline" href="mailto:mahimaministriesindia@gmail.com?subject=Donor%20Portal%20Login%20Help">
                mahimaministriesindia@gmail.com
              </a>
              <div>
                <Button asChild className="bg-primary hover:opacity-90">
                  <Link to="/contact">Open Contact Page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
