import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        className:
          "text-xl font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200",
      });

      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex flex-[1.5] relative items-center justify-center min-h-screen bg-gray-50">
        <img
          src="/login-image1.png"
          alt="Pixi Tax Management"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-[1] flex flex-col justify-center px-8 md:px-16 lg:px-24 min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
          </Link>

          <div className="flex items-center gap-3 mb-8">
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

          <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
            <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
              Welcome back!
            </h1>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="pl-10 h-12 border-2 border-transparent bg-gradient-to-r from-indigo-100 via-purple-80 to-pink-50 focus:bg-white focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 font-medium"
                  >
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-2 border-transparent bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 focus:bg-white focus:border-purple-500/70 focus:ring-2 focus:ring-purple-400/30 transition-all"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  text-white font-bold shadow-lg hover:opacity-90 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
