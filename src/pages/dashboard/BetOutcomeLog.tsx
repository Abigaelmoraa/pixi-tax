import { useState, useEffect } from "react";
import { ClipboardList, Plus, Eye, RefreshCw, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  createdAt?: string;
  updatedAt?: string;
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
      
      // API Documentation: GET /api/outcomeInfoLog (Protected endpoint)
      const res = await api.get("/outcomeInfoLog");
      
      console.log("✓ Bet outcomes fetched successfully:", res.data);
      
      // Handle different response structures
      let data: BetOutcomeFormData[];
      
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (res.data?.outcomeInfoLog && Array.isArray(res.data.outcomeInfoLog)) {
        data = res.data.outcomeInfoLog;
      } else if (res.data?.results && Array.isArray(res.data.results)) {
        data = res.data.results;
      } else {
        console.warn("Unexpected response structure:", res.data);
        data = [];
      }
      
      setOutcomes(data);
      
    } catch (err: any) {
      console.error("Error fetching bet outcomes:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText;
        
        if (status === 401) {
          setError("Unauthorized. Please log in to view bet outcomes.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view bet outcomes.");
        } else if (status === 404) {
          setError("Bet outcomes endpoint not found. Please check API configuration.");
        } else if (status === 500) {
          setError(`Server error: ${message}`);
        } else {
          setError(`Error (${status}): ${message}`);
        }
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError(err.message || "Failed to fetch bet outcomes");
      }
      
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

      console.log("Creating bet outcome:", payload);
      
      // API Documentation: POST /api/outcomeInfoLog (Protected endpoint)
      await api.post("/outcomeInfoLog", payload);
      
      console.log("✓ Bet outcome created successfully");
      
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
      console.error("Error creating bet outcome:", err);
      
      if (err.response) {
        const message = err.response.data?.message || err.response.statusText;
        setFormError(`Failed to save: ${message}`);
      } else if (err.request) {
        setFormError("No response from server. Please check your connection.");
      } else {
        setFormError(err.message || "Failed to save bet outcome");
      }
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
    if (!value) return "KES 0.00";
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return "KES 0.00";
    return `KES ${numValue.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatDate = (dateStr?: string) => {
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
    <div className="p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-yellow-200 to-amber-200 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle className="flex items-center gap-2 text-yellow-900 text-lg font-semibold">
                <ClipboardList className="w-5 h-5" />
                Bet Outcome Log
              </CardTitle>
              <p className="text-yellow-700 text-sm mt-1">
                {outcomes.length} {outcomes.length === 1 ? 'record' : 'records'}
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
                    onClick={fetchOutcomes}
                    disabled={loading}
                    title="Refresh data"
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
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-1">Error Loading Bet Outcomes</div>
              <div className="text-sm">{error}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchOutcomes}
                className="mt-3"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* FORM */}
        {showForm && (
          <CardContent className="space-y-6 p-6 bg-yellow-50">
            <h2 className="text-lg font-semibold text-yellow-900">New Bet Outcome</h2>
            
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Bet ID *</Label>
                <Input
                  placeholder="Enter bet ID"
                  value={formData.betId}
                  onChange={(e) => setFormData({ ...formData, betId: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-1">
                <Label>Outcome *</Label>
                <select
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-yellow-500 outline-none"
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  required
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="space-y-1">
                <Label>Outcome Date</Label>
                <Input
                  type="date"
                  value={formData.outcomedate}
                  onChange={(e) => setFormData({ ...formData, outcomedate: e.target.value })}
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="space-y-1">
                <Label>Sent To KRA</Label>
                <select
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-yellow-500 outline-none"
                  value={formData.sentToKra}
                  onChange={(e) => setFormData({ ...formData, sentToKra: e.target.value })}
                  disabled={loading}
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
                  onClick={() => {
                    setShowForm(false);
                    setFormError("");
                  }}
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
        {!showForm && !error && (
          <CardContent className="overflow-x-auto p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <RefreshCw className="w-8 h-8 text-yellow-600 animate-spin mb-3" />
                <p className="text-gray-600">Loading bet outcomes...</p>
              </div>
            ) : filteredOutcomes.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">
                  {searchTerm ? "No bet outcomes match your search" : "No bet outcomes found"}
                </p>
                {!searchTerm && (
                  <p className="text-sm mt-2">Click "New" to create your first bet outcome</p>
                )}
              </div>
            ) : (
              <table className="w-full table-auto min-w-[1000px]">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Bet ID</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Outcome</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Payout</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Outcome Date</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Winnings</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Withholding Tax</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Wallet Balance</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Sent To KRA</th>
                    <th className="px-4 py-3 text-right font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOutcomes.map((bet, index) => (
                    <tr key={bet.id || index} className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-yellow-700">{bet.betId || "-"}</td>
                      <td className="px-4 py-3">{getOutcomeBadge(bet.outcome)}</td>
                      <td className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap">
                        {formatCurrency(bet.payout)}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(bet.outcomedate)}</td>
                      <td className="px-4 py-3 font-semibold text-blue-600 whitespace-nowrap">
                        {formatCurrency(bet.winnings)}
                      </td>
                      <td className="px-4 py-3 text-red-600 whitespace-nowrap">
                        {formatCurrency(bet.withholdingtax)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(bet.walletbalanceoutcome)}</td>
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-yellow-100"
                          title="View details"
                        >
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