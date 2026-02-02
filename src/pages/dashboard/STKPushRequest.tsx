import { useState, useEffect } from "react";
import { Smartphone, Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

const STKPushRequest = () => {
  const [stkRequests, setStkRequests] = useState<any[]>([]);
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

  // Fetch STK Push Requests from backend
  useEffect(() => {
    const fetchSTK = async () => {
      try {
        setLoading(true);
       
        const res = await api.get("/sTKCallback");
        setStkRequests(res.data.data || []);

      } catch (err: any) {
        setError(err.message || "Failed to fetch STK Push requests");
      } finally {
        setLoading(false);
      }
    };
    fetchSTK();
  }, []);

  // Save new request to backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/sTKCallback", formData);
      setStkRequests([res.data, ...stkRequests]);
      setFormData({ timeIn: "", phoneNumber: "", amount: "", mpesaReceipt: "", resultDesc: "", misc5: "" });
      setShowFormPage(false);
    } catch (err) {
      console.error("Failed to create STK Push request:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Completed</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      case "failed":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filtered requests based on search
  const filteredRequests = stkRequests.filter((r) =>
    r.phoneNumber?.includes(searchTerm) || r.mpesaReceipt?.includes(searchTerm)
  );

  // Full-page form
  if (showFormPage) {
    return (
      <div className="p-6 animate-fade-in flex justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0">
          <CardHeader className="border-b bg-pink-50">
            <CardTitle className="text-pink-600 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> New STK Push Request
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-4">
              {["timeIn","phoneNumber","amount","mpesaReceipt","resultDesc","misc5"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">{field === "timeIn" ? "Time In" : field === "phoneNumber" ? "Phone Number" : field === "amount" ? "Amount" : field === "mpesaReceipt" ? "Mpesa Receipt" : field === "resultDesc" ? "Result Description" : "Misc5"}</label>
                  <Input
                    type={field === "amount" ? "number" : field === "phoneNumber" ? "tel" : "text"}
                    placeholder={`Enter ${field}`}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    required={field !== "misc5"}
                  />
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setShowFormPage(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600">Save</Button>
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
        <CardHeader className="border-b bg-gradient-to-r from-pink-300 to-rose-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-pink-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> STK Push Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by phone or receipt" className="pl-9 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline" size="icon" className="border-pink-200 hover:bg-pink-50">
                <Filter className="w-4 h-4 text-pink-500" />
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600"
                onClick={() => setShowFormPage(true)}
              >
                New
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-6">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time In</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">TRX Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Result Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">API Response</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">No data available</td>
                    </tr>
                  ) : (
                    filteredRequests.map((request, index) => (
                      <tr key={index} className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-pink-600 font-medium">{request.id || request.ref}</td>
                        <td className="px-4 py-3">{request.timeIn}</td>
                        <td className="px-4 py-3">{request.phoneNumber}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                        <td className="px-4 py-3">{request.mpesaReceipt}</td>
                        <td className="px-4 py-3">{request.resultDesc}</td>
                        <td className="px-4 py-3">{request.misc5}</td>
                        <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-pink-100 hover:text-pink-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
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
