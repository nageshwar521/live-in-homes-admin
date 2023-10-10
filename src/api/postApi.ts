import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

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
  try {
    const response = await axios.post(`${apiBaseUrl}/posts`, data);
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
