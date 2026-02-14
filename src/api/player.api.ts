import axiosInstance from "./axiosInstance";
import type { CreatePlayerPayload } from "../types/player";

export const createPlayerApi = async (payload: CreatePlayerPayload) => {
  const response = await axiosInstance.post("/player", payload);

  return response.data;
};
export const getAllPlayersApi = async () => {
  const response = await axiosInstance.get("/player");
  return response.data;
};
