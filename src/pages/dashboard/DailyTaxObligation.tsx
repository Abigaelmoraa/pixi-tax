import { CalendarCheck, Search, Filter, Plus, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Fetch daily tax obligations from backend
  const fetchObligations = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/DailyTaxObligation");
      
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("Daily Tax Obligation data:", data);
      setObligations(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch daily tax obligations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObligations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/DailyTaxObligation", formData);
            await fetchObligations();
      
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
      console.error("Save error:", err);
      setError(err.response?.data?.message || "Failed to save tax obligation");
    } finally {
      setLoading(false);
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
        <CardHeader className="border-b bg-gradient-to-r from-emerald-300 to-teal-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-emerald-600 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" /> Daily Tax Obligations
          </CardTitle>
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
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">New Tax Obligation</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax Date *</label>
                <Input
                  type="date"
                  value={formData.taxDate}
                  onChange={(e) => setFormData({ ...formData, taxDate: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Deposit Total *</label>
                <Input
                  type="number"
                  placeholder="Enter deposit total"
                  value={formData.depositTotal}
                  onChange={(e) => setFormData({ ...formData, depositTotal: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Withdrawal Total *</label>
                <Input
                  type="number"
                  placeholder="Enter withdrawal total"
                  value={formData.withdrawalTotal}
                  onChange={(e) => setFormData({ ...formData, withdrawalTotal: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax On Deposit *</label>
                <Input
                  type="number"
                  placeholder="Enter tax on deposit"
                  value={formData.taxOnDeposit}
                  onChange={(e) => setFormData({ ...formData, taxOnDeposit: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Tax On Withdrawal *</label>
                <Input
                  type="number"
                  placeholder="Enter tax on withdrawal"
                  value={formData.taxOnWithdrawal}
                  onChange={(e) => setFormData({ ...formData, taxOnWithdrawal: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">Total Tax Amount *</label>
                <Input
                  type="number"
                  placeholder="Enter total tax amount"
                  value={formData.totalTaxAmount}
                  onChange={(e) => setFormData({ ...formData, totalTaxAmount: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">TRX Code</label>
                <Input
                  placeholder="Enter transaction code"
                  value={formData.trxCode}
                  onChange={(e) => setFormData({ ...formData, trxCode: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-muted-foreground">PRN Code</label>
                <Input
                  placeholder="Enter PRN code"
                  value={formData.prnCode}
                  onChange={(e) => setFormData({ ...formData, prnCode: e.target.value })}
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
        {!showForm && (
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading tax obligations...</p>
              </div>
            ) : obligations.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <CalendarCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No tax obligations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Deposit Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Withdrawal Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax On Deposit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax On Withdrawal</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total Tax Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trx Code</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Prn Code</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {obligations.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-emerald-600 font-medium">{item.id || index + 1}</td>
                        <td className="px-4 py-3">{formatDate(item.taxDate)}</td>
                        <td className="px-4 py-3 font-semibold text-blue-600">{formatCurrency(item.depositTotal)}</td>
                        <td className="px-4 py-3 font-semibold text-orange-600">{formatCurrency(item.withdrawalTotal)}</td>
                        <td className="px-4 py-3">{formatCurrency(item.taxOnDeposit)}</td>
                        <td className="px-4 py-3">{formatCurrency(item.taxOnWithdrawal)}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{formatCurrency(item.totalTaxAmount)}</td>
                        <td className="px-4 py-3 font-mono text-xs">{item.trxCode || "-"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{item.prnCode || "-"}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-emerald-100 hover:text-emerald-600">
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