import {
  bidOnPlayerApi,
  createAuctionApi,
  endAuctionApi,
  getAllAuctionsApi,
  getAuctionByIdApi,
  sellPlayerApi,
  startAuctionApi,
  type CreateAuctionPayload,
} from "../api/auction.api";

export const createAuctionService = async (payload: CreateAuctionPayload) => {
  return await createAuctionApi(payload);
};
export const getAllAuctionService = async () => {
  return await getAllAuctionsApi();
};
export const getAuctionByIdService = async (id: string) => {
  return await getAuctionByIdApi(id);
};
export const startAuctionService = async (id: string) => {
  return await startAuctionApi(id);
};
export const endAuctionService = async (id: string) => {
  return await endAuctionApi(id);
};
export const bidOnPlayerService = async (auctionId: string, teamId: string) => {
  return await bidOnPlayerApi(auctionId, teamId);
};
export const sellPlayerService = async (auctionId: string) => {
  return await sellPlayerApi(auctionId);
};
