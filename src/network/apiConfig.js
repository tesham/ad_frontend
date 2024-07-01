import axios from "axios";
import { refreshAccessToken } from "../services/login";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // other configurations
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    var token = localStorage.getItem("ip-tokens-access");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    ////

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      const { data } = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
      localStorage.setItem("ip-tokens-access", data.access);
      return axiosInstance(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;