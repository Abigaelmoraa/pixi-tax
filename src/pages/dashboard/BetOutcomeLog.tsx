import { useState, useEffect } from "react";
import { ClipboardList, Plus, Eye, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/services/api";

interface BetOutcomeFormData {
  id?: number;
  betId: string;
  outcome: string;
  payout: string;
  outcomedate: string;
  winnings: string;
  withholdingtax: string;
  walletbalanceoutcome: string;
  sentToKra: string;
}

const BetOutcomeLog = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BetOutcomeFormData>({
    betId: "",
    outcome: "",
    payout: "",
    outcomedate: "",
    winnings: "",
    withholdingtax: "",
    walletbalanceoutcome: "",
    sentToKra: "",
  });
  const [outcomes, setOutcomes] = useState<BetOutcomeFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchOutcomes = async () => {
    try {
      setLoading(true);
      setError("");
      
      // ✅ CORRECT: Use outcomeInfoLog for fetching (GET request)
      const res = await api.get("/outcomeInfoLog");
      
      // Handle different response structures
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      
      console.log("Bet outcomes:", data);
      setOutcomes(data);
      
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch bet outcomes");
      setOutcomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutcomes();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.betId || !formData.outcome) {
      setFormError("Bet ID and outcome are required");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const payload = {
        betId: formData.betId,
        outcome: formData.outcome,
        payout: parseFloat(formData.payout) || 0,
        outcomedate: formData.outcomedate,
        winnings: parseFloat(formData.winnings) || 0,
        withholdingtax: parseFloat(formData.withholdingtax) || 0,
        walletbalanceoutcome: parseFloat(formData.walletbalanceoutcome) || 0,
        sentToKra: formData.sentToKra,
      };

      // ✅ CORRECT: Use outcomeInfoLog for saving (POST request)
      await api.post("/outcomeInfoLog", payload);
      
      // Refresh the list
      await fetchOutcomes();

      setShowForm(false);
      setFormData({
        betId: "",
        outcome: "",
        payout: "",
        outcomedate: "",
        winnings: "",
        withholdingtax: "",
        walletbalanceoutcome: "",
        sentToKra: "",
      });
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err.response?.data?.message || "Failed to save bet outcome");
    } finally {
      setLoading(false);
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    if (!outcome) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (outcome.toLowerCase()) {
      case "won":
      case "win":
        return <Badge className="bg-green-500 text-white">Won</Badge>;
      case "lost":
      case "lose":
        return <Badge className="bg-red-500 text-white">Lost</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{outcome}</Badge>;
    }
  };

  const filteredOutcomes = outcomes.filter((o) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (o.betId && o.betId.toLowerCase().includes(search)) ||
      (o.outcome && o.outcome.toLowerCase().includes(search)) ||
      (o.sentToKra && o.sentToKra.toLowerCase().includes(search))
    );
  });

  const formatCurrency = (value?: string | number) => {
    if (!value) return "KES 0";
    return `KES ${parseFloat(value.toString()).toLocaleString()}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-yellow-200 to-amber-200 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2 text-yellow-900 text-lg font-semibold">
              <ClipboardList className="w-5 h-5" />
              Bet Outcome Log
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
                    onClick={fetchOutcomes}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {error && !loading && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <CardContent className="space-y-6 p-6 bg-yellow-50">
            <h2 className="text-lg font-semibold text-yellow-900">New Bet Outcome</h2>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Bet ID *</Label>
                <Input
                  placeholder="Enter bet ID"
                  value={formData.betId}
                  onChange={(e) => setFormData({ ...formData, betId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Outcome *</Label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  required
                >
                  <option value="">Select outcome</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label>Payout</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter payout"
                  value={formData.payout}
                  onChange={(e) => setFormData({ ...formData, payout: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Outcome Date</Label>
                <Input
                  type="date"
                  value={formData.outcomedate}
                  onChange={(e) => setFormData({ ...formData, outcomedate: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Winnings</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter winnings"
                  value={formData.winnings}
                  onChange={(e) => setFormData({ ...formData, winnings: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Withholding Tax</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter withholding tax"
                  value={formData.withholdingtax}
                  onChange={(e) => setFormData({ ...formData, withholdingtax: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Wallet Balance After Outcome</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter wallet balance"
                  value={formData.walletbalanceoutcome}
                  onChange={(e) => setFormData({ ...formData, walletbalanceoutcome: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Sent To KRA</Label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={formData.sentToKra}
                  onChange={(e) => setFormData({ ...formData, sentToKra: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* TABLE */}
        {!showForm && (
          <CardContent className="overflow-x-auto p-0">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading bet outcomes...</p>
              </div>
            ) : filteredOutcomes.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">
                  {searchTerm ? "No bet outcomes match your search" : "No bet outcomes found"}
                </p>
              </div>
            ) : (
              <table className="w-full table-auto min-w-[1000px]">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Bet ID</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Outcome</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Payout</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Outcome Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Winnings</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Withholding Tax</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Wallet Balance</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Sent To KRA</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOutcomes.map((bet, index) => (
                    <tr key={bet.id || index} className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-yellow-700">{bet.betId || "-"}</td>
                      <td className="px-4 py-3">{getOutcomeBadge(bet.outcome)}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {formatCurrency(bet.payout)}
                      </td>
                      <td className="px-4 py-3 text-xs">{formatDate(bet.outcomedate)}</td>
                      <td className="px-4 py-3 font-semibold text-blue-600">
                        {formatCurrency(bet.winnings)}
                      </td>
                      <td className="px-4 py-3 text-red-600">
                        {formatCurrency(bet.withholdingtax)}
                      </td>
                      <td className="px-4 py-3">{formatCurrency(bet.walletbalanceoutcome)}</td>
                      <td className="px-4 py-3">
                        {bet.sentToKra === "Yes" ? (
                          <Badge className="bg-green-500 text-white text-xs">Yes</Badge>
                        ) : bet.sentToKra === "No" ? (
                          <Badge className="bg-red-500 text-white text-xs">No</Badge>
                        ) : (
                          <Badge className="bg-gray-400 text-white text-xs">
                            {bet.sentToKra || "N/A"}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-yellow-100">
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

export default BetOutcomeLog;