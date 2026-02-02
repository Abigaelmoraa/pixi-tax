import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  listUsers,
  listClients,
  getDashboardTiles,
  getPaymentRequests,
  getWithdrawalRequests,
} from "@/services/api";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usersCount, setUsersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [withdrawalsCount, setWithdrawalsCount] = useState(0);
  const [tiles, setTiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Users
        const usersRes = await listUsers();
        const usersData = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.data || [];
        setUsersCount(usersData.length);

        // Clients
        const clientsRes = await listClients();
        const clientsData = Array.isArray(clientsRes.data) ? clientsRes.data : clientsRes.data?.data || [];
        setClientsCount(clientsData.length);

        // Dashboard Tiles
        const tilesRes = await getDashboardTiles();
        setTiles(tilesRes.data?.tiles ?? (Array.isArray(tilesRes.data) ? tilesRes.data : []) ?? []);

        // Payments
        const paymentsRes = await getPaymentRequests();
        const paymentsData = Array.isArray(paymentsRes.data) ? paymentsRes.data : paymentsRes.data?.data || [];
        setPaymentsCount(paymentsData.length);

        // Withdrawals
        const withdrawalsRes = await getWithdrawalRequests();
        const withdrawalsData = Array.isArray(withdrawalsRes.data) ? withdrawalsRes.data : withdrawalsRes.data?.data || [];
        setWithdrawalsCount(withdrawalsData.length);

      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div className="p-6">
      {/* Error Banner (shown but doesn't block display) */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">⚠️ {error}</p>
          <p className="text-sm text-red-500 mt-1">
            Some data may not be available. Please contact your administrator if you need access.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{usersCount}</p>
          </CardContent>
        </Card>

        {/* Clients */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">{clientsCount}</p>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{paymentsCount}</p>
          </CardContent>
        </Card>

        {/* Withdrawals */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{withdrawalsCount}</p>
          </CardContent>
        </Card>

        {/* Dashboard Tiles */}
        {Array.isArray(tiles) && tiles.length > 0 && (
          tiles.map((tile: any) => (
            <Card key={tile.id ?? tile.title} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{tile.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{tile.value ?? 0}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Empty state message only if no tiles AND no error */}
      {!error && tiles.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          <p>No additional dashboard tiles available</p>
        </div>
      )}
    </div>
  );
};

export default Overview;