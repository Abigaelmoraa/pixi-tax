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
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Users */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>{usersCount}</CardContent>
      </Card>

      {/* Clients */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Clients</CardTitle>
        </CardHeader>
        <CardContent>{clientsCount}</CardContent>
      </Card>

      {/* Payments */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Payments</CardTitle>
        </CardHeader>
        <CardContent>{paymentsCount}</CardContent>
      </Card>

      {/* Withdrawals */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>{withdrawalsCount}</CardContent>
      </Card>

      {/* Dashboard Tiles */}
      {tiles.map((tile: any) => (
        <Card key={tile.id ?? tile.title} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>{tile.title}</CardTitle>
          </CardHeader>
          <CardContent>{tile.value}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
