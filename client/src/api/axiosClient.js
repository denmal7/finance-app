import axios from "axios";

const API_URL = "http://localhost:8840/api";

const axiosClient = axios.create({
    baseURL: API_URL,
});


// Attach token to every request if available
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
