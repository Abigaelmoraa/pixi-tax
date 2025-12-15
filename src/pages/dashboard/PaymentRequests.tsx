import { CreditCard, Search, Filter, Plus, Eye, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PaymentRequests = () => {
  const payments = [
    { id: "PAY-001234", payer: "ABC Limited", amount: "KES 125,000", method: "M-Pesa", date: "2024-01-15", status: "completed" },
    { id: "PAY-001235", payer: "XYZ Corp", amount: "KES 85,500", method: "Bank Transfer", date: "2024-01-14", status: "pending" },
    { id: "PAY-001236", payer: "Tech Solutions", amount: "KES 250,000", method: "M-Pesa", date: "2024-01-14", status: "completed" },
    { id: "PAY-001237", payer: "Retail Hub", amount: "KES 45,200", method: "Card", date: "2024-01-13", status: "failed" },
    { id: "PAY-001238", payer: "Smart Services", amount: "KES 178,900", method: "Bank Transfer", date: "2024-01-12", status: "pending" },
    { id: "PAY-001239", payer: "Global Trade", amount: "KES 320,000", method: "M-Pesa", date: "2024-01-11", status: "completed" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "M-Pesa":
        return <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50">M-Pesa</Badge>;
      case "Bank Transfer":
        return <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50">Bank Transfer</Badge>;
      case "Card":
        return <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50">Card</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Payments</p>
                <p className="text-3xl font-bold">KES 12.5M</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg shadow-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Completed</p>
                <p className="text-3xl font-bold">856</p>
              </div>
              <CheckCircle className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending</p>
                <p className="text-3xl font-bold">124</p>
              </div>
              <Clock className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-lg shadow-pink-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Failed</p>
                <p className="text-3xl font-bold">23</p>
              </div>
              <XCircle className="w-10 h-10 text-pink-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-green-200 hover:bg-green-50">
                <Filter className="w-4 h-4 text-green-500" />
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600">
                <Plus className="w-4 h-4 mr-2" /> New Payment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payment ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Method</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-green-600 font-medium">{payment.id}</td>
                    <td className="px-4 py-3 font-medium">{payment.payer}</td>
                    <td className="px-4 py-3">{getMethodBadge(payment.method)}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{payment.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{payment.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
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

export default PaymentRequests;
