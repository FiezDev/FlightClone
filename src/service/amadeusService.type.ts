export interface CitiesByKeywordRequest {
  countryCode?: string;
  keyword: string;
  max?: number;
  include?: string[];
}

export interface CitiesByKeywordResponse {
  meta: CityMeta;
  data: CityData[];
  included?: {
    airports: Record<string, AirportIncluded>;
  };
}

interface CityMeta {
  count: number;
  links: {
    self: string;
    next?: string;
    last?: string;
  };
}

export interface CityData {
  type: string;
  subType: string;
  name: string;
  iataCode?: string;
  address: Address;
  geoCode: GeoCode;
  relationships?: Relationship[];
}

interface Address {
  countryCode: string;
  stateCode: string;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Relationship {
  id: string;
  type: string;
  href: string;
}

interface AirportIncluded {
  subType: string;
  name: string;
  iataCode: string;
  address: Address;
  geoCode: GeoCode;
}

// NearestRelevantAirport

export interface NearestRelevantAirportsRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  offset?: number;
  sort?:
    | "relevance"
    | "distance"
    | "analytics.flights.score"
    | "analytics.travelers.score";
}

export interface NearestRelevantAirportsResponse {
  meta: AirportMeta;
  data: AirportData[];
}

interface AirportMeta {
  count: number;
  links: {
    self: string;
    next?: string;
    last?: string;
  };
}
export interface AirportData {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: Address;
  distance: Distance;
  analytics: Analytics;
  relevance: number;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Address {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
}

interface Distance {
  value: number;
  unit: string;
}

interface AnalyticsScore {
  score: number;
}

interface Analytics {
  flights: AnalyticsScore;
  travelers: AnalyticsScore;
}
