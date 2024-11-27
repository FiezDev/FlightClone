export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  timestamp: number;
  data: T;
}

///useGetLocale

export interface LocaleData {
  text: string;
  id: string;
}

///useGetConfig

export interface CountryData {
  country: string;
  countryCode: string;
  market: string;
  currencyTitle: string;
  currency: string;
  currencySymbol: string;
  site: string;
}

///useGetNearByAirports

export interface AirportsData {
  current: CurrentLocation;
  nearby: NearbyLocation[];
  recent: unknown[];
}

interface NearbyLocation {
  presentation: Presentation;
  navigation: Navigation;
}

interface CurrentLocation {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

///useSearchFlightsComplete

export interface FlightSearchData {
  context: Context;
  itineraries: Itinerary[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: Record<string, unknown>;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}

interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  farePolicy: FarePolicy;
  fareAttributes: Record<string, unknown>;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  tags?: string[];
}



interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface Leg {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

interface Airport {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

interface Carriers {
  marketing: Carrier[];
  operating?: Carrier[];
  operationType: string;
}

interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

interface Segment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier?: Carrier;
}

interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: FlightPlaceParent;
  name: string;
  type: string;
  country: string;
}

interface FlightPlaceParent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

///useSearchFlightEverywhere

export interface SearchEverywhereData {
  context: SearchContext;
  results: SearchResult[];
}

export interface SearchContext {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface SearchResult {
  id: string;
  type: string;
  content: SearchResultContent;
}

export interface SearchResultContent {
  location: LocationData;
  flightQuotes: FlightQuotes;
  image: ImageData;
  flightRoutes: FlightRoutes;
}

export interface LocationData {
  id: string;
  skyCode: string;
  name: string;
  type: string;
}

export interface FlightQuotes {
  cheapest: FlightQuote;
  direct: FlightQuote;
}

export interface FlightQuote {
  price: string;
  rawPrice: number;
  direct: boolean;
}

export interface ImageData {
  url: string;
}

export interface FlightRoutes {
  directFlightsAvailable: boolean;
}












