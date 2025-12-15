import { Receipt, Search, Filter, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaxPayoutResponse = () => {
  const payouts: { id: string; reference: string; amount: string; taxpayer: string; date: string; responseCode: string; status: string }[] = [];

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
