import { useState, useEffect } from "react";
import { Smartphone, Search, Filter, Eye, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/services/api";

interface STKRequest {
  id?: number;
  timeIn?: string;
  phoneNumber?: string;
  amount?: number | string;
  mpesaReceipt?: string;
  resultDesc?: string;
  misc5?: string;
  status?: string;
  [key: string]: any;
}

const STKPushRequest = () => {
  const [stkRequests, setStkRequests] = useState<STKRequest[]>([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [formData, setFormData] = useState({
    timeIn: "",
    phoneNumber: "",
    amount: "",
    mpesaReceipt: "",
    resultDesc: "",
    misc5: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  // Fetch STK Push Requests
  const fetchSTK = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await api.get("/sTKCallback");
      
      // Handle different response structures
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("STK Push requests:", data);
      setStkRequests(data);

    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch STK Push requests");
      setStkRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSTK();
  }, []);

  // Save new request
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.amount) {
      setFormError("Phone number and amount are required");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const payload = {
        timeIn: formData.timeIn || new Date().toISOString(),
        phoneNumber: formData.phoneNumber,
        amount: parseFloat(formData.amount),
        mpesaReceipt: formData.mpesaReceipt,
        resultDesc: formData.resultDesc,
        misc5: formData.misc5,
      };

      // ✅ FIX: Removed /api/ prefix
      await api.post("/sTKCallback", payload);
      
      // Refresh the list
      await fetchSTK();

      setFormData({ 
        timeIn: "", 
        phoneNumber: "", 
        amount: "", 
        mpesaReceipt: "", 
        resultDesc: "", 
        misc5: "" 
      });
      setShowFormPage(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err.response?.data?.message || "Failed to create STK Push request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "failed":
      case "error":
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Filtered requests
  const filteredRequests = stkRequests.filter((r) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (r.phoneNumber && r.phoneNumber.includes(searchTerm)) ||
      (r.mpesaReceipt && r.mpesaReceipt.toLowerCase().includes(search)) ||
      (r.id && r.id.toString().includes(searchTerm))
    );
  });

  const formatCurrency = (value?: string | number) => {
    if (!value) return "-";
    return `KES ${parseFloat(value.toString()).toLocaleString()}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  // Full-page form
  if (showFormPage) {
    return (
      <div className="p-6 animate-fade-in flex justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0">
          <CardHeader className="border-b bg-gradient-to-r from-pink-100 to-rose-100">
            <CardTitle className="text-pink-700 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> New STK Push Request
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 text-sm">{formError}</p>
              </div>
            )}
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-1">Phone Number *</Label>
                <Input
                  type="tel"
                  placeholder="e.g. 254712345678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-1">Amount *</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-1">Time In</Label>
                <Input
                  type="datetime-local"
                  value={formData.timeIn}
                  onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-1">M-Pesa Receipt</Label>
                <Input
                  type="text"
                  placeholder="Enter M-Pesa receipt number"
                  value={formData.mpesaReceipt}
                  onChange={(e) => setFormData({ ...formData, mpesaReceipt: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-1">Result Description</Label>
                <Input
                  type="text"
                  placeholder="Enter result description"
                  value={formData.resultDesc}
                  onChange={(e) => setFormData({ ...formData, resultDesc: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-1">Misc 5</Label>
                <Input
                  type="text"
                  placeholder="Enter misc 5"
                  value={formData.misc5}
                  onChange={(e) => setFormData({ ...formData, misc5: e.target.value })}
                />
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowFormPage(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Table view
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-pink-200 to-rose-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-pink-800 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> STK Push Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                onClick={fetchSTK}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                onClick={() => setShowFormPage(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </CardHeader>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading STK Push requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">
                {searchTerm ? "No STK Push requests match your search" : "No STK Push requests found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse min-w-[1000px]">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#Ref</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time In</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">M-Pesa Receipt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Result Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Misc 5</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredRequests.map((request, index) => (
                    <tr key={request.id || index} className="hover:bg-pink-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-pink-600 font-medium">
                        {request.id || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs">{formatDate(request.timeIn)}</td>
                      <td className="px-4 py-3 font-mono">{request.phoneNumber || "-"}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {formatCurrency(request.amount)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{request.mpesaReceipt || "-"}</td>
                      <td className="px-4 py-3 text-xs max-w-xs truncate" title={request.resultDesc}>
                        {request.resultDesc || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs">{request.misc5 || "-"}</td>
                      <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-pink-100 hover:text-pink-600">
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
      </Card>
    </div>
  );
};

export default STKPushRequest;