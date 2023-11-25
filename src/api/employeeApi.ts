import { axios } from "../utils/common";
import { apiBaseUrl } from "../constants";

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
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/employees`, newData);
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
