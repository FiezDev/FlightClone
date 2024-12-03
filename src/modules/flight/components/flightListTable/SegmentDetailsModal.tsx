import { Modal, Box, Typography, Divider, Button } from "@mui/material";
import { ExtendedSegment } from "../../../../service/amadeus/type/flightAvailabilities";
import { renderAvailability } from "../../FlightListTable";

interface SegmentDetailsModalProps {
    segment: ExtendedSegment;
    open: boolean;
    onClose: () => void;
    duration: string;
  }
  
  const SegmentDetailsModal = ({
    segment,
    open,
    onClose,
    duration,
  }: SegmentDetailsModalProps) => (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxHeight: "80vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Segment Details
        </Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Flight Information
          </Typography>
          <Typography>Segment ID: {segment.id}</Typography>
          <Typography>
            Carrier: {segment.carrierCode} {segment.number}
          </Typography>
          <Typography>Aircraft Code: {segment.aircraft.code}</Typography>
          <Typography>Duration: {duration}</Typography>
          <Typography>Stops: {segment.numberOfStops}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Departure
          </Typography>
          <Typography>Airport: {segment.departure.iataCode}</Typography>
          <Typography>
            Time: {new Date(segment.departure.at).toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Arrival
          </Typography>
          <Typography>Airport: {segment.arrival.iataCode}</Typography>
          <Typography>
            Time: {new Date(segment.arrival.at).toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Availability
          </Typography>
          {renderAvailability(segment.availabilityClasses ?? [])}
        </Box>
        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  export default SegmentDetailsModal