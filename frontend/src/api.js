import axios from 'axios';

const EC2_IP = "http://13.218.219.188";   // ← Change to your actual EC2 Public IP

const USER_SERVICE = `${EC2_IP}:8081`;
const GST_SERVICE = `${EC2_IP}:8080`;

console.log("Using API:", USER_SERVICE); // for debugging

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
