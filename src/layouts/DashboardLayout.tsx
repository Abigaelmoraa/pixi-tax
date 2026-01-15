// src/layouts/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import api, { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // store actual user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If token exists in localStorage, attach it
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        // fetch current user, disable cache to avoid 304
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setUser(null); // not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // show loading spinner/page while fetching user
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  // redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // render dashboard layout if authenticated
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
