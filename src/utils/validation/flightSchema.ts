import { z } from "zod";

export const flightSchema = z.object({
    lat: z.string(),
    lng: z.string(),
    locale: z.string(),
  });
  
export type flightSchemaType = z.infer<typeof flightSchema>;