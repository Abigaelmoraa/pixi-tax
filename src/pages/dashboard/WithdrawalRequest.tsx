import { useState, useEffect } from "react";
import axios from "axios";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Table,TableBody,TableCell,TableHead,TableHeader, TableRow,} from "@/components/ui/table";

const API_BASE = "https://db.x1.pitch90agent.com/api";
const ENDPOINT = `${API_BASE}/withdrawalRequest`;

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

  // 🔹 Fetch withdrawals (if GET exists)
  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(ENDPOINT);
      setRequests(res.data || []);
    } catch (err: any) {
      console.warn("GET withdrawals not available");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.msisdn || !form.amount) {
      alert("MSISDN and Amount are required");
      return;
    }

    try {
      await axios.post(ENDPOINT, form);
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
      fetchWithdrawals();
    } catch (err: any) {
      alert(err.message || "Failed to create withdrawal");
    }
  };

  const statusBadge = (status: string) => {
    if (status === "APPROVED")
      return <Badge className="bg-green-600">Approved</Badge>;
    if (status === "SENT")
      return <Badge className="bg-blue-600">Sent</Badge>;
    return <Badge variant="secondary">Pending</Badge>;
  };

  // ---------- FORM ----------
  if (showForm) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto rounded-2xl">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>New Withdrawal Request</CardTitle>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Back
            </Button>
          </CardHeader>

          <CardContent className="grid gap-4">
            {Object.keys(form).map(
              (key) =>
                key !== "status" && (
                  <input
                    key={key}
                    className="input"
                    name={key}
                    placeholder={key}
                    value={(form as any)[key]}
                    onChange={handleChange}
                  />
                )
            )}
          </CardContent>

          <div className="flex justify-end gap-2 p-6">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------- TABLE ----------
  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Withdrawal Requests</CardTitle>
          <Button onClick={() => setShowForm(true)}>New Withdrawal</Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Charges</TableHead>
                  <TableHead>Net</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No withdrawals
                    </TableCell>
                  </TableRow>
                )}

                {requests.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.amount}</TableCell>
                    <TableCell>{r.charges}</TableCell>
                    <TableCell>{r.netPayout}</TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell>{r.transactionId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};