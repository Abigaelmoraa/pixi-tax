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
            <span className="font-display text-xl font-bold">Pixi</span>
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
      <section className="pt-28 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 10,000+ tax professionals
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Tax Management
            <br />
            <span className="text-gradient">Made Simple</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Streamline your tax workflow with intelligent automation, real-time calculations, and seamless client management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 h-12 px-6 text-base">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">Powerful Features</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage taxes efficiently and grow your practice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-soft hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="gradient-dark rounded-3xl p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 gradient-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 gradient-accent rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Tax Practice?
              </h2>
              <p className="text-base opacity-80 max-w-2xl mx-auto mb-8">
                Join thousands of tax professionals who trust Pixi to manage their workflow efficiently.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 h-12 px-8 text-base">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
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
              <span className="font-display text-xl font-bold">Pixi</span>
            </div>
            <div className="flex items-center gap-8 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <p className="text-muted-foreground">
              © 2024 Pixi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
