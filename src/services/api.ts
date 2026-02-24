import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// --- REQUEST INTERCEPTOR ---
api.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    });

    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/login") &&
      !originalRequest.url?.includes("/userRegister")
    ) {
      // Handle auth redirect in your route guards / components
    }
    return Promise.reject(error);
  }
);

// --- TYPES ---
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  user?: any;
  status?: string;
  response_code?: string | number;
}

// --- HELPER: Standardize Response ---
const standardizeResponse = <T = any>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data?.data || response.data,
    message: response.data?.message || "Success",
    status: response.data?.status || "success",
    response_code: response.data?.response_code || response.status,
  };
};

// --- AUTH ---
export const loginUser = async (data: { email: string; password: string }): Promise<ApiResponse> => {
  const res = await api.post("/login", data);
  return standardizeResponse(res);
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  const res = await api.post("/userRegister", data);
  return standardizeResponse(res);
};

export const logoutUser = async (): Promise<ApiResponse> => {
  const res = await api.post("/logout");
  return standardizeResponse(res);
};

export const getCurrentUser = async () => {
  const res = await api.get("/user");
  const data = standardizeResponse(res);
  return data.data?.user ?? data.data ?? true;
};

// --- DASHBOARD ---
export const getDashboardTiles = async (): Promise<ApiResponse> => {
  const res = await api.get("/dashboardTiles");
  return standardizeResponse(res);
};

export const getDashboardTilesStudio = async (): Promise<ApiResponse> => {
  const res = await api.get("/dashboardTilesStudio");
  return standardizeResponse(res);
};

// --- PAYMENTS ---
export const getPaymentRequests = async (): Promise<ApiResponse> => {
  const res = await api.get("/paymentRequest");
  return standardizeResponse(res);
};

export const createPaymentRequest = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/paymentRequest", data);
  return standardizeResponse(res);
};

export const getWithdrawalRequests = async (): Promise<ApiResponse> => {
  const res = await api.get("/withdrawalRequest");
  return standardizeResponse(res);
};

export const createWithdrawalRequest = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/withdrawalRequest", data);
  return standardizeResponse(res);
};

// --- TAX MODULE ---
export const logTaxData = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/taxDataLog", data);
  return standardizeResponse(res);
};

export const logTaxDataSandbox = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/taxDataLogSandbox", data);
  return standardizeResponse(res);
};

export const taxPayoutResponse = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/taxPayoutResponse", data);
  return standardizeResponse(res);
};

// Batch testing helper
export const runBatchTaxTests = async (testCases: Record<string, any>[]) => {
  const results: { input: any; response: any; success: boolean }[] = [];
  for (const test of testCases) {
    try {
      const res = await logTaxData(test);
      results.push({ input: test, response: res, success: true });
    } catch (err: any) {
      results.push({ 
        input: test, 
        response: err.response?.data || err.message, 
        success: false 
      });
    }
  }
  return {
    total: testCases.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results,
  };
};

// --- MPESA IPN ---
export const listMpesaIPN = async (): Promise<ApiResponse> => {
  const res = await api.get("/mpesaIPN");
  return standardizeResponse(res);
};

export const createMpesaIPN = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/mpesaIPN", data);
  return standardizeResponse(res);
};

export const getMpesaIPN = async (id: string): Promise<ApiResponse> => {
  const res = await api.get(`/mpesaIPN/${id}`);
  return standardizeResponse(res);
};

export const updateMpesaIPN = async (id: string, data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.put(`/mpesaIPN/${id}`, data);
  return standardizeResponse(res);
};

export const deleteMpesaIPN = async (id: string): Promise<ApiResponse> => {
  const res = await api.delete(`/mpesaIPN/${id}`);
  return standardizeResponse(res);
};

// --- CLIENTS ---
export const listClients = async (): Promise<ApiResponse> => {
  const res = await api.get("/client");
  return standardizeResponse(res);
};

export const createClient = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/client", data);
  return standardizeResponse(res);
};

export const getClient = async (id: string): Promise<ApiResponse> => {
  const res = await api.get(`/client/${id}`);
  return standardizeResponse(res);
};

export const updateClient = async (id: string, data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.put(`/client/${id}`, data);
  return standardizeResponse(res);
};

export const deleteClient = async (id: string): Promise<ApiResponse> => {
  const res = await api.delete(`/client/${id}`);
  return standardizeResponse(res);
};

// --- USERS ---
export const listUsers = async (): Promise<ApiResponse> => {
  const res = await api.get("/users");
  return standardizeResponse(res);
};

export const createUser = async (data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.post("/users", data);
  return standardizeResponse(res);
};

export const getUser = async (id: string): Promise<ApiResponse> => {
  const res = await api.get(`/users/${id}`);
  return standardizeResponse(res);
};

export const updateUser = async (id: string, data: Record<string, any>): Promise<ApiResponse> => {
  const res = await api.put(`/users/${id}`, data);
  return standardizeResponse(res);
};

export const deleteUser = async (id: string): Promise<ApiResponse> => {
  const res = await api.delete(`/users/${id}`);
  return standardizeResponse(res);
};

export default api;