import { z } from "zod";

export const flightSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  OriginAirportIataCode: z.string().optional(),
  DestinationIataCode: z.string().optional(),
  DestinationAirportIataCode: z.string().optional(),
});

  
export type flightSchemaType = z.infer<typeof flightSchema>;