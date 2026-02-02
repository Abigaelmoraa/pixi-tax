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

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/withdrawalRequest");
      
      // ✅ FIX: Handle different response structures
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("Withdrawal data:", data); // Debug log
      setWithdrawals(data);
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

  // Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/withdrawalRequest", formData);
      
      // Refresh the list
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
      console.error("Save error:", err);
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
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Wallet className="w-5 h-5" />
              Withdrawal Requests
            </CardTitle>

            <div className="flex gap-2">
              {!showForm && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchWithdrawals}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Error Banner */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <CardContent className="bg-blue-50 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-blue-900">New Withdrawal Request</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">MSISDN *</label>
                <Input
                  placeholder="e.g. 254712345678"
                  value={formData.msisdn}
                  onChange={(e) => setFormData({ ...formData, msisdn: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Amount *</label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Charges</label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={formData.charges}
                  onChange={(e) => setFormData({ ...formData, charges: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Net Payout</label>
                <Input
                  type="number"
                  placeholder="e.g. 4950"
                  value={formData.netPayout}
                  onChange={(e) => setFormData({ ...formData, netPayout: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Source IP</label>
                <Input
                  placeholder="e.g. 192.168.1.1"
                  value={formData.sourceIp}
                  onChange={(e) => setFormData({ ...formData, sourceIp: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <Input
                  placeholder="e.g. TXN123456"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Approved By</label>
                <Input
                  placeholder="e.g. Admin"
                  value={formData.approved}
                  onChange={(e) => setFormData({ ...formData, approved: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Sent To</label>
                <Input
                  placeholder="e.g. M-Pesa"
                  value={formData.sentTo}
                  onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })}
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">API Response</label>
                <Input
                  placeholder="Optional"
                  value={formData.apiResponse}
                  onChange={(e) => setFormData({ ...formData, apiResponse: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="SENT">Sent</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Table */}
        {!showForm && (
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading withdrawals...</p>
              </div>
            ) : withdrawals.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No withdrawal requests found</p>
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
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
                      <tr key={w.id || index} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3">{w.msisdn || "-"}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">
                          {formatCurrency(w.amount)}
                        </td>
                        <td className="px-4 py-3">{formatCurrency(w.charges)}</td>
                        <td className="px-4 py-3 font-semibold text-blue-600">
                          {formatCurrency(w.netPayout)}
                        </td>
                        <td className="px-4 py-3 text-xs">{w.sourceIp || "-"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{w.transactionId || "-"}</td>
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
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequest;