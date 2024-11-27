import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import "../../App.css";
import LocaleInput from "./components/LocaleInput";
import { parseAsJson, useQueryState } from "nuqs";
import OriginAirportInput from "./components/OriginAirportInput";
import { Suspense } from "react";
import { flightSchema, flightSchemaType } from "../../utils/validation/flightSchema";

const Flight = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const { handleSubmit } = useForm<flightSchemaType>({
    resolver: zodResolver(flightSchema),
  });

  const onSubmit = (data: flightSchemaType) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        locale: data.locale,
      };
    });
  };
  

  return (
    <Container
      maxWidth="md"
      className="mt-10 bg-white w-full max-w-[1024px] mx-auto"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Flight Search
      </Typography>
      {location && (
        <Typography variant="body1" className="text-black" gutterBottom>
          Your Location: Latitude: {flightData?.lat}, Longitude: {flightData?.lng}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 justify-center">
          <LocaleInput />
          <Suspense fallback={<CircularProgress />}>
            <OriginAirportInput />
          </Suspense>
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search Flights
        </Button>
      </form>
    </Container>
  );
};

export default Flight;
