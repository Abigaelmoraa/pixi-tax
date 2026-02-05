import { useState, useEffect } from "react";
import api from "@/services/api";
import { RefreshCw, AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

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

      let data: PaymentRequest[] = [];

      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.data)) data = res.data.data;
      else if (Array.isArray(res.data?.paymentRequests))
        data = res.data.paymentRequests;
      else if (Array.isArray(res.data?.results)) data = res.data.results;

      setRequests(data);
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        if (status === 401) setError("Unauthorized. Please log in.");
        else if (status === 403) setError("Access denied.");
        else if (status === 404) setError("Endpoint not found.");
        else setError("Server error occurred.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatCurrency = (value?: string | number) => {
    if (!value) return "-";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num)
      ? "-"
      : `KES ${num.toLocaleString("en-KE", {
          minimumFractionDigits: 2,
        })}`;
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-KE");
  };

  const responseBadge = (code?: string) => {
    if (code === "0")
      return <Badge className="bg-emerald-600 text-white">Success</Badge>;
    if (code)
      return <Badge className="bg-red-500 text-white">Failed</Badge>;
    return <Badge variant="secondary">Pending</Badge>;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Card className="rounded-2xl shadow-lg border border-emerald-100">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-2xl">
          <div>
            <CardTitle className="text-xl font-bold">
              Payment Requests
            </CardTitle>
            <p className="text-emerald-100 text-sm mt-1">
              {requests.length} records
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={fetchRequests}
            disabled={loading}
            className="bg-white text-emerald-700"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          {loading && (
            <div className="flex justify-center py-10">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          )}

          {!loading && error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto rounded-xl border border-emerald-100">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-100">
                    <TableHead className="font-bold">#Ref</TableHead>
                    <TableHead className="font-bold">Time In</TableHead>
                    <TableHead className="font-bold">Amount</TableHead>
                    <TableHead className="font-bold">Party A</TableHead>
                    <TableHead className="font-bold">Party B</TableHead>
                    <TableHead className="font-bold">Account Ref</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                    <TableHead className="font-bold">Error Msg</TableHead>
                    <TableHead className="font-bold">Error Code</TableHead>
                    <TableHead className="font-bold">Request ID</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.map((r, index) => (
                    <TableRow key={r.requestId || index}>
                      <TableCell className="font-mono text-xs">
                        {index + 1} · {r.ref ?? "-"}
                      </TableCell>
                      <TableCell>{formatDateTime(r.timeIn)}</TableCell>
                      <TableCell className="font-semibold text-emerald-700">
                        {formatCurrency(r.amount)}
                      </TableCell>
                      <TableCell>{r.partyA ?? "-"}</TableCell>
                      <TableCell>{r.partyB ?? "-"}</TableCell>
                      <TableCell>{r.accountReference ?? "-"}</TableCell>
                      <TableCell>{responseBadge(r.responseCode)}</TableCell>
                      <TableCell>{r.responseDescription ?? "-"}</TableCell>
                      <TableCell className="text-red-600">
                        {r.errorMessage ?? "-"}
                      </TableCell>
                      <TableCell>{r.errorCode ?? "-"}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {r.requestId ?? "-"}
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
