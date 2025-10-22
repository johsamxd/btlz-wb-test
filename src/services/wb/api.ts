import env from "../../config/env/env.js";
import axios from "axios";

export const api = axios.create({
    baseURL: env.WB_API_URL,
    timeout: 5000,
    headers: {
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = env.WB_API_KEY;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
