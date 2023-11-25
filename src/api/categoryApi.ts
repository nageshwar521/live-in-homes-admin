import { axios } from "../utils/common";
import { apiBaseUrl } from "../constants";

export const getCategoryListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/categories/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addCategoryApi = async (data: any) => {
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/categories`, newData);
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

export const updateCategoryApi = async (params: any) => {
  const formData = objToFormData(params.data);
  console.log(formData.values(), "updateCategoryApi formData");
  try {
    const response = await axios.put(
      `${apiBaseUrl}/categories/${params.id}`,
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

export const deleteCategoryApi = async (params: any) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/categories/${params.id}`
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
