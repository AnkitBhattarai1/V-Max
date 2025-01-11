

import axios from "axios";

const BASE_URL='http://localhost:9090'
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Example usage
export const getUserData = async () => {
    try {
        const response = await apiClient.get("/user/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response || error);
    }
};
