import { Bell, Search, Menu, User, KeyRound, LogOut, Sun, Moon } from "lucide-react";
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
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleLogout = () => navigate("/login");
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <header
      className="
        h-28 px-12 flex items-center justify-between
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        shadow
      "
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-10 h-10" />
        </Button>

        <div>
          <h1 className="text-3xl font-semibold">
            {title.includes("Dashboard") ? (
              <>
                <span className="text-blue-600 dark:text-blue-400">Dashboard</span>
                {title.replace("Dashboard", "")}
              </>
            ) : title}
          </h1>
          {subtitle && (
            <p className="text-base text-gray-600 dark:text-gray-400 leading-tight">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 md:gap-8">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400 dark:text-gray-300" />
          <Input
            placeholder="Search"
            className="
              pl-16 w-80 h-14
              bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300
              focus:ring-2 focus:ring-indigo-300
            "
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-30 w-30 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? <Sun className="w-50 h-50" /> : <Moon className="w-50 h-50" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-16 w-16 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell className="w-50 h-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 shadow">
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-700 text-lg">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-4 py-6 text-center text-base text-gray-500 dark:text-gray-400">
              No notifications yet
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-3 h-16 px-5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-200 via-purple-500 to-blue-200 flex items-center justify-center shadow">
                <User className="w-10 h-10 text-white" />
              </div>
              <span className="hidden md:inline text-lg font-medium text-gray-900 dark:text-gray-100">
                User
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60 shadow">
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-200 text-lg">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-base"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-base"
              onClick={() => navigate("/dashboard/change-password")}
            >
              <KeyRound className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-800 text-base"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
