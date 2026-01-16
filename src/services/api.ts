import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/* ================================
   🔐 AUTO-ATTACH TOKEN (CRITICAL)
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  user?: any;
  token?: string;
}

/* ================================
   AUTH
================================ */

// LOGIN (SAVE TOKEN)
export const loginUser = async (data: { email: string; password: string }) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/login", data);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/userRegister", data);
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  return api.post("/logout");
};

export const getCurrentUser = async () => {
  const res: AxiosResponse<ApiResponse> = await api.get("/user");
  return res.data?.user || res.data?.data || null;
};

/* ================================
   DASHBOARD
================================ */
export const getDashboardTiles = async () => api.get("/dashboardTiles");
export const getDashboardTilesStudio = async () => api.get("/dashboardTilesStudio");

/* ================================
   PAYMENTS
================================ */
export const createPaymentRequest = async (data: Record<string, any>) =>
  api.post("/paymentRequest", data);

export const createWithdrawalRequest = async (data: Record<string, any>) =>
  api.post("/withdrawalRequest", data);

export const b2cPayoutResponse = async (data: Record<string, any>) =>
  api.post("/b2cPayoutResponse", data);

export const taxPayoutResponse = async (data: Record<string, any>) =>
  api.post("/taxPayoutResponse", data);

export const logTaxData = async (data: Record<string, any>) =>
  api.post("/taxDataLog", data);

export const logTaxDataSandbox = async (data: Record<string, any>) =>
  api.post("/taxDataLogSandbox", data);

export const logOutcomeData = async (data: Record<string, any>) =>
  api.post("/outcomeDataLog", data);

export const logOutcomeInfo = async (data: Record<string, any>) =>
  api.post("/outcomeInfoLog", data);

export const logSandboxOutcomeInfo = async (data: Record<string, any>) =>
  api.post("/sandboxOutcomeInfoLog", data);

export const saveBettingOutcome = async (data: Record<string, any>) =>
  api.post("/saveBettingOutcome", data);

export const prodPrnLog = async (data: Record<string, any>) =>
  api.post("/prodPrnLog", data);

/* ================================
   M-PESA
================================ */
export const listMpesaIPN = async () => api.get("/mpesaIPN");
export const createMpesaIPN = async (data: Record<string, any>) =>
  api.post("/mpesaIPN", data);
export const getMpesaIPN = async (id: string) => api.get(`/mpesaIPN/${id}`);
export const updateMpesaIPN = async (id: string, data: Record<string, any>) =>
  api.put(`/mpesaIPN/${id}`, data);
export const deleteMpesaIPN = async (id: string) =>
  api.delete(`/mpesaIPN/${id}`);

export const safIPN = async (data: Record<string, any>) =>
  api.post("/safIPN", data);

export const listSTKCallback = async () => api.get("/stkCallback");
export const createSTKCallback = async (data: Record<string, any>) =>
  api.post("/stkCallback", data);
export const getSTKCallback = async (id: string) =>
  api.get(`/stkCallback/${id}`);
export const updateSTKCallback = async (id: string, data: Record<string, any>) =>
  api.put(`/stkCallback/${id}`, data);
export const deleteSTKCallback = async (id: string) =>
  api.delete(`/stkCallback/${id}`);

  
export const listClients = async () => api.get("/client");
export const createClient = async (data: Record<string, any>) =>
  api.post("/client", data);
export const getClient = async (id: string) => api.get(`/client/${id}`);
export const updateClient = async (id: string, data: Record<string, any>) =>
  api.put(`/client/${id}`, data);
export const deleteClient = async (id: string) =>
  api.delete(`/client/${id}`);

export const listUsers = async () => api.get("/users");
export const createUser = async (data: Record<string, any>) =>
  api.post("/users", data);
export const getUser = async (id: string) => api.get(`/users/${id}`);
export const updateUser = async (id: string, data: Record<string, any>) =>
  api.put(`/users/${id}`, data);
export const deleteUser = async (id: string) =>
  api.delete(`/users/${id}`);

export default api;
