import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const getCafeListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/cafes/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addCafeApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/cafes`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const updateCafeApi = async (params: any) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/cafes/${params.id}`,
      params.data
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deleteCafeApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/cafes/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
