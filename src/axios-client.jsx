import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        
        // Check if response exists before accessing response.status
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                // Redirect to login or handle unauthorized access
            }
        } else {
            // Handle network errors or other unexpected issues
            console.error("Network error or server did not respond.");
        }

        return Promise.reject(error); // Ensure error is returned to be caught by the calling code
    }
);

export default axiosClient;
