import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const getBranchListApi = async (params: any) => {
  try {
    const queryStr = "?" + new URLSearchParams(params).toString();
    const response = await axios.get(`${apiBaseUrl}/branches/${queryStr}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const addBranchApi = async (data: any) => {
  const formData = new FormData();
  formData.append("file", data.logoUrl);
  const newData = { ...data, logoUrl: formData };
  try {
    const response = await axios.post(`${apiBaseUrl}/branches`, newData);
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

export const updateBranchApi = async (params: any) => {
  const formData = objToFormData(params.data);
  console.log(formData.values(), "updateBranchApi formData");
  try {
    const response = await axios.put(
      `${apiBaseUrl}/branches/${params.id}`,
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

export const deleteBranchApi = async (params: any) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/branches/${params.id}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
