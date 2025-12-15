import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard,
  Download,
  Check,
  Clock,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Billing = () => {
  const currentPlan = {
    name: "Professional",
    price: "$79",
    period: "month",
    features: [
      "Up to 200 clients",
      "Advanced calculations",
      "Priority support",
      "Unlimited storage",
      "Team collaboration"
    ]
  };

  const invoices = [
    { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$79.00", status: "Paid" },
    { id: "INV-2023-012", date: "Dec 1, 2023", amount: "$79.00", status: "Paid" },
    { id: "INV-2023-011", date: "Nov 1, 2023", amount: "$79.00", status: "Paid" },
    { id: "INV-2023-010", date: "Oct 1, 2023", amount: "$79.00", status: "Paid" },
    { id: "INV-2023-009", date: "Sep 1, 2023", amount: "$79.00", status: "Paid" },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Up to 50 clients", "Basic calculations", "Email support"],
      current: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: ["Up to 200 clients", "Advanced calculations", "Priority support", "Team collaboration"],
      current: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: ["Unlimited clients", "Custom integrations", "Dedicated support", "API access"],
      current: false
    }
  ];

  return (
    <>
      <DashboardHeader 
        title="Billing" 
        subtitle="Manage your subscription and payments"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current Plan */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{currentPlan.price}</span>
                    <span className="text-muted-foreground">/{currentPlan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">Next billing date</p>
                  <p className="font-medium">February 1, 2024</p>
                  <Button variant="outline" className="mt-4">
                    Change Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/30 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Plans */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Compare and upgrade your plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`p-6 rounded-xl border-2 ${
                    plan.current 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  } transition-colors`}
                >
                  {plan.current && (
                    <Badge className="mb-4 gradient-primary text-primary-foreground">
                      Current Plan
                    </Badge>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.current ? "" : "gradient-primary text-primary-foreground hover:opacity-90"}`}
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>Download past invoices</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div 
                  key={invoice.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{invoice.amount}</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <Check className="w-3 h-3 mr-1" />
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Billing;
