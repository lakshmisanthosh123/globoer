"use client";

import { Flight } from "@/data/flights";
import { Box, Typography, Button, Divider } from "@mui/material";

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
        borderRadius: 2,
        padding: 3,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography fontWeight={600}>{flight.airline}</Typography>
        <Typography variant="body2">
          Travel Class: <strong>{flight.flightClass}</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#e8d9c9",
          borderRadius: 2,
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontWeight={600}>{flight.departure}</Typography>
          <Typography variant="body2">{flight.from}</Typography>
          <Typography variant="body2">Kenya</Typography>
        </Box>

        <Box textAlign="center">
          <Typography fontWeight={500}>{flight.duration}</Typography>
          <Typography>✈</Typography>
        </Box>

        <Box textAlign="right">
          <Typography fontWeight={600}>{flight.arrival}</Typography>
          <Typography variant="body2">{flight.to}</Typography>
          <Typography variant="body2">Kenya</Typography>
        </Box>

        <Box textAlign="right" ml={3}>
          <Typography fontWeight={700} fontSize={20}>
            ${flight.price.toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#5E35B1",
              textTransform: "none",
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">
          {flight.seatsRemaining} seats remaining
        </Typography>

        <Typography
          variant="body2"
          color={flight.refundable ? "orange" : "red"}
        >
          {flight.refundable ? "Partially Refundable" : "Non-refundable"}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#5E35B1", cursor: "pointer" }}
        >
          View flight details
        </Typography>
      </Box>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
