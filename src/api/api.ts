import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://circle-api-adil.vercel.app/api/v1";

export const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});
