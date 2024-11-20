import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

// Get all users
export const getUsers = async (limit: number = 10, offset: number = 0) => {
  return apiHelper(
    axiosInstance.get("/user", {
      params: {
        limit,
        offset,
      },
    })
  );
};

// Get user by ID
export const getUserById = async (id: string) => {
  return apiHelper(axiosInstance.get(`/user/${id}`));
};
