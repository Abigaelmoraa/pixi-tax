import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  const features = [
    { icon: Calculator, title: "Smart Tax Calculations", description: "Automated tax computations with real-time updates and accuracy guarantees." },
    { icon: Shield, title: "Secure & Compliant", description: "Bank-level encryption and full compliance with tax regulations." },
    { icon: Clock, title: "Save Time", description: "Reduce tax preparation time by 80% with intelligent automation." },
    { icon: Users, title: "Client Management", description: "Manage all your clients in one centralized, organized platform." },
    { icon: FileText, title: "Document Hub", description: "Store, organize, and access all tax documents securely." },
    { icon: TrendingUp, title: "Real-time Analytics", description: "Track performance and gain insights with powerful dashboards." }
  ];

  return (
    <div
      className="min-h-screen relative bg-background"
      style={{
        backgroundImage: `url('/landing-page.jpg')`, // Your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to darken the image for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Page Content */}
      <div className="relative z-10 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-primary/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Pixi</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6 text-center">
          <div className="container mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Tax Management
              <br />
              <span className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Streamline your tax workflow with intelligent automation, real-time calculations, and seamless client management.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white h-12 px-6 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-3 text-white">Powerful Features</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Everything you need to manage taxes efficiently and grow your practice.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Tax Practice?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of tax professionals who trust Pixi to manage their workflow efficiently.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 h-12 px-8 flex items-center justify-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-primary/20">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Pixi</span>
            </div>
            <p className="text-white/80">© 2025 Pixi. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
