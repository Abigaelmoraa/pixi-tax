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
  charges?: string;
  netPayout?: string;
  sourceIp: string;
  transactionId: string;
  approved: string;
  sentTo: string;
  apiResponse: string;
  status: string;
  time?: string;
}

const WithdrawalRequest = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<WithdrawalRequestFormData>({
    msisdn: "",
    amount: "",
    sourceIp: "",
    transactionId: "",
    approved: "",
    sentTo: "",
    apiResponse: "",
    status: "PENDING",
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestFormData[]>([]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await api.get("/withdrawalRequest");

      const rawData = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      const mappedData = rawData.map((item: any) => ({
        id: item.id,
        time: item.CreatedAt,
        msisdn: item.Msisdn,
        amount: item.Amount,
        charges: item.charges || "0",
        netPayout: item.net_payout || "0",
        sourceIp: item.SourceIp,
        transactionId: item.TransactionID,
        approved: item.approved === 1 ? "Yes" : "No",
        sentTo: item.sent === 1 ? "Done" : "Pending",
        apiResponse: item.ApiResponse || "-",
        status: item.sent === 1 ? "SENT" : "PENDING",
      }));

      setWithdrawals(mappedData);
    } catch (err: any) {
      setError("Failed to fetch withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/withdrawalRequest", formData);
      await fetchWithdrawals();
      setShowForm(false);
      setFormData({
        msisdn: "",
        amount: "",
        sourceIp: "",
        transactionId: "",
        approved: "",
        sentTo: "",
        apiResponse: "",
        status: "PENDING",
      });
    } catch (err: any) {
      setError("Failed to save withdrawal request");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value?: string) => {
    if (!value) return "-";
    return `KES ${parseFloat(value).toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SENT":
        return <Badge className="bg-blue-500 text-white">Sent</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200">
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-2 items-center text-blue-900">
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
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        {/* ================= FORM PAGE ================= */}
        {showForm && (
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Msisdn" value={formData.msisdn}
                onChange={(e) => setFormData({ ...formData, msisdn: e.target.value })} />

              <Input placeholder="Amount" value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />

              <Input placeholder="Source IP" value={formData.sourceIp}
                onChange={(e) => setFormData({ ...formData, sourceIp: e.target.value })} />

              <Input placeholder="Transaction ID" value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} />

              <Input placeholder="Approved (Yes / No)" value={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.value })} />

              <Input placeholder="Sent (Done / Pending)" value={formData.sentTo}
                onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })} />

              <Input placeholder="Api Response" value={formData.apiResponse}
                onChange={(e) => setFormData({ ...formData, apiResponse: e.target.value })} />

              <div className="col-span-full flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* ================= TABLE PAGE ================= */}
        {!showForm && (
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3">#Ref</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Msisdn</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Charges</th>
                  <th className="px-4 py-3">Net Payout</th>
                  <th className="px-4 py-3">SourceIp</th>
                  <th className="px-4 py-3">TransactionId</th>
                  <th className="px-4 py-3">Approved</th>
                  <th className="px-4 py-3">Sent To</th>
                  <th className="px-4 py-3">ApiResponse</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {withdrawals.map((w, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3">{w.id}</td>
                    <td className="px-4 py-3">{w.time}</td>
                    <td className="px-4 py-3">{w.msisdn}</td>
                    <td className="px-4 py-3">{formatCurrency(w.amount)}</td>
                    <td className="px-4 py-3">{formatCurrency(w.charges)}</td>
                    <td className="px-4 py-3">{formatCurrency(w.netPayout)}</td>
                    <td className="px-4 py-3">{w.sourceIp}</td>
                    <td className="px-4 py-3">{w.transactionId}</td>
                    <td className="px-4 py-3">{w.approved}</td>
                    <td className="px-4 py-3">{w.sentTo}</td>
                    <td className="px-4 py-3">{w.apiResponse}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequest;
