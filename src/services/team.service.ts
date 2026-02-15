import { createTeamApi, getAllTeamsApi } from "../api/team.api";

export const createTeamService = async (payload: any) => {
  return await createTeamApi(payload);
};
export const getAllTeamService = async (auctionId: string) => {
  return await getAllTeamsApi(auctionId);
};
