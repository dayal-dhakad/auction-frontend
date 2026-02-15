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
export const getAuctionByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/auction/${id}`);
  return response.data;
};
export const startAuctionApi = async (id: string) => {
  const response = await axiosInstance.patch(`/auction/start-auction/${id}`);
  return response.data;
};
export const endAuctionApi = async (id: string) => {
  const response = await axiosInstance.post(`/auction/end-auction/${id}`);
  return response.data;
};

export const bidOnPlayerApi = async (auctionId: string, teamId: string) => {
  const response = await axiosInstance.post(`/auction/${auctionId}/bid`, {
    teamId,
  });

  return response.data;
};

export const sellPlayerApi = async (auctionId: string) => {
  const response = await axiosInstance.post(`/auction/${auctionId}/sell`);

  return response.data;
};
export const undoLastBidApi = async (auctionId: string) => {
  const response = await axiosInstance.post(
    `/auction/${auctionId}/undo-last-bid`,
  );

  return response.data;
};
export const randomAssignBidApi = async (auctionId: string) => {
  const response = await axiosInstance.post(
    `/auction/${auctionId}/random-assign`,
  );

  return response.data;
};
