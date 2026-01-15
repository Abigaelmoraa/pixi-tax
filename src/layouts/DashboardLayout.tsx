import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/services/api";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // store actual user data

  useEffect(() => {
    // fetch current user, disable cache to avoid 304
    getCurrentUser()
      .then((data) => setUser(data)) // user is authenticated
      .catch(() => setUser(null))    // user not authenticated
      .finally(() => setLoading(false));
  }, []);

  // show a loading spinner/page while fetching user
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
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
