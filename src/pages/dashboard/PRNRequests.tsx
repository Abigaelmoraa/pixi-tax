import { useState, useEffect } from "react";
import { FileText, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/services/api"; // Axios instance with baseURL

interface PRNRequest {
  ref: string;
  transactionDate: string;
  amount: string;
  taxType: string;
  prn: string;
  kra: string;
  safaricom: string;
  trxCode: string;
  status: string;
}

const PRNRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<PRNRequest[]>([]);
  const [formData, setFormData] = useState({
    transactionDate: "",
    amount: "",
    taxType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch PRN Requests from backend
  useEffect(() => {
    const fetchPRNs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/prodPrnLog"); // Endpoint from your API docs
        setRequests(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch PRN requests");
      } finally {
        setLoading(false);
      }
    };

    fetchPRNs();
  }, []);

  // Save new PRN request
  const handleSave = async () => {
    if (!formData.transactionDate || !formData.amount || !formData.taxType) return;

    const newPRN = {
      transactionDate: formData.transactionDate,
      amount: formData.amount,
      taxType: formData.taxType,
      ref: `PRN-${Date.now()}`,
      prn: "N/A",
      kra: "N/A",
      safaricom: "N/A",
      trxCode: "N/A",
      status: "Pending",
    };

    try {
      const res = await api.post("/prodPrnLog", newPRN);
      setRequests([res.data, ...requests]);
      setFormData({ transactionDate: "", amount: "", taxType: "" });
      setShowForm(false);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save PRN request");
    }
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">

        {/* HEADER */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-2">
          <div className="flex items-center w-full">
            <CardTitle className="flex items-center gap-2 text-blue-900 text-lg font-bold">
              <FileText className="w-5 h-5" />
              PRN Requests
            </CardTitle>

            {!showForm && (
              <Button
                size="sm"
                className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-1"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4" />
                New
              </Button>
            )}
          </div>
        </CardHeader>

        {/* FORM */}
        {showForm && (
          <CardContent className="space-y-6 p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-900">
              New PRN Request
            </h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
              <Label>Transaction Date</Label>
              <input
                type="date"
                className="input border-blue-300"
                value={formData.transactionDate}
                onChange={(e) =>
                  setFormData({ ...formData, transactionDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <input
                type="number"
                placeholder="Enter amount"
                className="input border-blue-300"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Tax Type</Label>
              <select
                className="input border-blue-300"
                value={formData.taxType}
                onChange={(e) =>
                  setFormData({ ...formData, taxType: e.target.value })
                }
              >
                <option value="">Select tax type</option>
                <option value="Exercise (Deposits)">Exercise (Deposits)</option>
                <option value="Withholdings (Withdrawals)">Withholdings (Withdrawals)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </CardContent>
        )}

        {/* TABLE */}
        {!showForm && (
          <CardContent className="p-0 overflow-x-auto">
            {loading ? (
              <p className="text-center py-6">Loading...</p>
            ) : error ? (
              <p className="text-center py-6 text-red-500">{error}</p>
            ) : (
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left">#Ref</th>
                    <th className="px-4 py-3 text-left">Trans Date</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Tax Type</th>
                    <th className="px-4 py-3 text-left">PRN</th>
                    <th className="px-4 py-3 text-left">KRA</th>
                    <th className="px-4 py-3 text-left">Safaricom</th>
                    <th className="px-4 py-3 text-left">TRX CODE</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-6">
                        No PRN requests
                      </td>
                    </tr>
                  ) : (
                    requests.map((r, i) => (
                      <tr key={i} className="hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-blue-600">{r.ref}</td>
                        <td className="px-4 py-3">{r.transactionDate}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{r.amount}</td>
                        <td className="px-4 py-3">{r.taxType}</td>
                        <td className="px-4 py-3">{r.prn}</td>
                        <td className="px-4 py-3">{r.kra}</td>
                        <td className="px-4 py-3">{r.safaricom}</td>
                        <td className="px-4 py-3">{r.trxCode}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-yellow-500 text-white">{r.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PRNRequests;
