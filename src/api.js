import axios from "axios";

const baseURL =
  import.meta.env.VITE_BASE_URL || "https://www.aurora.ieeesbgcek.org/api";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
