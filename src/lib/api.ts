import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.pixi-tax.com", // Provided by backend team
  headers: {
    "Content-Type": "application/json",
  },
});
