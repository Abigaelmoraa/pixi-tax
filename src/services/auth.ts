import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post(ENDPOINTS.REGISTER, data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post(ENDPOINTS.LOGIN, data);
  return res.data;
};
