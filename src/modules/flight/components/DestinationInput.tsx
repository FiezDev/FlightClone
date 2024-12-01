import { FormControl, Input, InputLabel } from "@mui/material";
import "../../../App.css";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";
import { useGetCitiesByKeyword } from "../../../service/amadeusService";

const DestinationInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const { data: dataNearestRelevantAirports } = useGetCitiesByKeyword({
    keyword: flightData?.keyword ?? "",
  });

  console.log(dataNearestRelevantAirports);

  const handleOriginChange = (value: string) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        destinationKeyword: value,
      };
    });
    return value;
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="destination-select-label">Destination Keyword</InputLabel>
      <Input
        color="secondary"
        id="destination-select"
        value={flightData?.keyword}
        onChange={(e) => handleOriginChange(e.target.value)}
        placeholder="Input Destination Airport"
      ></Input>
    </FormControl>
  );
};

export default DestinationInput;
