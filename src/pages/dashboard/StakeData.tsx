import { Database, Search, Filter, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import axios from "axios";

interface StakeDataType {
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

const BASE_URL = "https://db.x1.pitch90agent.com/api";

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
  useEffect(() => {
    const fetchStakeData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/stakeData`);
        setStakeData(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch stake data");
      } finally {
        setLoading(false);
      }
    };
    fetchStakeData();
  }, []);

  // Save new stake data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/stakeData`, formData);
      setStakeData([res.data, ...stakeData]);
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
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">Active</Badge>;
      case "pending":
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
              {Object.keys(formData).map((key) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">{key}</label>
                  <Input
                    placeholder={`Enter ${key}`}
                    value={formData[key as keyof StakeDataType]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
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
                    {Object.keys(formData).map((key) => (
                      <th key={key} className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        {key}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loading ? (
                    <tr>
                      <td colSpan={14} className="text-center py-6 text-muted-foreground">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={14} className="text-center py-6 text-red-500">{error}</td>
                    </tr>
                  ) : stakeData.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="text-center py-6 text-muted-foreground">No stake records available.</td>
                    </tr>
                  ) : (
                    stakeData.map((stake) => (
                      <tr key={stake.betId} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                        {Object.keys(formData).map((key) => (
                          <td key={key} className="px-4 py-3">{stake[key as keyof StakeDataType]}</td>
                        ))}
                        <td className="px-4 py-3">{getStatusBadge(stake.stakeType)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-cyan-100 hover:text-cyan-600">
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

export default StakeData;
