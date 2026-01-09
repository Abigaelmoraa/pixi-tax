import axios, { AxiosInstance, AxiosError } from "axios";

// --------------------
// Axios instance
// --------------------
const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api", // Base API URL
  headers: { "Content-Type": "application/json" },
});

// --------------------
// Request interceptor (attach token)
// --------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// --------------------
// Response interceptor (auto logout on 401)
// --------------------
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

// --------------------
// Authentication & User Access
// --------------------
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/login", data);
  const token = res.data?.token || res.data?.accessToken || res.data?.data?.token;
  if (!token) throw new Error("Authentication token not returned");
  localStorage.setItem("token", token);
  return res.data;
};

export const registerUser = async (data: any) => await api.post("/userRegister", data);
export const checkOtp = async (data: any) => await api.post("/checkOtp", data);
export const logoutUser = async () => await api.post("/logout");
export const changePassword = async (data: any) => await api.put("/users/password", data);
export const selfPassChange = async (data: any) => await api.post("/selfPassChange", data);

// --------------------
// Payments & Callbacks
// --------------------
export const createPaymentRequest = async (data: any) => await api.post("/paymentRequest", data);
export const createWithdrawalRequest = async (data: any) => await api.post("/withdrawalRequest", data);
export const b2cPayoutResponse = async (data: any) => await api.post("/b2cPayoutResponse", data);
export const taxPayoutResponse = async (data: any) => await api.post("/taxPayoutResponse", data);
export const logTaxData = async (data: any) => await api.post("/taxDataLog", data);
export const logTaxDataSandbox = async (data: any) => await api.post("/taxDataLogSandbox", data);
export const logOutcomeData = async (data: any) => await api.post("/outcomeDataLog", data);
export const logOutcomeInfo = async (data: any) => await api.post("/outcomeInfoLog", data);
export const logSandboxOutcomeInfo = async (data: any) => await api.post("/sandboxOutcomeInfoLog", data);
export const saveBettingOutcome = async (data: any) => await api.post("/saveBettingOutcome", data);
export const prodPrnLog = async (data: any) => await api.post("/prodPrnLog", data);

// --------------------
// M-Pesa & STK Callbacks
// --------------------
// Mpesa IPN
export const listMpesaIPN = async () => await api.get("/mpesaIPN");
export const createMpesaIPN = async (data: any) => await api.post("/mpesaIPN", data);
export const getMpesaIPN = async (id: string) => await api.get(`/mpesaIPN/${id}`);
export const updateMpesaIPN = async (id: string, data: any) => await api.put(`/mpesaIPN/${id}`, data);
export const deleteMpesaIPN = async (id: string) => await api.delete(`/mpesaIPN/${id}`);
export const safIPN = async (data: any) => await api.post("/safIPN");

// STK Callbacks
export const listSTKCallback = async () => await api.get("/sTKCallback");
export const createSTKCallback = async (data: any) => await api.post("/sTKCallback", data);
export const getSTKCallback = async (id: string) => await api.get(`/sTKCallback/${id}`);
export const updateSTKCallback = async (id: string, data: any) => await api.put(`/sTKCallback/${id}`, data);
export const deleteSTKCallback = async (id: string) => await api.delete(`/sTKCallback/${id}`);

// --------------------
// Protected Clients & Users
// --------------------
// Clients
export const listClients = async () => await api.get("/client");
export const createClient = async (data: any) => await api.post("/client", data);
export const getClient = async (id: string) => await api.get(`/client/${id}`);
export const updateClient = async (id: string, data: any) => await api.put(`/client/${id}`, data);
export const deleteClient = async (id: string) => await api.delete(`/client/${id}`);

// Users
export const listUsers = async () => await api.get("/users");
export const createUser = async (data: any) => await api.post("/users", data);
export const getUser = async (id: string) => await api.get(`/users/${id}`);
export const updateUser = async (id: string, data: any) => await api.put(`/users/${id}`, data);
export const deleteUser = async (id: string) => await api.delete(`/users/${id}`);
export const getCurrentUser = async () => await api.get("/user");

// Dashboard
export const getDashboardTiles = async () => await api.get("/dashboardTiles");
export const getDashboardTilesStudio = async () => await api.get("/dashboardTilesStudio");

// --------------------
// Export default
// --------------------
export default api;
