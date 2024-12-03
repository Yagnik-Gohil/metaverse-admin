import { MapPayload } from "@/types";
import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

// Get map data
export const getMapList = async (limit: number = 10, offset: number = 0) => {
  return apiHelper(
    axiosInstance.get("/map", {
      params: {
        limit,
        offset,
      },
    })
  );
};

// Get map data by ID
export const getMapDataById = async (id: string) => {
  return apiHelper(axiosInstance.get(`/map/${id}`));
};

export const createMap = async (data: MapPayload) => {
  return apiHelper(axiosInstance.post("/map", data));
};

export const updateMap = async (id: string, data: MapPayload) => {
  return apiHelper(axiosInstance.patch(`/map/${id}`, data));
};

export const deleteMap = async (id: string) => {
  return apiHelper(axiosInstance.delete(`/map/${id}`));
};
