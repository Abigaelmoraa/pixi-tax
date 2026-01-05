import api from "@/services/api";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};
