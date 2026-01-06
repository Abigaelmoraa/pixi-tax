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
    <div className="min-h-screen relative font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gray-900">Pixi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="bg-purple-600 text-white hover:bg-purple-700l"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Full-Screen Hero Section */}
      <section className="relative h-screen w-full">
        <img
          src="/landing-page.jpg" 
          alt="Tax management illustration"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 md:px-0">
          <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            Tax Management
            <br />
            <span className="text-purple-400">Made Simple</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg drop-shadow-md">
            Streamline your tax workflow with intelligent automation, real-time calculations, and seamless client management.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-purple-600 text-white h-12 px-6 flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3 text-gray-900">Powerful Features</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Everything you need to manage taxes efficiently and grow your practice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="bg-purple-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Tax Practice?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of tax professionals who trust Pixi to manage their workflow efficiently.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 h-12 px-8 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
{/* Footer */}
<footer className="py-4 px-6 mt-16 bg-gray-100 border-t border-gray-300 shadow-inner">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-700">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
        <Calculator className="w-6 h-6 text-white" />
      </div>
      <span className="font-display text-xl font-bold text-gray-900">Pixi</span>
    </div>
    <p className="text-gray-500 text-sm">© 2025 Pixi. All rights reserved.</p>
  </div>
</footer>


    </div>
  );
};

export default Landing;
