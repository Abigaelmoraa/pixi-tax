import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser(); // cookie-based auth
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!user) return <Navigate to="/login" replace />;

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
