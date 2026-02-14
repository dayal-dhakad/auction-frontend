import { createTeamApi } from "../api/team.api";

export const createTeamService = async (payload: any) => {
  return await createTeamApi(payload);
};
