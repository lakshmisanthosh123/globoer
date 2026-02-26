"use client";

import { useMemo, useState } from "react";
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

  const durationToMinutes = (duration: string) => {
    const hoursMatch = duration.match(/(\d+)h/);
    const minutesMatch = duration.match(/(\d+)m/);

    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

    return hours * 60 + minutes;
  };

  const [sortBy, setSortBy] = useState<"recommended" | "fastest" | "cheapest">(
    "recommended",
  );

  const sortedFlights = useMemo(() => {
    const safeFilters = {
      stops: filters?.stops ?? [],
      airlines: filters?.airlines ?? [],
      departureTimeRange: filters?.departureTimeRange ?? [0, 1440],
      arrivalTimeRange: filters?.arrivalTimeRange ?? [0, 1440],
    };

    const filteredFlights = flights.filter((flight) => {
      const fromMatch = search?.from
        ? flight.from.toLowerCase().includes(search.from.toLowerCase())
        : true;

      const toMatch = search?.to
        ? flight.to.toLowerCase().includes(search.to.toLowerCase())
        : true;

      const triptypeMatch =
        search?.tripType === "ALL" || search?.tripType === flight.tripType;

      const airlineSearchMatch =
        search?.airlines === "ALL" || flight.airline === search?.airlines;

      const classMatch =
        search?.flightClass === "ALL" ||
        search?.flightClass === flight.flightClass;

      const stopsMatch =
        safeFilters.stops.length === 0 ||
        safeFilters.stops.includes(flight.stops);

      const airlineMatch =
        safeFilters.airlines.length === 0 ||
        safeFilters.airlines.includes(flight.airline);

      const departureMinutes = timeToMinutes(flight.departure);
      const arrivalMinutes = timeToMinutes(flight.arrival);

      const departureMatch =
        departureMinutes >= safeFilters.departureTimeRange[0] &&
        departureMinutes <= safeFilters.departureTimeRange[1];

      const arrivalMatch =
        arrivalMinutes >= safeFilters.arrivalTimeRange[0] &&
        arrivalMinutes <= safeFilters.arrivalTimeRange[1];

      return (
        flights &&
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

    return [...filteredFlights].sort((a, b) => {
      if (sortBy === "recommended") {
        return 0;
      }
      if (sortBy === "fastest") {
        return durationToMinutes(a.duration) - durationToMinutes(b.duration);
      }

      if (sortBy === "cheapest") {
        return a.price - b.price;
      }

      const aScore = a.price + durationToMinutes(a.duration);
      const bScore = b.price + durationToMinutes(b.duration);

      return aScore - bScore;
    });
  }, [filters, search, sortBy]);
  console.log(sortedFlights, filters, search, sortBy);
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

      {sortedFlights.length === 0 ? (
        <Box textAlign="center" mt={4}>
          No flights found
        </Box>
      ) : (
        sortedFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      )}
    </Box>
  );
}
