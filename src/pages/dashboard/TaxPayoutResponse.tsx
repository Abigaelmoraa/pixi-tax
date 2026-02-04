import { useState, useEffect } from "react";
import { Receipt, Search, Filter, Eye, CheckCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

interface Payout {
  id?: number;
  ref?: string;
  timeIn?: string;
  amount?: string | number;
  transactionId?: string;
  billReference?: string;
  resultCode?: string;
  resultDescription?: string;
  status?: string;
  [key: string]: any;
}

const TaxPayoutResponse = () => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await api.get("/taxPayoutResponse");
      
      // Handle different response structures
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("Tax Payout responses:", data);
      setPayouts(data);

    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch Tax Payouts");
      setPayouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return (
          <Badge className="bg-green-500 text-white border-0 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Success
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white border-0 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case "error":
      case "failed":
        return (
          <Badge className="bg-red-500 text-white border-0 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Error
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Filter payouts based on search term
  const filteredPayouts = payouts.filter((p) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (p.ref && p.ref.toLowerCase().includes(search)) ||
      (p.transactionId && p.transactionId.toLowerCase().includes(search)) ||
      (p.billReference && p.billReference.toLowerCase().includes(search)) ||
      (p.id && p.id.toString().includes(search))
    );
  });

  const formatCurrency = (value?: string | number) => {
    if (!value) return "KES 0";
    return `KES ${parseFloat(value.toString()).toLocaleString()}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-orange-200 to-amber-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Receipt className="w-5 h-5" /> Tax Payout Responses
            </CardTitle>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchPayouts}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        {error && !loading && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading tax payout responses...</p>
            </div>
          ) : filteredPayouts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">
                {searchTerm ? "No tax payout responses match your search" : "No tax payout responses found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#Ref</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time In</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bill Reference</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Result Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Result Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredPayouts.map((payout, index) => (
                    <tr
                      key={payout.id || index}
                      className="hover:bg-orange-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-orange-600 font-medium">
                        {payout.ref || payout.id || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs">{formatDate(payout.timeIn)}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {formatCurrency(payout.amount)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{payout.transactionId || "-"}</td>
                      <td className="px-4 py-3 font-mono text-xs">{payout.billReference || "-"}</td>
                      <td className="px-4 py-3">
                        {payout.resultCode ? (
                          <Badge 
                            variant="outline" 
                            className={payout.resultCode === "0" ? "text-green-600 border-green-300" : "text-red-600 border-red-300"}
                          >
                            {payout.resultCode}
                          </Badge>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-xs truncate" title={payout.resultDescription}>
                        {payout.resultDescription || "-"}
                      </td>
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPayoutResponse;