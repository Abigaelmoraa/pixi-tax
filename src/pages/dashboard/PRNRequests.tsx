import { useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [formData, setFormData] = useState({ transactionDate: "", amount: "", taxType: "" });

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmitPRN = () => {
    if (!formData.taxType) return;
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
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* HEADER */}
        <CardHeader className="border-b bg-blue-100 flex items-center">
          <CardTitle className="text-blue-900 flex items-center gap-2">PRN Requests</CardTitle>
          {!showForm && (
            <Button
              className="ml-auto bg-blue-500 text-white"
              onClick={() => setShowForm(true)}
            >
              New PRN
            </Button>
          )}
        </CardHeader>

        {/* FORM */}
        {showForm && (
          <CardContent className="grid grid-cols-1 gap-4 p-6 bg-blue-50 rounded-lg">
            <input
              className="input border-blue-300"
              type="date"
              value={formData.transactionDate}
              onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
              placeholder="Transaction Date"
            />
            <input
              className="input border-blue-300"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Amount"
            />
            <input
              className="input border-blue-300"
              type="text"
              value={formData.taxType}
              onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
              placeholder="Tax Type"
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSubmitPRN}>Save</Button>
            </div>
          </CardContent>
        )}

        {/* TABLE */}
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th>Ref</th>
                <th>Transaction Date</th>
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
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-2 font-mono text-blue-600">{req.ref}</td>
                    <td className="px-4 py-2">{req.transactionDate}</td>
                    <td className="px-4 py-2 font-semibold text-green-600">{req.amount}</td>
                    <td className="px-4 py-2">{req.taxType}</td>
                    <td className="px-4 py-2">{req.prn}</td>
                    <td className="px-4 py-2">{req.kra}</td>
                    <td className="px-4 py-2">{req.safaricom}</td>
                    <td className="px-4 py-2">{req.trxCode}</td>
                    <td className="px-4 py-2 flex justify-end">{getStatusBadge(req.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PRNRequests;
