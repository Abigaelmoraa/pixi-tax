import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Camera,
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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/dashboard")}
        className="h-9 w-9 text-slate-600 hover:bg-slate-100"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <Card className="shadow-md border">
        {/* Subtle Top Bar */}
        <div className="h-16 bg-slate-100" />

        <CardHeader className="-mt-10 pb-0">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white border-4 border-white shadow">
                <User className="w-10 h-10" />
              </div>

              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            </div>

            <div>
              <CardTitle className="text-2xl text-gray-900">
                My Profile
              </CardTitle>
              <p className="text-sm text-gray-500">
                Manage your personal information
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label>First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Enter first name" className="pl-9" />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label>Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Enter last name" className="pl-9" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Enter phone number"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label>Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Company name" className="pl-9" />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="City, Country" className="pl-9" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
