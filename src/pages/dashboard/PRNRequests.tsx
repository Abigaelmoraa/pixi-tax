import { useState, useEffect } from "react";
import { FileText, Plus, Eye, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/services/api"; 

interface PRNRequest {
  id?: number;
  msisdn?: string;
  amount?: number;
  trxCode?: string;
  time_in?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

const PRNRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<PRNRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    transactionDate: "",
    amount: "",
    taxType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchPRNs = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await api.get("/prodPrnLog");
      
      // ✅ FIX: Backend returns { data: [...], meta: {...} }
      const data = res.data?.data || [];
      
      console.log("PRN Requests:", data);
      setRequests(data);
      
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch PRN requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPRNs();
  }, []);

  const handleSave = async () => {
    if (!formData.transactionDate || !formData.amount || !formData.taxType) {
      setFormError("All fields are required");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const payload = {
        transactionDate: formData.transactionDate,
        amount: formData.amount,
        taxType: formData.taxType,
      };

      console.log("Saving PRN request:", payload);
      await api.post("/pRNRequest", payload);
      
      await fetchPRNs();

      setFormData({ transactionDate: "", amount: "", taxType: "" });
      setShowForm(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err.response?.data?.message || "Failed to save PRN request");
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (r.id && r.id.toString().includes(search)) ||
      (r.msisdn && r.msisdn.toLowerCase().includes(search)) ||
      (r.trxCode && r.trxCode.toLowerCase().includes(search))
    );
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr === "0001-01-01T00:00:00Z") return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2 text-blue-900 text-lg font-bold">
              <FileText className="w-5 h-5" /> PRN Requests
            </CardTitle>

            <div className="flex items-center gap-2">
              {!showForm && (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                    onClick={fetchPRNs}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </Button>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-1"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4" /> New
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Info Banner - Shows data is empty */}
        {!loading && requests.length > 0 && requests.every(r => !r.amount && !r.msisdn) && (
          <div className="p-4 bg-yellow-50 border-b border-yellow-200">
            <p className="text-yellow-800 text-sm font-semibold">ℹ️ Notice:</p>
            <p className="text-yellow-700 text-xs mt-1">
              Found {requests.length} PRN request(s), but they contain no data. 
              The records may be placeholders or incomplete submissions.
            </p>
          </div>
        )}

        {showForm && (
          <CardContent className="space-y-6 p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-900">New PRN Request</h2>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <div className="space-y-2">
              <Label>Transaction Date *</Label>
              <input
                type="date"
                className="input border-blue-300 w-full px-3 py-2 rounded border"
                value={formData.transactionDate}
                onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount *</Label>
              <input
                type="number"
                className="input border-blue-300 w-full px-3 py-2 rounded border"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tax Type *</Label>
              <select
                className="input border-blue-300 w-full px-3 py-2 rounded border"
                value={formData.taxType}
                onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
              >
                <option value="">Select tax type</option>
                <option value="Exercise (Deposits)">Exercise (Deposits)</option>
                <option value="Withholdings (Withdrawals)">Withholdings (Withdrawals)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        )}

        {!showForm && (
          <CardContent className="p-0 overflow-x-auto">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading PRN requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">{searchTerm ? "No PRN requests match your search" : "No PRN requests found"}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {requests.length === 0 
                    ? "Click 'New' to create your first PRN request" 
                    : "Try adjusting your search"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">MSISDN</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">TRX Code</th>
                    <th className="px-4 py-3 text-left">Time In</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-blue-50 transition-colors border-b">
                      <td className="px-4 py-3 font-mono text-blue-600">#{r.id || "-"}</td>
                      <td className="px-4 py-3">{r.msisdn || <span className="text-gray-400 italic">empty</span>}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {r.amount ? `KES ${r.amount.toLocaleString()}` : <span className="text-gray-400">KES 0</span>}
                      </td>
                      <td className="px-4 py-3">{r.trxCode || <span className="text-gray-400 italic">empty</span>}</td>
                      <td className="px-4 py-3 text-xs">{formatDate(r.time_in)}</td>
                      <td className="px-4 py-3 text-xs">{formatDate(r.CreatedAt)}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
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