import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import AirportNearestRelevant from "../swagger/spec/AirportNearestRelevant.json";
import CitySearch from "../swagger/spec/CitySearch.json";
import AirportCitySearch from "../swagger/spec/AirportCitySearch.json";
import AirportRoutes from "../swagger/spec/AirportRoutes.json";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { ListItemButton, ListItemText } from "@mui/material";

const SwaggerDoc = () => {
  const specList = [
    {
      id: 1,
      spec: AirportNearestRelevant,
      displayName: "Airport Nearest Relevant",
    },
    {
      id: 2,
      spec: CitySearch,
      displayName: "City Search",
    },
    {
      id: 3,
      spec: AirportCitySearch,
      displayName: "Airport & City Search",
    },
    {
      id: 4,
      spec: AirportRoutes,
      displayName: "Airport Routes",
    },
  ];

  const [selectedSpec, setSelectedSpec] = useState<object>(specList[0].spec);

  const handleSpecChange = (spec: object) => {
    setSelectedSpec(spec);
  };

  return (
    <Box display="flex" height="100vh">
      <Box bgcolor="grey.100">
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            disabled
          >
            <ListItemText primary="Amadeus API List" />
          </ListItemButton>
          {specList.map((specItem) => (
            <ListItemButton
              onClick={() => handleSpecChange(specItem.spec)}
              key={specItem.id}
            >
              <ListItemText
                primary={specItem.displayName}
                primaryTypographyProps={{
                  noWrap: true,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box p={2}>
        <SwaggerUI spec={selectedSpec} />
      </Box>
    </Box>
  );
};

export default SwaggerDoc;
