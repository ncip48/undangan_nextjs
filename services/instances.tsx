import axios from "axios";
import { getSession, logout } from "@/app/lib";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "/api", // Set your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const storage = await getSession();
    if (storage && storage.user && storage.user.token) {
      config.headers["Authorization"] = `Bearer ${storage.user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (!response.data.success) {
      toast.error(response.data.message);
    } else {
      if (!response.data.message.includes("loaded")) {
        toast.success(response.data.message);
      }
    }
    return response.data;
  },
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        await logout();
      }
      toast.error(data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
