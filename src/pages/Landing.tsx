import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  TrendingUp,
  ChevronRight,
  Check,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Calculator,
      title: "Smart Tax Calculations",
      description: "Automated tax computations with real-time updates and accuracy guarantees."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-level encryption and full compliance with tax regulations."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce tax preparation time by 80% with intelligent automation."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Manage all your clients in one centralized, organized platform."
    },
    {
      icon: FileText,
      title: "Document Hub",
      description: "Store, organize, and access all tax documents securely."
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track performance and gain insights with powerful dashboards."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Up to 50 clients", "Basic tax calculations", "Email support", "Document storage (5GB)"],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: ["Up to 200 clients", "Advanced calculations", "Priority support", "Unlimited storage", "Team collaboration"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: ["Unlimited clients", "Custom integrations", "Dedicated support", "Advanced analytics", "API access"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">Pixi Tax</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="gradient-primary text-primary-foreground hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 10,000+ tax professionals
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Tax Management
            <br />
            <span className="text-gradient">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Streamline your tax workflow with intelligent automation, real-time calculations, and seamless client management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 h-14 px-8 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
              Watch Demo
            </Button>
          </div>
          
          {/* Dashboard Preview */}
          <div className="mt-20 relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
            <div className="relative bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
              <div className="h-8 bg-muted flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
                <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                <div className="w-3 h-3 rounded-full bg-success/50"></div>
              </div>
              <div className="p-8 bg-gradient-to-br from-muted/50 to-background">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 bg-sidebar rounded-xl p-4 h-48"></div>
                  <div className="col-span-3 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-card border border-border rounded-xl p-4 h-24"></div>
                      <div className="bg-card border border-border rounded-xl p-4 h-24"></div>
                      <div className="bg-card border border-border rounded-xl p-4 h-24"></div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 h-48"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage taxes efficiently and grow your practice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-soft hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your practice. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative bg-card border rounded-2xl p-8 animate-fade-in ${
                  plan.popular ? "border-primary shadow-glow" : "border-border"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? "gradient-primary text-primary-foreground hover:opacity-90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="gradient-dark rounded-3xl p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 gradient-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 gradient-accent rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Tax Practice?
              </h2>
              <p className="text-xl opacity-80 max-w-2xl mx-auto mb-10">
                Join thousands of tax professionals who trust Pixi Tax to manage their workflow efficiently.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 h-14 px-10 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Pixi Tax</span>
            </div>
            <div className="flex items-center gap-8 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <p className="text-muted-foreground">
              © 2024 Pixi Tax. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
