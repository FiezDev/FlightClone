import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../utils/validation/flightSchema";
import { useGetNearestRelevantAirports } from "../../service/amadeus";
import { Controller, useFormContext } from "react-hook-form";
import useGeolocation from "../../hooks/useGeolocation";
import { useEffect } from "react";

const OriginAirportInput = () => {
  const { latitude, longitude } = useGeolocation();
  const { setValue, control } = useFormContext();

  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const { data: nearestAirports, isFetching } = useGetNearestRelevantAirports({
    latitude: latitude ?? 0,
    longitude: longitude ?? 0,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setFlightData((prev) => ({
        ...flightSchema.parse(prev || {}),
        latitude,
        longitude,
      }));
    }
  }, [latitude, longitude, setFlightData]);

  const handleOriginChange = (value: string) => {
    setFlightData((prev) => ({
      ...flightSchema.parse(prev || {}),
      OriginIataCode: value,
      isFinish: false,
    }));
    setValue("OriginIataCode", value);
  };

  if (isFetching || !latitude || !longitude || !nearestAirports) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="origin-select-label">Origin</InputLabel>
      <Controller
        control={control}
        name="OriginIataCode"
        defaultValue={flightData?.OriginIataCode || ""}
        render={({ field: { onChange, value, ...field } }) => (
          <Select
            labelId="origin-select-label"
            id="origin-select"
            value={value || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              handleOriginChange(selectedValue);
              onChange(selectedValue);
            }}
            label="Origin"
            {...field}
          >
            {nearestAirports?.data.map((airport) => (
              <MenuItem key={airport.detailedName} value={airport.iataCode}>
                {airport.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default OriginAirportInput;
