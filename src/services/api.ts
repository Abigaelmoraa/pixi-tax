import axios, { AxiosInstance, AxiosError } from "axios";

// ---------------- AXIOS INSTANCE ----------------
const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: { "Content-Type": "application/json" },
});

// ---------------- INTERCEPTORS ----------------
// Attach token automatically
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

// Auto-logout on 401
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

// ---------------- AUTH ----------------
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/login", data);

  const token = res.data?.token || res.data?.accessToken || res.data?.data?.token;
  if (!token) throw new Error(res.data?.message || "Authentication token not returned");

  localStorage.setItem("token", token);
  return res.data;
};

export const registerUser = async (data: { email: string; password: string; name?: string }) =>
  api.post("/userRegister", data);

export const checkOtp = async (data: { email: string; otp: string }) => api.post("/checkOtp", data);
export const logoutUser = async () => api.post("/logout");
export const changePassword = async (data: { oldPassword: string; newPassword: string }) =>
  api.put("/users/password", data);
export const selfPassChange = async (data: { newPassword: string }) => api.post("/selfPassChange", data);

// ---------------- PAYMENTS & TAX ----------------
export const createPaymentRequest = async (data: any) => api.post("/paymentRequest", data);
export const createWithdrawalRequest = async (data: any) => api.post("/withdrawalRequest", data);
export const b2cPayoutResponse = async (data: any) => api.post("/b2cPayoutResponse", data);
export const taxPayoutResponse = async (data: any) => api.post("/taxPayoutResponse", data);
export const logTaxData = async (data: any) => api.post("/taxDataLog", data);
export const logTaxDataSandbox = async (data: any) => api.post("/taxDataLogSandbox", data);
export const logOutcomeData = async (data: any) => api.post("/outcomeDataLog", data);
export const logOutcomeInfo = async (data: any) => api.post("/outcomeInfoLog", data);
export const logSandboxOutcomeInfo = async (data: any) => api.post("/sandboxOutcomeInfoLog", data);
export const saveBettingOutcome = async (data: any) => api.post("/saveBettingOutcome", data);
export const prodPrnLog = async (data: any) => api.post("/prodPrnLog", data);

// ---------------- M-PESA ----------------
export const listMpesaIPN = async () => api.get("/mpesaIPN");
export const createMpesaIPN = async (data: any) => api.post("/mpesaIPN", data);
export const getMpesaIPN = async (id: string) => api.get(`/mpesaIPN/${id}`);
export const updateMpesaIPN = async (id: string, data: any) => api.put(`/mpesaIPN/${id}`, data);
export const deleteMpesaIPN = async (id: string) => api.delete(`/mpesaIPN/${id}`);
export const safIPN = async (data: any) => api.post("/safIPN", data);

// ---------------- STK CALLBACK ----------------
export const listSTKCallback = async () => api.get("/sTKCallback");
export const createSTKCallback = async (data: any) => api.post("/sTKCallback", data);
export const getSTKCallback = async (id: string) => api.get(`/sTKCallback/${id}`);
export const updateSTKCallback = async (id: string, data: any) => api.put(`/sTKCallback/${id}`, data);
export const deleteSTKCallback = async (id: string) => api.delete(`/sTKCallback/${id}`);

// ---------------- CLIENTS ----------------
export const listClients = async () => api.get("/client");
export const createClient = async (data: any) => api.post("/client", data);
export const getClient = async (id: string) => api.get(`/client/${id}`);
export const updateClient = async (id: string, data: any) => api.put(`/client/${id}`, data);
export const deleteClient = async (id: string) => api.delete(`/client/${id}`);

// ---------------- USERS ----------------
export const listUsers = async () => api.get("/users");
export const createUser = async (data: any) => api.post("/users", data);
export const getUser = async (id: string) => api.get(`/users/${id}`);
export const updateUser = async (id: string, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = async (id: string) => api.delete(`/users/${id}`);
export const getCurrentUser = async () => api.get("/user");

// ---------------- DASHBOARD ----------------
export const getDashboardTiles = async () => api.get("/dashboardTiles");
export const getDashboardTilesStudio = async () => api.get("/dashboardTilesStudio");

export default api;
