import axios from 'axios';

// For local testing on EC2 (same machine)
const USER_SERVICE = "http://localhost:8081";
const GST_SERVICE = "http://localhost:8080";

// For Kubernetes (when deployed with Helm) - use service names
// const USER_SERVICE = "http://user-service:8081";
// const GST_SERVICE = "http://gst-calculator:8080";

console.log("API Base URL:", USER_SERVICE);

// Signup
export const signup = (data) => {
  return axios.post(`${USER_SERVICE}/signup`, data);
};

// Login
export const login = (data) => {
  return axios.post(`${USER_SERVICE}/login`, data);
};

// GST Calculation
export const calculateGST = (data, token) => {
  return axios.post(`${GST_SERVICE}/calculate`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
