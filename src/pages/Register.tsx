import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Image Only */}
      <div className="hidden lg:flex flex-1 relative h-screen bg-white">
        <img
          src="/register-image.jpg"
          alt="Pixi Tax Management"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center h-screen bg-gradient-to-br from-accent/10 via-background to-primary/5 overflow-hidden">
        <div className="w-full max-w-md px-4 md:px-0 overflow-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">Pixi</span>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
            <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
              Create your account
            </h1>
            <p className="text-muted-foreground mb-8">
              Start your 14-day free trial. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    className="pl-10 h-12 border-primary/30 focus:border-primary bg-background/50"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    className="pl-10 h-12 border-primary/30 focus:border-primary bg-background/50"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    className="pl-10 pr-10 h-12 border-primary/30 focus:border-primary bg-background/50"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="pl-10 pr-10 h-12 border-primary/30 focus:border-primary bg-background/50"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-primary text-primary-foreground hover:opacity-90 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
