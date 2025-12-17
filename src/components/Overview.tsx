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
  Calendar,
  Sparkles,
} from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "PRN Requests",
      value: "0",
      subtitle: "Total submitted",
      icon: FileText,
      gradient: "from-purple-600 via-indigo-600 to-blue-600",
    },
    {
      title: "STK Push Requests",
      value: "0",
      subtitle: "Payment prompts",
      icon: Smartphone,
      gradient: "from-pink-500 via-rose-500 to-red-500",
    },
    {
      title: "Payments Processed",
      value: "0",
      subtitle: "Successful payments",
      icon: CreditCard,
      gradient: "from-emerald-500 via-green-500 to-lime-500",
    },
    {
      title: "Tax Collected",
      value: "KES 0",
      subtitle: "Total tax amount",
      icon: Wallet,
      gradient: "from-orange-500 via-amber-500 to-yellow-400",
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of tax operations and payment activity"
      />

      <div
        className="relative flex-1 overflow-y-auto p-6 space-y-10
        bg-gradient-to-br from-indigo-100 via-pink-50 to-emerald-100"
      >
        {/* Decorative Blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-100px] w-96 h-96 bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] left-[30%] w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10 space-y-10">
          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="relative overflow-hidden border-0
                bg-white/80 backdrop-blur
                shadow-lg hover:scale-[1.03]
                hover:shadow-xl transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20`}
                />

                <CardContent className="relative p-5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="mt-5">
                    <p className="text-4xl font-extrabold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-base font-semibold text-slate-800 mt-2">
                      {stat.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {stat.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ================= MIDDLE ================= */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-300 to-indigo-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  System Activity
                </CardTitle>
                <CardDescription className="text-sm">
                  High-level overview of requests and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] rounded-xl bg-white/70 flex items-center justify-center text-slate-600 text-sm">
                  Analytics will appear here once backend data is connected.
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-300 to-green-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="w-5 h-5 text-emerald-700" />
                  Tax Performance
                </CardTitle>
                <CardDescription className="text-sm">
                  Daily tax obligations and collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] rounded-xl bg-white/70 flex items-center justify-center text-slate-600 text-sm">
                  Tax charts will appear here.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card
              className="lg:col-span-2 border-0 shadow-xl overflow-hidden relative
              bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300"
            >
              <div className="absolute inset-0 bg-black/20" />

              <CardHeader className="relative bg-black/30 backdrop-blur-md">
                <CardTitle className="flex items-center gap-2 text-white text-lg font-semibold">
                  <FileText className="w-5 h-5 text-white" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Latest PRN, STK, and payment actions
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <div className="mt-5 rounded-xl bg-white/15 p-8 text-center border border-white/20">
                  <p className="text-white text-lg font-medium">
                    No recent activity
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    Transactions will appear here once available
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-xl overflow-hidden
              bg-gradient-to-br from-purple-300 via-green-400 to-yellow-300"
            >
              <CardHeader className="bg-white/30 backdrop-blur-md">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-orange-700" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription className="text-sm text-slate-800">
                  Important tax dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-5 rounded-xl bg-white/60 p-8 text-center text-orange-900 text-sm font-medium">
                  No upcoming deadlines 🎉
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
