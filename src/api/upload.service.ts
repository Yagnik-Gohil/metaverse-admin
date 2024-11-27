import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const uploadImage = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  return apiHelper(
    axiosInstance.post(`/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};
