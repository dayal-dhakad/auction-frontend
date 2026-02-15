import axiosInstance from "./axiosInstance";

export const createTeamApi = async (payload: any) => {
  const response = await axiosInstance.post(
    `/teams/${payload.auctionId}`,
    payload,
  );
  return response.data;
};
export const getAllTeamsApi = async (auctionId: string) => {
  const response = await axiosInstance.get(`/teams/all/${auctionId}`);
  return response.data;
};
