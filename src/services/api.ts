import axios, { AxiosInstance, AxiosResponse } from "axios";

// Base axios instance
const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API response type
interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  user?: any;
}

// ---------------- AUTH ----------------

// Login user and store token
export const loginUser = async (data: { email: string; password: string }) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/login", data);

  const user = res.data.user || res.data.data;
  if (!user?.token) throw new Error("No token returned from server");

  // Store token in localStorage
  localStorage.setItem("authToken", user.token);

  return user;
};

// Register user
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res: AxiosResponse<ApiResponse> = await api.post("/userRegister", data);
  return res.data;
};

// Logout user
export const logoutUser = async () => {
  localStorage.removeItem("authToken");
  return api.post("/logout");
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("User not authenticated");

  const res: AxiosResponse<ApiResponse> = await axios.get(`${api.defaults.baseURL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.user || res.data.data;
};

// ---------------- DASHBOARD ----------------
export const getDashboardTiles = async () => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/dashboardTiles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDashboardTilesStudio = async () => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/dashboardTilesStudio`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ---------------- PAYMENTS ----------------
export const createPaymentRequest = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/paymentRequest`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createWithdrawalRequest = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/withdrawalRequest`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const b2cPayoutResponse = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/b2cPayoutResponse`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const taxPayoutResponse = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/taxPayoutResponse`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ---------------- MPESA ----------------
export const listMpesaIPN = async () => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/mpesaIPN`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMpesaIPN = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/mpesaIPN`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMpesaIPN = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/mpesaIPN/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateMpesaIPN = async (id: string, data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.put(`${api.defaults.baseURL}/mpesaIPN/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteMpesaIPN = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.delete(`${api.defaults.baseURL}/mpesaIPN/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ---------------- CLIENTS ----------------
export const listClients = async () => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/client`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createClient = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/client`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getClient = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/client/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateClient = async (id: string, data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.put(`${api.defaults.baseURL}/client/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteClient = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.delete(`${api.defaults.baseURL}/client/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ---------------- USERS ----------------
export const listUsers = async () => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = async (data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.post(`${api.defaults.baseURL}/users`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUser = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${api.defaults.baseURL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (id: string, data: Record<string, any>) => {
  const token = localStorage.getItem("authToken");
  return axios.put(`${api.defaults.baseURL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id: string) => {
  const token = localStorage.getItem("authToken");
  return axios.delete(`${api.defaults.baseURL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
