import { Database, Search, Filter, Download, Eye, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StakeData = () => {
  const stakeData = [
    { id: "STAKE-001", user: "User_A1B2C3", game: "Sports Betting", amount: "KES 5,000", odds: "2.50", potentialWin: "KES 12,500", date: "2024-01-15 14:30", status: "active" },
    { id: "STAKE-002", user: "User_D4E5F6", game: "Casino", amount: "KES 2,500", odds: "3.00", potentialWin: "KES 7,500", date: "2024-01-15 14:25", status: "won" },
    { id: "STAKE-003", user: "User_G7H8I9", game: "Virtual Sports", amount: "KES 1,000", odds: "4.50", potentialWin: "KES 4,500", date: "2024-01-15 14:20", status: "lost" },
    { id: "STAKE-004", user: "User_J0K1L2", game: "Sports Betting", amount: "KES 10,000", odds: "1.85", potentialWin: "KES 18,500", date: "2024-01-15 14:15", status: "active" },
    { id: "STAKE-005", user: "User_M3N4O5", game: "Jackpot", amount: "KES 500", odds: "100.00", potentialWin: "KES 50,000", date: "2024-01-15 14:10", status: "pending" },
    { id: "STAKE-006", user: "User_P6Q7R8", game: "Live Betting", amount: "KES 3,200", odds: "2.20", potentialWin: "KES 7,040", date: "2024-01-15 14:05", status: "won" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "won":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Won</Badge>;
      case "lost":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Lost</Badge>;
      case "active":
        return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">Active</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getGameBadge = (game: string) => {
    switch (game) {
      case "Sports Betting":
        return <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50">Sports</Badge>;
      case "Casino":
        return <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50">Casino</Badge>;
      case "Virtual Sports":
        return <Badge variant="outline" className="border-cyan-300 text-cyan-600 bg-cyan-50">Virtual</Badge>;
      case "Jackpot":
        return <Badge variant="outline" className="border-yellow-300 text-yellow-600 bg-yellow-50">Jackpot</Badge>;
      case "Live Betting":
        return <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50">Live</Badge>;
      default:
        return <Badge variant="outline">{game}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Main Content */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-cyan-600 flex items-center gap-2">
              <Database className="w-5 h-5" /> Stake Data Records
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search stakes..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-cyan-200 hover:bg-cyan-50">
                <Filter className="w-4 h-4 text-cyan-500" />
              </Button>
              <Button variant="outline" className="border-cyan-200 text-cyan-600 hover:bg-cyan-50">
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Game</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Odds</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Potential Win</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stakeData.map((stake) => (
                  <tr key={stake.id} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-cyan-600 font-medium">{stake.id}</td>
                    <td className="px-4 py-3 font-mono text-sm">{stake.user}</td>
                    <td className="px-4 py-3">{getGameBadge(stake.game)}</td>
                    <td className="px-4 py-3 font-semibold">{stake.amount}</td>
                    <td className="px-4 py-3 text-purple-600 font-medium">{stake.odds}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{stake.potentialWin}</td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{stake.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(stake.status)}</td>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default StakeData;
