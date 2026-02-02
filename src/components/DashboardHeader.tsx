import { Bell, Search, Menu, User, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, logoutUser } from "@/services/api";

interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role_id?: number;
  name?: string;
  username?: string;
}

const DashboardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email?: string }>({ name: "User" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getCurrentUser();
        
        if (u && typeof u === 'object' && !Array.isArray(u)) {
          // Extract first_name and last_name from API response
          const firstName = u.first_name || u.name || "";
          const lastName = u.last_name || "";
          const fullName = `${firstName} ${lastName}`.trim() || u.email || u.username || "User";
          
          setUser({
            name: fullName,
            email: u.email
          });
        } else {
          setUser({ name: "User" });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ name: "User" });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/login"); 
    }
  };

  return (
    <header className="h-20 px-10 flex items-center justify-between bg-white shadow">
      {/* Left */}
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 w-64 h-10 bg-gray-100"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="z-50 w-72 bg-white border border-gray-200 shadow-xl rounded-xl"
          >
            <DropdownMenuLabel className="text-sm font-semibold text-gray-800">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-800">
                  {user.name}
                </div>
                {user.email && (
                  <div className="text-xs text-gray-500">
                    {user.email}
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="z-50 w-56 bg-white border border-gray-200 shadow-xl rounded-xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                {user.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-4 h-4 mr-2 text-gray-600" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/dashboard/change-password")}
            >
              <KeyRound className="w-4 h-4 mr-2 text-gray-600" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;