import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../../App.css";
import LocaleInput from "./components/LocaleInput";
import { parseAsJson, useQueryState } from "nuqs";
import OriginAirportInput from "./components/OriginAirportInput";
import { Suspense } from "react";
import { flightSchema, flightSchemaType } from "../../utils/validation/flightSchema";
import { useGetCitiesByKeyword } from "../../service/amadeusService";
import DestinationInput from "./components/DestinationInput";

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

  const { data: DataGetCitiesByKeyword } = useGetCitiesByKeyword({
    countryCode: 'FR',
    keyword: 'PARIS',
    max: 100,
    include: ['AIRPORTS'],
  });

  console.log(DataGetCitiesByKeyword)

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
          Your Location: Latitude: {flightData.latitude}, Longitude: {flightData.longitude}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 justify-center">
          <LocaleInput />
          <Suspense fallback={<CircularProgress />}>
            <OriginAirportInput />
          </Suspense>
          <Suspense fallback={<CircularProgress />}>
            <DestinationInput />
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
