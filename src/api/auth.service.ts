import axiosInstance from './axiosInstance';
import apiHelper from './apiHelper';

export const loginAdmin = async (credentials: { email: string; password: string, device_id: string }) => {
  return apiHelper(axiosInstance.post('/auth/login/admin', credentials));
};

export const logout = async () => {
  return apiHelper(axiosInstance.post('/auth/logout'));
};
