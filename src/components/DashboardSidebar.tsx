import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Send,
  Wallet,
  Receipt,
  Smartphone,
  Database,
  ClipboardList,
  CalendarCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", color: "text-blue-400" },
    { icon: FileText, label: "PRN Requests", path: "/dashboard/prn-requests", color: "text-purple-400" },
    { icon: CreditCard, label: "Payment Requests", path: "/dashboard/payment-requests", color: "text-green-400" },
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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-gradient-to-b from-sidebar via-sidebar to-slate-900 text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border shadow-xl",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pixi</span>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
            <Calculator className="w-5 h-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent/50",
            collapsed && "absolute right-0 translate-x-1/2 z-10 bg-sidebar border border-sidebar-border rounded-full w-6 h-6"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className={cn("mb-4", collapsed && "text-center")}>
          {!collapsed && (
            <span className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider px-3">
              Main Menu
            </span>
          )}
        </div>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive(item.path)
                ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-purple-500/20"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0 transition-colors",
              collapsed && "w-6 h-6",
              isActive(item.path) ? "text-white" : item.color
            )} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}

        <div className={cn("pt-6 mb-4", collapsed && "text-center")}>
          {!collapsed && (
            <span className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider px-3">
              Settings
            </span>
          )}
        </div>
        {secondaryNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              isActive(item.path)
                ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              collapsed && "w-6 h-6",
              isActive(item.path) ? "text-white" : item.color
            )} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default DashboardSidebar;
