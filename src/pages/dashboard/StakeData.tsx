import { Database, Search, Filter, Plus, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
}

const StakeData = () => {
  const [stakeData, setStakeData] = useState<StakeDataType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      // ✅ FIX: Changed from /stakeData to /receiveBulkStake
      const res = await api.get("/receiveBulkStake");
      
      // Handle different response structures
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("Stake data:", data);
      setStakeData(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch stake data");
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
    setLoading(true);
    try {
      // ✅ FIX: Changed to /receiveBulkStake
      await api.post("/receiveBulkStake", formData);
      
      // Refresh the list
      await fetchStakeData();
      
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
      console.error("Failed to save:", err);
      setError(err.response?.data?.message || "Failed to save stake data");
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
    return `KES ${parseFloat(value).toLocaleString()}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-cyan-100 to-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-cyan-600 flex items-center gap-2">
            <Database className="w-5 h-5" /> Stake Data Records
          </CardTitle>
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
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-cyan-900 mb-4">New Stake Record</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Bet ID *</label>
                <Input
                  placeholder="Enter bet ID"
                  value={formData.betId}
                  onChange={(e) => setFormData({ ...formData, betId: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Customer ID *</label>
                <Input
                  placeholder="Enter customer ID"
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Mobile No *</label>
                <Input
                  placeholder="e.g. 254712345678"
                  value={formData.mobileNo}
                  onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Punter Amount *</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={formData.punterAmt}
                  onChange={(e) => setFormData({ ...formData, punterAmt: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-muted-foreground">Description</label>
                <Input
                  placeholder="Enter description"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Stake Amount *</label>
                <Input
                  type="number"
                  placeholder="Enter stake amount"
                  value={formData.stakeAmt}
                  onChange={(e) => setFormData({ ...formData, stakeAmt: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Stake Type *</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={formData.stakeType}
                  onChange={(e) => setFormData({ ...formData, stakeType: e.target.value })}
                  required
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
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Date of Stake *</label>
                <Input
                  type="date"
                  value={formData.dateOfStake}
                  onChange={(e) => setFormData({ ...formData, dateOfStake: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Excise Amount</label>
                <Input
                  type="number"
                  placeholder="Enter excise amount"
                  value={formData.exciseAmt}
                  onChange={(e) => setFormData({ ...formData, exciseAmt: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Wallet Balance After Stake</label>
                <Input
                  type="number"
                  placeholder="Enter wallet balance"
                  value={formData.walletBalanceStake}
                  onChange={(e) => setFormData({ ...formData, walletBalanceStake: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
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
        {!showForm && (
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading stake data...</p>
              </div>
            ) : stakeData.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No stake records available</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-cyan-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bet ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Customer ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Mobile No</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Punter Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Odds</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Excise Amt</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Wallet Balance</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stakeData.map((stake, index) => (
                      <tr key={stake.id || stake.betId || index} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-sm">{stake.betId || "-"}</td>
                        <td className="px-4 py-3">{stake.customerId || "-"}</td>
                        <td className="px-4 py-3">{stake.mobileNo || "-"}</td>
                        <td className="px-4 py-3 font-semibold text-blue-600">{formatCurrency(stake.punterAmt)}</td>
                        <td className="px-4 py-3 text-sm max-w-xs truncate" title={stake.desc}>{stake.desc || "-"}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{formatCurrency(stake.stakeAmt)}</td>
                        <td className="px-4 py-3">{getStatusBadge(stake.stakeType)}</td>
                        <td className="px-4 py-3 font-medium">{stake.odds || "-"}</td>
                        <td className="px-4 py-3 text-sm">{formatDate(stake.dateOfStake)}</td>
                        <td className="px-4 py-3">{formatCurrency(stake.exciseAmt)}</td>
                        <td className="px-4 py-3">{formatCurrency(stake.walletBalanceStake)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-cyan-100 hover:text-cyan-600">
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