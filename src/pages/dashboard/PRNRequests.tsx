import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface PRNRequest {
  ref: string;
  transactionDate: string;
  amount: string;
  taxType: string;
  status: string;
}

const PRNRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<PRNRequest[]>([]);
  const [formData, setFormData] = useState({
    transactionDate: "",
    amount: "",
    taxType: "",
  });

  const handleSave = () => {
    const newPRN: PRNRequest = {
      ref: `PRN-${Date.now()}`,
      transactionDate: formData.transactionDate,
      amount: formData.amount,
      taxType: formData.taxType,
      status: "Pending",
    };

    setRequests([newPRN, ...requests]);
    setFormData({ transactionDate: "", amount: "", taxType: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <Card className="border-0 shadow-lg">

        {/* ================= HEADER ================= */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-2">
          <div className="flex items-center w-full">
            <CardTitle className="flex items-center gap-2 text-blue-900 text-sm font-semibold">
              <FileText className="w-4 h-4" />
              PRN Requests
            </CardTitle>

            {!showForm && (
              <Button
                size="sm"
                className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            )}
          </div>
        </CardHeader>

        {/* ================= FORM ================= */}
        {showForm ? (
          <CardContent className="space-y-6 p-6 bg-blue-50">
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

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </CardContent>
        ) : (
          /* ================= TABLE ================= */
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left">PRN</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Tax Type</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No PRN requests
                    </td>
                  </tr>
                ) : (
                  requests.map((r, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-mono text-blue-600">
                        {r.ref}
                      </td>
                      <td className="px-4 py-3">{r.transactionDate}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">
                        {r.amount}
                      </td>
                      <td className="px-4 py-3">{r.taxType}</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-yellow-500 text-white">
                          Pending
                        </Badge>
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

export default PRNRequests;