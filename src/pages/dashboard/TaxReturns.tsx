import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TaxReturns = () => {
  const returns = [
    { id: 1, client: "Sarah Johnson", type: "1040", year: 2023, status: "Completed", dueDate: "Apr 15, 2024", amount: "$12,450" },
    { id: 2, client: "ABC Corporation", type: "1120", year: 2023, status: "In Progress", dueDate: "Mar 15, 2024", amount: "$45,200" },
    { id: 3, client: "Michael Chen", type: "1040", year: 2023, status: "Pending Review", dueDate: "Apr 15, 2024", amount: "$8,900" },
    { id: 4, client: "Tech Startup Inc", type: "1120S", year: 2023, status: "Draft", dueDate: "Mar 15, 2024", amount: "$23,100" },
    { id: 5, client: "Emily Davis", type: "1040", year: 2023, status: "Completed", dueDate: "Apr 15, 2024", amount: "$15,800" },
    { id: 6, client: "Global Enterprises", type: "1120", year: 2023, status: "In Progress", dueDate: "Mar 15, 2024", amount: "$89,400" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-warning" />;
      case "Pending Review":
        return <AlertCircle className="w-4 h-4 text-info" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "Pending Review":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <>
      <DashboardHeader 
        title="Tax Returns" 
        subtitle="Manage and track all tax returns"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Returns</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-xl">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-info/10 rounded-xl">
                <AlertCircle className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">20</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Returns List */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Tax Returns</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search returns..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button className="gradient-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Return
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returns.map((taxReturn) => (
                <div 
                  key={taxReturn.id} 
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{taxReturn.client}</p>
                      <p className="text-sm text-muted-foreground">
                        Form {taxReturn.type} • Tax Year {taxReturn.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{taxReturn.amount}</p>
                      <p className="text-sm text-muted-foreground">Due: {taxReturn.dueDate}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(taxReturn.status)}>
                      {getStatusIcon(taxReturn.status)}
                      <span className="ml-1.5">{taxReturn.status}</span>
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TaxReturns;
