import axios from 'axios';

const USER_SERVICE = "http://localhost:8081";
const GST_SERVICE = "http://localhost:8080";

export const signup = (data) => axios.post(`${USER_SERVICE}/signup`, data);
export const login = (data) => axios.post(`${USER_SERVICE}/login`, data);
export const calculateGST = (data, token) =>
  axios.post(`${GST_SERVICE}/calculate`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
