import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Smartphone,
  CreditCard,
  Wallet,
  ArrowUpRight,
  Plus,
  Calendar
} from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "PRN Requests",
      value: "0",
      subtitle: "Total submitted",
      icon: FileText,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "STK Push Requests",
      value: "0",
      subtitle: "Payment prompts",
      icon: Smartphone,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Payments Processed",
      value: "0",
      subtitle: "Successful payments",
      icon: CreditCard,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Tax Collected",
      value: "KES 0",
      subtitle: "Total tax amount",
      icon: Wallet,
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of tax operations and payment activity"
      />

      {/* Dashboard Background */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`} />

              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-600 mt-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>
                High-level overview of requests and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] flex items-center justify-center text-muted-foreground">
                Analytics will appear here once backend data is connected.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Tax Performance</CardTitle>
              <CardDescription>
                Daily tax obligations and collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] flex items-center justify-center text-muted-foreground">
                Tax charts will appear here.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest PRN, STK, and payment actions
                </CardDescription>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </CardHeader>
            <CardContent>
              <div className="py-10 text-center text-muted-foreground">
                No recent activity available.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important tax dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-10 text-center text-muted-foreground">
                No upcoming deadlines.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Overview;
