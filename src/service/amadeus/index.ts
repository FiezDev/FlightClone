import { useQuery } from "@tanstack/react-query";
import { amadeusClient } from "./baseApi";
import {
  CitiesByKeywordRequest,
  CitiesByKeywordResponse,
} from "./type/citiesByKeyword";
import {
  AirportDirectDestinationsRequest,
  AirportDirectDestinationsResponse,
} from "./type/airportDirectDestinations";
import {
  NearestRelevantAirportsRequest,
  NearestRelevantAirportsResponse,
} from "./type/nearestRelevantAirport";
import {
  FlightAvailabilitiesRequest,
  FlightAvailabilitiesResponse,
} from "./type/flightAvailabilities";

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
        .get<NearestRelevantAirportsResponse>(
          "/v1/reference-data/locations/airports",
          {
            params: {
              latitude,
              longitude,
              radius,
              "page[limit]": limit,
              "page[offset]": offset,
              sort,
            },
          }
        )
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
    queryKey: [
      "get-airport-direct-destinations",
      departureAirportCode,
      max,
      arrivalCountryCode,
    ],
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

export const useGetFlightAvailabilities = (
  request: FlightAvailabilitiesRequest,
  isFinish: boolean
) => {
  const shouldFetch = Boolean(isFinish);
  return useQuery<FlightAvailabilitiesResponse>({
    queryKey: ["get-flight-availabilities", request],
    queryFn: () =>
      amadeusClient
        .post<FlightAvailabilitiesResponse>(
          "/v1/shopping/availability/flight-availabilities",
          request
        )
        .then((response) => response.data),
    enabled: shouldFetch,
  });
};
