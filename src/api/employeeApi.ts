import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const getEmployeeListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/employees/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addEmployeeApi = async (data: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/employees`, data);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const updateEmployeeApi = async (params: any) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/employees/${params.id}`,
      params.data
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deleteEmployeeApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/employees/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
