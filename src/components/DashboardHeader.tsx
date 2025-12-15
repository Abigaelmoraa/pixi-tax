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
    <header className="h-20 border-b border-border bg-gradient-to-r from-card via-card to-blue-50/50 px-8 flex items-center justify-between shadow-md">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-muted-foreground leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-11 w-72 h-11 bg-muted/50 border-0 text-base focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 hover:bg-purple-100"
            >
              <Bell className="w-6 h-6 text-purple-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-72 bg-card border shadow-xl"
          >
            <DropdownMenuLabel className="text-purple-600 text-base">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-3 h-11 px-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden md:inline text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                User
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-card border shadow-xl"
          >
            <DropdownMenuLabel className="text-purple-600 text-base">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 text-base"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-5 h-5 text-blue-500" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-purple-50 text-base"
              onClick={() => navigate("/dashboard/change-password")}
            >
              <KeyRound className="w-5 h-5 text-purple-500" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 text-base"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
