import { ClipboardList, Search, Filter, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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

  const outcomes: BetOutcomeFormData[] = [
    // Sample data from backend
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form saved:", formData);
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
    setShowForm(false);
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "won":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Won</Badge>;
      case "lost":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Lost</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      default:
        return <Badge>{outcome}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-yellow-200 to-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-yellow-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Bet Outcome Log
          </CardTitle>
          <div className="flex items-center gap-2">
            {!showForm && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search " className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon" className="border-yellow-200 hover:bg-yellow-50">
                  <Filter className="w-4 h-4 text-yellow-500" />
                </Button>
                <Button
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white flex items-center"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> New 
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        {/* Form */}
        {showForm && (
          <CardContent>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {[
                { label: "Bet ID", key: "betId", placeholder: "Enter Bet ID" },
                { label: "Outcome", key: "outcome", placeholder: "Won/Lost/Pending" },
                { label: "Payout", key: "payout", placeholder: "Enter Payout" },
                { label: "Outcome Date", key: "outcomedate", placeholder: "YYYY-MM-DD HH:MM" },
                { label: "Winnings", key: "winnings", placeholder: "Enter Winnings" },
                { label: "Withholding Tax", key: "withholdingtax", placeholder: "Enter Withholding Tax" },
                { label: "Wallet Balance Outcome", key: "walletbalanceoutcome", placeholder: "Enter Wallet Balance" },
                { label: "Sent To Kra", key: "sentToKra", placeholder: "Yes/No" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">{field.label}</label>
                  <Input
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof BetOutcomeFormData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Table */}
        {!showForm && (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bet ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Outcome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payout</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Outcome Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Winnings</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Withholding Tax</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Wallet Balance Outcome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sent To Kra</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {outcomes.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-muted-foreground">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    outcomes.map((bet) => (
                      <tr key={bet.betId} className="hover:bg-gradient-to-r hover:from-yellow-50/50 hover:to-amber-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-yellow-600 font-medium">{bet.betId}</td>
                        <td className="px-4 py-3">{getOutcomeBadge(bet.outcome)}</td>
                        <td className="px-4 py-3 font-semibold">{bet.payout}</td>
                        <td className="px-4 py-3">{bet.outcomedate}</td>
                        <td className="px-4 py-3">{bet.winnings}</td>
                        <td className="px-4 py-3">{bet.withholdingtax}</td>
                        <td className="px-4 py-3">{bet.walletbalanceoutcome}</td>
                        <td className="px-4 py-3">{bet.sentToKra}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-yellow-100 hover:text-yellow-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default BetOutcomeLog;
