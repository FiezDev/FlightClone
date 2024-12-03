import { TableRow, TableCell, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import {
  FlightAvailability,
  ExtendedSegment,
} from "../../../../service/amadeus/type/flightAvailabilities";
import SegmentDetailsModal from "./SegmentDetailsModal";

interface FlightRowProps {
  flight: FlightAvailability;
}

const FlightRow = ({ flight }: FlightRowProps) => {
  const [openSegment, setOpenSegment] = useState<ExtendedSegment | null>(null);

  const handleOpen = (segment: ExtendedSegment) => {
    setOpenSegment(segment);
  };

  const handleClose = () => {
    setOpenSegment(null);
  };

  return (
    <>
      <TableRow>
        <TableCell>{flight.id}</TableCell>
        <TableCell>
          {flight.segments[0].departure.iataCode}
          <br />
          {new Date(flight.segments[0].departure.at).toLocaleString()}
        </TableCell>
        <TableCell>
          {flight.segments[flight.segments.length - 1].arrival.iataCode}
          <br />
          {new Date(
            flight.segments[flight.segments.length - 1].arrival.at
          ).toLocaleString()}
        </TableCell>
        <TableCell>
          {flight.segments.map((seg) => (
            <Typography key={seg.id}>
              {seg.carrierCode} {seg.number}
            </Typography>
          ))}
        </TableCell>
        <TableCell>
          {flight.duration
            ? flight.duration.replace("PT", "").toLowerCase()
            : "-"}
        </TableCell>
        <TableCell>
          {flight.segments.map((seg) => (
            <Box key={seg.id} mb={1}>
              <Typography className="text-nowrap">
                Segment {seg.id}: {seg.departure.iataCode} →{" "}
                {seg.arrival.iataCode}
              </Typography>
              <Button className="mt-2" fullWidth variant="outlined" onClick={() => handleOpen(seg)}>
                View Details
              </Button>
            </Box>
          ))}
        </TableCell>
      </TableRow>
      {openSegment && (
        <SegmentDetailsModal
          segment={openSegment}
          open={true}
          onClose={handleClose}
          duration={
            flight?.duration
              ? flight.duration.replace("PT", "").toLowerCase()
              : "-"
          }
        />
      )}
    </>
  );
};

export default FlightRow;
