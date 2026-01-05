import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./components/Overview";
import PRNRequests from "./pages/dashboard/PRNRequests";
import PaymentRequests from "./pages/dashboard/PaymentRequests";
import TaxPayoutResponse from "./pages/dashboard/TaxPayoutResponse";
import STKPushRequest from "./pages/dashboard/STKPushRequest";
import StakeData from "./pages/dashboard/StakeData";
import BetOutcomeLog from "./pages/dashboard/BetOutcomeLog";
import DailyTaxObligation from "./pages/dashboard/DailyTaxObligation";
import Settings from "./pages/dashboard/Settings";
import Profile from "./pages/dashboard/Profile";
import ChangePassword from "./pages/dashboard/ChangePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} /> {/* default dashboard page */}
            <Route path="overview" element={<Overview />} />
            <Route path="prn-requests" element={<PRNRequests />} />
            <Route path="payment-requests" element={<PaymentRequests />} />
            <Route path="tax-payout" element={<TaxPayoutResponse />} />
            <Route path="stk-push" element={<STKPushRequest />} />
            <Route path="stake-data" element={<StakeData />} />
            <Route path="bet-outcome" element={<BetOutcomeLog />} />
            <Route path="daily-tax" element={<DailyTaxObligation />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
