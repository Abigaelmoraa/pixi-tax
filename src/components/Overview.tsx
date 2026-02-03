import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Building2, CreditCard, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
        const usersRes = await listUsers();
        const usersData = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.data || [];
        setUsersCount(usersData.length);

        const clientsRes = await listClients();
        const clientsData = Array.isArray(clientsRes.data) ? clientsRes.data : clientsRes.data?.data || [];
        setClientsCount(clientsData.length);

        const tilesRes = await getDashboardTiles();
        setTiles(tilesRes.data?.tiles ?? (Array.isArray(tilesRes.data) ? tilesRes.data : []) ?? []);

        const paymentsRes = await getPaymentRequests();
        const paymentsData = Array.isArray(paymentsRes.data) ? paymentsRes.data : paymentsRes.data?.data || [];
        setPaymentsCount(paymentsData.length);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Oops! Something went wrong</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Users Card */}
          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-100">Total Users</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{usersCount}</p>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Active users
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          {/* Total Clients Card */}
          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-100">Total Clients</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{clientsCount}</p>
                  <p className="text-xs text-purple-100 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Registered clients
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          {/* Total Payments Card */}
          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-100">Total Payments</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{paymentsCount}</p>
                  <p className="text-xs text-green-100 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    Payment requests
                  </p>
                </div>
                <CreditCard className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          {/* Total Withdrawals Card */}
          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-orange-100">Total Withdrawals</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{withdrawalsCount}</p>
                  <p className="text-xs text-orange-100 flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" />
                    Withdrawal requests
                  </p>
                </div>
                <Wallet className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tiles Section */}
        {tiles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Additional Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiles.map((tile: any, index: number) => {
                const colors = [
                  "from-pink-500 to-rose-600",
                  "from-cyan-500 to-blue-600",
                  "from-violet-500 to-purple-600",
                  "from-amber-500 to-orange-600",
                  "from-teal-500 to-emerald-600",
                  "from-fuchsia-500 to-pink-600"
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <Card 
                    key={tile.id ?? tile.title ?? index} 
                    className={`rounded-2xl shadow-lg border-0 bg-gradient-to-br ${colorClass} text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium opacity-90">{tile.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className="text-4xl font-bold">{tile.value ?? 0}</p>
                        <TrendingUp className="w-8 h-8 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State for Tiles */}
        {tiles.length === 0 && !error && (
          <Card className="rounded-2xl shadow-lg border-0 bg-white">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Additional Metrics</h3>
              <p className="text-gray-500">Additional dashboard metrics will appear here when available.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Overview;