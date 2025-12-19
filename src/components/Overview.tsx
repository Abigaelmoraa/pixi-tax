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
      gradient: "from-purple-300 via-purple-400 to-purple-500",
      iconColor: "text-purple-600",
    },
    {
      title: "STK Push Requests",
      value: "0",
      subtitle: "Payment prompts",
      icon: Smartphone,
      gradient: "from-pink-300 via-pink-400 to-pink-500",
      iconColor: "text-pink-600",
    },
    {
      title: "Payments Processed",
      value: "0",
      subtitle: "Successful payments",
      icon: CreditCard,
      gradient: "from-green-300 via-green-400 to-green-500",
      iconColor: "text-green-600",
    },
    {
      title: "Tax Collected",
      value: "KES 0",
      subtitle: "Total tax amount",
      icon: Wallet,
      gradient: "from-yellow-300 via-yellow-400 to-yellow-500",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of tax operations and payment activity"
      />

      <div className="relative flex-1 overflow-y-auto p-6 bg-gray-150 space-y-10">
        {/*  STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={`relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br ${stat.gradient}`}
            >
              <CardContent className="relative p-5 bg-white/70 backdrop-blur-md rounded-xl">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl bg-white shadow ${stat.iconColor} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500" />
                </div>

                <div className="mt-5">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-base font-semibold text-gray-800 mt-2">
                    {stat.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MIDDLE CARDS  */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Sparkles className="w-5 h-5 text-gray-600" />
                System Activity
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                High-level overview of requests and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                Analytics will appear here once backend data is connected.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Wallet className="w-5 h-5 text-gray-600" />
                Tax Performance
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                Daily tax obligations and collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                Tax charts will appear here.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* bottom cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <FileText className="w-5 h-5 text-gray-600" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                Latest PRN, STK, and payment actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-5 rounded-xl bg-gray-100 p-8 text-center text-gray-600 text-sm font-medium">
                No recent activity
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Calendar className="w-5 h-5 text-gray-600" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                Important tax dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-5 rounded-xl bg-gray-100 p-8 text-center text-gray-600 text-sm font-medium">
                No upcoming deadlines
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Overview;
