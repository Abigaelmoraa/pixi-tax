import { Database, Search, Filter, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StakeFormData {
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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<StakeFormData>({
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

  // Example stake data for table
  const stakeData: StakeFormData[] = [
    // populate with real data from backend
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Saved:", formData); 
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
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">Active</Badge>;
      case "Pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
            <Button variant="outline" size="icon" className="border-cyan-400 hover:bg-cyan-100">
              <Filter className="w-4 h-4 text-cyan-500" />
            </Button>
            {!showForm && (
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> New Stake
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Form */}
        {showForm && (
          <CardContent>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {[
                { label: "Bet ID", key: "betId", placeholder: "Enter Bet ID" },
                { label: "Customer ID", key: "customerId", placeholder: "Enter Customer ID" },
                { label: "Mobile No", key: "mobileNo", placeholder: "07XXXXXXXX" },
                { label: "Punter Amount", key: "punterAmt", placeholder: "Enter Punter Amount" },
                { label: "Description", key: "desc", placeholder: "Enter Description" },
                { label: "Stake Amount", key: "stakeAmt", placeholder: "Enter Stake Amount" },
                { label: "Stake Type", key: "stakeType", placeholder: "Single / Multiple / System" },
                { label: "Odds", key: "odds", placeholder: "Enter Odds" },
                { label: "Date Of Stake", key: "dateOfStake", placeholder: "YYYY-MM-DD HH:MM" },
                { label: "Excise Amount", key: "exciseAmt", placeholder: "Enter Excise Amount" },
                { label: "Wallet Balance After Stake", key: "walletBalanceStake", placeholder: "Enter Wallet Balance" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">{field.label}</label>
                  <Input
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof StakeFormData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Customer ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Mobile No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Punter Amt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Desc</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake Amt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stake Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Odds</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date Of Stake</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Excise Amt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Wallet Balance</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stakeData.map((stake) => (
                    <tr key={stake.betId} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-cyan-600 font-medium">{stake.betId}</td>
                      <td className="px-4 py-3">{stake.customerId}</td>
                      <td className="px-4 py-3">{stake.mobileNo}</td>
                      <td className="px-4 py-3">{stake.punterAmt}</td>
                      <td className="px-4 py-3">{stake.desc}</td>
                      <td className="px-4 py-3">{stake.stakeAmt}</td>
                      <td className="px-4 py-3">{stake.stakeType}</td>
                      <td className="px-4 py-3">{stake.odds}</td>
                      <td className="px-4 py-3">{stake.dateOfStake}</td>
                      <td className="px-4 py-3">{stake.exciseAmt}</td>
                      <td className="px-4 py-3">{stake.walletBalanceStake}</td>
                      <td className="px-4 py-3">{getStatusBadge(stake.stakeType)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-cyan-100 hover:text-cyan-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {stakeData.length === 0 && (
                    <tr>
                      <td colSpan={13} className="text-center py-6 text-muted-foreground">
                        No stake records available.
                      </td>
                    </tr>
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

export default StakeData;
