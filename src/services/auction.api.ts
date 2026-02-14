import {
  createAuctionApi,
  getAllAuctionsApi,
  getAuctionById,
  type CreateAuctionPayload,
} from "../api/auction.api";

export const createAuctionService = async (payload: CreateAuctionPayload) => {
  return await createAuctionApi(payload);
};
export const getAllAuctionService = async () => {
  return await getAllAuctionsApi();
};
export const getAuctionByIdService = async (id: string) => {
  return await getAuctionById(id);
};
