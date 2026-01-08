import { useState, useEffect } from "react";
import { Wallet, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

/* ================= TYPES ================= */
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

const WithdrawalRequestLog = () => {
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

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestFormData[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        setLoading(true);
        const res = await api.get("/withdrawalRequest");
        setWithdrawals(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch withdrawals"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  /* ================= SAVE DATA ================= */
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
      setError(
        err.response?.data?.message || "Failed to save withdrawal request"
      );
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

        {/* ================= HEADER ================= */}
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

        {/* ================= FORM ================= */}
        {showForm ? (
          <CardContent>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  value={formData[key as keyof WithdrawalRequestFormData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  required={key !== "apiResponse"}
                />
              ))}

              <div className="col-span-2 flex justify-end gap-2 pt-4">
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
        ) : (
          /* ================= TABLE ================= */
          <CardContent className="p-0">
            <table className="w-full">
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
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WithdrawalRequestLog;
