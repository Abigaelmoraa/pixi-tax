import { useState, useEffect } from "react";
import api from "@/services/api";
import { RefreshCw, AlertCircle, Download } from "lucide-react";
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
  createdAt?: string;
  updatedAt?: string;
}

export default function PaymentRequests() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    
    try {
      // API Documentation: GET /api/paymentRequest (Protected endpoint)
      const res = await api.get("/paymentRequest");
      
      console.log("✓ Payment requests fetched successfully:", res.data);
      
      // Handle different response structures from backend
      let data: PaymentRequest[];
      
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (res.data?.paymentRequests && Array.isArray(res.data.paymentRequests)) {
        data = res.data.paymentRequests;
      } else if (res.data?.results && Array.isArray(res.data.results)) {
        data = res.data.results;
      } else {
        console.warn("Unexpected response structure:", res.data);
        data = [];
      }
      
      setRequests(data);
      
    } catch (err: any) {
      console.error("Error fetching payment requests:", err);
      
      // Provide detailed error messages
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText;
        
        if (status === 401) {
          setError("Unauthorized. Please log in to view payment requests.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view payment requests.");
        } else if (status === 404) {
          setError("Payment requests endpoint not found. Please check API configuration.");
        } else if (status === 500) {
          setError(`Server error: ${message}`);
        } else {
          setError(`Error (${status}): ${message}`);
        }
      } else if (err.request) {
        setError(
          "No response from server. Please check your network connection and ensure the backend is running."
        );
      } else {
        setError(`Failed to load payment requests: ${err.message}`);
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
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return "-";
    return `KES ${numValue.toLocaleString('en-KE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const responseBadge = (code?: string) => {
    if (code === "0")
      return (
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
          Success
        </Badge>
      );
    if (code)
      return (
        <Badge className="bg-red-500 text-white hover:bg-red-600">
          Failed
        </Badge>
      );
    return <Badge variant="secondary">Pending</Badge>;
  };

  const exportToCSV = () => {
    if (requests.length === 0) return;

    const headers = [
      "ID", "Ref", "Time In", "Amount", "Party A", "Party B",
      "Account Reference", "Response Code", "Response Description",
      "Error Message", "Error Code", "Request ID"
    ];

    const rows = requests.map(r => [
      r.id ?? "", r.ref ?? "", r.timeIn ?? "", r.amount ?? "",
      r.partyA ?? "", r.partyB ?? "", r.accountReference ?? "",
      r.responseCode ?? "", r.responseDescription ?? "",
      r.errorMessage ?? "", r.errorCode ?? "", r.requestId ?? ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
              {requests.length} {requests.length === 1 ? 'record' : 'records'}
            </p>
          </div>

          <div className="flex gap-2">
            {requests.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={exportToCSV}
                className="bg-white text-emerald-700 hover:bg-emerald-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
            
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchRequests}
              disabled={loading}
              className="bg-white text-emerald-700 hover:bg-emerald-100"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
              <p className="text-emerald-600 font-medium">Loading payment requests...</p>
            </div>
          )}

          {!loading && error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-1">Error Loading Payment Requests</div>
                <div className="text-sm">{error}</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchRequests}
                  className="mt-3"
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto rounded-xl border border-emerald-100">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-100">
                    <TableHead className="font-bold">#</TableHead>
                    <TableHead className="font-bold">Ref</TableHead>
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
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className="text-center text-muted-foreground py-8"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <AlertCircle className="w-12 h-12 text-gray-300" />
                          <p className="font-medium">No payment records found</p>
                          <p className="text-sm">Payment requests will appear here once created</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((r, index) => (
                      <TableRow
                        key={r.requestId || r.id || index}
                        className="hover:bg-emerald-50 transition-colors"
                      >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.ref ?? "-"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDateTime(r.timeIn)}
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-700 whitespace-nowrap">
                          {formatCurrency(r.amount)}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.partyA ?? "-"}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.partyB ?? "-"}
                        </TableCell>
                        <TableCell>{r.accountReference ?? "-"}</TableCell>
                        <TableCell>
                          {responseBadge(r.responseCode)}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={r.responseDescription}>
                            {r.responseDescription ?? "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-red-600 max-w-xs">
                          <div className="truncate" title={r.errorMessage}>
                            {r.errorMessage ?? "-"}
                          </div>
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