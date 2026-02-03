import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("getCurrentUser() success payload:", data);
        setUser(data ?? true);
      } catch (err) {
        console.error("Auth check failed (/user):", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (user === null) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ REMOVED: DashboardHeader - no longer shown on any page */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;