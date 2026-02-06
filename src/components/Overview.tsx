import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  CreditCard,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Activity,
  Calendar,
} from "lucide-react";
import {
  listUsers,
  getPaymentRequests,
  getWithdrawalRequests,
} from "@/services/api";
import api from "@/services/api";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usersCount, setUsersCount] = useState(0);
  const [prnCount, setPrnCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [withdrawalsCount, setWithdrawalsCount] = useState(0);

  const [activities, setActivities] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const usersRes = await listUsers();
        const usersData = usersRes.data?.data || usersRes.data || [];

        const prnRes = await api.get("/prodPrnLog");
        const prnData = prnRes.data?.data || prnRes.data || [];

        const paymentsRes = await getPaymentRequests();
        const paymentsData = paymentsRes.data?.data || paymentsRes.data || [];

        const withdrawalsRes = await getWithdrawalRequests();
        const withdrawalsData =
          withdrawalsRes.data?.data || withdrawalsRes.data || [];

        setUsersCount(usersData.length);
        setPrnCount(prnData.length);
        setPaymentsCount(paymentsData.length);
        setWithdrawalsCount(withdrawalsData.length);

        /* ================= RECENT ACTIVITY ================= */
        const feed: any[] = [];

        usersData.slice(0, 3).forEach((u: any) =>
          feed.push({
            type: "user",
            icon: Users,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "New User Registration",
            description: `${u.first_name || 'User'} ${u.last_name || ''} joined the platform`,
            time: u.created_at || new Date().toISOString(),
          })
        );

        paymentsData.slice(0, 3).forEach((p: any) =>
          feed.push({
            type: "payment",
            icon: CreditCard,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "Payment Request",
            description: `Payment of KES ${parseFloat(p.amount || 0).toLocaleString()} received`,
            time: p.created_at || new Date().toISOString(),
          })
        );

        withdrawalsData.slice(0, 3).forEach((w: any) =>
          feed.push({
            type: "withdrawal",
            icon: Wallet,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            title: "Withdrawal Request",
            description: `Withdrawal of KES ${parseFloat(w.amount || 0).toLocaleString()} initiated`,
            time: w.created_at || new Date().toISOString(),
          })
        );

        prnData.slice(0, 3).forEach((prn: any) =>
          feed.push({
            type: "prn",
            icon: FileText,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "PRN Request",
            description: `Tax payment request for KES ${parseFloat(prn.amount || 0).toLocaleString()}`,
            time: prn.transDate || new Date().toISOString(),
          })
        );

        feed.sort(
          (a, b) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setActivities(feed.slice(0, 10));

        /* ================= CHART DATA ================= */
        const days = [...Array(7)]
          .map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split("T")[0];
          })
          .reverse();

        setChartData(
          days.map((day) => {
            const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'short' });
            return {
              date: dayName,
              fullDate: day,
              payments: paymentsData.filter((p: any) =>
                p.created_at?.startsWith(day)
              ).length,
              withdrawals: withdrawalsData.filter((w: any) =>
                w.created_at?.startsWith(day)
              ).length,
            };
          })
        );

        /* ================= ALERTS ================= */
        const now = new Date();
        const alertsArr: any[] = [];

        const pendingWithdrawals = withdrawalsData.filter(
          (w: any) =>
            w.status === "pending" &&
            (now.getTime() - new Date(w.created_at).getTime()) /
              (1000 * 60 * 60) >
              48
        );

        if (pendingWithdrawals.length)
          alertsArr.push({
            type: "error",
            text: `${pendingWithdrawals.length} withdrawals pending > 48hrs`,
          });

        const failedPayments = paymentsData.filter(
          (p: any) => p.status === "failed"
        );

        if (failedPayments.length)
          alertsArr.push({
            type: "error",
            text: `${failedPayments.length} failed payments`,
          });

        setAlerts(alertsArr);
      } catch (e) {
        console.error("Dashboard error:", e);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTimeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users */}
          <Card className="rounded-2xl shadow-md border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-700">
                  Total Users
                </CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-900 mb-1">
                {usersCount.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Active users
              </p>
            </CardContent>
          </Card>

          {/* PRN */}
          <Card className="rounded-2xl shadow-md border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-700">
                  PRN Requests
                </CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-900 mb-1">
                {prnCount.toLocaleString()}
              </p>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Total PRN requests
              </p>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="rounded-2xl shadow-md border border-green-100 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-700">
                  Total Payments
                </CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-900 mb-1">
                {paymentsCount.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Payment requests
              </p>
            </CardContent>
          </Card>

          {/* Withdrawals */}
          <Card className="rounded-2xl shadow-md border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-orange-700">
                  Total Withdrawals
                </CardTitle>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-900 mb-1">
                {withdrawalsCount.toLocaleString()}
              </p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> Withdrawal requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= ALERTS ================= */}
        {alerts.length > 0 && (
          <Card className="bg-red-50 border border-red-200 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700 font-semibold">
                <AlertTriangle className="w-5 h-5" /> System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {alerts.map((a, i) => (
                <Badge key={i} variant="destructive" className="px-3 py-1">
                  {a.text}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* ================= CHARTS & ACTIVITY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart - Takes 2 columns */}
          <Card className="lg:col-span-2 rounded-2xl shadow-md border border-gray-100">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Transaction Overview
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Last 7 days activity</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-600">Withdrawals</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    stroke="#888"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#888"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="payments" 
                    fill="#22c55e" 
                    radius={[8, 8, 0, 0]}
                    name="Payments"
                  />
                  <Bar 
                    dataKey="withdrawals" 
                    fill="#f97316" 
                    radius={[8, 8, 0, 0]}
                    name="Withdrawals"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity - Takes 1 column */}
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-purple-50">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Recent Activity
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">Latest system events</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[340px] overflow-y-auto">
                {activities.length === 0 ? (
                  <div className="p-6 text-center text-gray-400">
                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {activities.map((activity, i) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={i}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex gap-3">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${activity.iconBg} flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5 truncate">
                                {activity.description}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatTimeAgo(activity.time)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;