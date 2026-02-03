import { useState, useEffect } from "react";
import { Wallet, Plus, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

interface WithdrawalRequestFormData {
  id?: number;
  msisdn: string;
  amount: string;
  charges: string;
  netPayout: string;
  sourceIp: string;
  transactionId: string;
  approved: string;
  sentTo: string;
  apiResponse: string;
  status: string;
}

const WithdrawalRequest = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<WithdrawalRequestFormData>({
    msisdn: "",
    amount: "",
    charges: "",
    netPayout: "",
    sourceIp: "",
    transactionId: "",
    approved: "",
    sentTo: "",
    apiResponse: "",
    status: "PENDING",
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FIXED HERE ONLY
  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/withdrawalRequest");

      const rawData = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      const mappedData = rawData.map((item: any) => ({
        id: item.id,
        msisdn: item.Msisdn || item.msisdn || "",
        amount: item.Amount?.toString() || item.amount || "",
        charges: item.charges?.toString() || item.Charges?.toString() || "",
        netPayout:
          item.net_payout?.toString() ||
          item.NetPayout?.toString() ||
          "",
        sourceIp: item.SourceIp || item.source_ip || "",
        transactionId: item.TransactionID || item.transaction_id || "",
        approved: item.approved || "",
        sentTo: item.sent_to || "",
        apiResponse: item.api_response || "",
        status: item.status || "PENDING",
      }));

      console.log("Mapped withdrawals:", mappedData);
      setWithdrawals(mappedData);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/withdrawalRequest", formData);
      await fetchWithdrawals();
      setShowForm(false);
      setFormData({
        msisdn: "",
        amount: "",
        charges: "",
        netPayout: "",
        sourceIp: "",
        transactionId: "",
        approved: "",
        sentTo: "",
        apiResponse: "",
        status: "PENDING",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save withdrawal request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "sent":
        return <Badge className="bg-blue-500 text-white">Sent</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return "-";
    return `KES ${parseFloat(value).toLocaleString()}`;
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Wallet className="w-5 h-5" />
              Withdrawal Requests
            </CardTitle>

            {!showForm && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchWithdrawals}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        {!showForm && (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left">MSISDN</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Charges</th>
                    <th className="px-4 py-3 text-left">Net Payout</th>
                    <th className="px-4 py-3 text-left">Source IP</th>
                    <th className="px-4 py-3 text-left">Transaction ID</th>
                    <th className="px-4 py-3 text-left">Approved</th>
                    <th className="px-4 py-3 text-left">Sent To</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {withdrawals.map((w, index) => (
                    <tr key={w.id || index} className="border-b">
                      <td className="px-4 py-3">{w.msisdn || "-"}</td>
                      <td className="px-4 py-3">{formatCurrency(w.amount)}</td>
                      <td className="px-4 py-3">{formatCurrency(w.charges)}</td>
                      <td className="px-4 py-3">{formatCurrency(w.netPayout)}</td>
                      <td className="px-4 py-3">{w.sourceIp || "-"}</td>
                      <td className="px-4 py-3">{w.transactionId || "-"}</td>
                      <td className="px-4 py-3">{w.approved || "-"}</td>
                      <td className="px-4 py-3">{w.sentTo || "-"}</td>
                      <td className="px-4 py-3">{getStatusBadge(w.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequest;
