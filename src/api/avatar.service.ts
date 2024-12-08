import { IAvatarPayload } from "@/types";
import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const getAvatarList = async (limit: number = 10, offset: number = 0) => {
  return apiHelper(
    axiosInstance.get("/avatar", {
      params: {
        limit,
        offset,
      },
    })
  );
};

export const createAvatar = async (data: IAvatarPayload) => {
  return apiHelper(axiosInstance.post("/avatar", data), true);
};

export const deleteAvatar = async (id: string) => {
  return apiHelper(axiosInstance.delete(`/avatar/${id}`), true);
};
