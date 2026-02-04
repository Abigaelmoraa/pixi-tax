import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved
      ? JSON.parse(saved)
      : { email: false, push: false, deadlines: false, marketing: false };
  });

  // Profile state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : { firstName: "", lastName: "", email: "", phone: "", company: "" };
  });

  // Appearance state
  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem("appearance");
    return saved
      ? JSON.parse(saved)
      : { theme: "system", language: "en" };
  });

  // Function to show success toast
  const handleSaveToast = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <>
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account preferences"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-white rounded-lg transition-all"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-purple-700">Profile Information</CardTitle>
                <CardDescription className="text-purple-600">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { id: "firstName", label: "First Name" },
                    { id: "lastName", label: "Last Name" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "phone", label: "Phone" },
                    { id: "company", label: "Company", full: true },
                  ].map((field) => (
                    <div
                      key={field.id}
                      className={`space-y-2 ${field.full ? "md:col-span-2" : ""}`}
                    >
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        type={field.type || "text"}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={profile[field.id as keyof typeof profile]}
                        onChange={(e) => {
                          const updated = { ...profile, [field.id]: e.target.value };
                          setProfile(updated);
                          localStorage.setItem("profile", JSON.stringify(updated));
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveToast}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-yellow-700">Notification Preferences</CardTitle>
                <CardDescription className="text-yellow-600">Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["email", "push", "deadlines", "marketing"].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="capitalize font-medium">{type.replace(/([A-Z])/g, ' $1')}</div>
                    <Switch
                      checked={notifications[type as keyof typeof notifications]}
                      onCheckedChange={(checked) => {
                        const updated = { ...notifications, [type]: checked };
                        setNotifications(updated);
                        localStorage.setItem("notifications", JSON.stringify(updated));
                      }}
                    />
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveToast}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 hover:from-yellow-500 hover:to-orange-500"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-red-700">Security Settings</CardTitle>
                <CardDescription className="text-red-600">Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { id: "currentPassword", label: "Current Password" },
                  { id: "newPassword", label: "New Password" },
                  { id: "confirmPassword", label: "Confirm New Password" },
                ].map((field) => (
                  <div key={field.id} className="space-y-4">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input id={field.id} type="password" placeholder={`Enter ${field.label.toLowerCase()}`} />
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveToast}
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white border-0 hover:from-red-500 hover:to-pink-600"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="text-emerald-700">Appearance Settings</CardTitle>
                <CardDescription className="text-emerald-600">Customize your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <Select
                    value={appearance.theme}
                    onValueChange={(value) => {
                      const updated = { ...appearance, theme: value };
                      setAppearance(updated);
                      localStorage.setItem("appearance", JSON.stringify(updated));
                    }}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Language</Label>
                  <Select
                    value={appearance.language}
                    onValueChange={(value) => {
                      const updated = { ...appearance, language: value };
                      setAppearance(updated);
                      localStorage.setItem("appearance", JSON.stringify(updated));
                    }}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveToast}
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-0 hover:from-emerald-500 hover:to-teal-600"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
