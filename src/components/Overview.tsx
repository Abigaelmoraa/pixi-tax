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
            icon: Users,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "New User Registration",
            description: `${u.first_name || "User"} ${u.last_name || ""} joined`,
            time: u.created_at || new Date().toISOString(),
          })
        );

        paymentsData.slice(0, 3).forEach((p: any) =>
          feed.push({
            icon: CreditCard,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "Payment Request",
            description: `KES ${Number(p.amount || 0).toLocaleString()}`,
            time: p.created_at || new Date().toISOString(),
          })
        );

        withdrawalsData.slice(0, 3).forEach((w: any) =>
          feed.push({
            icon: Wallet,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            title: "Withdrawal Request",
            description: `KES ${Number(w.amount || 0).toLocaleString()}`,
            time: w.created_at || new Date().toISOString(),
          })
        );

        prnData.slice(0, 3).forEach((p: any) =>
          feed.push({
            icon: FileText,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "PRN Request",
            description: `KES ${Number(p.amount || 0).toLocaleString()}`,
            time: p.transDate || new Date().toISOString(),
          })
        );

        feed.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setActivities(feed.slice(0, 10));

        /* ================= CHART DATA (7 DAYS) ================= */
        const days = [...Array(7)]
          .map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split("T")[0];
          })
          .reverse();

        setChartData(
          days.map((day) => ({
            date: new Date(day).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            payments: paymentsData.filter((p: any) =>
              p.created_at?.startsWith(day)
            ).length,
            withdrawals: withdrawalsData.filter((w: any) =>
              w.created_at?.startsWith(day)
            ).length,
            prn: prnData.filter((p: any) =>
              p.transDate?.startsWith(day)
            ).length,
          }))
        );

        /* ================= ALERTS ================= */
        const now = new Date();
        const alertList: any[] = [];

        const pendingWithdrawals = withdrawalsData.filter(
          (w: any) =>
            w.status === "pending" &&
            (now.getTime() - new Date(w.created_at).getTime()) /
              (1000 * 60 * 60) >
              48
        );

        if (pendingWithdrawals.length)
          alertList.push({
            text: `${pendingWithdrawals.length} withdrawals pending over 48hrs`,
          });

        const failedPayments = paymentsData.filter(
          (p: any) => p.status === "failed"
        );

        if (failedPayments.length)
          alertList.push({
            text: `${failedPayments.length} failed payments`,
          });

        setAlerts(alertList);
      } catch (e) {
        console.error(e);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const timeAgo = (d: string) => {
    const diff = (Date.now() - new Date(d).getTime()) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date().toDateString()}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { title: "Total Users", value: usersCount, icon: Users, color: "blue" },
            { title: "PRN Requests", value: prnCount, icon: FileText, color: "purple" },
            { title: "Total Payments", value: paymentsCount, icon: CreditCard, color: "green" },
            { title: "Total Withdrawals", value: withdrawalsCount, icon: Wallet, color: "orange" },
          ].map((s, i) => (
            <Card key={i} className="rounded-2xl shadow-md">
              <CardHeader className="pb-2 flex justify-between">
                <CardTitle className="text-sm">{s.title}</CardTitle>
                <s.icon className="w-5 h-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{s.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ALERTS */}
        {alerts.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex gap-2 text-red-700 text-sm">
                <AlertTriangle className="w-5 h-5" /> Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {alerts.map((a, i) => (
                <Badge key={i} variant="destructive">{a.text}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* CHART + ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <Activity className="w-5 h-5" /> Last 7 Days Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="payments" fill="#22c55e" />
                  <Bar dataKey="withdrawals" fill="#f97316" />
                  <Bar dataKey="prn" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[350px] overflow-y-auto">
              {activities.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="p-4 border-b flex gap-3">
                    <div className={`${a.iconBg} p-2 rounded-lg`}>
                      <Icon className={`${a.iconColor} w-5 h-5`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.description}</p>
                      <p className="text-xs text-gray-400">{timeAgo(a.time)}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
