import {
  FormControl,
  InputLabel,
//   Select,
//   MenuItem,
//   Divider,
} from "@mui/material";
import { useEffect } from "react";
import "../../../App.css";
import { useGetNearByAirports } from "../../../service/flightService";
import { parseAsJson, useQueryState } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";

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
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
            };
          });
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }
  }, [setFlightData]);

  const { data: nearAirport } = useGetNearByAirports({
    lat: flightData?.lat ?? '',
    lng: flightData?.lng  ?? '',
    locale: flightData?.locale  ?? '',
  });

  console.log(nearAirport)

//   const handleLocaleChange = (value: string) => {
//     setFlightData((prev) => {
//         const previousData = prev || flightSchema.parse({});
//         return {
//           ...previousData,
//           locale: value,
//         };
//       });  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="origin-select-label">Locale</InputLabel>
      {/* <Select
        labelId="origin-select-label"
        id="origin-select"
        value={selectedLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        label="Locale"
      >
        {localeData.map((locale, index) => {
          return [
            index === 1 && <Divider key={`divider-${index}`} />,
            <MenuItem key={`${locale.id}${locale.text}`} value={locale.id}>
              {locale.text}
            </MenuItem>,
          ];
        })}
      </Select> */}
    </FormControl>
  );
};

export default OriginAirportInput;
