import axios from "axios";

// Configure Axios globally
const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,  // Ensures cookies are sent with requests if authentication is required
});

// Function to check authentication
export const checkAuth = async () => {
    try {
        const response = await API.get("/dashboard");
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
        } else {
            console.error("Authentication Error:", error);
        }
        return null;
    }
};
