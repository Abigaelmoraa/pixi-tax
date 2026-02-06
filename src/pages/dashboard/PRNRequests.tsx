import { useState, useEffect } from "react";
import { FileText, Plus, Eye, RefreshCw, Search, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  createdAt?: string;
  updatedAt?: string;
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
      console.log("✓ PRN requests fetched successfully:", res.data);
      
      let data: PRNRequest[];
      
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (res.data?.prodPrnLog && Array.isArray(res.data.prodPrnLog)) {
        data = res.data.prodPrnLog;
      } else if (res.data?.results && Array.isArray(res.data.results)) {
        data = res.data.results;
      } else {
        console.warn("Unexpected response structure:", res.data);
        data = [];
      }
      
      setRequests(data);
      
    } catch (err: any) {
      console.error("Error fetching PRN requests:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText;
        
        if (status === 401) {
          setError("Unauthorized. Please log in to view PRN requests.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view PRN requests.");
        } else if (status === 404) {
          setError("PRN requests endpoint not found. Please check API configuration.");
        } else if (status === 500) {
          setError(`Server error: ${message}`);
        } else {
          setError(`Error (${status}): ${message}`);
        }
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError(err.message || "Failed to fetch PRN requests");
      }
      
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

      console.log("Creating PRN request:", payload);
      await api.post("/pRNRequest", payload);
      console.log("✓ PRN request created successfully");
       await fetchPRNs();

      // Reset form
      setFormData({ transDate: "", amount: "", taxType: "" });
      setShowForm(false);
    } catch (err: any) {
      console.error("Error creating PRN request:", err);
      
      if (err.response) {
        const message = err.response.data?.message || err.response.statusText;
        setFormError(`Failed to request: ${message}`);
      } else if (err.request) {
        setFormError("No response from server. Please check your connection.");
      } else {
        setFormError(err.message || "Failed to request PRN");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = async (id: number) => {
    try {
      console.log("Retrying payment for ID:", id);
      
      await api.post(`/withdrawalRetry/${id}`);
      console.log("✓ Payment retry initiated");
      
      // Refresh the list
      await fetchPRNs();
    } catch (err: any) {
      console.error("Retry error:", err);
      
      const message = err.response?.data?.message || "Failed to retry payment";
      alert(`Error: ${message}`);
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
      return date.toLocaleString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value?: string | number) => {
    if (!value) return "-";
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return "-";
    return `KES ${numValue.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-900 text-lg font-bold">
                <FileText className="w-5 h-5" /> PRN Requests
              </CardTitle>
              <p className="text-blue-700 text-sm mt-1">
                {requests.length} {requests.length === 1 ? 'record' : 'records'}
              </p>
            </div>

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
                    title="Refresh data"
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
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-1">Error Loading PRN Requests</div>
              <div className="text-sm">{error}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchPRNs}
                className="mt-3"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {showForm && (
          <CardContent className="space-y-6 p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-900">New PRN Request</h2>
            
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Transaction Date *</Label>
              <input
                type="date"
                className="input border-blue-300 w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.transDate}
                onChange={(e) => setFormData({ ...formData, transDate: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount *</Label>
              <input
                type="number"
                step="0.01"
                className="input border-blue-300 w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Tax Type *</Label>
              <select
                className="input border-blue-300 w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.taxType}
                onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                disabled={loading}
              >
                <option value="">Select tax type</option>
                <option value="EXCISE">EXCISE (Deposits)</option>
                <option value="WITHHOLDINGS">WITHHOLDINGS (Withdrawals)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowForm(false);
                  setFormError("");
                }} 
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Requesting..." : "Request"}
              </Button>
            </div>
          </CardContent>
        )}

        {!showForm && !error && (
          <CardContent className="p-0 overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                <p className="text-gray-600">Loading PRN requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">
                  {searchTerm ? "No PRN requests match your search" : "No PRN requests found"}
                </p>
                {!searchTerm && (
                  <p className="text-sm mt-2">Click "New" to create your first PRN request</p>
                )}
              </div>
            ) : (
              <table className="w-full text-sm min-w-[1000px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">#Ref</th>
                    <th className="px-4 py-3 text-left font-bold">Trans Date</th>
                    <th className="px-4 py-3 text-left font-bold">Amount</th>
                    <th className="px-4 py-3 text-left font-bold">Tax Type</th>
                    <th className="px-4 py-3 text-left font-bold">PRN</th>
                    <th className="px-4 py-3 text-left font-bold">KRA</th>
                    <th className="px-4 py-3 text-left font-bold">Safaricom</th>
                    <th className="px-4 py-3 text-left font-bold">TRX Code</th>
                    <th className="px-4 py-3 text-left font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r, i) => (
                    <tr key={r.id || i} className="hover:bg-blue-50 transition-colors border-b">
                      <td className="px-4 py-3 font-mono text-blue-600 font-semibold">
                        {r.ref || r.id || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        {formatDate(r.transDate)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap">
                        {formatCurrency(r.amount)}
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
                          <Badge 
                            className={
                              r.kra.toLowerCase().includes("success") 
                                ? "bg-green-500 text-white text-xs" 
                                : "bg-red-500 text-white text-xs"
                            }
                          >
                            {r.kra.length > 20 ? `${r.kra.substring(0, 20)}...` : r.kra}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-xs">
                        <div className="truncate" title={r.safaricom}>
                          {r.safaricom || "-"}
                        </div>
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
                            className="hover:bg-blue-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {r.id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRetryPayment(r.id!)}
                              title="Retry payment"
                              className="hover:bg-orange-100"
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