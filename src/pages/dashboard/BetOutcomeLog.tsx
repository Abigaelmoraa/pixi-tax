import { ClipboardList, Search, Filter, Download, Eye, Trophy, XCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BetOutcomeLog = () => {
  const outcomes = [
    { id: "BET-001234", user: "User_A1B2C3", event: "Man Utd vs Liverpool", selection: "Man Utd Win", odds: "2.50", stake: "KES 5,000", payout: "KES 12,500", date: "2024-01-15", outcome: "won" },
    { id: "BET-001235", user: "User_D4E5F6", event: "Arsenal vs Chelsea", selection: "Draw", odds: "3.20", stake: "KES 2,000", payout: "KES 0", date: "2024-01-15", outcome: "lost" },
    { id: "BET-001236", user: "User_G7H8I9", event: "Barcelona vs Real Madrid", selection: "Over 2.5", odds: "1.85", stake: "KES 10,000", payout: "-", date: "2024-01-15", outcome: "pending" },
    { id: "BET-001237", user: "User_J0K1L2", event: "Bayern vs Dortmund", selection: "Bayern Win", odds: "1.45", stake: "KES 8,000", payout: "KES 11,600", date: "2024-01-14", outcome: "won" },
    { id: "BET-001238", user: "User_M3N4O5", event: "PSG vs Lyon", selection: "BTTS", odds: "1.90", stake: "KES 3,500", payout: "KES 0", date: "2024-01-14", outcome: "lost" },
    { id: "BET-001239", user: "User_P6Q7R8", event: "Juventus vs Inter", selection: "Under 3.5", odds: "1.35", stake: "KES 15,000", payout: "KES 20,250", date: "2024-01-14", outcome: "won" },
  ];

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case "won":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><Trophy className="w-3 h-3 mr-1" /> Won</Badge>;
      case "lost":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><XCircle className="w-3 h-3 mr-1" /> Lost</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge>{outcome}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-yellow-600 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Bet Outcome Log
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search outcomes..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-yellow-200 hover:bg-yellow-50">
                <Filter className="w-4 h-4 text-yellow-500" />
              </Button>
              <Button variant="outline" className="border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bet ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Event</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Selection</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Odds</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payout</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Outcome</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {outcomes.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gradient-to-r hover:from-yellow-50/50 hover:to-amber-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-yellow-600 font-medium">{bet.id}</td>
                    <td className="px-4 py-3 font-mono text-sm">{bet.user}</td>
                    <td className="px-4 py-3 font-medium">{bet.event}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bet.selection}</td>
                    <td className="px-4 py-3 text-purple-600 font-medium">{bet.odds}</td>
                    <td className="px-4 py-3 font-medium">{bet.stake}</td>
                    <td className={`px-4 py-3 font-semibold ${bet.outcome === 'won' ? 'text-green-600' : bet.outcome === 'lost' ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {bet.payout}
                    </td>
                    <td className="px-4 py-3">{getOutcomeBadge(bet.outcome)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-yellow-100 hover:text-yellow-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetOutcomeLog;
