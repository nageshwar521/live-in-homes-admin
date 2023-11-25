import { apiBaseUrl } from "../constants";
import { axios } from "../utils/common";

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
