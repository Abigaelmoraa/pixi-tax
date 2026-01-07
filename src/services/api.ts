import axios from "axios";

const api = axios.create({
  baseURL: "https://db.x1.pitch90agent.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== AUTH ===================== */
export const loginUser = async (data: any) =>
  (await api.post("/login", data)).data;

/* ===================== DASHBOARD ===================== */
export const fetchStats = async () =>
  (await api.get("/dashboard/stats")).data;

export const fetchRecentActivity = async () =>
  (await api.get("/dashboard/recent-activity")).data;

export const fetchUpcomingDeadlines = async () =>
  (await api.get("/dashboard/upcoming-deadlines")).data;

/* ===================== PRN REQUESTS ===================== */
export const fetchPRNRequests = async () =>
  (await api.get("/prn-requests")).data;

export const submitPRNRequest = async (data: any) =>
  (await api.post("/prn-requests", data)).data;

/* ===================== PAYMENTS ===================== */
export const fetchPayments = async () =>
  (await api.get("/payments")).data;

/* ===================== STK PUSH ===================== */
export const fetchSTKPushRequests = async () =>
  (await api.get("/stk-push-requests")).data;

export const createSTKPushRequest = async (data: any) =>
  (await api.post("/stk-push-request", data)).data;

/* ===================== TAX PAYOUT RESPONSE ===================== */
export const fetchTaxPayoutResponse = async () =>
  (await api.get("/tax-payout-response")).data;

export const logTaxData = async (data: any) =>
  (await api.post("/taxDataLog", data)).data;

/* ===================== DAILY TAX OBLIGATION ===================== */
export const fetchDailyTaxObligation = async () =>
  (await api.get("/daily-tax-obligation")).data;

export const createDailyTaxObligation = async (data: any) =>
  (await api.post("/daily-tax-obligation", data)).data;

/* ===================== BET OUTCOMES ===================== */
export const fetchBetOutcomes = async () =>
  (await api.get("/bet-outcomes")).data;

export const createBetOutcome = async (data: any) =>
  (await api.post("/bet-outcomes", data)).data;

/* ===================== WITHDRAWALS ===================== */
export const fetchWithdrawalRequest = async () =>
  (await api.get("/withdrawal-request")).data;

export const createNewWithdrawalRequest = async (data: any) =>
  (await api.post("/new-withdrawal-request", data)).data;

/* ===================== STAKE DATA ===================== */
export const fetchStakeData = async () =>
  (await api.get("/stake-data")).data;

export default api;
