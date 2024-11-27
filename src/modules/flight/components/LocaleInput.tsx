import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { parseAsJson, useQueryState } from "nuqs";
import { GET_LOCALE_MOCK } from "../../../mocks/getLocale";
import { LocaleData } from "../../../service/flightService.type";
import { flightSchema } from "../../../utils/validation/flightSchema";

const localeData: LocaleData[] = GET_LOCALE_MOCK.data.sort((a, b) => {
  if (a.id === "en-US") return -1;
  if (b.id === "en-US") return 1;
  return a.text.localeCompare(b.text);
});

const LocaleInput = () => {

  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );
  const handleLocaleChange = (value: string) => {
    setFlightData((prev) => {
      const previousData = prev || flightSchema.parse({});
      return {
        ...previousData,
        locale: value,
      };
    });
  };

  if (!localeData || localeData.length === 0) {
    return <div>Loading...</div>;
  }

  const selectedLocale = flightData?.locale || localeData[0]?.id;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="locale-select-label">Locale</InputLabel>
      <Select
        labelId="locale-select-label"
        id="locale-select"
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
      </Select>
    </FormControl>
  );
};

export default LocaleInput;
