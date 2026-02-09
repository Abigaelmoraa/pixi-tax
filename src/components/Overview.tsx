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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usersCount, setUsersCount] = useState(0);
  const [prnCount, setPrnCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [withdrawalsCount, setWithdrawalsCount] = useState(0);

  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState(0);

  const [activities, setActivities] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [usersRes, prnRes, paymentsRes, withdrawalsRes] = await Promise.all([
          listUsers(),
          api.get("/prodPrnLog"),
          getPaymentRequests(),
          getWithdrawalRequests(),
        ]);

        const usersData = usersRes.data?.data || usersRes.data || [];
        const prnData = prnRes.data?.data || prnRes.data || [];
        const paymentsData = paymentsRes.data?.data || paymentsRes.data || [];
        const withdrawalsData = withdrawalsRes.data?.data || withdrawalsRes.data || [];

        setUsersCount(usersData.length);
        setPrnCount(prnData.length);
        setPaymentsCount(paymentsData.length);
        setWithdrawalsCount(withdrawalsData.length);

        // Calculate totals
        const paymentTotal = paymentsData.reduce((sum: number, p: any) => 
          sum + (parseFloat(p.amount) || 0), 0);
        setTotalPaymentAmount(paymentTotal);

        const withdrawalTotal = withdrawalsData.reduce((sum: number, w: any) => 
          sum + (parseFloat(w.amount) || 0), 0);
        setTotalWithdrawalAmount(withdrawalTotal);

        /* ================= RECENT ACTIVITY ================= */
        const feed: any[] = [];

        paymentsData.slice(0, 3).forEach((p: any) =>
          feed.push({
            icon: CreditCard,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "Payment Request",
            description: `KES ${parseFloat(p.amount || 0).toLocaleString()}`,
            time: p.timeIn || p.created_at || new Date().toISOString(),
          })
        );

        withdrawalsData.slice(0, 2).forEach((w: any) =>
          feed.push({
            icon: Wallet,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            title: "Withdrawal Request",
            description: `KES ${parseFloat(w.amount || 0).toLocaleString()}`,
            time: w.created_at || new Date().toISOString(),
          })
        );

        prnData.slice(0, 3).forEach((prn: any) =>
          feed.push({
            icon: FileText,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "PRN Request",
            description: `KES ${parseFloat(prn.amount || 0).toLocaleString()}`,
            time: prn.transDate || new Date().toISOString(),
          })
        );

        usersData.slice(0, 2).forEach((u: any) =>
          feed.push({
            icon: Users,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "New User",
            description: `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'User joined',
            time: u.created_at || new Date().toISOString(),
          })
        );

        feed.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setActivities(feed.slice(0, 8));

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
              payments: paymentsData.filter((p: any) => 
                (p.timeIn?.startsWith(day) || p.created_at?.startsWith(day))
              ).length,
              withdrawals: withdrawalsData.filter((w: any) => 
                w.created_at?.startsWith(day)
              ).length,
              prn: prnData.filter((p: any) => 
                p.transDate?.startsWith(day)
              ).length,
            };
          })
        );

        /* ================= ALERTS ================= */
        const alertsArr: any[] = [];

        // Failed payments
        const failedPayments = paymentsData.filter((p: any) => 
          p.responseCode && p.responseCode !== "0"
        ).length;
        
        if (failedPayments > 0) {
          alertsArr.push({
            type: "error",
            text: `${failedPayments} failed payment${failedPayments > 1 ? 's' : ''}`,
          });
        }

        // Failed PRN
        const failedPrn = prnData.filter((p: any) => 
          p.kra?.toLowerCase().includes("fail") || p.kra?.toLowerCase().includes("error")
        ).length;

        if (failedPrn > 0) {
          alertsArr.push({
            type: "warning",
            text: `${failedPrn} failed PRN request${failedPrn > 1 ? 's' : ''}`,
          });
        }

        setAlerts(alertsArr);
      } catch (e: any) {
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
    return date.toLocaleDateString('en-KE');
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
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
          <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">{usersCount.toLocaleString()}</p>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Active
              </p>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Payments</CardTitle>
                <CreditCard className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">{paymentsCount.toLocaleString()}</p>
              <p className="text-xs opacity-80">{formatCurrency(totalPaymentAmount)}</p>
            </CardContent>
          </Card>

          {/* Withdrawals */}
          <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-orange-500 to-amber-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
                <Wallet className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">{withdrawalsCount.toLocaleString()}</p>
              <p className="text-xs opacity-80">{formatCurrency(totalWithdrawalAmount)}</p>
            </CardContent>
          </Card>

          {/* PRN */}
          <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">PRN Requests</CardTitle>
                <FileText className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">{prnCount.toLocaleString()}</p>
              <p className="text-xs opacity-80">Tax payments</p>
            </CardContent>
          </Card>
        </div>

        {/* ================= ALERTS ================= */}
        {alerts.length > 0 && (
          <Card className="bg-red-50 border border-red-200 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700 font-semibold">
                <AlertTriangle className="w-5 h-5" /> 
                Alerts ({alerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {alerts.map((a, i) => (
                <Badge 
                  key={i} 
                  variant={a.type === 'error' ? 'destructive' : 'default'}
                  className={`px-3 py-1 ${a.type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}`}
                >
                  {a.text}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart - 2 columns */}
          <Card className="lg:col-span-2 rounded-2xl shadow-md border border-gray-100">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Weekly Overview
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
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
                  <Bar dataKey="payments" fill="#22c55e" radius={[8, 8, 0, 0]} name="Payments" />
                  <Bar dataKey="withdrawals" fill="#f97316" radius={[8, 8, 0, 0]} name="Withdrawals" />
                  <Bar dataKey="prn" fill="#a855f7" radius={[8, 8, 0, 0]} name="PRN" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-600">Withdrawals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-600">PRN</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - 1 column */}
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-purple-50">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Recent Activity
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">Latest events</p>
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
                        <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
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