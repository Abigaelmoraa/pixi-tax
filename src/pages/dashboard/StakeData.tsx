import { Database, Search, Filter, Plus, Eye, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import api from "@/services/api";

interface StakeDataType {
  id?: number;
  betId: string;
  customerId: string;
  mobileNo: string;
  punterAmt: string;
  desc: string;
  stakeAmt: string;
  stakeType: string;
  odds: string;
  dateOfStake: string;
  exciseAmt: string;
  walletBalanceStake: string;
  createdAt?: string;
  updatedAt?: string;
}

const StakeData = () => {
  const [stakeData, setStakeData] = useState<StakeDataType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState<StakeDataType>({
    betId: "",
    customerId: "",
    mobileNo: "",
    punterAmt: "",
    desc: "",
    stakeAmt: "",
    stakeType: "",
    odds: "",
    dateOfStake: "",
    exciseAmt: "",
    walletBalanceStake: "",
  });

  // Fetch stake data from backend
  const fetchStakeData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // API Documentation: GET /api/receiveBulkStake (Protected endpoint)
      const res = await api.get("/receiveBulkStake");
      
      console.log("✓ Stake data fetched successfully:", res.data);
      
      // Handle different response structures
      let data: StakeDataType[];
      
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (res.data?.receiveBulkStake && Array.isArray(res.data.receiveBulkStake)) {
        data = res.data.receiveBulkStake;
      } else if (res.data?.results && Array.isArray(res.data.results)) {
        data = res.data.results;
      } else {
        console.warn("Unexpected response structure:", res.data);
        data = [];
      }
      
      setStakeData(data);
      
    } catch (err: any) {
      console.error("Error fetching stake data:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText;
        
        if (status === 401) {
          setError("Unauthorized. Please log in to view stake data.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view stake data.");
        } else if (status === 404) {
          setError("Stake data endpoint not found. Please check API configuration.");
        } else if (status === 500) {
          setError(`Server error: ${message}`);
        } else {
          setError(`Error (${status}): ${message}`);
        }
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError(err.message || "Failed to fetch stake data");
      }
      
      setStakeData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStakeData();
  }, []);

  // Save new stake data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.betId || !formData.customerId || !formData.mobileNo || 
        !formData.punterAmt || !formData.stakeAmt || !formData.stakeType || 
        !formData.odds || !formData.dateOfStake) {
      setFormError("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    setFormError("");
    
    try {
      console.log("Creating stake record:", formData);
      
      // API Documentation: POST /api/receiveBulkStake (Protected endpoint)
      await api.post("/receiveBulkStake", formData);
      
      console.log("✓ Stake record created successfully");
      
      // Refresh the list
      await fetchStakeData();
      
      // Reset form
      setFormData({
        betId: "",
        customerId: "",
        mobileNo: "",
        punterAmt: "",
        desc: "",
        stakeAmt: "",
        stakeType: "",
        odds: "",
        dateOfStake: "",
        exciseAmt: "",
        walletBalanceStake: "",
      });
      setShowForm(false);
    } catch (err: any) {
      console.error("Error creating stake record:", err);
      
      if (err.response) {
        const message = err.response.data?.message || err.response.statusText;
        setFormError(`Failed to save: ${message}`);
      } else if (err.request) {
        setFormError("No response from server. Please check your connection.");
      } else {
        setFormError(err.message || "Failed to save stake data");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">Active</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      case "completed":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-cyan-100 to-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-cyan-600 flex items-center gap-2">
              <Database className="w-5 h-5" /> Stake Data Records
            </CardTitle>
            <p className="text-cyan-700 text-sm mt-1">
              {stakeData.length} {stakeData.length === 1 ? 'record' : 'records'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!showForm && (
              <>
                <Button variant="outline" size="icon" className="border-cyan-400 hover:bg-cyan-100">
                  <Filter className="w-4 h-4 text-cyan-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchStakeData}
                  disabled={loading}
                  title="Refresh data"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
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
              <div className="font-medium mb-1">Error Loading Stake Data</div>
              <div className="text-sm">{error}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchStakeData}
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
            <h2 className="text-lg font-semibold text-cyan-900 mb-4">New Stake Record</h2>
            
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Bet ID *</label>
                <Input
                  placeholder="Enter bet ID"
                  value={formData.betId}
                  onChange={(e) => setFormData({ ...formData, betId: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Customer ID *</label>
                <Input
                  placeholder="Enter customer ID"
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Mobile No *</label>
                <Input
                  placeholder="e.g. 254712345678"
                  value={formData.mobileNo}
                  onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Punter Amount *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  value={formData.punterAmt}
                  onChange={(e) => setFormData({ ...formData, punterAmt: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-muted-foreground">Description</label>
                <Input
                  placeholder="Enter description"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Stake Amount *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter stake amount"
                  value={formData.stakeAmt}
                  onChange={(e) => setFormData({ ...formData, stakeAmt: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Stake Type *</label>
                <select
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={formData.stakeType}
                  onChange={(e) => setFormData({ ...formData, stakeType: e.target.value })}
                  required
                  disabled={loading}
                >
                  <option value="">Select type</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Odds *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 2.50"
                  value={formData.odds}
                  onChange={(e) => setFormData({ ...formData, odds: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Date of Stake *</label>
                <Input
                  type="date"
                  value={formData.dateOfStake}
                  onChange={(e) => setFormData({ ...formData, dateOfStake: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Excise Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter excise amount"
                  value={formData.exciseAmt}
                  onChange={(e) => setFormData({ ...formData, exciseAmt: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Wallet Balance After Stake</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter wallet balance"
                  value={formData.walletBalanceStake}
                  onChange={(e) => setFormData({ ...formData, walletBalanceStake: e.target.value })}
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
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
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
                <RefreshCw className="w-8 h-8 text-cyan-600 animate-spin mb-3" />
                <p className="text-gray-600">Loading stake data...</p>
              </div>
            ) : stakeData.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">No stake records available</p>
                <p className="text-sm mt-2">Click "New" to create your first stake record</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-cyan-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Bet ID</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Customer ID</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Mobile No</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Punter Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Stake Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Stake Type</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Odds</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Excise Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Wallet Balance</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stakeData.map((stake, index) => (
                      <tr key={stake.id || stake.betId || index} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-sm">{stake.betId || "-"}</td>
                        <td className="px-4 py-3">{stake.customerId || "-"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{stake.mobileNo || "-"}</td>
                        <td className="px-4 py-3 font-semibold text-blue-600 whitespace-nowrap">{formatCurrency(stake.punterAmt)}</td>
                        <td className="px-4 py-3 text-sm max-w-xs">
                          <div className="truncate" title={stake.desc}>{stake.desc || "-"}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap">{formatCurrency(stake.stakeAmt)}</td>
                        <td className="px-4 py-3">{getStatusBadge(stake.stakeType)}</td>
                        <td className="px-4 py-3 font-medium">{stake.odds || "-"}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{formatDate(stake.dateOfStake)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(stake.exciseAmt)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(stake.walletBalanceStake)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-cyan-100 hover:text-cyan-600" title="View details">
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

export default StakeData;