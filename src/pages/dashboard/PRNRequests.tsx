import { useState, useEffect } from "react";
import { FileText, Plus, Eye, RefreshCw, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/services/api"; 

interface PRNRequest {
  id?: number;
  ref?: string | number;
  transDate?: string;
  amount?: number | string;
  taxType?: string;
  prn?: string;
  kra?: string;
  safaricom?: string;
  trxCode?: string;
  status?: string;
  [key: string]: any;
}

const PRNRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<PRNRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    transDate: "",
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
      
      const data = res.data?.data || [];
      
      console.log("PRN Requests received:", data);
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
    if (!formData.transDate || !formData.amount || !formData.taxType) {
      setFormError("All fields are required");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const payload = {
        transDate: formData.transDate,
        amount: parseFloat(formData.amount),
        taxType: formData.taxType,
      };

      console.log("Saving PRN request:", payload);
      await api.post("/pRNRequest", payload);
      
      await fetchPRNs();

      setFormData({ transDate: "", amount: "", taxType: "" });
      setShowForm(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err.response?.data?.message || "Failed to save PRN request");
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = async (id: number) => {
    try {
      console.log("Retrying payment for ID:", id);
      await api.post(`/withdrawalRetry/${id}`);
      await fetchPRNs();
    } catch (err: any) {
      console.error("Retry error:", err);
      alert("Failed to retry payment");
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (r.ref && r.ref.toString().includes(search)) ||
      (r.amount && r.amount.toString().includes(search)) ||
      (r.taxType && r.taxType.toLowerCase().includes(search)) ||
      (r.prn && r.prn.toLowerCase().includes(search)) ||
      (r.trxCode && r.trxCode.toLowerCase().includes(search))
    );
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch {
      return dateStr;
    }
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

        {showForm && (
          <CardContent className="space-y-6 p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-900">New PRN Request</h2>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <div className="space-y-2">
              <Label>Transaction Date *</Label>
              <input
                type="date"
                className="input border-blue-300 w-full px-3 py-2 rounded border"
                value={formData.transDate}
                onChange={(e) => setFormData({ ...formData, transDate: e.target.value })}
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
                <option value="EXCISE">EXCISE (Deposits)</option>
                <option value="IT_WHT_0222">IT_WHT_0222 (Withholdings)</option>
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
              </div>
            ) : (
              <table className="w-full text-sm min-w-[1000px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left">#Ref</th>
                    <th className="px-4 py-3 text-left">Trans Date</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Tax Type</th>
                    <th className="px-4 py-3 text-left">PRN</th>
                    <th className="px-4 py-3 text-left">KRA</th>
                    <th className="px-4 py-3 text-left">Safaricom</th>
                    <th className="px-4 py-3 text-left">TRX Code</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r, i) => (
                    <tr key={r.id || i} className="hover:bg-blue-50 transition-colors border-b">
                      <td className="px-4 py-3 font-mono text-blue-600 font-semibold">
                        {r.ref || r.id || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {formatDate(r.transDate)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {r.amount ? `KES ${parseFloat(r.amount.toString()).toLocaleString()}` : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">
                          {r.taxType || "-"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {r.prn || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {r.kra ? (
                          <Badge className={r.kra.includes("Success") ? "bg-green-500 text-white text-xs" : "bg-red-500 text-white text-xs"}>
                            {r.kra.substring(0, 20)}...
                          </Badge>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-xs truncate" title={r.safaricom}>
                        {r.safaricom || "-"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {r.trxCode || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {r.id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRetryPayment(r.id!)}
                              title="Retry payment"
                            >
                              <RotateCcw className="w-4 h-4 text-orange-600" />
                            </Button>
                          )}
                        </div>
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
