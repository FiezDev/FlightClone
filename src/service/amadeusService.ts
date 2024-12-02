import { useMutation, useQuery } from "@tanstack/react-query";
import { amadeusClient } from "./amadeusApi";
import { CitiesByKeywordRequest, CitiesByKeywordResponse } from "./amadeusService.type/citiesByKeyword";
import { AirportDirectDestinationsRequest, AirportDirectDestinationsResponse } from "./amadeusService.type/airportDirectDestinations";
import { NearestRelevantAirportsRequest, NearestRelevantAirportsResponse } from "./amadeusService.type/nearestRelevantAirport";
import {
  FlightAvailabilitiesRequest,
  FlightAvailabilitiesResponse,
} from "./amadeusService.type/flightAvailabilities";

export const useGetCitiesByKeyword = ({
  countryCode,
  keyword,
  max,
  include,
}: CitiesByKeywordRequest) => {
  return useQuery({
    queryKey: ["get-cities-by-keyword", countryCode, keyword, max, include],
    queryFn: () =>
      amadeusClient
        .get<CitiesByKeywordResponse>("/v1/reference-data/locations/cities", {
          params: {
            countryCode,
            keyword,
            max,
            include: include?.join(","),
          },
        })
        .then((response) => response.data),
  });
};

export const useGetNearestRelevantAirports = ({
  latitude,
  longitude,
  radius = 500,
  limit = 10,
  offset = 0,
  sort = "relevance",
}: NearestRelevantAirportsRequest) => {
  return useQuery({
    queryKey: [
      "get-nearest-relevant-airports",
      latitude,
      longitude,
      radius,
      limit,
      offset,
      sort,
    ],
    queryFn: () =>
      amadeusClient
        .get<NearestRelevantAirportsResponse>("/v1/reference-data/locations/airports", {
          params: {
            latitude,
            longitude,
            radius,
            "page[limit]": limit,
            "page[offset]": offset,
            sort,
          },
        })
        .then((response) => response.data),
  });
};

export const useGetAirportDirectDestinations = ({
  departureAirportCode,
  max,
  arrivalCountryCode,
}: AirportDirectDestinationsRequest) => {
  const shouldFetch = Boolean(departureAirportCode);

  return useQuery<AirportDirectDestinationsResponse>({
    queryKey: ["get-airport-direct-destinations", departureAirportCode, max, arrivalCountryCode],
    queryFn: () =>
      amadeusClient
        .get("/v1/airport/direct-destinations", {
          params: {
            departureAirportCode,
            max,
            arrivalCountryCode,
          },
        })
        .then((response) => response.data),
    enabled: shouldFetch,
  });
};

export const useGetFlightAvailabilities = () => {

  return useMutation({
    mutationKey: ["get-flight-availabilities"],
    mutationFn: (data: FlightAvailabilitiesRequest) =>
      amadeusClient
        .post<FlightAvailabilitiesResponse>(
          "/v1/shopping/availability/flight-availabilities",
          {...data},
          {
            headers: {
              "X-HTTP-Method-Override": "GET",
            },
          }
        )
        .then((response) => response.data),
  });
};



