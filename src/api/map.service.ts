import apiHelper from './apiHelper';
import axiosInstance from './axiosInstance';

// Get map data
export const getMapData = async () => {
  return apiHelper(axiosInstance.get('/map/get'));
};

// Get map data by ID
export const getMapDataById = async (id: string) => {
  return apiHelper(axiosInstance.get(`/map/get/${id}`));
};
