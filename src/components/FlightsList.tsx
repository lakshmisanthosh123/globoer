"use client";
import { useState } from "react";
import { flights, FlightSearch, FlightFilters } from "@/data/flights";
import FlightCard from "./FlightCard";
import { Box, Button, ButtonGroup } from "@mui/material";
export default function FlightsList({
  filters,
  search,
}: {
  filters: FlightFilters;
  search?: FlightSearch;
}) {
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  console.log(filters, search);
  const filteredFlights = flights.filter((flight) => {
    const fromMatch =
      !search?.from ||
      flight.from.toLowerCase().includes(search.from.toLowerCase());

    const toMatch =
      !search?.to || flight.to.toLowerCase().includes(search.to.toLowerCase());

    const triptypeMatch =
      !search?.tripType ||
      search.tripType === "ALL" ||
      search.tripType === flight.tripType;

    const airlineSearchMatch =
      !search?.airlines ||
      search.airlines === "All Airlines" ||
      flight.airline === search.airlines;

    const classMatch =
      !search?.flightClass ||
      search.flightClass === "ALL" ||
      search.flightClass === flight.flightClass;

    const stopsMatch =
      filters.stops.length === 0 || filters.stops.includes(flight.stops);

    const airlineMatch =
      filters.airlines.length === 0 ||
      filters.airlines.includes(flight.airline);

    const departureMinutes = timeToMinutes(flight.departure);
    const arrivalMinutes = timeToMinutes(flight.arrival);

    const departureMatch =
      departureMinutes >= filters.departureTimeRange[0] &&
      departureMinutes <= filters.departureTimeRange[1];

    const arrivalMatch =
      arrivalMinutes >= filters.arrivalTimeRange[0] &&
      arrivalMinutes <= filters.arrivalTimeRange[1];

    return (
      fromMatch &&
      toMatch &&
      triptypeMatch &&
      airlineSearchMatch &&
      classMatch &&
      stopsMatch &&
      airlineMatch &&
      departureMatch &&
      arrivalMatch
    );
  });
  const [sortBy, setSortBy] = useState<"recommended" | "fastest" | "cheapest">(
    "recommended",
  );
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <ButtonGroup
        variant="contained"
        sx={{
          width: "100%",
          "& .MuiButton-root": {
            flex: 1,
          },
        }}
      >
        <Button
          onClick={() => setSortBy("recommended")}
          color={sortBy === "recommended" ? "secondary" : "primary"}
        >
          Recommended
        </Button>

        <Button
          onClick={() => setSortBy("fastest")}
          color={sortBy === "fastest" ? "secondary" : "primary"}
        >
          Fastest
        </Button>

        <Button
          onClick={() => setSortBy("cheapest")}
          color={sortBy === "cheapest" ? "secondary" : "primary"}
        >
          Cheapest
        </Button>
      </ButtonGroup>
      {filteredFlights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </Box>
  );
}
