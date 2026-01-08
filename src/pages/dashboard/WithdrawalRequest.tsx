import { useState, useEffect } from "react";
import { Wallet, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const api = axios.create({
  baseURL: "https://db.x1.pitch90agent.com", 
  headers: {
    "Content-Type": "application/json",
  },
});
interface WithdrawalRequestFormData {
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

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        setLoading(true);
        const res = await api.get("/withdrawalRequest"); 
        setWithdrawals(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch withdrawals");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);
//save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/withdrawalRequest", formData); 
      setWithdrawals([res.data, ...withdrawals]);
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
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "sent":
        return <Badge className="bg-blue-500 text-white">Sent</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">

        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200">
          <div className="flex items-center w-full">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Wallet className="w-5 h-5" />
              Withdrawal Requests
            </CardTitle>

            {!showForm && (
              <Button
                className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Form */}
        {showForm && (
          <CardContent className="bg-blue-50 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-blue-900">New Withdrawal Request</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <Input
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                    value={formData[key as keyof WithdrawalRequestFormData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    required={key !== "apiResponse"}
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Table */}
        {!showForm && (
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-muted/50">
                  <tr>
                    {Object.keys(formData).map((key) => (
                      <th key={key} className="px-4 py-3 text-left">
                        {key}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="text-center py-6">
                        Loading...
                      </td>
                    </tr>
                  ) : withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="text-center py-6">
                        No withdrawal requests
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((w, index) => (
                      <tr key={index}>
                        {Object.keys(w).map((key) => (
                          <td key={key} className="px-4 py-3">
                            {key === "status"
                              ? getStatusBadge(
                                  w[key as keyof WithdrawalRequestFormData]
                                )
                              : w[key as keyof WithdrawalRequestFormData]}
                          </td>
                        ))}
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
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequest;
