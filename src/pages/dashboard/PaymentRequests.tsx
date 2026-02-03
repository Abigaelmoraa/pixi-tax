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
  ref?: string;
  timeIn?: string;
  amount?: string | number;
  partyA?: string;
  partyB?: string;
  accountReference?: string;
  responseCode?: string;
  responseDescription?: string;
  errorMessage?: string;
  errorCode?: string;
  requestId?: string;
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
    } catch {
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

  const responseBadge = (code?: string) => {
    if (code === "0")
      return <Badge className="bg-green-600">Success</Badge>;
    if (code)
      return <Badge className="bg-red-600">Failed</Badge>;
    return <Badge variant="secondary">N/A</Badge>;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Card className="rounded-2xl shadow-lg border border-indigo-100">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-2xl">
          <CardTitle className="text-xl font-bold">
            Payment Requests
          </CardTitle>
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchRequests}
            disabled={loading}
            className="bg-white text-indigo-700 hover:bg-indigo-100"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          {loading && (
            <div className="text-center py-10 text-indigo-600 font-medium">
              Loading payment requests...
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-red-500 py-10">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-100">
                    <TableHead>#</TableHead>
                    <TableHead>Ref</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Party A</TableHead>
                    <TableHead>Party B</TableHead>
                    <TableHead>Account Ref</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Error Msg</TableHead>
                    <TableHead>Error Code</TableHead>
                    <TableHead>Request ID</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className="text-center text-muted-foreground py-6"
                      >
                        No payment records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((r, index) => (
                      <TableRow
                        key={r.requestId || r.id}
                        className="hover:bg-indigo-50 transition"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.ref ?? "-"}
                        </TableCell>
                        <TableCell>{r.timeIn ?? "-"}</TableCell>
                        <TableCell className="font-semibold text-green-700">
                          {formatCurrency(r.amount)}
                        </TableCell>
                        <TableCell>{r.partyA ?? "-"}</TableCell>
                        <TableCell>{r.partyB ?? "-"}</TableCell>
                        <TableCell>{r.accountReference ?? "-"}</TableCell>
                        <TableCell>
                          {responseBadge(r.responseCode)}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {r.responseDescription ?? "-"}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {r.errorMessage ?? "-"}
                        </TableCell>
                        <TableCell>{r.errorCode ?? "-"}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.requestId ?? "-"}
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
