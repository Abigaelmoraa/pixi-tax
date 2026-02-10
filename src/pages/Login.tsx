import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, Lock, Eye, EyeOff, Shield, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { getCurrentUser, loginUser } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const login_response = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const success =
        String(login_response?.response_code) === "0" ||
        login_response?.response_code === 0 ||
        login_response?.status === "success";

      if (!success) {
        throw new Error(login_response?.message || "Login failed");
      }

      console.log("login_response:", login_response);
      toast.success("Welcome back! Redirecting to dashboard...");

      await getCurrentUser().catch(() => undefined);

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : err && typeof (err as any).message === "string"
          ? (err as any).message
          : "Invalid email or password";
      console.error("login error:", err);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Mobile Header - Shows on small screens */}
      <div className="lg:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Pixi</span>
          </div>

          {/* Mobile Tagline */}
          <h1 className="text-xl font-bold text-white mb-2">
            Tax & Payment Management
          </h1>
          <p className="text-sm text-white/90">
            Streamline your operations with automated compliance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">Pixi</span>
            </div>

            {/* Main Message */}
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Manage Your Tax & Payments Seamlessly
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Streamline your betting operations with automated tax compliance, payment processing, and comprehensive reporting.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Secure & Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Real-time Analytics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Multi-user Access</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Welcome Message */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-sm sm:text-base text-gray-600">Sign in to access your dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <Label className="text-gray-700 font-medium text-sm">Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 sm:pl-11 h-11 sm:h-12 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium text-sm">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 sm:pl-11 pr-10 sm:pr-11 h-11 sm:h-12 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-indigo-500/30 transition-all text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-5 sm:mt-6 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Create account
              </Link>
            </p>

            {/* Mobile Features - Shows on small screens */}
            <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Secure</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Analytics</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Multi-user</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                By signing in, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;