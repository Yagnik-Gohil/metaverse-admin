import apiHelper from './apiHelper';
import axiosInstance from './axiosInstance';

// Get all users
export const getUsers = async () => {
  return apiHelper(axiosInstance.get('/user/get'));
};

// Get user by ID
export const getUserById = async (id: string) => {
  return apiHelper(axiosInstance.get(`/user/get/${id}`));
};
