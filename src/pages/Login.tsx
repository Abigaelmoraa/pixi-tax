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

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!");
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-4">
          <img
            src="/login-image.png"
            alt="Pixi Tax Management"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {/* Back Button */}
          <Link to="/" className="inline-block mb-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow hover:opacity-90">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pixi
            </span>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <div>
                <Label>Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    className="pl-9 h-10"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-1">
                  <Label>Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-purple-600 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-9 pr-9 h-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm mt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary font-medium">
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
