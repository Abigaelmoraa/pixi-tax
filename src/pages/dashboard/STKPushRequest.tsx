import { Smartphone, Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const STKPushRequest = () => {
  const [stkRequests, setStkRequests] = useState<any[]>([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [formData, setFormData] = useState({
    timeIn: "",
    phoneNumber: "",
    amount: "",
    mpesaReceipt: "",
    resultDesc: "",
    misc5: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Completed</Badge>;
      case "pending":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Pending</Badge>;
      case "failed":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStkRequests([
      ...stkRequests,
      { ...formData, id: `REQ${stkRequests.length + 1}`, status: "pending" },
    ]);
    setFormData({ timeIn: "", phoneNumber: "", amount: "", mpesaReceipt: "", resultDesc: "", misc5: "" });
    setShowFormPage(false);
  };

  // Full-page form
  if (showFormPage) {
    return (
      <div className="p-6 animate-fade-in flex justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0">
          <CardHeader className="border-b bg-pink-50">
            <CardTitle className="text-pink-600 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> New STK Push Request
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-4">
              {/* Time In */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Time In</label>
                <Input
                  type="text"
                  placeholder="Enter time in"
                  value={formData.timeIn}
                  onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              {/* Mpesa Receipt */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Mpesa Receipt Number</label>
                <Input
                  placeholder="Enter receipt number"
                  value={formData.mpesaReceipt}
                  onChange={(e) => setFormData({ ...formData, mpesaReceipt: e.target.value })}
                  required
                />
              </div>

              {/* Result Description */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Result Description</label>
                <Input
                  placeholder="Enter result description"
                  value={formData.resultDesc}
                  onChange={(e) => setFormData({ ...formData, resultDesc: e.target.value })}
                  required
                />
              </div>

              {/* Misc5 */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Misc5</label>
                <Input
                  placeholder="Optional"
                  value={formData.misc5}
                  onChange={(e) => setFormData({ ...formData, misc5: e.target.value })}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFormPage(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600"
                >
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Table view
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-pink-600 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> STK Push Requests
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search " className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon" className="border-pink-200 hover:bg-pink-50">
                <Filter className="w-4 h-4 text-pink-500" />
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600"
                onClick={() => setShowFormPage(true)}
              >
                New
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">TRX Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Result Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">API Response</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stkRequests.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">
                      No data available
                    </td>
                  </tr>
                ) : (
                  stkRequests.map((request, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-pink-600 font-medium">{request.id}</td>
                      <td className="px-4 py-3">{request.timeIn}</td>
                      <td className="px-4 py-3">{request.phoneNumber}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">{request.amount}</td>
                      <td className="px-4 py-3">{request.mpesaReceipt}</td>
                      <td className="px-4 py-3">{request.resultDesc}</td>
                      <td className="px-4 py-3">{request.misc5}</td>
                      <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-pink-100 hover:text-pink-600">
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

export default STKPushRequest;
