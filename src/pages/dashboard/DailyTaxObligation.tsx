import { CalendarCheck, Search, Filter, Download, Eye, TrendingUp, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DailyTaxObligation = () => {
  const obligations: { date: string; totalStakes: string; taxableAmount: string; taxRate: string; taxDue: string; status: string }[] = [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Paid</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Calendar className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "overdue":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><Calendar className="w-3 h-3 mr-1" /> Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-emerald-600 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" /> Daily Tax Obligations
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by date..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-emerald-200 hover:bg-emerald-50">
                <Filter className="w-4 h-4 text-emerald-500" />
              </Button>
              <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total Stakes</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Taxable Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax Rate</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax Due</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {obligations.map((item, index) => (
                  <tr key={index} className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-emerald-600">{item.date}</td>
                    <td className="px-4 py-3 font-medium">{item.totalStakes}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.taxableAmount}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50">{item.taxRate}</Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">{item.taxDue}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-emerald-100 hover:text-emerald-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTaxObligation;
