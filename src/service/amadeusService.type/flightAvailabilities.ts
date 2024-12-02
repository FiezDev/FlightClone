
export interface FlightAvailabilitiesRequest {
  originDestinations: OriginDestination[];
  travelers: TravelerInfo[];
  sources: FlightOfferSource[];
  searchCriteria?: SearchCriteria;
}

export interface OriginDestination {
  id: string;
  originLocationCode: string;
  destinationLocationCode: string;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
  departureDateTime: DateTimeType;
  arrivalDateTime?: DateTimeType;
}

export interface DateTimeType {
  date: string; // YYYY-MM-DD
  time?: string; // hh:mm:ss
}

export interface TravelerInfo {
  id: string;
  travelerType: TravelerType;
  associatedAdultId?: string;
}

export type TravelerType =
  | "ADULT"
  | "CHILD"
  | "SENIOR"
  | "YOUNG"
  | "HELD_INFANT"
  | "SEATED_INFANT"
  | "STUDENT";
  
export type FlightOfferSource = "GDS";

export interface SearchCriteria {
  excludeAllotments?: boolean;
  flightFilters?: FlightFiltersLight;
  includeClosedContent?: boolean;
  class?: string;
}

export interface FlightFiltersLight {
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: CabinRestriction[];
  connectionRestriction?: ConnectionRestriction;
}

export interface CarrierRestrictions {
  blacklistedInEUAllowed?: boolean;
  excludedCarrierCodes?: string[];
  includedCarrierCodes?: string[];
}

export interface CabinRestriction {
  cabin: TravelClass;
  originDestinationIds: string[];
}

export type TravelClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export interface ConnectionRestriction {
  maxNumberOfConnections?: number;
  airportChangeAllowed?: boolean;
  technicalStopsAllowed?: boolean;
}

export interface FlightAvailabilitiesResponse {
  warnings?: Issue[];
  meta?: {
    count: number;
  };
  data: FlightAvailability[];
  dictionaries?: Dictionaries;
}

export interface Issue {
  status: number;
  code: number;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    example?: string;
  };
}

export interface FlightAvailability {
  type: string;
  id: string;
  originDestinationId?: string;
  source: FlightOfferSource;
  instantTicketingRequired?: boolean;
  paymentCardRequired?: boolean;
  duration?: string;
  segments: ExtendedSegment[];
}

export interface ExtendedSegment {
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
  departure: FlightEndPoint;
  arrival: FlightEndPoint;
  carrierCode: string;
  number: string;
  aircraft: AircraftEquipment;
  availabilityClasses?: AvailabilityClass[];
}

export interface FlightEndPoint {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface AircraftEquipment {
  code: string;
}

export interface AvailabilityClass {
  numberOfBookableSeats: number;
  class: string;
  closedStatus?: string;
  tourAllotment?: TourAllotment;
}

export interface TourAllotment {
  mode: string;
  remainingSeats: number;
  tourName?: string;
  tourReference?: string;
}

export interface Dictionaries {
  locations?: Record<string, LocationValue>;
  aircraft?: Record<string, string>;
  currencies?: Record<string, string>;
  carriers?: Record<string, string>;
}

export interface LocationValue {
  cityCode: string;
  countryCode: string;
}
