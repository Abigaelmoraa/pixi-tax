import { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom"; // for navigation
import api from "@/services/api"; // axios instance with auth

const PRNRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // router navigation

  /* ================= FETCH PRN ================= */
  useEffect(() => {
    const fetchPRNs = async () => {
      try {
        const res = await api.get("/prodPrnLog"); // use your axios instance
        setRequests(res.data);
      } catch (err: any) {
        console.error("Failed to fetch PRNs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPRNs();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <Badge className="bg-blue-600 text-white"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "pending":
        return <Badge className="bg-blue-400 text-white"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in bg-blue-50 min-h-screen">
      <Card className="shadow-lg border-0">
        {/* ================= HEADER ================= */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-200 to-blue-400 flex items-center">
          <CardTitle className="text-blue-900 flex items-center gap-2">PRN Requests</CardTitle>

          <Button
            className="ml-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            onClick={() => navigate("/prn/new")} // navigate to new PRN page
          >
            New PRN
          </Button>
        </CardHeader>

        {/* ================= TABLE ================= */}
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-6 text-blue-600">Loading PRN requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center py-6 text-blue-600">No PRN requests available</p>
          ) : (
            <table className="w-full">
              <thead className="bg-blue-100">
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
                {requests.map((req, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-blue-100/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-blue-600 font-medium">{req.ref}</td>
                    <td className="px-4 py-3">{req.transactionDate}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{req.amount}</td>
                    <td className="px-4 py-3">{req.taxType}</td>
                    <td className="px-4 py-3">{req.prn}</td>
                    <td className="px-4 py-3">{req.kra}</td>
                    <td className="px-4 py-3">{req.safaricom}</td>
                    <td className="px-4 py-3">{req.trxCode}</td>
                    <td className="px-4 py-3 flex justify-end">{getStatusBadge(req.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PRNRequests;
