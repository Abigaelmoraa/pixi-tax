import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import api from "@/services/api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/selfPassChange", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      setSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />

        <CardHeader>
          {/* Back Arrow */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 transition mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                {success}
              </div>
            )}

            {/* Current Password */}
            <div className="space-y-2">
              <Label>Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-9 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
