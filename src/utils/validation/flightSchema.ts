import { z } from "zod";

export const flightSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  keyword: z.string().optional(),
  countryCode: z.string().optional(),
  max: z.string().optional(),
});

  
export type flightSchemaType = z.infer<typeof flightSchema>;