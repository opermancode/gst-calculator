import axios from 'axios';

/*
  ✅ CONFIG STRATEGY

  1. In Kubernetes:
     Use REACT_APP_API_BASE_URL (set via env)

  2. In local/dev:
     fallback to EC2 IP (or localhost)
*/

// 👉 Change this ONLY for local testing if needed
const DEFAULT_BASE_URL = "http://13.218.219.188";

// 👉 Kubernetes / Production (will override above)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL;

// Services
const USER_SERVICE = `${BASE_URL}:8081`;
const GST_SERVICE = `${BASE_URL}:8080`;

console.log("API BASE URL:", BASE_URL);

// ==========================
// 🔐 AUTH APIs
// ==========================

// Signup
export const signup = async (data) => {
  return axios.post(`${USER_SERVICE}/signup`, data);
};

// Login
export const login = async (data) => {
  return axios.post(`${USER_SERVICE}/login`, data);
};

// ==========================
// 🧮 GST API
// ==========================

export const calculateGST = async (data, token) => {
  return axios.post(`${GST_SERVICE}/calculate`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
