import axios from "axios";
const API_URL = (import.meta.env.VITE_API_URL || "https://db.x1.pitch90agent.com").trim();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Example functions based on typical API endpoints
export const fetchStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const fetchRecentActivity = async () => {
  const response = await api.get("/dashboard/recent-activity");
  return response.data;
};

export const fetchUpcomingDeadlines = async () => {
  const response = await api.get("/dashboard/upcoming-deadlines");
  return response.data;
};
