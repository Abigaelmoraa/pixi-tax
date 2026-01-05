import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";
import { registerUser } from "@/services/auth";

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
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-3xl shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
        
        {/* Left Image */}
        <div className="hidden lg:flex w-1/2 relative">
          <img
            src="/register.png"
            alt="Pixi Tax Management"
            className="w-full h-full object-cover max-h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-500/30" />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-10 py-8 md:py-10">
          {/* Back Button */}
          <Link to="/" className="inline-block mb-6">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-sm hover:shadow-md">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pixi
            </span>
          </div>

          {/* Form Container */}
          <div className="bg-white/90 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-muted-foreground mb-4 text-sm">Get started with Pixi tax management.</p>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              {/* Full Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="name"
                    type="text"
                    autoComplete="off"
                    placeholder="John Doe"
                    className="w-full pl-9 h-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="off"
                    placeholder="you@example.com"
                    className="w-full pl-9 h-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 h-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    className="w-full pl-9 pr-9 h-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-semibold shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create account"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
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
