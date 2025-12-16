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
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex flex-[1.5] relative items-center justify-center h-full bg-white">
        <img
          src="/register.png"
          alt="Pixi Tax Management"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-[1] flex flex-col justify-center items-center h-full px-6 md:px-12 bg-gradient-to-br from-accent/10 via-background to-primary/5">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>

            <span
              className="font-display text-3xl font-extrabold
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              bg-clip-text text-transparent tracking-wide"
            >
              Pixi
            </span>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2 text-gradient">
              Create your account
            </h1>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Join Pixi today and explore all features completely free!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <Label htmlFor="name" className="sr-only">Full name</Label>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Full name"
                  autoComplete="off"
                  className="pl-10 h-10 md:h-12 border-primary/30 focus:border-primary bg-background/50 text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="pl-10 h-10 md:h-12 border-primary/30 focus:border-primary bg-background/50 text-sm md:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="pl-10 pr-10 h-10 md:h-12 border-primary/30 focus:border-primary bg-background/50 text-sm md:text-base"
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

              {/* Confirm Password */}
              <div className="relative">
                <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="pl-10 pr-10 h-10 md:h-12 border-primary/30 focus:border-primary bg-background/50 text-sm md:text-base"
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

              <Button
                type="submit"
                className="w-full h-10 md:h-12 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-bold shadow-lg hover:opacity-90 transition-all text-sm md:text-base"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-4 text-sm md:text-base">
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
