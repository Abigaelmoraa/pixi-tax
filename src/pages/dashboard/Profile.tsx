import { User, Mail, Phone, Building, MapPin, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Profile = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <CardHeader className="-mt-16 pb-0">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 flex items-center justify-center text-white border-4 border-card shadow-xl">
                <User className="w-12 h-12" />
              </div>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">John Doe</CardTitle>
              <CardDescription className="text-muted-foreground">Tax Administrator</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-muted-foreground">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                  <Input id="firstName" defaultValue="John" className="pl-9 border-purple-100 focus:ring-purple-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-muted-foreground">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                  <Input id="lastName" defaultValue="Doe" className="pl-9 border-purple-100 focus:ring-purple-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input id="email" type="email" defaultValue="john@company.com" className="pl-9 border-blue-100 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  <Input id="phone" defaultValue="+254 712 345 678" className="pl-9 border-green-100 focus:ring-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-muted-foreground">Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                  <Input id="company" defaultValue="Pixi Tax Management" className="pl-9 border-orange-100 focus:ring-orange-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-muted-foreground">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
                  <Input id="location" defaultValue="Nairobi, Kenya" className="pl-9 border-pink-100 focus:ring-pink-500" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
