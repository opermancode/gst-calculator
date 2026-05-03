import axios from 'axios';

/*
  ✅ FINAL STRATEGY

  - Frontend talks to ONE API base URL
  - Backend routing handled via Ingress / LoadBalancer
*/

// 👉 For local testing (optional)
const DEFAULT_BASE_URL = "http://abfb262ef458c4cbea464794b35e7481-1ef6762383747a0b.elb.amazonaws.com";

// 👉 Production (EKS)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL;

console.log("API BASE URL:", BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// 🔐 AUTH APIs
// ==========================

// Signup
export const signup = async (data) => {
  return api.post("/signup", data);
};

// Login
export const login = async (data) => {
  return api.post("/login", data);
};

// ==========================
// 🧮 GST API
// ==========================

export const calculateGST = async (data, token) => {
  return api.post("/calculate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
