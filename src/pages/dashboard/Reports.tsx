import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  FileText
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const Reports = () => {
  const revenueData = [
    { month: "Jan", revenue: 32000, expenses: 24000 },
    { month: "Feb", revenue: 38000, expenses: 26000 },
    { month: "Mar", revenue: 45000, expenses: 28000 },
    { month: "Apr", revenue: 52000, expenses: 30000 },
    { month: "May", revenue: 48000, expenses: 27000 },
    { month: "Jun", revenue: 58000, expenses: 32000 },
  ];

  const clientDistribution = [
    { name: "Individual", value: 186, color: "hsl(var(--primary))" },
    { name: "Small Business", value: 42, color: "hsl(var(--success))" },
    { name: "Corporation", value: 20, color: "hsl(var(--warning))" },
  ];

  const reportTypes = [
    { title: "Revenue Report", description: "Monthly and yearly revenue breakdown", icon: TrendingUp, status: "Ready" },
    { title: "Client Analysis", description: "Client demographics and growth trends", icon: PieChart, status: "Ready" },
    { title: "Tax Season Summary", description: "Returns filed and completion rates", icon: BarChart3, status: "Ready" },
    { title: "Quarterly Forecast", description: "Projected earnings and workload", icon: Calendar, status: "Generating" },
  ];

  return (
    <>
      <DashboardHeader 
        title="Reports" 
        subtitle="Analytics and performance insights"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$273,000</p>
                </div>
                <div className="p-3 bg-success/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
              <p className="text-sm text-success mt-2">+18% from last period</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Per Client</p>
                  <p className="text-2xl font-bold">$1,101</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-success mt-2">+5% from last period</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Returns Filed</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="p-3 bg-info/10 rounded-xl">
                  <FileText className="w-6 h-6 text-info" />
                </div>
              </div>
              <p className="text-sm text-success mt-2">On track for season</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl">
                  <PieChart className="w-6 h-6 text-warning" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Above target</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue vs Expenses</CardTitle>
                  <CardDescription>Monthly comparison for current year</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
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
                      dataKey="revenue" 
                      stroke="hsl(var(--success))" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="hsl(var(--destructive))" 
                      fillOpacity={1} 
                      fill="url(#colorExpenses)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Client Distribution</CardTitle>
              <CardDescription>By client type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={clientDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {clientDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Downloads */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Download detailed analysis reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {reportTypes.map((report, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <report.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={report.status === "Ready" ? "outline" : "ghost"}
                    disabled={report.status !== "Ready"}
                  >
                    {report.status === "Ready" ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    ) : (
                      <span className="text-muted-foreground">Generating...</span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Reports;
