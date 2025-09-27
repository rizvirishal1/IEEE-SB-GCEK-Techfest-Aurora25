import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/";

const api = axios.create({
    baseURL: baseURL,
});

export default api;
