import { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const PRNRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ transactionDate: "", amount: "", taxType: "" });

  const API_BASE = "https://db.x1.pitch90agent.com";

  // Fetch PRN requests from backend
  useEffect(() => {
    const fetchPRNs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/prodPrnLog`, {
          headers: {
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch PRNs:", err);
      }
    };

    fetchPRNs();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
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

  const handleSubmitPRN = async () => {
    if (!formData.taxType) return;

    try {
      if (editIndex !== null) {
        const updatedRequests = [...requests];
        updatedRequests[editIndex] = { ...updatedRequests[editIndex], ...formData };
        setRequests(updatedRequests);
        setEditIndex(null);
      } else {
        // Create new PRN on backend
        const res = await axios.post(`${API_BASE}/prodPrnLog`, formData, {
          headers: {
          },
        });
        setRequests([res.data, ...requests]);
      }

      setFormData({ transactionDate: "", amount: "", taxType: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to submit PRN request:", err);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>PRN Requests</CardTitle>
          <Button onClick={() => setShowForm(true)}>New PRN</Button>
        </CardHeader>

        {showForm && (
          <CardContent className="grid grid-cols-1 gap-4 p-6 bg-gray-50 rounded-lg">
            <input
              className="input"
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
              placeholder="Transaction Date"
            />
            <input
              className="input"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Amount"
            />
            <input
              className="input"
              type="text"
              name="taxType"
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

        <CardContent className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
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
                requests.map((request, index) => (
                  <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-600 font-medium">{request.ref}</td>
                    <td className="px-4 py-3">{request.transactionDate}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                    <td className="px-4 py-3">{request.taxType}</td>
                    <td className="px-4 py-3">{request.prn}</td>
                    <td className="px-4 py-3">{request.kra}</td>
                    <td className="px-4 py-3">{request.safaricom}</td>
                    <td className="px-4 py-3">{request.trxCode}</td>
                    <td className="px-4 py-3 text-right flex gap-2 justify-end">{getStatusBadge(request.status)}</td>
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
