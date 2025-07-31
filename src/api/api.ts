import axios from "axios";

export const api = axios.create({
    baseURL: "https://circle-api-two.vercel.app/api/v1",
    withCredentials: true,
});
