import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PaymentRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "https://db.x1.pitch90agent.com";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/paymentRequest`, {
          headers: {
          },
        });
        setRequests(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load payment requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Payment Requests</CardTitle>
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
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        No payment requests
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
