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
    <header
      className="
        h-20 px-8 flex items-center justify-between
        bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-500
        text-white shadow-xl
      "
    >
      {/* Left */}
      <div className="flex items-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/20"
        >
          <Menu className="w-6 h-6" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-white/80 leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <Input
            placeholder="Search"
            className="
              pl-11 w-72 h-11
              bg-white/15 border border-white/20
              text-white placeholder:text-white/70
              focus:ring-2 focus:ring-white/40
            "
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 text-white hover:bg-white/20"
            >
              <Bell className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-72 shadow-xl"
          >
            <DropdownMenuLabel className="text-purple-600">
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
              className="gap-3 h-11 px-3 text-white hover:bg-white/20"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden md:inline text-base font-medium">
                User
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 shadow-xl"
          >
            <DropdownMenuLabel className="text-purple-600">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-5 h-5 text-blue-500" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-purple-50"
              onClick={() => navigate("/dashboard/change-password")}
            >
              <KeyRound className="w-5 h-5 text-purple-500" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer text-red-500 hover:bg-red-50"
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
