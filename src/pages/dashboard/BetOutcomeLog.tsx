import { useState, useEffect } from "react";
import { ClipboardList, Search, Filter, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

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

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchOutcomes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bet-outcomes");
        setOutcomes(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch bet outcomes");
      } finally {
        setLoading(false);
      }
    };

    fetchOutcomes();
  }, []);

  /* ================= SAVE TO BACKEND ================= */
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
      console.error(err);
      setError(err.response?.data?.message || "Failed to save bet outcome");
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "won":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Won</Badge>;
      case "lost":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">Lost</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Pending</Badge>;
      default:
        return <Badge>{outcome}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-yellow-200 to-amber-200 flex justify-between">
          <CardTitle className="text-yellow-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Bet Outcome Log
          </CardTitle>
          {!showForm && (
            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> New
            </Button>
          )}
        </CardHeader>

        {showForm ? (
          <CardContent>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  value={formData[key as keyof BetOutcomeFormData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  required
                />
              ))}
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        ) : (
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {Object.keys(formData).map((key) => (
                    <th key={key} className="px-4 py-3 text-left">{key}</th>
                  ))}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} className="text-center py-6">Loading...</td></tr>
                ) : outcomes.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-6">No data available</td></tr>
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