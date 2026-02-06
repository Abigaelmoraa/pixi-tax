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
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

        usersData.slice(0, 4).forEach((u: any) =>
          feed.push({
            icon: "👤",
            message: `${u.first_name} ${u.last_name} registered`,
            time: u.created_at,
          })
        );

        paymentsData.slice(0, 4).forEach((p: any) =>
          feed.push({
            icon: "💳",
            message: `Payment request KES ${p.amount}`,
            time: p.created_at,
          })
        );

        withdrawalsData.slice(0, 4).forEach((w: any) =>
          feed.push({
            icon: "💸",
            message: `Withdrawal request KES ${w.amount}`,
            time: w.created_at,
          })
        );

        prnData.slice(0, 4).forEach(() =>
          feed.push({
            icon: "📄",
            message: "PRN request submitted",
            time: new Date().toISOString(),
          })
        );

        feed.sort(
          (a, b) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        );

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
          days.map((day) => ({
            date: day,
            payments: paymentsData.filter((p: any) =>
              p.created_at?.startsWith(day)
            ).length,
            withdrawals: withdrawalsData.filter((w: any) =>
              w.created_at?.startsWith(day)
            ).length,
          }))
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
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-10">Loading dashboard…</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= ORIGINAL STAT CARDS (UNCHANGED) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Users */}
          <Card className="rounded-2xl shadow-md border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
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
                {usersCount}
              </p>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Active users
              </p>
            </CardContent>
          </Card>

          {/* PRN */}
          <Card className="rounded-2xl shadow-md border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
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
                {prnCount}
              </p>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Total PRN requests
              </p>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="rounded-2xl shadow-md border border-green-100 bg-gradient-to-br from-emerald-50 to-teal-50">
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
                {paymentsCount}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Payment requests
              </p>
            </CardContent>
          </Card>

          {/* Withdrawals */}
          <Card className="rounded-2xl shadow-md border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50">
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
                {withdrawalsCount}
              </p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> Withdrawal requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= ALERTS ================= */}
        {alerts.length > 0 && (
          <Card className="bg-red-50 border border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-4 h-4" /> System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {alerts.map((a, i) => (
                <Badge key={i} variant="destructive">
                  {a.text}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* ================= SMALL SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Small Chart */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-gray-600">
                Payments vs Withdrawals (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-36 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    dataKey="payments"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="withdrawals"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Small Activity */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-gray-600">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-36 overflow-y-auto space-y-2 text-sm">
              {activities.map((a, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b last:border-0 pb-1"
                >
                  <span className="truncate">
                    {a.icon} {a.message}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(a.time).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Overview;
