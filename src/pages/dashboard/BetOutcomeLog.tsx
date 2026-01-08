import { useState, useEffect } from "react";
import { ClipboardList, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import { Label } from "@/components/ui/label";

interface BetOutcomeFormData {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOutcomes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bet-outcomes");
        setOutcomes(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch bet outcomes");
      } finally {
        setLoading(false);
      }
    };
    fetchOutcomes();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/bet-outcomes", formData);
      setOutcomes([res.data, ...outcomes]);
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
      setError(err.response?.data?.message || "Failed to save bet outcome");
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "won":
        return <Badge className="bg-green-500 text-white">Won</Badge>;
      case "lost":
        return <Badge className="bg-red-500 text-white">Lost</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      default:
        return <Badge>{outcome}</Badge>;
    }
  };

  return (
    <div className="p-4">
      <Card className="border-0 shadow-lg">

        {/* ================= HEADER ================= */}
        <CardHeader className="border-b bg-gradient-to-r from-yellow-200 to-amber-200 px-4 py-2">
          <div className="flex items-center w-full">
            <CardTitle className="flex items-center gap-2 text-yellow-900 text-lg font-semibold">
              <ClipboardList className="w-5 h-5" />
              Bet Outcome Log
            </CardTitle>

            {!showForm && (
              <Button
                className="ml-auto bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
          </div>
        </CardHeader>

        {/* ================= FORM ================= */}
        {showForm && (
          <CardContent className="space-y-6 p-6 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-900">New Outcome Info Log</h2>

            <form onSubmit={handleSave} className="space-y-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="space-y-1">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <Input
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* ================= TABLE ================= */}
        {!showForm && (
          <CardContent className="overflow-x-auto p-0">
            <table className="w-max min-w-full table-auto">
              <thead className="bg-muted/50">
                <tr>
                  {Object.keys(formData).map((key) => (
                    <th key={key} className="px-4 py-3 text-left font-medium">
                      {key}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : outcomes.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-6">
                      No data available
                    </td>
                  </tr>
                ) : (
                  outcomes.map((bet) => (
                    <tr key={bet.betId}>
                      {Object.keys(bet).map((key) => (
                        <td key={key} className="px-4 py-3">
                          {key === "outcome"
                            ? getOutcomeBadge(bet[key as keyof BetOutcomeFormData])
                            : bet[key as keyof BetOutcomeFormData]}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        )}

      </Card>
    </div>
  );
};

export default BetOutcomeLog;
