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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQueryState, parseAsJson } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";
import {
  AvailabilityClass,
  ExtendedSegment,
  FlightAvailability,
} from "../../../service/amadeus/type/flightAvailabilities";
import { useGetFlightAvailabilities } from "../../../service/amadeus";

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
            date: "2024-12-14",
            time: "21:15:00",
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
    dataNearestRelevantAirports.data.length === 0
  ) {
    return <Typography className="w-full text-center pt-12" variant="h6">Select the origin and destination, then click 'Search Flight'.</Typography>;
  }

  const renderAvailability = (availabilityClasses: AvailabilityClass[]) => {
    return (
      <Box>
        {availabilityClasses.map((cls) => (
          <Typography key={cls.class}>
            {cls.class}: {cls.numberOfBookableSeats} seats
          </Typography>
        ))}
      </Box>
    );
  };

  const headers = [
    { id: 1, text: "Flight ID" },
    { id: 2, text: "Origin" },
    { id: 3, text: "Destination" },
    { id: 4, text: "Carrier" },
    { id: 5, text: "Duration" },
    { id: 6, text: "Segments" },
  ];

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
            {dataNearestRelevantAirports?.data.map((flight: FlightAvailability) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>
                  {flight.segments[0].departure.iataCode}
                  <br />
                  {new Date(flight.segments[0].departure.at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {
                    flight.segments[flight.segments.length - 1].arrival
                      .iataCode
                  }
                  <br />
                  {new Date(
                    flight.segments[flight.segments.length - 1].arrival.at
                  ).toLocaleString()}
                </TableCell>
                <TableCell>
                  {flight.segments.map((seg: ExtendedSegment) => (
                    <Typography key={seg.id}>
                      {seg.carrierCode} {seg.number}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {flight.duration
                    ? flight.duration.replace("PT", "").toLowerCase()
                    : "-"}
                </TableCell>
                <TableCell>
                  {flight.segments.map((seg: ExtendedSegment) => (
                    <Accordion key={seg.id}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                          Segment {seg.id}: {seg.departure.iataCode} →{" "}
                          {seg.arrival.iataCode}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Departure:{" "}
                          {new Date(seg.departure.at).toLocaleString()}
                        </Typography>
                        <Typography>
                          Arrival: {new Date(seg.arrival.at).toLocaleString()}
                        </Typography>
                        <Typography>Stops: {seg.numberOfStops}</Typography>
                        <Typography>
                          Aircraft Code: {seg.aircraft.code}
                        </Typography>
                        <Typography>Availability:</Typography>
                        {renderAvailability(seg?.availabilityClasses ?? [])}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlightListTable;
