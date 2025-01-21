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
import { Controller, useFormContext } from "react-hook-form";

const DestinationInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );
  const { control } = useFormContext();

  const {
    data: directDestinations,
    isFetching,
    isFetched,
  } = useGetAirportDirectDestinations({
    departureAirportCode: flightData?.OriginIataCode ?? "",
  });

  const sortedDestinations = directDestinations?.data.sort((a, b) => {
    const countryComparison = a.address.countryName.localeCompare(
      b.address.countryName
    );
    return countryComparison !== 0
      ? countryComparison
      : a.name.localeCompare(b.name);
  });

  const generateMenuItems = () =>
    sortedDestinations?.reduce<JSX.Element[]>((items, airport, index) => {
      const currentCountry = airport.address.countryName;
      const previousCountry =
        index > 0 ? sortedDestinations[index - 1].address.countryName : null;

      if (currentCountry !== previousCountry) {
        items.push(
          <ListSubheader
            className="text-right border-b mt-4 border-gray-900"
            key={`header-${currentCountry}`}
          >
            {currentCountry}
          </ListSubheader>
        );
      }

      items.push(
        <MenuItem key={airport.iataCode} value={airport.iataCode}>
          {airport.name}
        </MenuItem>
      );

      return items;
    }, []);

  const handleDestinationChange = (value: string) => {
    setFlightData((prev) => ({
      ...flightSchema.parse(prev || {}),
      DestinationIataCode: value,
      isFinish: false,
    }));
  };

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isFetched) {
    return (
      <div className="flex items-center justify-center w-full">
        Please Select Origin
      </div>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="destination-select-label">Destination</InputLabel>
      <Controller
        control={control}
        name="DestinationIataCode"
        render={({ field: { onChange, value, ...field } }) => (
          <Select
            labelId="destination-select-label"
            id="destination-select"
            value={value || flightData?.DestinationIataCode || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              handleDestinationChange(selectedValue);
              onChange(selectedValue);
            }}
            label="Destination"
            {...field}
          >
            {generateMenuItems()}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default DestinationInput;
