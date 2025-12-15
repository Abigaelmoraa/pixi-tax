import { FileText, Search, Filter, Plus, Eye, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PRNRequests = () => {
  const requests = [
    { id: "PRN-001234", taxpayer: "ABC Limited", amount: "KES 125,000", date: "2024-01-15", status: "approved", type: "Income Tax" },
    { id: "PRN-001235", taxpayer: "XYZ Corp", amount: "KES 85,500", date: "2024-01-14", status: "pending", type: "VAT" },
    { id: "PRN-001236", taxpayer: "Tech Solutions", amount: "KES 250,000", date: "2024-01-14", status: "approved", type: "Corporate Tax" },
    { id: "PRN-001237", taxpayer: "Retail Hub", amount: "KES 45,200", date: "2024-01-13", status: "rejected", type: "Excise Duty" },
    { id: "PRN-001238", taxpayer: "Smart Services", amount: "KES 178,900", date: "2024-01-12", status: "pending", type: "Income Tax" },
    { id: "PRN-001239", taxpayer: "Global Trade", amount: "KES 320,000", date: "2024-01-11", status: "approved", type: "Import Duty" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-purple-600">PRN Requests</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-purple-200 hover:bg-purple-50">
                <Filter className="w-4 h-4 text-purple-500" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" /> New Request
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">PRN ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Taxpayer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-600 font-medium">{request.id}</td>
                    <td className="px-4 py-3 font-medium">{request.taxpayer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{request.type}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{request.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
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

export default PRNRequests;
