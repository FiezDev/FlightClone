import { useQueryState, parseAsJson } from "nuqs";
import { flightSchema } from "../../../utils/validation/flightSchema";

const FlightListTable = () => {
    const [flightData, setFlightData] = useQueryState(
        "flightData",
        parseAsJson(flightSchema.parse)
      );
   
    return <div>Flight List</div>

  };
  
  export default FlightListTable;
  