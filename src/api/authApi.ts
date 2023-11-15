import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { apiBaseUrl } from "../constants";
import { getCookie } from "../utils/cookies";

axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  // console.log(config);
  const token = getCookie("accessToken");

  if (token) {
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.defaults.headers.post["Content-Type"] = "application/json";

export const signupApi = async (data: any) => {
  console.log(apiBaseUrl, "apiBaseUrl");
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/signup`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const loginApi = async (data: any) => {
  console.log(apiBaseUrl, "apiBaseUrl");
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const logoutApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/logout`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const resetPasswordApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/reset`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const forgotPasswordApi = async (username: string) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/forgot/${username}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
