import { useState, useEffect } from "react";
import api from "@/services/api";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PaymentRequest {
  id?: number;
  amount?: string | number;
  charges?: string | number;
  netPayout?: string | number;
  sourceIp?: string;
  transactionId?: string;
  status?: string;
  sentTo?: string;
  apiResponse?: string;
  createdAt?: string;
}

export default function PaymentRequests() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/paymentRequest");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setRequests(data);
    } catch (err: any) {
      setError("Failed to load payment requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatCurrency = (value?: string | number) => {
    if (!value) return "-";
    return `KES ${parseFloat(value.toString()).toLocaleString()}`;
  };

  const statusBadge = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "SENT":
        return <Badge className="bg-blue-600">Sent</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-600">Pending</Badge>;
      case "FAILED":
      case "REJECTED":
        return <Badge className="bg-red-600">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status || "Unknown"}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Payment Requests</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRequests}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>

        <CardContent>
          {loading && <div className="text-center py-10">Loading...</div>}

          {!loading && error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}

          {!loading && !error && (
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
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-muted-foreground"
                      >
                        No payment requests
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((r) => (
                      <TableRow key={r.transactionId || r.id}>
                        <TableCell>{formatCurrency(r.amount)}</TableCell>
                        <TableCell>{formatCurrency(r.charges)}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(r.netPayout)}
                        </TableCell>
                        <TableCell>{r.sourceIp ?? "-"}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.transactionId ?? "-"}
                        </TableCell>
                        <TableCell>{statusBadge(r.status)}</TableCell>
                        <TableCell>{r.sentTo ?? "-"}</TableCell>
                        <TableCell className="max-w-xs">
                          <div
                            className="truncate text-xs"
                            title={r.apiResponse ?? "-"}
                          >
                            {r.apiResponse ?? "-"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}