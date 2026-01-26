import { z } from "zod";

export const socialNetworksSchema = z.object({
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  linkedin: z.string().optional(),
  tiktok: z.string().optional(),
});

export type TSocialNetworks = z.infer<typeof socialNetworksSchema>