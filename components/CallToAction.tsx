import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Users, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const actions = [
  {
    icon: DollarSign,
    title: 'Donate',
    description: 'Make a direct impact with your contribution',
    amount: 'From $25/month',
    action: 'Start Donating'
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Join our team of dedicated volunteers',
    amount: '2 hours/week',
    action: 'Sign Up'
  },
  {
    icon: Heart,
    title: 'Sponsor',
    description: 'Sponsor a child\'s education and future',
    amount: '$50/month',
    action: 'Sponsor Now'
  }
];

export function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Your support changes lives
                <span className="text-primary"> forever</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Every donation, every volunteer hour, and every sponsorship creates ripple effects that transform entire communities. See the difference you can make today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {actions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <p className="text-sm font-medium text-primary mt-2">{action.amount}</p>
                      </div>
                      <Button size="sm" className="w-full">
                        {action.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1668961915523-884872e392f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwd2VsbCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTgwNzg4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Clean water well in community"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Impact stats */}
            <div className="absolute -top-6 -right-6 bg-background rounded-xl p-6 shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$25</div>
                <div className="text-sm text-muted-foreground">Provides clean water for 1 person for 1 year</div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 bg-background rounded-xl p-6 shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$100</div>
                <div className="text-sm text-muted-foreground">Educates 1 child for 3 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}