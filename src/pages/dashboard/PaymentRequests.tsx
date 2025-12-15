import { CreditCard, Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Payment {
  ref: string;
  timeIn: string;
  amount: string;
  partyA: string;
  partyB: string;
  accountRef: string;
  responseCode: string;
  responseDesc: string;
  errorMsg: string;
  errorCode: string;
  requestId: string;
  status: string;
}

const PaymentRequests = () => {
  const payments: Payment[] = []; // Empty initially

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search " className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-green-200 hover:bg-green-50">
                <Filter className="w-4 h-4 text-green-500" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time In</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Party A</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Party B</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Account Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Response Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Response Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Error Message</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Error Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Request ID</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-6 text-center text-muted-foreground">
                      No data available
                    </td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-green-600 font-medium">{payment.ref}</td>
                      <td className="px-4 py-3">{payment.timeIn}</td>
                      <td className="px-4 py-3 font-semibold text-emerald-600">{payment.amount}</td>
                      <td className="px-4 py-3">{payment.partyA}</td>
                      <td className="px-4 py-3">{payment.partyB}</td>
                      <td className="px-4 py-3">{payment.accountRef}</td>
                      <td className="px-4 py-3">{payment.responseCode}</td>
                      <td className="px-4 py-3">{payment.responseDesc}</td>
                      <td className="px-4 py-3">{payment.errorMsg}</td>
                      <td className="px-4 py-3">{payment.errorCode}</td>
                      <td className="px-4 py-3">{payment.requestId}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRequests;
