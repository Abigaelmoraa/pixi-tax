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
import { fetchStats, fetchRecentActivity } from "@/services/api";

// Hook to animate numbers
const useCountUp = (target: number | string, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof target === "string") return; // Skip if not a number
    let start = 0;
    const end = target;
    const increment = end / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

const DEFAULT_STATS = [
  {
    title: "PRN Requests",
    value: 0,
    subtitle: "Total submitted",
    icon: FileText,
    iconGradient: "bg-gradient-to-br from-purple-400 to-purple-200",
    textColor: "text-purple-700",
    bgGradient: "from-purple-100 to-purple-50",
  },
  {
    title: "STK Push Requests",
    value: 0,
    subtitle: "Payment prompts",
    icon: Smartphone,
    iconGradient: "bg-gradient-to-br from-pink-400 to-pink-200",
    textColor: "text-pink-700",
    bgGradient: "from-pink-100 to-pink-50",
  },
  {
    title: "Payments Processed",
    value: 0,
    subtitle: "Successful payments",
    icon: CreditCard,
    iconGradient: "bg-gradient-to-br from-green-400 to-green-200",
    textColor: "text-green-700",
    bgGradient: "from-green-100 to-green-50",
  },
  {
    title: "Tax Collected",
    value: "KES 0",
    subtitle: "Total tax amount",
    icon: Wallet,
    iconGradient: "bg-gradient-to-br from-yellow-400 to-yellow-200",
    textColor: "text-yellow-700",
    bgGradient: "from-yellow-100 to-yellow-50",
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
      } catch (err) {
        console.error("Dashboard load error:", err);
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
        {stats.map((stat) => {
          const animatedValue =
            typeof stat.value === "number"
              ? useCountUp(stat.value)
              : stat.value;

          return (
            <Card
              key={stat.title}
              className={`border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl ${stat.iconGradient} flex items-center justify-center shadow-md`}
                  >
                    <stat.icon className={`w-5 h-5 text-white`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="mt-3">
                  <p className="text-xl font-bold text-gray-900">
                    {animatedValue}
                  </p>
                  <p className={`text-sm font-medium ${stat.textColor}`}>
                    {stat.title}
                  </p>
                  <p className="text-xs text-gray-600">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= MIDDLE CARDS ================= */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* System Activity */}
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
              {recentActivity.length === 0 ? (
                "No recent activity"
              ) : (
                <ul className="space-y-1">
                  {recentActivity.map((item, idx) => (
                    <li key={idx}>{item.description}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tax Performance */}
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
              {deadlines.length === 0 ? (
                "No upcoming deadlines"
              ) : (
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
