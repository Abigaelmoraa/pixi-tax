// src/pages/TestRunner.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Download, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import {
  loginUser,
  registerUser,
  getPaymentRequests,
  createPaymentRequest,
  getWithdrawalRequests,
  createWithdrawalRequest,
  getCurrentUser,
  listUsers,
} from "@/services/api";
import api from "@/services/api";

const TestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("auth");

  // Form States
  const [authForm, setAuthForm] = useState({
    email: "test@example.com",
    password: "Test@123456",
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: "1000",
    phone: "254712345678",
    accountReference: "TEST001",
    transactionDesc: "Test payment",
  });

  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "500",
    phone: "254712345678",
    reason: "Test withdrawal",
  });

  const [prnForm, setPrnForm] = useState({
    transDate: new Date().toISOString().split('T')[0],
    amount: "1000",
    taxType: "WHT",
  });

  const [stakeForm, setStakeForm] = useState({
    betId: "BET001",
    customerId: "CUST001",
    mobileNo: "254712345678",
    punterAmt: "500",
    desc: "Test stake",
    stakeAmt: "500",
    stakeType: "Active",
    odds: "2.5",
    dateOfStake: new Date().toISOString().split('T')[0],
    exciseAmt: "50",
    walletBalanceStake: "1000",
  });

  const [taxObligationForm, setTaxObligationForm] = useState({
    taxDate: new Date().toISOString().split('T')[0],
    depositTotal: "10000",
    withdrawalTotal: "5000",
    taxOnDeposit: "2000",
    taxOnWithdrawal: "1000",
    totalTaxAmount: "3000",
    trxCode: "TRX001",
    prnCode: "PRN001",
  });

  const [outcomeForm, setOutcomeForm] = useState({
    betId: "BET001",
    outcome: "Won",
    payout: "1250",
    outcomedate: new Date().toISOString().split('T')[0],
    winnings: "1250",
    withholdingtax: "125",
    walletbalanceoutcome: "2125",
    sentToKra: "Yes",
  });

  const addResult = (result: any) => {
    setResults(prev => [result, ...prev]);
  };

  const clearResults = () => {
    setResults([]);
  };

  // Test Functions
  const testLogin = async () => {
    setIsRunning(true);
    try {
      const response = await loginUser(authForm);
      addResult({
        test: "User Login",
        endpoint: "POST /api/login",
        status: "✅ PASS",
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "User Login",
        endpoint: "POST /api/login",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetCurrentUser = async () => {
    setIsRunning(true);
    try {
      const response = await getCurrentUser();
      addResult({
        test: "Get Current User",
        endpoint: "GET /api/user",
        status: "✅ PASS",
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Current User",
        endpoint: "GET /api/user",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreatePayment = async () => {
    setIsRunning(true);
    try {
      const response = await createPaymentRequest(paymentForm);
      addResult({
        test: "Create Payment Request",
        endpoint: "POST /api/paymentRequest",
        status: "✅ PASS",
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create Payment Request",
        endpoint: "POST /api/paymentRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetPayments = async () => {
    setIsRunning(true);
    try {
      const response = await getPaymentRequests();
      addResult({
        test: "Get Payment Requests",
        endpoint: "GET /api/paymentRequest",
        status: "✅ PASS",
        response,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Payment Requests",
        endpoint: "GET /api/paymentRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreateWithdrawal = async () => {
    setIsRunning(true);
    try {
      const response = await createWithdrawalRequest(withdrawalForm);
      addResult({
        test: "Create Withdrawal Request",
        endpoint: "POST /api/withdrawalRequest",
        status: "✅ PASS",
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create Withdrawal Request",
        endpoint: "POST /api/withdrawalRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetWithdrawals = async () => {
    setIsRunning(true);
    try {
      const response = await getWithdrawalRequests();
      addResult({
        test: "Get Withdrawal Requests",
        endpoint: "GET /api/withdrawalRequest",
        status: "✅ PASS",
        response,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Withdrawal Requests",
        endpoint: "GET /api/withdrawalRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreatePRN = async () => {
    setIsRunning(true);
    try {
      const response = await api.post("/pRNRequest", prnForm);
      addResult({
        test: "Create PRN Request",
        endpoint: "POST /api/pRNRequest",
        status: "✅ PASS",
        response: response.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create PRN Request",
        endpoint: "POST /api/pRNRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetPRNLogs = async () => {
    setIsRunning(true);
    try {
      const response = await api.get("/prodPrnLog");
      addResult({
        test: "Get PRN Logs",
        endpoint: "GET /api/prodPrnLog",
        status: "✅ PASS",
        response: response.data,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get PRN Logs",
        endpoint: "GET /api/prodPrnLog",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreateStake = async () => {
    setIsRunning(true);
    try {
      const response = await api.post("/receiveBulkStake", stakeForm);
      addResult({
        test: "Create Stake Data",
        endpoint: "POST /api/receiveBulkStake",
        status: "✅ PASS",
        response: response.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create Stake Data",
        endpoint: "POST /api/receiveBulkStake",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetStakes = async () => {
    setIsRunning(true);
    try {
      const response = await api.get("/receiveBulkStake");
      addResult({
        test: "Get Stake Data",
        endpoint: "GET /api/receiveBulkStake",
        status: "✅ PASS",
        response: response.data,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Stake Data",
        endpoint: "GET /api/receiveBulkStake",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreateTaxObligation = async () => {
    setIsRunning(true);
    try {
      const response = await api.post("/dailyTaxObligation", taxObligationForm);
      addResult({
        test: "Create Daily Tax Obligation",
        endpoint: "POST /api/dailyTaxObligation",
        status: "✅ PASS",
        response: response.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create Daily Tax Obligation",
        endpoint: "POST /api/dailyTaxObligation",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetTaxObligations = async () => {
    setIsRunning(true);
    try {
      const response = await api.get("/dailyTaxObligation");
      addResult({
        test: "Get Daily Tax Obligations",
        endpoint: "GET /api/dailyTaxObligation",
        status: "✅ PASS",
        response: response.data,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Daily Tax Obligations",
        endpoint: "GET /api/dailyTaxObligation",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testCreateOutcome = async () => {
    setIsRunning(true);
    try {
      const response = await api.post("/outcomeInfoLog", outcomeForm);
      addResult({
        test: "Create Outcome Info Log",
        endpoint: "POST /api/outcomeInfoLog",
        status: "✅ PASS",
        response: response.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Create Outcome Info Log",
        endpoint: "POST /api/outcomeInfoLog",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testGetOutcomes = async () => {
    setIsRunning(true);
    try {
      const response = await api.get("/outcomeInfoLog");
      addResult({
        test: "Get Outcome Info Logs",
        endpoint: "GET /api/outcomeInfoLog",
        status: "✅ PASS",
        response: response.data,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "Get Outcome Info Logs",
        endpoint: "GET /api/outcomeInfoLog",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const testListUsers = async () => {
    setIsRunning(true);
    try {
      const response = await listUsers();
      addResult({
        test: "List Users",
        endpoint: "GET /api/users",
        status: "✅ PASS",
        response,
        count: Array.isArray(response.data) ? response.data.length : 0,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      addResult({
        test: "List Users",
        endpoint: "GET /api/users",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const downloadResults = () => {
    if (results.length === 0) return;
    
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-test-results-${new Date().toISOString()}.json`;
    a.click();
  };

  const summary = {
    total: results.length,
    passed: results.filter(r => r.status === "✅ PASS").length,
    failed: results.filter(r => r.status === "❌ FAIL").length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Forms */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl font-bold text-gray-800">
                API Test Forms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="prn">PRN</TabsTrigger>
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>

                {/* Auth Tab */}
                <TabsContent value="auth" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                        placeholder="test@example.com"
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={testLogin} disabled={isRunning} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Test Login
                      </Button>
                      <Button onClick={testGetCurrentUser} disabled={isRunning} variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Get User
                      </Button>
                    </div>
                    <Button onClick={testListUsers} disabled={isRunning} variant="secondary" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      List All Users
                    </Button>
                  </div>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Amount</Label>
                        <Input
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={paymentForm.phone}
                          onChange={(e) => setPaymentForm({ ...paymentForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Account Reference</Label>
                      <Input
                        value={paymentForm.accountReference}
                        onChange={(e) => setPaymentForm({ ...paymentForm, accountReference: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={paymentForm.transactionDesc}
                        onChange={(e) => setPaymentForm({ ...paymentForm, transactionDesc: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={testCreatePayment} disabled={isRunning} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Create Payment
                      </Button>
                      <Button onClick={testGetPayments} disabled={isRunning} variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Get Payments
                      </Button>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-semibold mb-3">Withdrawal Test</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Amount</Label>
                          <Input
                            value={withdrawalForm.amount}
                            onChange={(e) => setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={withdrawalForm.phone}
                            onChange={(e) => setWithdrawalForm({ ...withdrawalForm, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label>Reason</Label>
                        <Input
                          value={withdrawalForm.reason}
                          onChange={(e) => setWithdrawalForm({ ...withdrawalForm, reason: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button onClick={testCreateWithdrawal} disabled={isRunning} className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Create Withdrawal
                        </Button>
                        <Button onClick={testGetWithdrawals} disabled={isRunning} variant="outline" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Get Withdrawals
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* PRN Tab */}
                <TabsContent value="prn" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Transaction Date</Label>
                        <Input
                          type="date"
                          value={prnForm.transDate}
                          onChange={(e) => setPrnForm({ ...prnForm, transDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Amount</Label>
                        <Input
                          value={prnForm.amount}
                          onChange={(e) => setPrnForm({ ...prnForm, amount: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Tax Type</Label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={prnForm.taxType}
                        onChange={(e) => setPrnForm({ ...prnForm, taxType: e.target.value })}
                      >
                        <option value="WHT">WHT</option>
                        <option value="VAT">VAT</option>
                        <option value="EXCISE">EXCISE</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={testCreatePRN} disabled={isRunning} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Create PRN
                      </Button>
                      <Button onClick={testGetPRNLogs} disabled={isRunning} variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Get PRN Logs
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Stake Tab */}
                <TabsContent value="stake" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Bet ID</Label>
                        <Input
                          value={stakeForm.betId}
                          onChange={(e) => setStakeForm({ ...stakeForm, betId: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Customer ID</Label>
                        <Input
                          value={stakeForm.customerId}
                          onChange={(e) => setStakeForm({ ...stakeForm, customerId: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Mobile No</Label>
                        <Input
                          value={stakeForm.mobileNo}
                          onChange={(e) => setStakeForm({ ...stakeForm, mobileNo: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Stake Amount</Label>
                        <Input
                          value={stakeForm.stakeAmt}
                          onChange={(e) => setStakeForm({ ...stakeForm, stakeAmt: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Odds</Label>
                        <Input
                          value={stakeForm.odds}
                          onChange={(e) => setStakeForm({ ...stakeForm, odds: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Stake Type</Label>
                        <select
                          className="w-full px-3 py-2 border rounded"
                          value={stakeForm.stakeType}
                          onChange={(e) => setStakeForm({ ...stakeForm, stakeType: e.target.value })}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={testCreateStake} disabled={isRunning} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Create Stake
                      </Button>
                      <Button onClick={testGetStakes} disabled={isRunning} variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Get Stakes
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Other Tab */}
                <TabsContent value="other" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">Daily Tax Obligation</h3>
                      <div className="flex gap-2">
                        <Button onClick={testCreateTaxObligation} disabled={isRunning} className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Create Tax
                        </Button>
                        <Button onClick={testGetTaxObligations} disabled={isRunning} variant="outline" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Get Tax
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-3">Bet Outcomes</h3>
                      <div className="flex gap-2">
                        <Button onClick={testCreateOutcome} disabled={isRunning} className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Create Outcome
                        </Button>
                        <Button onClick={testGetOutcomes} disabled={isRunning} variant="outline" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Get Outcomes
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Results */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">
                  Test Results
                </CardTitle>
                <div className="flex gap-2">
                  {results.length > 0 && (
                    <>
                      <Button onClick={downloadResults} size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button onClick={clearResults} size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {results.length > 0 && (
                <div className="flex gap-3 mt-3">
                  <Badge className="bg-green-100 text-green-700">
                    ✅ {summary.passed}
                  </Badge>
                  <Badge className="bg-red-100 text-red-700">
                    ❌ {summary.failed}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
              {results.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Play className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Run tests to see results</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <Card key={index} className="border-l-4" style={{
                      borderLeftColor: result.status === "✅ PASS" ? "#22c55e" : "#ef4444"
                    }}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          {result.status === "✅ PASS" ? (
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {result.test}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {result.endpoint}
                            </p>
                            {result.count !== undefined && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {result.count} records
                              </Badge>
                            )}
                            {result.error && (
                              <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                                {JSON.stringify(result.error).substring(0, 100)}...
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestRunner;