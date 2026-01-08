import { useState } from "react";
import { CheckCircle, Clock, XCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

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
  const [formData, setFormData] = useState({
    transactionDate: "",
    amount: "",
    taxType: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Badge className="bg-green-500 text-white flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmitPRN = () => {
    if (!formData.taxType || !formData.amount) return;

    const newRequest: PRNRequest = {
      ref: `PRN-${Date.now()}`,
      transactionDate: formData.transactionDate,
      amount: formData.amount,
      taxType: formData.taxType,
      prn: "N/A",
      kra: "N/A",
      safaricom: "N/A",
      trxCode: "N/A",
      status: "Pending",
    };

    setRequests([newRequest, ...requests]);
    setFormData({ transactionDate: "", amount: "", taxType: "" });
    setShowForm(false);
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* HEADER */}
        <CardHeader className="border-b bg-blue-100 flex items-center justify-between">
          <CardTitle className="text-blue-900">
            PRN Requests
          </CardTitle>

          {!showForm && (
            <Button
              className="bg-blue-500 text-white flex items-center gap-2"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-4 h-4" />
              New PRN
            </Button>
          )}
        </CardHeader>

        {/* FORM */}
        {showForm && (
          <CardContent className="p-6 space-y-6 bg-blue-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Transaction Date</Label>
                <input
                  type="date"
                  className="input border-blue-300"
                  value={formData.transactionDate}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="input border-blue-300"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tax Type</Label>
                <select
                  className="input border-blue-300"
                  value={formData.taxType}
                  onChange={(e) =>
                    setFormData({ ...formData, taxType: e.target.value })
                  }
                >
                  <option value="">Select tax type</option>
                  <option value="Exercise (Deposits)">
                    Exercise (Deposits)
                  </option>
                  <option value="Withholdings (Withdrawals)">
                    Withholdings (Withdrawals)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitPRN}>
                Save PRN
              </Button>
            </div>
          </CardContent>
        )}

        {/* TABLE (hidden when form open) */}
        {!showForm && (
          <CardContent className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th>Ref</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Tax Type</th>
                  <th>PRN</th>
                  <th>KRA</th>
                  <th>Safaricom</th>
                  <th>Trx Code</th>
                  <th>Status</th>
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
                  requests.map((req, index) => (
                    <tr key={index} className="hover:bg-blue-50">
                      <td className="px-4 py-2 font-mono text-blue-600">{req.ref}</td>
                      <td className="px-4 py-2">{req.transactionDate}</td>
                      <td className="px-4 py-2 font-semibold text-green-600">{req.amount}</td>
                      <td className="px-4 py-2">{req.taxType}</td>
                      <td className="px-4 py-2">{req.prn}</td>
                      <td className="px-4 py-2">{req.kra}</td>
                      <td className="px-4 py-2">{req.safaricom}</td>
                      <td className="px-4 py-2">{req.trxCode}</td>
                      <td className="px-4 py-2">{getStatusBadge(req.status)}</td>
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

export default PRNRequests;
