import axiosInstance from "./axiosInstance";

export const createTeamApi = async (payload: any) => {
  const response = await axiosInstance.post("/teams", payload);
  return response.data;
};
