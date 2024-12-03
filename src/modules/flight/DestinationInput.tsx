import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { parseAsJson, useQueryState } from "nuqs";
import { useGetAirportDirectDestinations } from "../../service/amadeus";
import { flightSchema } from "../../utils/validation/flightSchema";

const DestinationInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const {
    data: dataAirportDirectDestinations,
    isFetching,
    isFetched,
  } = useGetAirportDirectDestinations({
    departureAirportCode: flightData?.OriginIataCode ?? "",
  });

  const sortData = dataAirportDirectDestinations?.data.sort((a, b) => {
    const countryComparison = a.address.countryName.localeCompare(
      b.address.countryName
    );
    if (countryComparison !== 0) {
      return countryComparison;
    }
    return a.name.localeCompare(b.name);
  });

  const menuItems: JSX.Element[] = [];
  sortData?.forEach((airport, index) => {
    const currentCountry = airport.address.countryName;
    const previousCountry =
      index > 0 ? sortData[index - 1].address.countryName : null;

    if (currentCountry !== previousCountry) {
      menuItems.push(
        <ListSubheader className="text-right border-b mt-4 border-gray-900" key={`header-${currentCountry}`}>
          <span >{currentCountry}</span>
        </ListSubheader>
      );
    }

    menuItems.push(
      <MenuItem key={airport.iataCode} value={airport.iataCode}>
        {airport.name}
      </MenuItem>
    );
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

  return !isFetched && !isFetching ? (
    <div className="flex items-center justify-center w-full">
      Please Select Origin
    </div>
  ) : !isFetched && isFetching ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="destination-select-label">Destination</InputLabel>
      <Select
        labelId="destination-select-label"
        id="destination-select"
        value={flightData?.DestinationIataCode}
        onChange={(e) => handleDestinationChange(e.target.value)}
        label="Destination"
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default DestinationInput;
