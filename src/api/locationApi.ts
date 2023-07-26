import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const getLocationListApi = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/locations`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addLocationApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/locations`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const updateLocationApi = async (params: any) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/locations/${params.id}`,
      params.data
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deleteLocationApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/locations/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
