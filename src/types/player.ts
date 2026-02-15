export type SkillLevel = "elite" | "strong" | "medium" | "beginner";
export type Gender = "male" | "female";

export interface CreatePlayerPayload {
  name: string;
  image?: string;
  skillLevel: SkillLevel;
  gender: Gender;
  auctionId: string;
}
