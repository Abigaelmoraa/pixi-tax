// src/layouts/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // store user info

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Simply fetch current user; cookie handles auth
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setUser(null); // user not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // show loading spinner while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  // redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // render dashboard if authenticated
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
