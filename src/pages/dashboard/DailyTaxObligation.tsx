import { CalendarCheck, Search, Filter, Plus, Eye, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import api from "@/services/api";

interface TaxFormData {
  id?: number;
  taxDate: string;
  depositTotal: string;
  withdrawalTotal: string;
  taxOnDeposit: string;
  taxOnWithdrawal: string;
  totalTaxAmount: string;
  trxCode: string;
  prnCode: string;
  createdAt?: string;
  updatedAt?: string;
}

const DailyTaxObligation = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TaxFormData>({
    taxDate: "",
    depositTotal: "",
    withdrawalTotal: "",
    taxOnDeposit: "",
    taxOnWithdrawal: "",
    totalTaxAmount: "",
    trxCode: "",
    prnCode: "",
  });
  const [obligations, setObligations] = useState<TaxFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  // Fetch daily tax obligations from backend
  const fetchObligations = async () => {
    try {
      setLoading(true);
      setError("");
      
      // API Documentation: GET /api/dailyTaxObligation (Protected endpoint)
      const res = await api.get("/dailyTaxObligation");
      
      console.log("✓ Daily tax obligations fetched successfully:", res.data);
      
      // Handle different response structures
      let data: TaxFormData[];
      
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (res.data?.dailyTaxObligation && Array.isArray(res.data.dailyTaxObligation)) {
        data = res.data.dailyTaxObligation;
      } else if (res.data?.results && Array.isArray(res.data.results)) {
        data = res.data.results;
      } else {
        console.warn("Unexpected response structure:", res.data);
        data = [];
      }
      
      setObligations(data);
      
    } catch (err: any) {
      console.error("Error fetching daily tax obligations:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText;
        
        if (status === 401) {
          setError("Unauthorized. Please log in to view tax obligations.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view tax obligations.");
        } else if (status === 404) {
          setError("Tax obligations endpoint not found. Please check API configuration.");
        } else if (status === 500) {
          setError(`Server error: ${message}`);
        } else {
          setError(`Error (${status}): ${message}`);
        }
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError(err.message || "Failed to fetch daily tax obligations");
      }
      
      setObligations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObligations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.taxDate || !formData.depositTotal || !formData.withdrawalTotal || 
        !formData.taxOnDeposit || !formData.taxOnWithdrawal || !formData.totalTaxAmount) {
      setFormError("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    setFormError("");
    
    try {
      console.log("Creating tax obligation:", formData);
      
      // API Documentation: POST /api/dailyTaxObligation (Protected endpoint)
      await api.post("/dailyTaxObligation", formData);
      
      console.log("✓ Tax obligation created successfully");
      
      // Refresh the list
      await fetchObligations();
      
      // Reset form
      setFormData({
        taxDate: "",
        depositTotal: "",
        withdrawalTotal: "",
        taxOnDeposit: "",
        taxOnWithdrawal: "",
        totalTaxAmount: "",
        trxCode: "",
        prnCode: "",
      });
      setShowForm(false);
    } catch (err: any) {
      console.error("Error creating tax obligation:", err);
      
      if (err.response) {
        const message = err.response.data?.message || err.response.statusText;
        setFormError(`Failed to save: ${message}`);
      } else if (err.request) {
        setFormError("No response from server. Please check your connection.");
      } else {
        setFormError(err.message || "Failed to save tax obligation");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return "-";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "-";
    return `KES ${numValue.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-emerald-300 to-teal-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-emerald-600 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" /> Daily Tax Obligations
            </CardTitle>
            <p className="text-emerald-700 text-sm mt-1">
              {obligations.length} {obligations.length === 1 ? 'record' : 'records'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!showForm && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon" className="border-emerald-200 hover:bg-emerald-400">
                  <Filter className="w-4 h-4 text-emerald-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchObligations}
                  disabled={loading}
                  title="Refresh data"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> New
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        {/* Error Banner */}
        {error && !loading && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-1">Error Loading Tax Obligations</div>
              <div className="text-sm">{error}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchObligations}
                className="mt-3"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        {showForm && (
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">New Tax Obligation</h2>
            
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax Date *</label>
                <Input
                  type="date"
                  value={formData.taxDate}
                  onChange={(e) => setFormData({ ...formData, taxDate: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Deposit Total *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter deposit total"
                  value={formData.depositTotal}
                  onChange={(e) => setFormData({ ...formData, depositTotal: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Withdrawal Total *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter withdrawal total"
                  value={formData.withdrawalTotal}
                  onChange={(e) => setFormData({ ...formData, withdrawalTotal: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax On Deposit *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter tax on deposit"
                  value={formData.taxOnDeposit}
                  onChange={(e) => setFormData({ ...formData, taxOnDeposit: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax On Withdrawal *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter tax on withdrawal"
                  value={formData.taxOnWithdrawal}
                  onChange={(e) => setFormData({ ...formData, taxOnWithdrawal: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Total Tax Amount *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter total tax amount"
                  value={formData.totalTaxAmount}
                  onChange={(e) => setFormData({ ...formData, totalTaxAmount: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">TRX Code</label>
                <Input
                  placeholder="Enter transaction code"
                  value={formData.trxCode}
                  onChange={(e) => setFormData({ ...formData, trxCode: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">PRN Code</label>
                <Input
                  placeholder="Enter PRN code"
                  value={formData.prnCode}
                  onChange={(e) => setFormData({ ...formData, prnCode: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormError("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Table */}
        {!showForm && !error && (
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
                <p className="text-gray-600">Loading tax obligations...</p>
              </div>
            ) : obligations.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <CalendarCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">No tax obligations found</p>
                <p className="text-sm mt-2">Click "New" to create your first tax obligation</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">#Ref</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Tax Date</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Deposit Total</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Withdrawal Total</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Tax On Deposit</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Tax On Withdrawal</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Total Tax Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Trx Code</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Prn Code</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {obligations.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-emerald-600 font-medium">{item.id || index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.taxDate)}</td>
                        <td className="px-4 py-3 font-semibold text-blue-600 whitespace-nowrap">{formatCurrency(item.depositTotal)}</td>
                        <td className="px-4 py-3 font-semibold text-orange-600 whitespace-nowrap">{formatCurrency(item.withdrawalTotal)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(item.taxOnDeposit)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(item.taxOnWithdrawal)}</td>
                        <td className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap">{formatCurrency(item.totalTaxAmount)}</td>
                        <td className="px-4 py-3 font-mono text-xs">{item.trxCode || "-"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{item.prnCode || "-"}</td>
                        <td className="px-4 py-3 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-emerald-100 hover:text-emerald-600"
                            title="View details"
                          >
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

export default DailyTaxObligation;