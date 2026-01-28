import { useState, useEffect } from "react";
import { Receipt, Search, Filter, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

interface Payout {
  ref: string;
  timeIn: string;
  amount: string;
  transactionId: string;
  billReference: string;
  resultCode: string;
  resultDescription: string;
  status: string;
}

const TaxPayoutResponse = () => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data from backend
  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/taxPayoutResponse");
        setPayouts(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch Tax Payouts");
      } finally {
        setLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CheckCircle className="w-3 h-3 mr-1" /> Success
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            <AlertCircle className="w-3 h-3 mr-1" /> Error
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter payouts based on search term
  const filteredPayouts = payouts.filter(
    (p) =>
      p.ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.billReference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-orange-100 to-amber-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <Receipt className="w-5 h-5" /> Tax Payout Responses
            </CardTitle>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search "
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="border-orange-200 hover:bg-orange-50">
                <Filter className="w-4 h-4 text-orange-500" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">TimeIn</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bill Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Result Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Result Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-red-500">{error}</td>
                  </tr>
                ) : filteredPayouts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">No data available</td>
                  </tr>
                ) : (
                  filteredPayouts.map((payout, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-orange-600 font-medium">{payout.ref}</td>
                      <td className="px-4 py-3">{payout.timeIn}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">{payout.amount}</td>
                      <td className="px-4 py-3">{payout.transactionId}</td>
                      <td className="px-4 py-3">{payout.billReference}</td>
                      <td className="px-4 py-3">{payout.resultCode}</td>
                      <td className="px-4 py-3">{payout.resultDescription}</td>
                      <td className="px-4 py-3">{getStatusBadge(payout.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-orange-100 hover:text-orange-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPayoutResponse;
