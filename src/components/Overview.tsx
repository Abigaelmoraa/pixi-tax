import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, CreditCard, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  listUsers,
  getDashboardTiles,
  getPaymentRequests,
  getWithdrawalRequests,
} from "@/services/api";
import api from "@/services/api";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usersCount, setUsersCount] = useState(0);
  const [prnCount, setPrnCount] = useState(0);
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

        // PRN Requests
        const prnRes = await api.get("/prodPrnLog");
        const prnData = Array.isArray(prnRes.data) ? prnRes.data : prnRes.data?.data || [];
        setPrnCount(prnData.length);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-400 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-xl font-semibold text-red-500 mb-2">Oops! Something went wrong</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Users Card */}
          <Card className="rounded-2xl shadow-md border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-blue-900 mb-1">{usersCount}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Active users
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          {/* PRN Requests Card */}
          <Card className="rounded-2xl shadow-md border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-700">PRN Requests</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-purple-900 mb-1">{prnCount}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Total PRN requests
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          {/* Total Payments Card */}
          <Card className="rounded-2xl shadow-md border border-green-100 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-700">Total Payments</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-green-900 mb-1">{paymentsCount}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    Payment requests
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-green-300" />
              </div>
            </CardContent>
          </Card>

          {/* Total Withdrawals Card */}
          <Card className="rounded-2xl shadow-md border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-orange-700">Total Withdrawals</CardTitle>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-orange-900 mb-1">{withdrawalsCount}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" />
                    Withdrawal requests
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-orange-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tiles Section */}
        {tiles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Additional Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiles.map((tile: any, index: number) => {
                const lightColors = [
                  { bg: "from-rose-50 to-pink-50", border: "border-rose-100", text: "text-rose-700", icon: "bg-rose-100 text-rose-600", accent: "text-rose-300" },
                  { bg: "from-cyan-50 to-sky-50", border: "border-cyan-100", text: "text-cyan-700", icon: "bg-cyan-100 text-cyan-600", accent: "text-cyan-300" },
                  { bg: "from-violet-50 to-purple-50", border: "border-violet-100", text: "text-violet-700", icon: "bg-violet-100 text-violet-600", accent: "text-violet-300" },
                  { bg: "from-amber-50 to-yellow-50", border: "border-amber-100", text: "text-amber-700", icon: "bg-amber-100 text-amber-600", accent: "text-amber-300" },
                  { bg: "from-teal-50 to-emerald-50", border: "border-teal-100", text: "text-teal-700", icon: "bg-teal-100 text-teal-600", accent: "text-teal-300" },
                  { bg: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-100", text: "text-fuchsia-700", icon: "bg-fuchsia-100 text-fuchsia-600", accent: "text-fuchsia-300" }
                ];
                const colorScheme = lightColors[index % lightColors.length];

                return (
                  <Card 
                    key={tile.id ?? tile.title ?? index} 
                    className={`rounded-2xl shadow-md border ${colorScheme.border} bg-gradient-to-br ${colorScheme.bg} overflow-hidden relative group hover:shadow-lg transition-all duration-300`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${colorScheme.icon}/20 rounded-full -mr-16 -mt-16`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className={`text-sm font-medium ${colorScheme.text}`}>{tile.title}</CardTitle>
                        <div className={`p-2 ${colorScheme.icon} rounded-lg`}>
                          <TrendingUp className="w-5 h-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className={`text-4xl font-bold ${colorScheme.text.replace('700', '900')}`}>{tile.value ?? 0}</p>
                        <TrendingUp className={`w-8 h-8 ${colorScheme.accent}`} />
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
          <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Additional Metrics</h3>
              <p className="text-gray-500">Additional dashboard metrics will appear here when available.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Overview;