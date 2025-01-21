import { Container, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { parseAsJson, useQueryState } from "nuqs";
import {
  flightSchema,
  flightSchemaType,
} from "../../utils/validation/flightSchema";
import DestinationInput from "./DestinationInput";
import OriginAirportInput from "./OriginAirportInput";
import FlightListTable from "./FlightListTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import "../../App.css";
import DateTimeInput from "./DateTimeInput";
import useGeolocation from "../../hooks/useGeolocation";
import dayjs from "dayjs";

const Flight = () => {
  const { latitude, longitude, refreshLocation } = useGeolocation();

  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const methods = useForm<flightSchemaType>({
    resolver: zodResolver(flightSchema),
    mode: "onSubmit",
    defaultValues: {
      OriginIataCode: flightData?.OriginIataCode ?? "",
      DestinationIataCode: flightData?.DestinationIataCode ?? "",
      latitude: flightData?.latitude ?? 0,
      longitude: flightData?.longitude ?? 0,
      date: flightData?.date ?? dayjs().startOf("day").toString(),
      time: flightData?.time ?? dayjs().add(1, "hour").toString(),
      isFinish: false,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: flightSchemaType) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        ...data,
        isFinish: true,
      };
    });
  };

  const handleRefreshLocation = () => {
    refreshLocation();
    setFlightData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
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

      <Typography className="pt-4"  variant="h4" component="h1" gutterBottom>
        Flight Search
      </Typography>

      {flightData?.latitude && flightData?.longitude && (
        <div className="flex gap-2 items-center justify-between">
          <Typography variant="body1" className="text-black" gutterBottom>
            Your Location: Latitude: {flightData.latitude}, Longitude:{" "}
            {flightData.longitude}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefreshLocation}
          >
            Refresh Location
          </Button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 my-4 w-full"
      >
        <FormProvider {...methods}>
          <OriginAirportInput />
          <DestinationInput />
          <DateTimeInput />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
            className="col-span-2"
          >
            Search Flights
          </Button>
        </FormProvider>
      </form>

      <FlightListTable />
    </Container>
  );
};

export default Flight;
