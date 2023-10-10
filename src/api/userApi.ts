import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const getUserListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/users/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addUserApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/users`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const updateUserApi = async (params: any) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/users/${params.id}`,
      params.data
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deleteUserApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/users/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
