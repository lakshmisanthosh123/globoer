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
  const [sortBy, setSortBy] = useState<"recommended" | "fastest" | "cheapest">(
    "recommended",
  );

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const parseDuration = (duration: string) => {
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 0;
    return Number(match[1]) * 60 + Number(match[2]);
  };

  const processedFlights = useMemo(() => {
    let result = [...flights];
    console.log(search, filters);
    if (filters) {
      result = result.filter((flight) => {
        const stopsMatch =
          filters.stops.length === 0 || filters.stops.includes(flight.stops);

        const airlineFilterMatch =
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
          stopsMatch && airlineFilterMatch && departureMatch && arrivalMatch
        );
      });
    }
    if (search?.airlines !== "ALL") {
      result = result.filter((flight) => {
        const fromMatch =
          !search?.from ||
          flight.from.toLowerCase().includes(search.from.toLowerCase());

        const toMatch =
          !search?.to ||
          flight.to.toLowerCase().includes(search.to.toLowerCase());

        const tripTypeMatch =
          !search?.tripType ||
          search.tripType === "ALL" ||
          search.tripType === flight.tripType;

        const airlineMatch =
          !search?.airlines ||
          search.airlines === "ALL" ||
          search.airlines === flight.airline;

        const classMatch =
          !search?.flightClass ||
          search.flightClass === "ALL" ||
          search.flightClass === flight.flightClass;

        return (
          fromMatch && toMatch && tripTypeMatch && airlineMatch && classMatch
        );
      });
    }
    if (search?.airlines === "ALL" && !filters) {
      result = [...flights];
    }
    if (sortBy) {
      result = result.sort((a, b) => {
        if (sortBy === "fastest") {
          return parseDuration(a.duration) - parseDuration(b.duration);
        }

        if (sortBy === "cheapest") {
          return a.price - b.price;
        }

        return result.indexOf(a) - result.indexOf(b);
      });
    }

    return result;
  }, [filters, search, sortBy]);

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

      {processedFlights.length === 0 ? (
        <Box textAlign="center" py={4}>
          No flights found
        </Box>
      ) : (
        processedFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      )}
    </Box>
  );
}
