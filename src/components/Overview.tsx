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
  getDashboardTiles,
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

        /* =======================
           RECENT ACTIVITY
        ======================== */
        const feed: any[] = [];

        usersData.slice(0, 5).forEach((u: any) =>
          feed.push({
            message: `${u.first_name} ${u.last_name} registered`,
            time: u.created_at,
            icon: "👤",
          })
        );

        paymentsData.slice(0, 5).forEach((p: any) =>
          feed.push({
            message: `Payment request KES ${p.amount}`,
            time: p.created_at,
            icon: "💳",
          })
        );

        withdrawalsData.slice(0, 5).forEach((w: any) =>
          feed.push({
            message: `Withdrawal request KES ${w.amount}`,
            time: w.created_at,
            icon: "💸",
          })
        );

        prnData.slice(0, 5).forEach(() =>
          feed.push({
            message: `PRN request submitted`,
            time: new Date().toISOString(),
            icon: "📄",
          })
        );

        feed.sort(
          (a, b) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setActivities(feed.slice(0, 10));

        /* =======================
           CHART DATA (7 DAYS)
        ======================== */
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

        /* =======================
           ALERTS
        ======================== */
        const now = new Date();

        const pendingWithdrawals = withdrawalsData.filter(
          (w: any) =>
            w.status === "pending" &&
            (now.getTime() - new Date(w.created_at).getTime()) /
              (1000 * 60 * 60) >
              48
        );

        const failedPayments = paymentsData.filter(
          (p: any) => p.status === "failed"
        );

        const pendingPayments = paymentsData.filter(
          (p: any) => p.status === "pending"
        );

        const alertsArr: any[] = [];

        if (pendingWithdrawals.length > 0)
          alertsArr.push({
            type: "error",
            text: `${pendingWithdrawals.length} withdrawals pending over 48hrs`,
          });

        if (failedPayments.length > 0)
          alertsArr.push({
            type: "error",
            text: `${failedPayments.length} failed payments`,
          });

        if (pendingPayments.length > 0)
          alertsArr.push({
            type: "warning",
            text: `${pendingPayments.length} payments pending approval`,
          });

        if (prnData.length > 20)
          alertsArr.push({
            type: "info",
            text: `High PRN activity (${prnData.length})`,
          });

        setAlerts(alertsArr);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-10">Loading dashboard...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* =======================
           STAT CARDS (ORIGINAL)
        ======================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card className="rounded-2xl shadow-md border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-sm text-blue-700 flex justify-between">
                Total Users <Users />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-900">{usersCount}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-sm text-purple-700 flex justify-between">
                PRN Requests <FileText />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-900">{prnCount}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border border-green-100 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardHeader>
              <CardTitle className="text-sm text-green-700 flex justify-between">
                Payments <CreditCard />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-900">{paymentsCount}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-sm text-orange-700 flex justify-between">
                Withdrawals <Wallet />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-900">
                {withdrawalsCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* =======================
           ALERTS
        ======================== */}
        {alerts.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle /> System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {alerts.map((a, i) => (
                <Badge
                  key={i}
                  variant={
                    a.type === "error"
                      ? "destructive"
                      : a.type === "warning"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {a.text}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* =======================
           CHART
        ======================== */}
        <Card>
          <CardHeader>
            <CardTitle>Payments & Withdrawals (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line dataKey="payments" stroke="#22c55e" strokeWidth={3} />
                <Line
                  dataKey="withdrawals"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* =======================
           RECENT ACTIVITY
        ======================== */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {a.icon} {a.message}
                </span>
                <span className="text-gray-400">
                  {new Date(a.time).toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Overview;
