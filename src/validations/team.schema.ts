import { z } from "zod";

export const createTeamFormSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters").trim(),

  captain: z.string().min(1, "Captain is required"),

  logo: z.string().url("Logo must be a valid URL").optional().or(z.literal("")),
});
