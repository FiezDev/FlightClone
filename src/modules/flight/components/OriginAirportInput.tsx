import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import "../../../App.css";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";
import { useGetNearestRelevantAirports } from "../../../service/amadeusService";

const OriginAirportInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFlightData((prev) => {
            const previousData = prev || flightSchema.parse({});
            return {
              ...previousData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          });
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }
  }, [setFlightData]);

  const { data: dataNearestRelevantAirports } = useGetNearestRelevantAirports({
    latitude: flightData?.latitude ?? 0,
    longitude: flightData?.longitude ?? 0,
  });

  console.log(dataNearestRelevantAirports)

  const handleOriginChange = (value: string) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});

      return {
        ...previousData,
        countryCode: value,
      };

    });
    return value
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="origin-select-label">Origin</InputLabel>
      <Select
        labelId="origin-select-label"
        id="origin-select"
        value={flightData?.countryCode}
        onChange={(e) => handleOriginChange(e.target.value)}
        placeholder="Select Origin Airport"
        label="Origin"
      >
        {dataNearestRelevantAirports?.data.map((airport) => {
          return [
            <MenuItem
              key={`${airport.detailedName}`}
              value={airport.iataCode}
            >
              {airport.name}
            </MenuItem>,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export default OriginAirportInput;
