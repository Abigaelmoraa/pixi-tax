import { Smartphone, Search, Filter, Plus, Eye, CheckCircle, Clock, XCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STKPushRequest = () => {
  const stkRequests = [
    { id: "STK-001234", phone: "0712345678", amount: "KES 5,000", reference: "TAX-001", date: "2024-01-15 14:30", status: "completed" },
    { id: "STK-001235", phone: "0723456789", amount: "KES 12,500", reference: "TAX-002", date: "2024-01-15 14:25", status: "pending" },
    { id: "STK-001236", phone: "0734567890", amount: "KES 8,200", reference: "TAX-003", date: "2024-01-15 14:20", status: "completed" },
    { id: "STK-001237", phone: "0745678901", amount: "KES 3,500", reference: "TAX-004", date: "2024-01-15 14:15", status: "failed" },
    { id: "STK-001238", phone: "0756789012", amount: "KES 25,000", reference: "TAX-005", date: "2024-01-15 14:10", status: "completed" },
    { id: "STK-001239", phone: "0767890123", amount: "KES 7,800", reference: "TAX-006", date: "2024-01-15 14:05", status: "expired" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      case "expired":
        return <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-pink-600 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> STK Push Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-pink-200 hover:bg-pink-50">
                <Filter className="w-4 h-4 text-pink-500" />
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600">
                <Send className="w-4 h-4 mr-2" /> Send STK Push
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Request ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Phone Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date/Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stkRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-pink-600 font-medium">{request.id}</td>
                    <td className="px-4 py-3 font-mono">{request.phone}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{request.reference}</td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{request.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="hover:bg-pink-100 hover:text-pink-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(request.status === "failed" || request.status === "expired") && (
                          <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
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

export default STKPushRequest;
