import axios from "axios";
import { apiBaseUrl } from "../constants";

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
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/cafes`, newData);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

const objToFormData = (obj: any = {}) => {
  console.log(obj, "objToFormData obj");
  const formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  console.log(formData, "formData");
  return formData;
};

export const updateCafeApi = async (params: any) => {
  const formData = objToFormData(params.data);
  console.log(formData.values(), "updateCafeApi formData");
  try {
    const response = await axios.put(
      `${apiBaseUrl}/cafes/${params.id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
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
