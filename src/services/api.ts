import axios, { AxiosInstance, AxiosResponse } from "axios";

// --- Axios instance ---
const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ensures cookies are sent automatically
});

// --- Request interceptor ---
api.interceptors.request.use((config) => {
  // No token needed, cookies handle auth
  return config;
});

// --- Response interceptor ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Redirect to login on 401, except for login/register endpoints
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/login") &&
      !originalRequest.url?.includes("/userRegister")
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// --- API response interface ---
interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  user?: any;
}

// --- AUTH ---
export const loginUser = async (data: { email: string; password: string }) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/login", data);
  // Return user info; backend uses HttpOnly cookie for auth
  return res.data.user || res.data.data || res.data;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/userRegister", data);
  return res.data;
};

export const logoutUser = async () => {
  return api.post("/logout"); // cookie will be cleared by backend
};

// --- USER ---
export const getCurrentUser = async () => {
  const res: AxiosResponse<ApiResponse> = await api.get("/user");
  return res.data.user || res.data.data;
};

// --- DASHBOARD ---
export const getDashboardTiles = () => api.get("/dashboardTiles");
export const getDashboardTilesStudio = () => api.get("/dashboardTilesStudio");

// --- PAYMENTS ---
export const createPaymentRequest = (data: Record<string, any>) => api.post("/paymentRequest", data);
export const createWithdrawalRequest = (data: Record<string, any>) => api.post("/withdrawalRequest", data);
export const b2cPayoutResponse = (data: Record<string, any>) => api.post("/b2cPayoutResponse", data);
export const taxPayoutResponse = (data: Record<string, any>) => api.post("/taxPayoutResponse", data);

// --- MPESA IPN ---
export const listMpesaIPN = () => api.get("/mpesaIPN");
export const createMpesaIPN = (data: Record<string, any>) => api.post("/mpesaIPN", data);
export const getMpesaIPN = (id: string) => api.get(`/mpesaIPN/${id}`);
export const updateMpesaIPN = (id: string, data: Record<string, any>) => api.put(`/mpesaIPN/${id}`, data);
export const deleteMpesaIPN = (id: string) => api.delete(`/mpesaIPN/${id}`);

// --- CLIENTS ---
export const listClients = () => api.get("/client");
export const createClient = (data: Record<string, any>) => api.post("/client", data);
export const getClient = (id: string) => api.get(`/client/${id}`);
export const updateClient = (id: string, data: Record<string, any>) => api.put(`/client/${id}`, data);
export const deleteClient = (id: string) => api.delete(`/client/${id}`);

// --- USERS ---
export const listUsers = () => api.get("/users");
export const createUser = (data: Record<string, any>) => api.post("/users", data);
export const getUser = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, data: Record<string, any>) => api.put(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export default api;
