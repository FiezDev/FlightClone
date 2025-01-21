import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "../../App.css";
import { flightSchema} from "../../utils/validation/flightSchema";
import { parseAsJson, useQueryState } from "nuqs";


const DateTimeInput = () => {
  const [flightData, setFlightData] = useQueryState(
    "flightData",
    parseAsJson(flightSchema.parse)
  );

  const currentTime = dayjs();
  const minDate = currentTime.startOf("day");
  const isSameDate = dayjs(flightData?.date).isSame(minDate, "day");
  const minTime = currentTime.add(1, "hour")

  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value, ...field } }) => (
          <DatePicker
            label="Select Date"
            className="w-full"
            minDate={minDate}
            value={value ? dayjs(value) : dayjs(flightData?.date ?? minDate)}
            onChange={(newValue) => {
              const formattedDate = newValue?.toISOString() ?? null;
              onChange(formattedDate);
              setFlightData((prev: any) => ({
                ...prev,
                date: formattedDate,
                isFinish: false,
              }));
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="time"
        render={({ field: { onChange, value, ...field } }) => (
          <TimePicker
            label="Select Time"
            className="w-full"
            {...(isSameDate && { minDate })} 
            value={value ? dayjs(value) : dayjs(flightData?.time ?? minTime)}
            onChange={(newValue) => {
              const formattedTime = newValue?.toISOString() ?? null;
              onChange(formattedTime);
              setFlightData((prev: any) => ({
                ...prev,
                time: formattedTime,
                isFinish: false,
              }));
            }}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
