import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; // আপনার Auth Context হুক

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // আপনার ব্যাকএন্ড URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request Interceptor: প্রতিটি রিকোয়েস্টের সাথে টোকেন যোগ করা
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: 401 বা 403 পেলে অটোমেটিক লগআউট ও রিডাইরেক্ট করা
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;