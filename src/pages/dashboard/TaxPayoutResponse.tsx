import { Receipt, Search, Filter, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaxPayoutResponse = () => {
  const payouts = [
    { id: "TPR-001234", reference: "REF-A1B2C3", amount: "KES 125,000", taxpayer: "ABC Limited", date: "2024-01-15", responseCode: "00", status: "success" },
    { id: "TPR-001235", reference: "REF-D4E5F6", amount: "KES 85,500", taxpayer: "XYZ Corp", date: "2024-01-14", responseCode: "01", status: "pending" },
    { id: "TPR-001236", reference: "REF-G7H8I9", amount: "KES 250,000", taxpayer: "Tech Solutions", date: "2024-01-14", responseCode: "00", status: "success" },
    { id: "TPR-001237", reference: "REF-J0K1L2", amount: "KES 45,200", taxpayer: "Retail Hub", date: "2024-01-13", responseCode: "99", status: "error" },
    { id: "TPR-001238", reference: "REF-M3N4O5", amount: "KES 178,900", taxpayer: "Smart Services", date: "2024-01-12", responseCode: "01", status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Success</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "error":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><AlertCircle className="w-3 h-3 mr-1" /> Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Responses</p>
                <p className="text-3xl font-bold">2,456</p>
              </div>
              <Receipt className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Successful</p>
                <p className="text-3xl font-bold">2,189</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-rose-500 text-white border-0 shadow-lg shadow-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Errors</p>
                <p className="text-3xl font-bold">67</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <Receipt className="w-5 h-5" /> Tax Payout Responses
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search responses..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-orange-200 hover:bg-orange-50">
                <Filter className="w-4 h-4 text-orange-500" />
              </Button>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Response ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Taxpayer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Response Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-orange-600 font-medium">{payout.id}</td>
                    <td className="px-4 py-3 font-mono text-sm">{payout.reference}</td>
                    <td className="px-4 py-3 font-medium">{payout.taxpayer}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{payout.amount}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={payout.responseCode === "00" ? "border-green-300 text-green-600" : payout.responseCode === "99" ? "border-red-300 text-red-600" : "border-yellow-300 text-yellow-600"}>
                        {payout.responseCode}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{payout.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(payout.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-orange-100 hover:text-orange-600">
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

export default TaxPayoutResponse;
