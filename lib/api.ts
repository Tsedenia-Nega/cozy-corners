import axios from "axios";

const api = axios.create({ baseURL: "https://cozycorner-5jtx.onrender.com/" });

// This ensures your "Admin" status is sent to the backend
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
