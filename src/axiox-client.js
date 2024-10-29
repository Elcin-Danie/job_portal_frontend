import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// Add the token to request headers
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Error handling
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Check if response exists and log appropriately
        const { response } = error;
        if (response) {
            // Handle specific status codes
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
            } else {
                console.error("Error response:", response.data); // Log the full error response
            }
        } else {
            // Handle cases where there is no response (e.g., network error)
            console.error("Network error or no response received:", error);
        }
        throw error; // Rethrow the error to allow handling in the calling function
    }
);

export default axiosClient;
