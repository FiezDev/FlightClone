import { useQuery } from "@tanstack/react-query";
import { amadeusClient } from "./amadeusApi";
import { CitiesByKeywordRequest, CitiesByKeywordResponse, NearestRelevantAirportsRequest, NearestRelevantAirportsResponse } from "./amadeusService.type";

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
