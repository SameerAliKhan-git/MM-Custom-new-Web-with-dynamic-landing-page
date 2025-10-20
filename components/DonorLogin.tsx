import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function DonorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      toast.error('Please enter your email or phone number');
      return;
    }
    localStorage.setItem('donorLoggedIn', 'true');
    if (email) localStorage.setItem('donorEmail', email);
    if (phone) localStorage.setItem('donorPhone', phone);
    toast.success('You\'re logged in to the Donor Portal');
    navigate('/donor-portal');
  };

  return (
    <section id="donor-login" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Donor login</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Subheading with left stripe */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-medium">Access your receipts and statements</h2>
        </div>

        <div className="max-w-lg">
          <div className="glass-card rounded-xl border shadow-sm p-5">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" className="bg-secondary-solid hover:opacity-90">Login</Button>
                <Button asChild variant="outline" className="border-secondary/30 text-secondary-color hover:bg-secondary-solid hover:text-white">
                  <Link to="/donor-portal">Back to portal</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: You can use either your registered email or phone number.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
