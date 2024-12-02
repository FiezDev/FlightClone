import {
  Container,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../../App.css";
import { parseAsJson, useQueryState } from "nuqs";
import {
  flightSchema,
} from "../../utils/validation/flightSchema";
import DestinationInput from "./components/DestinationInput";
import OriginAirportInput from "./components/OriginAirportInput";
import FlightListTable from "./components/FlightListTable";

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
        <div className="flex gap-4 justify-center items-center my-4">
          <OriginAirportInput />
          <DestinationInput />
        </div>
        <Button onClick={onSearch} variant="contained" color="primary" fullWidth>
          Search Flights
        </Button>

      <FlightListTable/>
    </Container>
  );
};

export default Flight;
