import { createPlayerApi, getAllPlayersApi } from "../api/player.api";
import type { CreatePlayerPayload } from "../types/player";

export const createPlayerService = async (payload: CreatePlayerPayload) => {
  return await createPlayerApi(payload);
};
export const getAllPlayersService = async () => {
  return await getAllPlayersApi();
};
