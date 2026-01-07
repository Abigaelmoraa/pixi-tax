import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Smartphone, CreditCard, Wallet, ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { fetchStats, fetchRecentActivity, fetchUpcomingDeadlines } from "@/services/api";

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch dashboard stats
        const statsData = await fetchStats();
        setStats([
          {
            title: "PRN Requests",
            value: statsData.prnRequests || 0,
            subtitle: "Total submitted",
            icon: FileText,
            gradient: "from-purple-300 via-purple-400 to-purple-500",
            iconColor: "text-purple-600",
          },
          {
            title: "STK Push Requests",
            value: statsData.stkPushRequests || 0,
            subtitle: "Payment prompts",
            icon: Smartphone,
            gradient: "from-pink-300 via-pink-400 to-pink-500",
            iconColor: "text-pink-600",
          },
          {
            title: "Payments Processed",
            value: statsData.paymentsProcessed || 0,
            subtitle: "Successful payments",
            icon: CreditCard,
            gradient: "from-green-300 via-green-400 to-green-500",
            iconColor: "text-green-600",
          },
          {
            title: "Tax Collected",
            value: `KES ${statsData.taxCollected || 0}`,
            subtitle: "Total tax amount",
            icon: Wallet,
            gradient: "from-yellow-300 via-yellow-400 to-yellow-500",
            iconColor: "text-yellow-700",
          },
        ]);

        // Fetch recent activity
        const activityData = await fetchRecentActivity();
        setRecentActivity(activityData || []);

        // Fetch upcoming deadlines
        const deadlinesData = await fetchUpcomingDeadlines();
        setDeadlines(deadlinesData || []);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Loading dashboard...</p>;

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of tax operations and payment activity"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-gradient-to-br from-slate-100 via-white to-purple-50">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className={`border-0 shadow-lg bg-gradient-to-br ${stat.gradient}`}>
              <CardContent className="p-6 bg-white/80 backdrop-blur rounded-xl">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-white shadow ${stat.iconColor}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-5">
                  <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                  <p className="mt-1 font-semibold text-gray-800">{stat.title}</p>
                  <p className="text-sm text-gray-600">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MIDDLE CARDS */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" /> System Activity
              </CardTitle>
              <CardDescription>
                High-level overview of requests and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] rounded-xl bg-slate-100 flex items-center justify-center text-gray-500">
                {recentActivity.length === 0 ? (
                  "No recent activity"
                ) : (
                  <ul className="space-y-1">
                    {recentActivity.map((item, idx) => (
                      <li key={idx}>{item.description || JSON.stringify(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" /> Tax Performance
              </CardTitle>
              <CardDescription>
                Daily tax obligations and collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] rounded-xl bg-slate-100 flex items-center justify-center text-gray-500">
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
    </>
  );
};

export default Overview;
