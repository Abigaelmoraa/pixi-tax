import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Landing Page
import Landing from "./pages/Landing";

// Dashboard Layout & Pages
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

// Fallback
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
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
    </Router>
  );
}

export default App;
