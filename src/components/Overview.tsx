import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileText,
  Smartphone,
  CreditCard,
  Wallet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  fetchStats,
  fetchRecentActivity,
  fetchUpcomingDeadlines,
} from "@/services/api";

/* ✅ DEFAULT STATS (ALWAYS RENDER) */
const DEFAULT_STATS = [
  {
    title: "PRN Requests",
    value: 0,
    subtitle: "Total submitted",
    icon: FileText,
    iconColor: "text-purple-600",
  },
  {
    title: "STK Push Requests",
    value: 0,
    subtitle: "Payment prompts",
    icon: Smartphone,
    iconColor: "text-pink-600",
  },
  {
    title: "Payments Processed",
    value: 0,
    subtitle: "Successful payments",
    icon: CreditCard,
    iconColor: "text-green-600",
  },
  {
    title: "Tax Collected",
    value: "KES 0",
    subtitle: "Total tax amount",
    icon: Wallet,
    iconColor: "text-yellow-700",
  },
];

const Overview = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchStats();

        if (statsData) {
          setStats([
            {
              ...DEFAULT_STATS[0],
              value: statsData.prnRequests ?? 0,
            },
            {
              ...DEFAULT_STATS[1],
              value: statsData.stkPushRequests ?? 0,
            },
            {
              ...DEFAULT_STATS[2],
              value: statsData.paymentsProcessed ?? 0,
            },
            {
              ...DEFAULT_STATS[3],
              value: `KES ${statsData.taxCollected ?? 0}`,
            },
          ]);
        }

        setRecentActivity((await fetchRecentActivity()) ?? []);
        setDeadlines((await fetchUpcomingDeadlines()) ?? []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        // ✅ UI still renders
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-100 via-white to-purple-50 space-y-6">
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of tax operations and payment activity"
      />

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-0 shadow-lg bg-white"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${stat.iconColor} bg-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="mt-3">
                <p className="text-xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-600">
                  {stat.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= MIDDLE CARDS ================= */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              System Activity
            </CardTitle>
            <CardDescription className="text-xs">
              High-level overview of requests and transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-36 rounded-xl bg-slate-100 flex items-center justify-center text-gray-500 text-xs">
              {recentActivity.length === 0
                ? "No recent activity"
                : (
                  <ul className="space-y-1">
                    {recentActivity.map((item, idx) => (
                      <li key={idx}>{item.description}</li>
                    ))}
                  </ul>
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Wallet className="w-4 h-4 text-green-600" />
              Tax Performance
            </CardTitle>
            <CardDescription className="text-xs">
              Daily tax obligations and collections
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-36 rounded-xl bg-slate-100 flex items-center justify-center text-gray-500 text-xs">
              {deadlines.length === 0
                ? "No upcoming deadlines"
                : (
                  <ul className="space-y-1">
                    {deadlines.map((d, idx) => (
                      <li key={idx}>
                        {d.date} - {d.title}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
