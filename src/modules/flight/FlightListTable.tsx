import {
  CircularProgress,
} from "@mui/material";
import { useQueryState, parseAsJson } from "nuqs";
import { flightSchema } from "../../utils/validation/flightSchema";
import {
  AvailabilityClass,
} from "../../service/amadeus/type/flightAvailabilities";
import { useGetFlightAvailabilities } from "../../service/amadeus";
import FlightRow from "./components/flightListTable/FlightRow";
import dayjs from "dayjs";

const headers = [
  { id: 1, text: "Flight ID" },
  { id: 2, text: "Origin" },
  { id: 3, text: "Destination" },
  { id: 4, text: "Carrier" },
  { id: 5, text: "Duration" },
  { id: 6, text: "Segments" },
];

export const renderAvailability = (availabilityClasses: AvailabilityClass[]) => (
  <div>
    {availabilityClasses.map((cls) => (
      <p key={cls.class}>
        {cls.class}: {cls.numberOfBookableSeats} seats
      </p>
    ))}
  </div>
);

const FlightListTable = () => {
  const [flightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const flightDate = dayjs(flightData?.date).format("YYYY-MM-DD");
  const flightTime = dayjs(flightData?.time).format("HH:mm:ss");
  const currentDate = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs().format("HH:mm:ss");

  const {
    data: dataNearestRelevantAirports,
    isLoading,
    error,
  } = useGetFlightAvailabilities(
    {
      originDestinations: [
        {
          id: "1",
          originLocationCode: flightData?.OriginIataCode ?? "",
          destinationLocationCode: flightData?.DestinationIataCode ?? "",
          departureDateTime: {
            date: flightDate ?? currentDate,
            time: flightTime ?? currentTime,
          },
        },
      ],
      travelers: [
        {
          id: "1",
          travelerType: "ADULT",
        },
      ],
      sources: ["GDS"],
    },
    flightData?.isFinish ?? false
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-4">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-lg font-semibold">
        An error occurred: {error.message}
      </p>
    );
  }

  if (
    !dataNearestRelevantAirports ||
    dataNearestRelevantAirports.meta?.count === 0 ||
    dataNearestRelevantAirports.data.length === 0
  ) {
    return (
      <p className="w-full text-center pt-12 text-lg font-medium">
        No Flight Available.<br />
        Please reselect the origin and destination, then click 'Search Flight'.
      </p>
    );
  }

  return (
    <div className="p-3">
      <div className="overflow-auto max-h-96">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-blue-500">
            <tr>
              {headers.map((head) => (
                <th
                  key={head.id}
                  className="text-white font-bold text-center border border-white whitespace-nowrap px-2 py-1"
                >
                  {head.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataNearestRelevantAirports.data.map((flight) => (
              <FlightRow key={flight.id} flight={flight} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightListTable;
