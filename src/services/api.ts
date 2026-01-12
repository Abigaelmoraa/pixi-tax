import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

// ---------------- AXIOS INSTANCE ----------------
const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: { "Content-Type": "application/json" },
});

// ---------------- REQUEST INTERCEPTOR ----------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ---------------- RESPONSE INTERCEPTOR ----------------
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ---------------- TYPES ----------------
interface ApiResponse<T = any> {
  data?: T | { [key: string]: any };
  message?: string;
  token?: string;
  accessToken?: string;
  user?: any;
}

interface AuthResponse {
  token: string;
  user?: any;
}

// ---------------- HELPERS ----------------

// Safely extract token from all possible locations
const extractToken = (res: AxiosResponse<ApiResponse>): string | null => {
  if (res.data?.token) return res.data.token;
  if (res.data?.accessToken) return res.data.accessToken;
  if (res.data?.data && typeof res.data.data === "object" && "token" in res.data.data) {
    return res.data.data.token;
  }
  return null;
};

// Safely extract user from all possible locations
const extractUser = (res: AxiosResponse<ApiResponse>): any | null => {
  if (res.data?.user) return res.data.user;
  if (res.data?.data && typeof res.data.data === "object" && "user" in res.data.data) {
    return res.data.data.user;
  }
  return null;
};

// ---------------- AUTH ----------------
export const loginUser = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const res: AxiosResponse<ApiResponse> = await api.post("/login", data);

  const token = extractToken(res);
  if (!token) throw new Error(res.data?.message || "Authentication token not returned");

  localStorage.setItem("token", token);

  return { token, user: extractUser(res) };
};

export const registerUser = async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
  const res: AxiosResponse<ApiResponse> = await api.post("/userRegister", data);

  const token = extractToken(res);
  if (token) localStorage.setItem("token", token);

  return { token: token || "", user: extractUser(res) };
};

// ---------------- OTP / PASSWORD ----------------
export const checkOtp = async (data: { email: string; otp: string }) => api.post("/checkOtp", data);
export const logoutUser = async () => api.post("/logout");
export const changePassword = async (data: { oldPassword: string; newPassword: string }) =>
  api.put("/users/password", data);
export const selfPassChange = async (data: { newPassword: string }) => api.post("/selfPassChange", data);

// ---------------- PAYMENTS ----------------
export const createPaymentRequest = async (data: Record<string, any>) => api.post("/paymentRequest", data);
export const createWithdrawalRequest = async (data: Record<string, any>) => api.post("/withdrawalRequest", data);
export const b2cPayoutResponse = async (data: Record<string, any>) => api.post("/b2cPayoutResponse", data);
export const taxPayoutResponse = async (data: Record<string, any>) => api.post("/taxPayoutResponse", data);
export const logTaxData = async (data: Record<string, any>) => api.post("/taxDataLog", data);
export const logTaxDataSandbox = async (data: Record<string, any>) => api.post("/taxDataLogSandbox", data);
export const logOutcomeData = async (data: Record<string, any>) => api.post("/outcomeDataLog", data);
export const logOutcomeInfo = async (data: Record<string, any>) => api.post("/outcomeInfoLog", data);
export const logSandboxOutcomeInfo = async (data: Record<string, any>) => api.post("/sandboxOutcomeInfoLog", data);
export const saveBettingOutcome = async (data: Record<string, any>) => api.post("/saveBettingOutcome", data);
export const prodPrnLog = async (data: Record<string, any>) => api.post("/prodPrnLog", data);

// ---------------- M-PESA ----------------
export const listMpesaIPN = async () => api.get("/mpesaIPN");
export const createMpesaIPN = async (data: Record<string, any>) => api.post("/mpesaIPN", data);
export const getMpesaIPN = async (id: string) => api.get(`/mpesaIPN/${id}`);
export const updateMpesaIPN = async (id: string, data: Record<string, any>) => api.put(`/mpesaIPN/${id}`, data);
export const deleteMpesaIPN = async (id: string) => api.delete(`/mpesaIPN/${id}`);
export const safIPN = async (data: Record<string, any>) => api.post("/safIPN", data);

// ---------------- STK CALLBACK ----------------
export const listSTKCallback = async () => api.get("/sTKCallback");
export const createSTKCallback = async (data: Record<string, any>) => api.post("/sTKCallback", data);
export const getSTKCallback = async (id: string) => api.get(`/sTKCallback/${id}`);
export const updateSTKCallback = async (id: string, data: Record<string, any>) => api.put(`/sTKCallback/${id}`, data);
export const deleteSTKCallback = async (id: string) => api.delete(`/sTKCallback/${id}`);

// ---------------- CLIENTS ----------------
export const listClients = async () => api.get("/client");
export const createClient = async (data: Record<string, any>) => api.post("/client", data);
export const getClient = async (id: string) => api.get(`/client/${id}`);
export const updateClient = async (id: string, data: Record<string, any>) => api.put(`/client/${id}`, data);
export const deleteClient = async (id: string) => api.delete(`/client/${id}`);

// ---------------- USERS ----------------
export const listUsers = async () => api.get("/users");
export const createUser = async (data: Record<string, any>) => api.post("/users", data);
export const getUser = async (id: string) => api.get(`/users/${id}`);
export const updateUser = async (id: string, data: Record<string, any>) => api.put(`/users/${id}`, data);
export const deleteUser = async (id: string) => api.delete(`/users/${id}`);
export const getCurrentUser = async () => api.get("/user");

// ---------------- DASHBOARD ----------------
export const getDashboardTiles = async () => api.get("/dashboardTiles");
export const getDashboardTilesStudio = async () => api.get("/dashboardTilesStudio");

export default api;
