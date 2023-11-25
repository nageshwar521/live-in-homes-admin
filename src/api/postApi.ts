import { axios } from "../utils/common";
import { apiBaseUrl } from "../constants";

export const getPostListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/posts/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addPostApi = async (data: any) => {
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/posts`, newData);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const updatePostApi = async (params: any) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/posts/${params.id}`,
      params.data
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deletePostApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/posts/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
