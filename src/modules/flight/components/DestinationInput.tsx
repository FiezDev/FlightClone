import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";
import { useGetAirportDirectDestinations } from "../../../service/amadeus";
import "../../../App.css";

const DestinationInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const { data: dataAirportDirectDestinations, isFetched } =
    useGetAirportDirectDestinations({
      departureAirportCode: flightData?.OriginIataCode ?? '',
    });

  const handleDestinationChange = (value: string) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        DestinationIataCode: value,
        isFinish: false,
      };
    });
    return value;
  };

  return !isFetched ? (
    <div className="flex items-center justify-center w-full">Please Select Origin</div>
  ) : (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="destination-select-label">Destination</InputLabel>
      <Select
        labelId="destination-select-label"
        placeholder="Select Destination"
        id="destination-select"
        value={flightData?.DestinationIataCode}
        onChange={(e) => handleDestinationChange(e.target.value)}
        label="Destination"
      >
        {dataAirportDirectDestinations?.data.map((airport) => (
          <MenuItem key={airport.iataCode} value={airport.iataCode}>
            {airport.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DestinationInput;
