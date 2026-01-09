
import axios, { AxiosError, AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api", // ✅ /api added
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Optional: auto-logout on 401
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
  if (!token) throw new Error("Authentication token not returned");
  localStorage.setItem("token", token);
  return res.data;
};

export const registerUser = async (data: any) => (await api.post("/userRegister", data)).data;
export const checkOtp = async (data: any) => (await api.post("/checkOtp", data)).data;
export const logoutUser = async () => (await api.post("/logout")).data;

// ---------------- PASSWORD ----------------
export const updatePassword = async (data: any) => (await api.put("/users/password", data)).data;
export const selfPassChange = async (data: any) => (await api.post("/selfPassChange", data)).data;

// ---------------- DASHBOARD ----------------
export const fetchStats = async () =>
  (await api.get("/dashboard/stats")).data;

export const fetchRecentActivity = async () =>
  (await api.get("/dashboard/recent-activity")).data;

export const fetchUpcomingDeadlines = async () =>
  (await api.get("/dashboard/upcoming-deadlines")).data;

export default api;
