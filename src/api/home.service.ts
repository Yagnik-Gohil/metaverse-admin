import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const serverHealth = async () => {
    return apiHelper(axiosInstance.get('/'));
  };
  