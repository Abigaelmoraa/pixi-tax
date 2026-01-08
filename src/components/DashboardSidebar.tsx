import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Receipt,
  Smartphone,
  Database,
  ClipboardList,
  CalendarCheck,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", color: "text-blue-400" },
    { icon: FileText, label: "PRN Requests", path: "/dashboard/prn-requests", color: "text-purple-400" },
    { icon: CreditCard, label: "Payment Requests", path: "/dashboard/payment-requests", color: "text-green-400" },
    { icon: Wallet, label: "Withdrawal Request", path: "/dashboard/withdrawal-request", color: "text-red-400" },
    { icon: Receipt, label: "Tax Payout Response", path: "/dashboard/tax-payout", color: "text-orange-400" },
    { icon: Smartphone, label: "STK Push Request", path: "/dashboard/stk-push", color: "text-pink-400" },
    { icon: Database, label: "Stake Data", path: "/dashboard/stake-data", color: "text-cyan-400" },
    { icon: ClipboardList, label: "Bet Outcome Log", path: "/dashboard/bet-outcome", color: "text-yellow-400" },
    { icon: CalendarCheck, label: "Daily Tax Obligation", path: "/dashboard/daily-tax", color: "text-emerald-400" },
  ];

  const secondaryNavItems = [
    { icon: Settings, label: "Settings", path: "/dashboard/settings", color: "text-slate-400" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
  className={cn(
    "min-h-screen flex flex-col transition-all duration-300 border-r border-gray-200 shadow-xl",
    collapsed ? "w-24 bg-gray-800" : "w-80 bg-gray-900"
  )}
>
  {/* Logo */}
  <div className="h-16 flex items-center justify-between px-5 border-b border-gray-700/50 relative">
    {!collapsed ? (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-semibold text-white">
          Pixi
        </span>
      </div>
    ) : (
      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
        <Calculator className="w-6 h-6 text-white" />
      </div>
    )}

    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "hover:bg-gray-700/50",
        collapsed &&
          "absolute right-0 translate-x-1/2 bg-gray-800 border border-gray-700 rounded-full w-6 h-6"
      )}
    >
      {collapsed ? (
        <ChevronRight className="w-4 h-4 text-white" />
      ) : (
        <ChevronLeft className="w-4 h-4 text-white" />
      )}
    </Button>
  </div>

  {/* Navigation */}
  <nav className="flex-1 px-4 py-6 overflow-y-auto">
    {!collapsed && (
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 px-3 mb-4">
        Main Menu
      </p>
    )}

    <div className="space-y-2">
      {mainNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
            isActive(item.path)
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            collapsed && "justify-center px-3 gap-0"
          )}
        >
          <item.icon
            className={cn(
              "w-6 h-6",
              isActive(item.path) ? "text-white" : item.color
            )}
          />
          {!collapsed && (
            <span className="text-[16px] font-medium leading-none">
              {item.label}
            </span>
          )}
        </NavLink>
      ))}
    </div>

    {/* Settings */}
    <div className="mt-10">
      {!collapsed && (
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 px-3 mb-4">
          Settings
        </p>
      )}

      <div className="space-y-2">
        {secondaryNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
              isActive(item.path)
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              collapsed && "justify-center px-3 gap-0"
            )}
          >
            <item.icon
              className={cn(
                "w-6 h-6",
                isActive(item.path) ? "text-white" : item.color
              )}
            />
            {!collapsed && (
              <span className="text-[16px] font-medium leading-none">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
</aside>

  );
};

export default DashboardSidebar;