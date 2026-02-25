// src/pages/TestRunner.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Download, CheckCircle, XCircle } from "lucide-react";
import {
  loginUser,
  registerUser,
  getPaymentRequests,
  createPaymentRequest,
  getWithdrawalRequests,
  getCurrentUser,
  listUsers,
} from "@/services/api";
import api from "@/services/api";

const TestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Test data
  const testData = {
    testUser: {
      name: "Test User",
      email: "test@example.com",
      password: "Test@123456",
    },
    paymentRequest: {
      amount: "1000",
      phone: "254712345678",
      accountReference: "TEST001",
      transactionDesc: "Test payment",
    },
    withdrawalRequest: {
      amount: "500",
      phone: "254712345678",
      reason: "Test withdrawal",
    },
    prnRequest: {
      transDate: new Date().toISOString().split('T')[0],
      amount: "1000",
      taxType: "WHT",
    },
    stakeData: {
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
    },
  };

  const runTests = async () => {
    const testResults: any[] = [];

    console.log("🧪 Starting API Tests...\n");

    // Test 1: User Login
    try {
      console.log("Test 1: User Login");
      const loginResponse = await loginUser({
        email: testData.testUser.email,
        password: testData.testUser.password,
      });
      testResults.push({
        test: "User Login",
        endpoint: "POST /api/login",
        status: "✅ PASS",
        response: loginResponse,
      });
      console.log("✅ Login successful\n");
    } catch (error: any) {
      testResults.push({
        test: "User Login",
        endpoint: "POST /api/login",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Login failed\n");
    }

    // Test 2: Get Current User
    try {
      console.log("Test 2: Get Current User");
      const currentUser = await getCurrentUser();
      testResults.push({
        test: "Get Current User",
        endpoint: "GET /api/user",
        status: "✅ PASS",
        response: currentUser,
      });
      console.log("✅ Get current user successful\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Current User",
        endpoint: "GET /api/user",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get current user failed\n");
    }

    // Test 3: Get Payment Requests
    try {
      console.log("Test 3: Get Payment Requests");
      const paymentsResponse = await getPaymentRequests();
      testResults.push({
        test: "Get Payment Requests",
        endpoint: "GET /api/paymentRequest",
        status: "✅ PASS",
        response: paymentsResponse,
        count: Array.isArray(paymentsResponse.data) ? paymentsResponse.data.length : 0,
      });
      console.log("✅ Payment requests retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Payment Requests",
        endpoint: "GET /api/paymentRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get payment requests failed\n");
    }

    // Test 4: Get Withdrawal Requests
    try {
      console.log("Test 4: Get Withdrawal Requests");
      const withdrawalsResponse = await getWithdrawalRequests();
      testResults.push({
        test: "Get Withdrawal Requests",
        endpoint: "GET /api/withdrawalRequest",
        status: "✅ PASS",
        response: withdrawalsResponse,
        count: Array.isArray(withdrawalsResponse.data) ? withdrawalsResponse.data.length : 0,
      });
      console.log("✅ Withdrawal requests retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Withdrawal Requests",
        endpoint: "GET /api/withdrawalRequest",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get withdrawal requests failed\n");
    }

    // Test 5: Get PRN Logs
    try {
      console.log("Test 5: Get PRN Logs");
      const prnLogsResponse = await api.get("/prodPrnLog");
      testResults.push({
        test: "Get PRN Logs",
        endpoint: "GET /api/prodPrnLog",
        status: "✅ PASS",
        response: prnLogsResponse.data,
        count: Array.isArray(prnLogsResponse.data) ? prnLogsResponse.data.length : 0,
      });
      console.log("✅ PRN logs retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get PRN Logs",
        endpoint: "GET /api/prodPrnLog",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get PRN logs failed\n");
    }

    // Test 6: Get Stake Data
    try {
      console.log("Test 6: Get Stake Data");
      const stakeListResponse = await api.get("/receiveBulkStake");
      testResults.push({
        test: "Get Stake Data",
        endpoint: "GET /api/receiveBulkStake",
        status: "✅ PASS",
        response: stakeListResponse.data,
        count: Array.isArray(stakeListResponse.data) ? stakeListResponse.data.length : 0,
      });
      console.log("✅ Stake data retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Stake Data",
        endpoint: "GET /api/receiveBulkStake",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get stake data failed\n");
    }

    // Test 7: Get Daily Tax Obligations
    try {
      console.log("Test 7: Get Daily Tax Obligations");
      const taxObligationsResponse = await api.get("/dailyTaxObligation");
      testResults.push({
        test: "Get Daily Tax Obligations",
        endpoint: "GET /api/dailyTaxObligation",
        status: "✅ PASS",
        response: taxObligationsResponse.data,
        count: Array.isArray(taxObligationsResponse.data) ? taxObligationsResponse.data.length : 0,
      });
      console.log("✅ Daily tax obligations retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Daily Tax Obligations",
        endpoint: "GET /api/dailyTaxObligation",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get daily tax obligations failed\n");
    }

    // Test 8: Get Outcome Info Logs
    try {
      console.log("Test 8: Get Outcome Info Logs");
      const outcomeLogsResponse = await api.get("/outcomeInfoLog");
      testResults.push({
        test: "Get Outcome Info Logs",
        endpoint: "GET /api/outcomeInfoLog",
        status: "✅ PASS",
        response: outcomeLogsResponse.data,
        count: Array.isArray(outcomeLogsResponse.data) ? outcomeLogsResponse.data.length : 0,
      });
      console.log("✅ Outcome info logs retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "Get Outcome Info Logs",
        endpoint: "GET /api/outcomeInfoLog",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ Get outcome info logs failed\n");
    }

    // Test 9: List Users
    try {
      console.log("Test 9: List Users");
      const usersResponse = await listUsers();
      testResults.push({
        test: "List Users",
        endpoint: "GET /api/users",
        status: "✅ PASS",
        response: usersResponse,
        count: Array.isArray(usersResponse.data) ? usersResponse.data.length : 0,
      });
      console.log("✅ Users list retrieved\n");
    } catch (error: any) {
      testResults.push({
        test: "List Users",
        endpoint: "GET /api/users",
        status: "❌ FAIL",
        error: error.response?.data || error.message,
      });
      console.log("❌ List users failed\n");
    }

    // Generate summary
    const summary = {
      total: testResults.length,
      passed: testResults.filter(r => r.status === "✅ PASS").length,
      failed: testResults.filter(r => r.status === "❌ FAIL").length,
      passRate: 0,
    };
    summary.passRate = Math.round((summary.passed / summary.total) * 100);

    return {
      timestamp: new Date().toISOString(),
      summary,
      results: testResults,
    };
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const testResults = await runTests();
      setResults(testResults);
    } catch (error) {
      console.error("Test execution failed:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = () => {
    if (!results) return;
    
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-test-report-${new Date().toISOString()}.json`;
    a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">
              API Test Suite
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleRunTests}
                disabled={isRunning}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Tests
                  </>
                )}
              </Button>
              {results && (
                <Button onClick={downloadReport} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {!results && !isRunning && (
            <div className="text-center py-12 text-gray-500">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Click "Run Tests" to start API testing</p>
            </div>
          )}

          {isRunning && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Running tests...</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {results.summary.total}
                    </p>
                    <p className="text-sm text-gray-600">Total Tests</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {results.summary.passed}
                    </p>
                    <p className="text-sm text-gray-600">Passed</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-red-600">
                      {results.summary.failed}
                    </p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-indigo-600">
                      {results.summary.passRate}%
                    </p>
                    <p className="text-sm text-gray-600">Pass Rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Test Results */}
              <div className="space-y-3">
                {results.results.map((result: any, index: number) => (
                  <Card key={index} className="border-l-4" style={{
                    borderLeftColor: result.status === "✅ PASS" ? "#22c55e" : "#ef4444"
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {result.status === "✅ PASS" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <h3 className="font-semibold text-gray-900">
                              {result.test}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {result.endpoint}
                          </p>
                          {result.count !== undefined && (
                            <Badge variant="secondary" className="text-xs">
                              {result.count} records
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant={result.status === "✅ PASS" ? "default" : "destructive"}
                          className="ml-4"
                        >
                          {result.status === "✅ PASS" ? "PASS" : "FAIL"}
                        </Badge>
                      </div>
                      {result.error && (
                        <div className="mt-3 p-3 bg-red-50 rounded text-sm text-red-700">
                          <strong>Error:</strong> {JSON.stringify(result.error)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestRunner;