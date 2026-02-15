import axiosInstance from "./axiosInstance";
import type { CreatePlayerPayload } from "../types/player";

export const createPlayerApi = async (payload: CreatePlayerPayload) => {
  const response = await axiosInstance.post(
    `/player/${payload.auctionId}`,
    payload,
  );

  return response.data;
};
export const getAllPlayersApi = async (auctionId: string) => {
  const response = await axiosInstance.get(`/player/all/${auctionId}`);
  return response.data;
};
