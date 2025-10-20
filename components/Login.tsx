import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginWithPassword, Role } from './auth';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ShieldCheck, User2, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState<Role>('donor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[\w.!#$%&'*+/=?^`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
  const sanitize = (s: string) => s.trim().replace(/[\u0000-\u001F\u007F]/g, '');

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitize(email);
    const cleanPassword = password.trim();
    if (!cleanEmail || !cleanPassword) {
      toast.error('Please enter email and password.');
      return;
    }
    if (!emailRegex.test(cleanEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    // basic password strength: min 8 chars, includes number and letter
    if (cleanPassword.length < 8 || !/[A-Za-z]/.test(cleanPassword) || !/\d/.test(cleanPassword)) {
      toast.error('Password must be at least 8 characters and include letters and numbers.');
      return;
    }
    setSubmitting(true);
    const res = await loginWithPassword({ role, email: cleanEmail, password: cleanPassword });
    setSubmitting(false);
    if (!res.ok) {
      toast.error(res.error ?? 'Login failed');
      return;
    }
    toast.success(role === 'admin' ? 'Welcome, Admin.' : 'Welcome back, Donor.');
    nav(role === 'admin' ? '/admin' : '/donor-portal', { replace: true });
  };

  return (
    <section id="login" className="relative bg-accent">
      {/* Teal banner */}
      <div className="bg-secondary-solid text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Login</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-lg mx-auto glass-card rounded-2xl p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold text-foreground">Choose Role & Sign in</h2>
          </div>

          {/* Role toggle */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('donor')}
              className={`rounded-full px-4 py-2 border transition flex items-center justify-center gap-2 shadow-sm ${
                role === 'donor'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white/70 text-foreground border-white/50 hover:bg-white'
              }`}
            >
              <User2 className="h-4 w-4" /> Donor
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`rounded-full px-4 py-2 border transition flex items-center justify-center gap-2 shadow-sm ${
                role === 'admin'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white/70 text-foreground border-white/50 hover:bg-white'
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Admin
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/70 border-white/40 text-foreground placeholder:text-foreground/60 focus-visible:ring-white/40 pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center text-foreground/60 hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary hover:opacity-90 shadow-md hover:shadow-lg">
                Login to {role === 'admin' ? 'Admin' : 'Donor'} Portal
              </Button>
            </div>
          </form>

          <p className="mt-4 text-xs text-foreground/60">
            Your credentials are sent securely to our server for verification. Sessions are managed via secure httpOnly cookies. Do not share your password.
          </p>
        </div>
      </div>
    </section>
  );
}
