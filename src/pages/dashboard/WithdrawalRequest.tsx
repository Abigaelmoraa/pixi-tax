import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function WithdrawalRequest() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    msisdn: "",
    amount: "",
    charges: "",
    netPayout: "",
    sourceIp: "",
    transactionId: "",
    approved: "",
    sentTo: "",
    apiResponse: "",
    status: "PENDING",
  });

  const API_BASE = "https://db.x1.pitch90agent.com";

  // Fetch withdrawals on load
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/withdrawalRequest`, {
          headers: {
          },
        });
        setRequests(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load withdrawals");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_BASE}/withdrawalRequest`, form, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowForm(false);
      setForm({
        msisdn: "",
        amount: "",
        charges: "",
        netPayout: "",
        sourceIp: "",
        transactionId: "",
        approved: "",
        sentTo: "",
        apiResponse: "",
        status: "PENDING",
      });
      // Reload list
      const res = await axios.get(`${API_BASE}/withdrawalRequest`);
      setRequests(res.data);
    } catch (err: any) {
      alert(err.message || "Failed to save withdrawal");
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "SENT":
        return <Badge className="bg-blue-600">Sent</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  // ---------- FULL SCREEN FORM ----------
  if (showForm) {
    return (
      <div className="p-6 min-h-[calc(100vh-4rem)]">
        <Card className="max-w-3xl mx-auto rounded-2xl shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl">New Withdrawal Request</CardTitle>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Back
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4">
            <input className="input" name="msisdn" placeholder="MSISDN" value={form.msisdn} onChange={handleChange} />
            <input className="input" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
            <input className="input" name="charges" placeholder="Charges" value={form.charges} onChange={handleChange} />
            <input className="input" name="netPayout" placeholder="Net Payout" value={form.netPayout} onChange={handleChange} />
            <input className="input" name="sourceIp" placeholder="Source IP" value={form.sourceIp} onChange={handleChange} />
            <input className="input" name="transactionId" placeholder="Transaction ID" value={form.transactionId} onChange={handleChange} />
            <input className="input" name="approved" placeholder="Approved" value={form.approved} onChange={handleChange} />
            <input className="input" name="sentTo" placeholder="Sent To" value={form.sentTo} onChange={handleChange} />
            <input className="input" name="apiResponse" placeholder="API Response" value={form.apiResponse} onChange={handleChange} />
          </CardContent>

          <div className="flex justify-end gap-2 p-6">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------- TABLE VIEW ----------
  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">Withdrawal Requests</CardTitle>
          <Button onClick={() => setShowForm(true)}>New Withdrawal</Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Charges</TableHead>
                    <TableHead>Net Payout</TableHead>
                    <TableHead>Source IP</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>API Response</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No withdrawal requests
                      </TableCell>
                    </TableRow>
                  )}

                  {requests.map((r: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell>{r.charges}</TableCell>
                      <TableCell>{r.netPayout}</TableCell>
                      <TableCell>{r.sourceIp}</TableCell>
                      <TableCell>{r.transactionId}</TableCell>
                      <TableCell>{statusBadge(r.status)}</TableCell>
                      <TableCell>{r.sentTo}</TableCell>
                      <TableCell>{r.apiResponse}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
