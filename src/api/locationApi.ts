import { axios } from "../utils/common";

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
  const formData = new FormData();
  let newData = data;
  if (data.images) {
    formData.append("images", data.images);
    newData = { ...data, images: formData };
  }
  try {
    const response = await axios.post(`${apiBaseUrl}/locations`, newData);
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
