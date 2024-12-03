import { Container, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../../App.css";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../utils/validation/flightSchema";
import DestinationInput from "./DestinationInput";
import OriginAirportInput from "./OriginAirportInput";
import FlightListTable from "./FlightListTable";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Flight = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const onSearch = () => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        isFinish: true,
      };
    });
  };

  return (
    <Container
      maxWidth="md"
      className="mt-10 bg-white w-full max-w-[1024px] mx-auto"
    >
      <Link
        component={RouterLink}
        to="/swagger"
        variant="body1"
        color="primary"
        underline="hover"
        className="absolute top-4 left-4"
      >
        Swagger Documentation
      </Link>

      <Typography variant="h4" component="h1" gutterBottom>
        Flight Search
      </Typography>
      {flightData?.latitude && flightData?.longitude && (
        <Typography variant="body1" className="text-black" gutterBottom>
          Your Location: Latitude: {flightData.latitude}, Longitude:{" "}
          {flightData.longitude}
        </Typography>
      )}
      <div className="grid grid-cols-2 gap-4 my-4">
        <OriginAirportInput />
        <DestinationInput />
        <DatePicker
          className="w-full"
          label="Select Date"
          value={flightData?.date ? dayjs(flightData.date, "YYYY-MM-DD") : null}
          onChange={(newValue) => {
            const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";
            setFlightData((prev) => ({
              ...prev,
              date: formattedDate,
              isFinish: false,
            }));
          }}
        />
        <TimePicker
          className="w-full"
          label="Select Time"
          value={flightData?.time ? dayjs(flightData.date, "HH:mm:ss") : null}
          onChange={(newValue) => {
            const formattedTime = newValue ? newValue.format("HH:mm:ss") : "";
            setFlightData((prev) => ({
              ...prev,
              time: formattedTime,
              isFinish: false,
            }));
          }}
        />
      </div>

      <Button onClick={onSearch} variant="contained" color="primary" fullWidth>
        Search Flights
      </Button>

      <FlightListTable />
    </Container>
  );
};

export default Flight;
