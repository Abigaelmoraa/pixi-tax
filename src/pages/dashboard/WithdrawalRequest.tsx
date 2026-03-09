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
  const [error, setError] = useState<string | null>(null);

  const emptyForm: WithdrawalRequestFormData = {
    msisdn: "",
    amount: "",
    sourceIp: "",
    transactionId: "",
    approved: "",
    sentTo: "",
    apiResponse: "",
    status: "PENDING",
  };

  const [formData, setFormData] = useState<WithdrawalRequestFormData>(emptyForm);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestFormData[]>([]);

  const fetchWithdrawals = async () => {
    try {
      const res = await api.get("/withdrawalRequest");
      const rawData = Array.isArray(res.data) ? res.data : res.data?.data || [];

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
    } catch (error) {
      console.error("Failed to fetch withdrawals", error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.msisdn || !formData.amount) {
      setError("Msisdn and Amount are required.");
      return;
    }

    try {
      setLoading(true);

      // Map camelCase formData → API field names the backend expects
      const payload = {
        Msisdn: formData.msisdn,
        Amount: formData.amount,
        SourceIp: formData.sourceIp,
        TransactionID: formData.transactionId,
        approved: formData.approved === "Yes" ? 1 : 0,
        sent: formData.sentTo === "Done" ? 1 : 0,
        ApiResponse: formData.apiResponse,
        status: formData.status,
      };

      await api.post("/withdrawalRequest", payload);
      await fetchWithdrawals();
      setShowForm(false);
      setFormData(emptyForm);
    } catch (err: any) {
      console.error("Failed to save withdrawal", err);
      setError(
        err?.response?.data?.message || "Failed to save. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value?: string) =>
    value ? `KES ${parseFloat(value).toLocaleString()}` : "-";

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

        {/* ================= FORM ================= */}
        {showForm && (
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Msisdn <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. 254712345678"
                  value={formData.msisdn}
                  onChange={(e) =>
                    setFormData({ ...formData, msisdn: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Amount <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 1000"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Source IP</label>
                <Input
                  placeholder="e.g. 192.168.1.10"
                  value={formData.sourceIp}
                  onChange={(e) =>
                    setFormData({ ...formData, sourceIp: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Transaction ID</label>
                <Input
                  placeholder="Auto / Manual reference"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Approved</label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={formData.approved}
                  onChange={(e) =>
                    setFormData({ ...formData, approved: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Sent</label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={formData.sentTo}
                  onChange={(e) =>
                    setFormData({ ...formData, sentTo: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">API Response</label>
                <Input
                  placeholder="Response from payment API"
                  value={formData.apiResponse}
                  onChange={(e) =>
                    setFormData({ ...formData, apiResponse: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setError(null);
                    setFormData(emptyForm);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white min-w-[80px]"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* ================= TABLE ================= */}
        {!showForm && (
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-blue-50">
                <tr>
                  {["#Ref","Time","Msisdn","Amount","Charges","Net Payout","SourceIp","TransactionId","Approved","Sent To","ApiResponse","Action"].map(
                    (h) => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-gray-400">
                      No withdrawal requests found.
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((w, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{w.id}</td>
                      <td className="px-4 py-3 text-sm">{w.time}</td>
                      <td className="px-4 py-3 text-sm">{w.msisdn}</td>
                      <td className="px-4 py-3 text-sm">{formatCurrency(w.amount)}</td>
                      <td className="px-4 py-3 text-sm">{formatCurrency(w.charges)}</td>
                      <td className="px-4 py-3 text-sm">{formatCurrency(w.netPayout)}</td>
                      <td className="px-4 py-3 text-sm">{w.sourceIp}</td>
                      <td className="px-4 py-3 text-sm">{w.transactionId}</td>
                      <td className="px-4 py-3 text-sm">{w.approved}</td>
                      <td className="px-4 py-3 text-sm">{w.sentTo}</td>
                      <td className="px-4 py-3 text-sm">{w.apiResponse}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequest;