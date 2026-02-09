
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

        const [usersRes, prnRes, paymentsRes, withdrawalsRes] =
          await Promise.all([
            listUsers(),
            api.get("/prodPrnLog"),
            getPaymentRequests(),
            getWithdrawalRequests(),
          ]);

        const usersData = usersRes.data?.data || usersRes.data || [];
        const prnData = prnRes.data?.data || prnRes.data || [];
        const paymentsData = paymentsRes.data?.data || paymentsRes.data || [];
        const withdrawalsData =
          withdrawalsRes.data?.data || withdrawalsRes.data || [];

        setUsersCount(usersData.length);
        setPrnCount(prnData.length);
        setPaymentsCount(paymentsData.length);
        setWithdrawalsCount(withdrawalsData.length);

        const paymentTotal = paymentsData.reduce(
          (sum: number, p: any) => sum + (parseFloat(p.amount) || 0),
          0
        );
        setTotalPaymentAmount(paymentTotal);

        const withdrawalTotal = withdrawalsData.reduce(
          (sum: number, w: any) => sum + (parseFloat(w.amount) || 0),
          0
        );
        setTotalWithdrawalAmount(withdrawalTotal);

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
            description:
              `${u.first_name || ""} ${u.last_name || ""}`.trim() ||
              "User joined",
            time: u.created_at || new Date().toISOString(),
          })
        );

        feed.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );
        setActivities(feed.slice(0, 8));

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
            payments: paymentsData.filter(
              (p: any) =>
                p.timeIn?.startsWith(day) ||
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

        const alertsArr: any[] = [];

        const failedPayments = paymentsData.filter(
          (p: any) => p.responseCode && p.responseCode !== "0"
        ).length;

        if (failedPayments > 0) {
          alertsArr.push({
            type: "error",
            text: `${failedPayments} failed payment${
              failedPayments > 1 ? "s" : ""
            }`,
          });
        }

        const failedPrn = prnData.filter((p: any) =>
          p.kra?.toLowerCase().includes("fail")
        ).length;

        if (failedPrn > 0) {
          alertsArr.push({
            type: "warning",
            text: `${failedPrn} failed PRN request${
              failedPrn > 1 ? "s" : ""
            }`,
          });
        }

        setAlerts(alertsArr);
      } catch (e) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) =>
    `KES ${amount.toLocaleString("en-KE")}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date().toDateString()}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users */}
          <Card className="rounded-2xl shadow-sm border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm text-gray-700">
                  Total Users
                </CardTitle>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {usersCount}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Active
              </p>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="rounded-2xl shadow-sm border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm text-gray-700">
                  Payments
                </CardTitle>
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {paymentsCount}
              </p>
              <p className="text-xs text-gray-500">
                {formatCurrency(totalPaymentAmount)}
              </p>
            </CardContent>
          </Card>

          {/* Withdrawals */}
          <Card className="rounded-2xl shadow-sm border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm text-gray-700">
                  Withdrawals
                </CardTitle>
                <Wallet className="w-5 h-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {withdrawalsCount}
              </p>
              <p className="text-xs text-gray-500">
                {formatCurrency(totalWithdrawalAmount)}
              </p>
            </CardContent>
          </Card>

          {/* PRN */}
          <Card className="rounded-2xl shadow-sm border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm text-gray-700">
                  PRN Requests
                </CardTitle>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {prnCount}
              </p>
              <p className="text-xs text-gray-500">Tax payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts + Activity unchanged */}
      </div>
    </div>
  );
};

export default Overview;
