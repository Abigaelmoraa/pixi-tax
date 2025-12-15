import { CalendarCheck, Search, Filter, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface TaxFormData {
  taxDate: string;
  depositTotal: string;
  withdrawalTotal: string;
  taxOnDeposit: string;
  taxOnWithdrawal: string;
  totalTaxAmount: string;
  trxCode: string;
  prnCode: string;
}

const DailyTaxObligation = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TaxFormData>({
    taxDate: "",
    depositTotal: "",
    withdrawalTotal: "",
    taxOnDeposit: "",
    taxOnWithdrawal: "",
    totalTaxAmount: "",
    trxCode: "",
    prnCode: "",
  });

  const obligations: TaxFormData[] = [
    // Sample data from backend
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form saved:", formData);
    setFormData({
      taxDate: "",
      depositTotal: "",
      withdrawalTotal: "",
      taxOnDeposit: "",
      taxOnWithdrawal: "",
      totalTaxAmount: "",
      trxCode: "",
      prnCode: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card className="shadow-lg border-0">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-emerald-600 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" /> Daily Tax Obligations
          </CardTitle>
          <div className="flex items-center gap-2">
            {!showForm && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search " className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon" className="border-emerald-200 hover:bg-emerald-50">
                  <Filter className="w-4 h-4 text-emerald-500" />
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> New Tax Entry
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        {/* Form */}
        {showForm && (
          <CardContent>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {[
                { label: "Tax Date", key: "taxDate", placeholder: "YYYY-MM-DD" },
                { label: "Deposit Total", key: "depositTotal", placeholder: "Enter Deposit Total" },
                { label: "Withdrawal Total", key: "withdrawalTotal", placeholder: "Enter Withdrawal Total" },
                { label: "Tax On Deposit", key: "taxOnDeposit", placeholder: "Enter Tax On Deposit" },
                { label: "Tax On Withdrawal", key: "taxOnWithdrawal", placeholder: "Enter Tax On Withdrawal" },
                { label: "Total Tax Amount", key: "totalTaxAmount", placeholder: "Enter Total Tax Amount" },
                { label: "Trx Code", key: "trxCode", placeholder: "Enter Transaction Code" },
                { label: "Prn Code", key: "prnCode", placeholder: "Enter PRN Code" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-muted-foreground">{field.label}</label>
                  <Input
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof TaxFormData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Table */}
        {!showForm && (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#Ref</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Deposit Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Withdrawal Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax On Deposit</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tax On Withdrawal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total Tax Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trx Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Prn Code</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {obligations.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-6 text-muted-foreground">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    obligations.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-emerald-600 font-medium">{index + 1}</td>
                        <td className="px-4 py-3">{item.taxDate}</td>
                        <td className="px-4 py-3">{item.depositTotal}</td>
                        <td className="px-4 py-3">{item.withdrawalTotal}</td>
                        <td className="px-4 py-3">{item.taxOnDeposit}</td>
                        <td className="px-4 py-3">{item.taxOnWithdrawal}</td>
                        <td className="px-4 py-3">{item.totalTaxAmount}</td>
                        <td className="px-4 py-3">{item.trxCode}</td>
                        <td className="px-4 py-3">{item.prnCode}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-emerald-100 hover:text-emerald-600">
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
        )}
      </Card>
    </div>
  );
};

export default DailyTaxObligation;
