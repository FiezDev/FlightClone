export interface AirportDirectDestinationsRequest {
  departureAirportCode: string;
  max?: number;
  arrivalCountryCode?: string;
}

export interface AirportDirectDestinationsResponse {
  meta: Meta;
  data: Location[];
}

interface Meta {
  count: number;
  links: MetaLinks;
}

interface MetaLinks {
  self: string;
}

export interface Location {
  type: string;
  subtype: string;
  name: string;
  iataCode: string;
  geoCode: GeoCode;
  address: Address;
  timeZone: TimeZone;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Address {
  countryName: string;
  countryCode: string;
  stateCode?: string;
  regionCode: string;
}

interface TimeZone {
  offSet: string;
  referenceLocalDateTime: string;
}
