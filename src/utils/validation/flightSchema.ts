import { z } from "zod";

export const flightSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  OriginIataCode: z.string().optional(),
  DestinationIataCode: z.string().optional(),
  isFinish: z.boolean().optional(),
});

  
export type flightSchemaType = z.infer<typeof flightSchema>;