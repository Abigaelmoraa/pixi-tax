import api from "./api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/api/userRegister", data);
  return response.data;
};
export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/api/login", data);
  return response.data;
};
