import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://db.x1.pitch90agent.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🔐 Attach Authorization token to every request
 * (Axios v1 + TypeScript safe)
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ Axios v1 headers are always defined
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * 🚨 Global 401 handler
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
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
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/login", data);

  const token =
    (res.data as any)?.token ||
    (res.data as any)?.accessToken ||
    (res.data as any)?.data?.token;

  if (!token) {
    throw new Error("Authentication token not returned");
  }

  localStorage.setItem("token", token);
  return res.data;
};

// ---------------- DASHBOARD ----------------
export const fetchStats = async () =>
  (await api.get("/dashboard/stats")).data;

export const fetchRecentActivity = async () =>
  (await api.get("/dashboard/recent-activity")).data;

export const fetchUpcomingDeadlines = async () =>
  (await api.get("/dashboard/upcoming-deadlines")).data;

// ---------------- PRN REQUESTS ----------------
export const fetchPRNRequests = async () =>
  (await api.get("/prn-requests")).data;

export const submitPRNRequest = async (data: unknown) =>
  (await api.post("/prn-requests", data)).data;

// ---------------- PAYMENTS ----------------
export const fetchPayments = async () =>
  (await api.get("/payments")).data;

// ---------------- STK PUSH ----------------
export const fetchSTKPushRequests = async () =>
  (await api.get("/stk-push-requests")).data;

export const createSTKPushRequest = async (data: unknown) =>
  (await api.post("/stk-push-request", data)).data;

// ---------------- TAX PAYOUT ----------------
export const fetchTaxPayoutResponse = async () =>
  (await api.get("/tax-payout-response")).data;

export const logTaxData = async (data: unknown) =>
  (await api.post("/taxDataLog", data)).data;

// ---------------- WITHDRAWALS ----------------
export const fetchWithdrawalRequest = async () =>
  (await api.get("/withdrawal-request")).data;

export const createNewWithdrawalRequest = async (data: unknown) =>
  (await api.post("/new-withdrawal-request", data)).data;

// ---------------- STAKE ----------------
export const fetchStakeData = async () =>
  (await api.get("/stake-data")).data;

// ---------------- DAILY TAX ----------------
export const fetchDailyTaxObligations = async () =>
  (await api.get("/daily-tax-obligations")).data;

export const createDailyTaxObligation = async (data: unknown) =>
  (await api.post("/daily-tax-obligations", data)).data;

export default api;
