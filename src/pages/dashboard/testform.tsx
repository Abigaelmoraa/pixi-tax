// src/pages/dashboard/TaxTest.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/services/api"; // your axios instance

const endpoints = [
  // Public endpoints
  { label: "Register User", path: "/userRegister", method: "POST" },
  { label: "Login", path: "/login", method: "POST" },
  { label: "Check OTP", path: "/checkOtp", method: "POST" },
  { label: "Logout", path: "/logout", method: "POST" },
  { label: "Self Password Change", path: "/selfPassChange", method: "POST" },

  // Payments & Callbacks
  { label: "Payment Request", path: "/paymentRequest", method: "POST" },
  { label: "Withdrawal Request", path: "/withdrawalRequest", method: "POST" },
  { label: "B2C Payout Response", path: "/b2cPayoutResponse", method: "POST" },
  { label: "Tax Payout Response", path: "/taxPayoutResponse", method: "POST" },
  { label: "Tax Data Log", path: "/taxDataLog", method: "POST" },
  { label: "Tax Data Log Sandbox", path: "/taxDataLogSandbox", method: "POST" },
  { label: "Outcome Data Log", path: "/outcomeDataLog", method: "POST" },
  { label: "Outcome Info Log", path: "/outcomeInfoLog", method: "POST" },
  { label: "Sandbox Outcome Info Log", path: "/sandboxOutcomeInfoLog", method: "POST" },
  { label: "Save Betting Outcome", path: "/saveBettingOutcome", method: "POST" },
  { label: "Prod PRN Log", path: "/prodPrnLog", method: "POST" },

  // Mpesa & STK
  { label: "List Mpesa IPN", path: "/mpesaIPN", method: "GET" },
  { label: "Create Mpesa IPN", path: "/mpesaIPN", method: "POST" },
  { label: "Get Mpesa IPN by ID", path: "/mpesaIPN/:id", method: "GET" },
  { label: "Update Mpesa IPN", path: "/mpesaIPN/:id", method: "PUT" },
  { label: "Delete Mpesa IPN", path: "/mpesaIPN/:id", method: "DELETE" },
];

export default function TaxTest() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].path);
  const [method, setMethod] = useState(endpoints[0].method);
  const [requestBody, setRequestBody] = useState("{}");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      let res;
      const parsedBody = requestBody ? JSON.parse(requestBody) : {};
      switch (method) {
        case "GET":
          res = await api.get(selectedEndpoint.replace(":id", parsedBody.id || ""));
          break;
        case "POST":
          res = await api.post(selectedEndpoint.replace(":id", parsedBody.id || ""), parsedBody);
          break;
        case "PUT":
          res = await api.put(selectedEndpoint.replace(":id", parsedBody.id || ""), parsedBody);
          break;
        case "DELETE":
          res = await api.delete(selectedEndpoint.replace(":id", parsedBody.id || ""));
          break;
        default:
          return;
      }
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setResponse(
        JSON.stringify(err.response?.data || err.message, null, 2)
      );
    }
  };

  const handleEndpointChange = (e) => {
    const ep = endpoints.find((x) => x.path === e.target.value);
    setSelectedEndpoint(ep.path);
    setMethod(ep.method);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pixi API Test Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Endpoint</label>
        <select
          value={selectedEndpoint}
          onChange={handleEndpointChange}
          className="border p-2 rounded w-full"
        >
          {endpoints.map((ep) => (
            <option key={ep.path} value={ep.path}>
              {ep.label} ({ep.method})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Request Body (JSON)</label>
        <textarea
          rows={8}
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          className="border p-2 rounded w-full font-mono text-sm"
          placeholder='{"key":"value"}'
        />
      </div>

      <Button onClick={handleSend}>Send Request</Button>

      <div className="mt-6">
        <label className="block mb-1 font-medium">Response</label>
        <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
          {response}
        </pre>
      </div>
    </div>
  );
}