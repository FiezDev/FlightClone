import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQueryState, parseAsJson } from "nuqs";
import { flightSchema } from "../../utils/validation/flightSchema";
import {
  AvailabilityClass,
} from "../../service/amadeus/type/flightAvailabilities";
import { useGetFlightAvailabilities } from "../../service/amadeus";
import FlightRow from "./components/flightListTable/FlightRow";

const headers = [
  { id: 1, text: "Flight ID" },
  { id: 2, text: "Origin" },
  { id: 3, text: "Destination" },
  { id: 4, text: "Carrier" },
  { id: 5, text: "Duration" },
  { id: 6, text: "Segments" },
];

export const renderAvailability = (availabilityClasses: AvailabilityClass[]) => (
  <Box>
    {availabilityClasses.map((cls) => (
      <Typography key={cls.class}>
        {cls.class}: {cls.numberOfBookableSeats} seats
      </Typography>
    ))}
  </Box>
);

const FlightListTable = () => {
  const [flightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

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
            date: flightData?.date ?? "",
            time: flightData?.time ?? "",
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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        An error occurred: {error.message}
      </Typography>
    );
  }

  if (
    !dataNearestRelevantAirports ||
    dataNearestRelevantAirports.meta?.count === 0 ||
    dataNearestRelevantAirports.data.length === 0
  ) {
    return (
      <Typography className="w-full text-center pt-12" variant="h6">
        No Flight Available.
        <br />
        Please reselect the origin and destination, then click 'Search Flight'.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((head) => (
                <TableCell
                  key={head.id}
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRight: "1px solid white",
                    whiteSpace: "nowrap",
                  }}
                >
                  {head.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataNearestRelevantAirports.data.map((flight) => (
              <FlightRow key={flight.id} flight={flight} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlightListTable;
