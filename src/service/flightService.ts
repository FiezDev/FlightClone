import { useQuery } from "@tanstack/react-query";
import { AirportsData, ApiResponse, CountryData, FlightSearchData, LocaleData, SearchEverywhereData } from "./flightService.type";
import { apiClient } from "./api";

export interface GetNearByAirports {
  lat: string;
  lng: string;
  locale: string;
}

export interface GetSearchFlightEverywhere {
  originEntityId: string;
  destinationEntityId?: string;
  travelDate?: string;
  returnDate?: string;
  adults?: string;
  childAges?: string;
  cabinClass?: string;
  journeyType?: string;
  currency?: string;
}

export interface GetSearchFlightsComplete {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults?: string;
  childrens?: string;
  infants?: string;
  sortBy?: string;
  limit?: string;
  carriersIds?: string;
  currency?: string;
}



export const useGetLocale = () => {
  return useQuery({
    queryKey: ["get-locale"],
    queryFn: () => apiClient.get<ApiResponse<LocaleData[]>>("v1/getLocale"),
  });
};

export const useGetConfig = () => {
  return useQuery({
    queryKey: ["get-config"],
    queryFn: () => apiClient.get<ApiResponse<CountryData[]>>("v1/getConfig"),
  });
};

export const useGetNearByAirports = ({
  lat,
  lng,
  locale,
}: GetNearByAirports) => {

  const shouldFetch = Boolean(lat && lng && locale);

  return useQuery({
    queryKey: ["get-near-by-airports", lat, lng, locale],
    queryFn: () =>
      apiClient.get<ApiResponse<AirportsData>>("v1/flights/getNearByAirports", {
        params: {
          lat,
          lng,
          locale,
        },
      }).then((response) => response.data),
    enabled: shouldFetch,
  });
};


export const useGetSearchFlightEverywhere = ({
  originEntityId,
  destinationEntityId,
  travelDate,
  returnDate,
  adults,
  childAges,
  cabinClass,
  journeyType,
  currency,
}: GetSearchFlightEverywhere) => {
  return useQuery({
    queryKey: [
      "get-search-flights-everywhere",
      originEntityId,
      destinationEntityId,
      travelDate,
      returnDate,
      adults,
      childAges,
      cabinClass,
      journeyType,
      currency,
    ],
    queryFn: () =>
      apiClient.get<ApiResponse<SearchEverywhereData>>(
        "v1/flights/searchFlightEverywhere",
        {
          params: {
            originEntityId,
            destinationEntityId,
            travelDate,
            returnDate,
            adults,
            childAges,
            cabinClass,
            journeyType,
            currency,
          },
        }
      ),
  });
};


export const useGetSearchFlightsComplete = ({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate,
  cabinClass,
  adults,
  childrens,
  infants,
  sortBy,
  limit,
  carriersIds,
  currency,
}: GetSearchFlightsComplete) => {
  return useQuery({
    queryKey: [
      "get-search-flights-complete",
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      cabinClass,
      adults,
      childrens,
      infants,
      sortBy,
      limit,
      carriersIds,
      currency,
    ],
    queryFn: () =>
      apiClient.get<ApiResponse<FlightSearchData>>(
        "v1/flights/searchFlightsComplete",
        {
          params: {
            originSkyId,
            destinationSkyId,
            originEntityId,
            destinationEntityId,
            date,
            returnDate,
            cabinClass,
            adults,
            childrens,
            infants,
            sortBy,
            limit,
            carriersIds,
            currency,
          },
        }
      ),
  });
};
