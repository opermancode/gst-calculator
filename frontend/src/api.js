import axios from 'axios';

const USER_SERVICE = "http://localhost:8081";
const GST_SERVICE = "http://localhost:8080";

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
