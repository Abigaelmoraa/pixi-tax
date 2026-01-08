import axios from "axios";

const api = axios.create({
  baseURL: "https://db.x1.pitch90agent.com/api", // include /api
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
  (await api.get("/dashboardTiles")).data;

export const fetchRecentActivity = async () =>
  (await api.get("/dashboardTilesStudio")).data;

/* ===================== PRN REQUESTS ===================== */
export const fetchPRNRequests = async () =>
  (await api.get("/prodPrnLog")).data; // fixed endpoint

export const submitPRNRequest = async (data: any) =>
  (await api.post("/prodPrnLog", data)).data; // fixed endpoint

/* ===================== PAYMENTS ===================== */
export const fetchPayments = async () =>
  (await api.get("/paymentRequest")).data;

/* ===================== STK PUSH ===================== */
export const fetchSTKPushRequests = async () =>
  (await api.get("/sTKCallback")).data;

export const createSTKPushRequest = async (data: any) =>
  (await api.post("/sTKCallback", data)).data;

/* ===================== TAX PAYOUT RESPONSE ===================== */
export const fetchTaxPayoutResponse = async () =>
  (await api.get("/taxPayoutResponse")).data;

export const logTaxData = async (data: any) =>
  (await api.post("/taxDataLog", data)).data;

/* ===================== DAILY TAX OBLIGATION ===================== */
export const fetchDailyTaxObligation = async () =>
  (await api.get("/dailyTaxObligation")).data;

export const createDailyTaxObligation = async (data: any) =>
  (await api.post("/dailyTaxObligation", data)).data;

/* ===================== BET OUTCOMES ===================== */
export const fetchBetOutcomes = async () =>
  (await api.get("/outcomeInfoLog")).data;

export const createBetOutcome = async (data: any) =>
  (await api.post("/outcomeInfoLog", data)).data;

/* ===================== WITHDRAWALS ===================== */
export const fetchWithdrawalRequest = async () =>
  (await api.get("/withdrawalRequest")).data; // fixed endpoint

export const createNewWithdrawalRequest = async (data: any) =>
  (await api.post("/withdrawalRequest", data)).data; // fixed endpoint

/* ===================== STAKE DATA ===================== */
export const fetchStakeData = async () =>
  (await api.get("/stakeData")).data;

export default api;
