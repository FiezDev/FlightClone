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

