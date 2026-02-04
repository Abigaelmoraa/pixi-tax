import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, Sparkles } from "lucide-react";
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
      toast.success("Welcome back! 🎉", {
        description: "Redirecting to your dashboard...",
      });

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
      toast.error("Login Failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95">
            
            {/* Left Side - Branding & Illustration */}
            <div className="relative lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[300px] lg:min-h-[600px]">
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-white">Pixi Tax</span>
                </div>

                {/* Welcome Message */}
                <div className="space-y-4 mb-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Welcome<br />Back
                  </h1>
                  <p className="text-lg text-indigo-100 max-w-md">
                    Manage your tax obligations efficiently with our comprehensive platform.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 text-indigo-100">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Real-time tax calculations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Automated compliance reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="relative z-10 mt-8">
                <p className="text-sm text-indigo-200">
                  Trusted by businesses across Kenya
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
              
              {/* Back Button */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 mb-6 transition-colors group w-fit"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to home</span>
              </Link>

              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all rounded-xl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-12 pr-12 h-12 text-base border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all rounded-xl"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to Pixi Tax?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-500">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these custom animations to your global CSS or tailwind.config.js */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;