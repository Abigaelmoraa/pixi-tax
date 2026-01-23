import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  // undefined = not checked yet, null = unauthenticated, any other value = authenticated
  const [user, setUser] = useState<any | null | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("getCurrentUser() success payload:", data);
        // Any successful response (even empty object/string) is considered authenticated
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

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  // Only redirect when we've explicitly marked the user as unauthenticated (null)
  if (user === null) return <Navigate to="/login" replace />;

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
