import axios from "axios";
import { apiBaseUrl } from "../constants";

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
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/users`, newData);
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
