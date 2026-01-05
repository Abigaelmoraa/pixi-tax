// src/services/auth.ts
import api from "@/lib/api"; // Make sure this is set up as an Axios instance

// Register a new user
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  try {
    const res = await api.post("/userRegister", data); // Make sure backend endpoint matches
    return res.data;
  } catch (err: any) {
    // Provide a clear error message
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

// Login user
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/login", data); // Make sure backend endpoint matches

    // Store token in localStorage if backend returns it
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await api.post("/logout"); // Make sure backend endpoint matches
    localStorage.removeItem("token"); // Remove stored token
  } catch (err: any) {
    console.error("Logout failed", err);
  }
};
