import { Bell, Search, Menu, User, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-gradient-to-r from-card via-card to-blue-50/50 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-64 h-9 bg-muted/50 border-0 focus:ring-2 focus:ring-purple-500/20" 
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-100">
              <Bell className="w-5 h-5 text-purple-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border shadow-xl">
            <DropdownMenuLabel className="text-purple-600">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 hover:bg-purple-50">
              <span className="font-medium text-blue-600">New PRN Request</span>
              <span className="text-sm text-muted-foreground">PRN #12345 submitted for processing</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 hover:bg-green-50">
              <span className="font-medium text-green-600">Payment Completed</span>
              <span className="text-sm text-muted-foreground">Tax payment of KES 50,000 processed</span>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 hover:bg-orange-50">
              <span className="font-medium text-orange-600">STK Push Sent</span>
              <span className="text-sm text-muted-foreground">Payment prompt sent to 0712345678</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-purple-600 hover:text-purple-700 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-cyan-500/20">
                JD
              </div>
              <span className="hidden md:inline font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border shadow-xl">
            <DropdownMenuLabel className="text-purple-600">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-4 h-4 text-blue-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer hover:bg-purple-50"
              onClick={() => navigate("/dashboard/change-password")}
            >
              <KeyRound className="w-4 h-4 text-purple-500" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
