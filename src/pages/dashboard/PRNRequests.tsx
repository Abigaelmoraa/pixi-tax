import { useState } from "react";
import { FileText, Search, Filter, Plus, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PRNRequest {
  ref: string;
  transactionDate: string;
  amount: string;
  taxType: string;
  prn: string;
  kra: string;
  safaricom: string;
  trxCode: string;
  status: string;
}

const PRNRequests = () => {
  const [requests, setRequests] = useState<PRNRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    transactionDate: "",
    amount: "",
    taxType: "",
  });

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmitPRN = () => {
    if (!formData.taxType) return;

    if (editIndex !== null) {
      const updatedRequests = [...requests];
      updatedRequests[editIndex] = {
        ...updatedRequests[editIndex],
        transactionDate: formData.transactionDate,
        amount: formData.amount,
        taxType: formData.taxType,
      };
      setRequests(updatedRequests);
      setEditIndex(null);
    } else {
      const newRequest: PRNRequest = {
        ref: `#${Math.floor(Math.random() * 1000000)}`,
        transactionDate: formData.transactionDate,
        amount: formData.amount,
        taxType: formData.taxType,
        prn: "",
        kra: "",
        safaricom: "",
        trxCode: "",
        status: "pending",
      };
      setRequests([newRequest, ...requests]);
    }

    setFormData({ transactionDate: "", amount: "", taxType: "" });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const request = requests[index];
    setFormData({
      transactionDate: request.transactionDate,
      amount: request.amount,
      taxType: request.taxType,
    });
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-purple-400 to-blue-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-purple-800">PRN Requests</CardTitle>
            {!showForm && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search " className="pl-9 w-64" />
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" /> New PRN
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {showForm ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                {editIndex !== null ? "Edit PRN Request" : "New PRN Request"}
              </h2>

              {/* Transaction Date */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Transaction Date</label>
                <Input
                  type="date"
                  value={formData.transactionDate}
                  onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
                  placeholder="Select date"
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Amount</label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount"
                />
              </div>

              {/* Tax Type */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Tax Type</label>
                <select
                  value={formData.taxType}
                  onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                  className="w-full h-12 border border-primary/30 rounded-lg px-3 bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="" disabled>Select Tax Type</option>
                  <option value="Exercise (Deposits)">Exercise (Deposits)</option>
                  <option value="Withholding (Withdrawals)">Withholding (Withdrawals)</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitPRN}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                >
                  {editIndex !== null ? "Update" : "Request"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setShowForm(false); setEditIndex(null); }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Transaction Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">PRN</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">KRA</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Safaricom</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trx Code</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-muted-foreground">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    requests.map((request, index) => (
                      <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-blue-600 font-medium">{request.ref}</td>
                        <td className="px-4 py-3 font-medium">{request.transactionDate}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                        <td className="px-4 py-3">{request.taxType}</td>
                        <td className="px-4 py-3">{request.prn}</td>
                        <td className="px-4 py-3">{request.kra}</td>
                        <td className="px-4 py-3">{request.safaricom}</td>
                        <td className="px-4 py-3">{request.trxCode}</td>
                        <td className="px-4 py-3 text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PRNRequests;
