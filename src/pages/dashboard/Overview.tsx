import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Overview = () => {
  const stats = [
    {
      title: "PRN Requests",
      value: "0",
      change: "--",
      trend: "up",
      icon: FileText,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Payments Processed",
      value: "0",
      change: "--",
      trend: "up",
      icon: DollarSign,
      color: "bg-success/10 text-success"
    },
    {
      title: "Total Stakes",
      value: "0",
      change: "--",
      trend: "up",
      icon: TrendingUp,
      color: "bg-warning/10 text-warning"
    },
    {
      title: "Tax Collected",
      value: "KES 0",
      change: "--",
      trend: "up",
      icon: Users,
      color: "bg-info/10 text-info"
    }
  ];

  const revenueData: { month: string; value: number }[] = [];

  const returnsData: { month: string; completed: number; pending: number }[] = [];

  const recentClients: { name: string; email: string; status: string; type: string }[] = [];

  const upcomingDeadlines: { title: string; date: string; clients: number }[] = [];

  return (
    <>
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Welcome back!"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border hover:shadow-soft transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                {revenueData.length === 0 ? (
                  <p>No data available. Connect to backend to view analytics.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tax Returns</CardTitle>
                <CardDescription>Completed vs pending returns</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                {returnsData.length === 0 ? (
                  <p>No data available. Connect to backend to view analytics.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={returnsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="completed" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Clients */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Latest client additions and updates</CardDescription>
              </div>
              <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No clients available. Connect to backend to view data.
                  </div>
                ) : (
                  recentClients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{client.type}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          client.status === "Active" ? "bg-success/10 text-success" :
                          client.status === "Pending" ? "bg-warning/10 text-warning" :
                          "bg-info/10 text-info"
                        }`}>
                          {client.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important tax dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No deadlines available. Connect to backend to view data.
                  </div>
                ) : (
                  upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                      <div className="p-2 bg-destructive/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">{deadline.date}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {deadline.clients} clients affected
                        </p>
                      </div>
                    </div>
                  ))
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
