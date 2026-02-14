import axiosInstance from "./axiosInstance";

export interface CreateAuctionPayload {
  title: string;
  description?: string;
}

export const createAuctionApi = async (payload: CreateAuctionPayload) => {
  const response = await axiosInstance.post("/auction/create-auction", payload);

  return response.data;
};

export const getAllAuctionsApi = async () => {
  const response = await axiosInstance.get("/auction");
  return response.data;
};
export const getAuctionById = async (id: string) => {
  const response = await axiosInstance.get(`/auction/${id}`);
  return response.data;
};
