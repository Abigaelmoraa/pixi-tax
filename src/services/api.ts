import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   REQUEST INTERCEPTOR
   Attach JWT automatically
============================ */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================
   RESPONSE INTERCEPTOR
   Handle expired/invalid token
============================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/* ============================
   TYPES
============================ */
interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  user?: any;
}

/* ============================
   AUTH
============================ */
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/login", data);

  const user = res.data.user || res.data.data;
  if (!user?.token) throw new Error("No token returned from server");

  localStorage.setItem("authToken", user.token);
  return user;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/userRegister", data);
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("authToken");
  return api.post("/logout");
};

export const getCurrentUser = async () => {
  const res = await api.get("/user");
  return res.data.user || res.data.data;
};

/* ============================
   DASHBOARD
============================ */
export const getDashboardTiles = () => api.get("/dashboardTiles");

export const getDashboardTilesStudio = () =>
  api.get("/dashboardTilesStudio");

/* ============================
   PAYMENTS
============================ */
export const createPaymentRequest = (data: Record<string, any>) =>
  api.post("/paymentRequest", data);

export const createWithdrawalRequest = (data: Record<string, any>) =>
  api.post("/withdrawalRequest", data);

export const b2cPayoutResponse = (data: Record<string, any>) =>
  api.post("/b2cPayoutResponse", data);

export const taxPayoutResponse = (data: Record<string, any>) =>
  api.post("/taxPayoutResponse", data);

/* ============================
   MPESA IPN
============================ */
export const listMpesaIPN = () => api.get("/mpesaIPN");

export const createMpesaIPN = (data: Record<string, any>) =>
  api.post("/mpesaIPN", data);

export const getMpesaIPN = (id: string) =>
  api.get(`/mpesaIPN/${id}`);

export const updateMpesaIPN = (id: string, data: Record<string, any>) =>
  api.put(`/mpesaIPN/${id}`, data);

export const deleteMpesaIPN = (id: string) =>
  api.delete(`/mpesaIPN/${id}`);

/* ============================
   CLIENTS
============================ */
export const listClients = () => api.get("/client");

export const createClient = (data: Record<string, any>) =>
  api.post("/client", data);

export const getClient = (id: string) =>
  api.get(`/client/${id}`);

export const updateClient = (id: string, data: Record<string, any>) =>
  api.put(`/client/${id}`, data);

export const deleteClient = (id: string) =>
  api.delete(`/client/${id}`);

/* ============================
   USERS
============================ */
export const listUsers = () => api.get("/users");

export const createUser = (data: Record<string, any>) =>
  api.post("/users", data);

export const getUser = (id: string) =>
  api.get(`/users/${id}`);

export const updateUser = (id: string, data: Record<string, any>) =>
  api.put(`/users/${id}`, data);

export const deleteUser = (id: string) =>
  api.delete(`/users/${id}`);

export default api;
