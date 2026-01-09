import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listUsers, listClients, getDashboardTiles } from "@/services/api";

const Overview = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [tiles, setTiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersRes = await listUsers();
        setUsersCount(usersRes.data?.length || 0);

        // Fetch clients
        const clientsRes = await listClients();
        setClientsCount(clientsRes.data?.length || 0);

        // Fetch dashboard tiles
        const tilesRes = await getDashboardTiles();
        setTiles(tilesRes.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

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

      {/* Dashboard Tiles */}
      {tiles.map((tile: any, i: number) => (
        <Card key={i} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>{tile.title}</CardTitle>
          </CardHeader>
          <CardContent>{tile.value}</CardContent>
        </Card>
      ))}

      {/* Mock Payments & Withdrawals */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Payments</CardTitle>
        </CardHeader>
        <CardContent>120</CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Total Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>30</CardContent>
      </Card>
    </div>
  );
};

export default Overview;
