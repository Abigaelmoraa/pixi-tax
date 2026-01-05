import { KeyRound, Lock, Eye, EyeOff, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-muted-foreground">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                <Input 
                  id="currentPassword" 
                  type={showCurrent ? "text" : "password"} 
                  placeholder="Enter current password"
                  className="pl-9 pr-10 border-purple-100 focus:ring-purple-500" 
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-purple-100"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff className="w-4 h-4 text-purple-500" /> : <Eye className="w-4 h-4 text-purple-500" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-muted-foreground">New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
                <Input 
                  id="newPassword" 
                  type={showNew ? "text" : "password"} 
                  placeholder="Enter new password"
                  className="pl-9 pr-10 border-pink-100 focus:ring-pink-500" 
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-pink-100"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff className="w-4 h-4 text-pink-500" /> : <Eye className="w-4 h-4 text-pink-500" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters with uppercase, lowercase, and numbers</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-muted-foreground">Confirm New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <Input 
                  id="confirmPassword" 
                  type={showConfirm ? "text" : "password"} 
                  placeholder="Confirm new password"
                  className="pl-9 pr-10 border-blue-100 focus:ring-blue-500" 
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-blue-100"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4 text-blue-500" /> : <Eye className="w-4 h-4 text-blue-500" />}
                </Button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/20">
                <Save className="w-4 h-4 mr-2" /> Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
