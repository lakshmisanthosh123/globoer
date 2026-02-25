"use client";

import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { flights, FlightFilters } from "@/data/flights";
import { useState } from "react";

const Sidebar = styled(Box)({
  width: 260,
  padding: 20,
  background: "#fafafa",
  borderRadius: 8,
});

interface Props {
  filters: FlightFilters;
  onFilterChange: (filters: FlightFilters) => void;
}

const defaultFilters: FlightFilters = {
  stops: [],
  airlines: [],
  luggageOptions: [],
  arrivalTimeRange: [0, 1440],
  departureTimeRange: [0, 1440],
};

export default function FiltersSidebar({ filters, onFilterChange }: Props) {
  const [localFilters, setLocalFilters] = useState<FlightFilters>(filters);

  const airlines = Array.from(new Set(flights.map((f) => f.airline)));

  const handleStopsChange = (value: number) => {
    const updated = localFilters.stops.includes(value)
      ? localFilters.stops.filter((s) => s !== value)
      : [...localFilters.stops, value];

    setLocalFilters({ ...localFilters, stops: updated });
  };

  const handleAirlineChange = (airline: string) => {
    const updated = localFilters.airlines.includes(airline)
      ? localFilters.airlines.filter((a) => a !== airline)
      : [...localFilters.airlines, airline];

    setLocalFilters({ ...localFilters, airlines: updated });
  };

  const handleDepartureTimeChange = (_: Event, newValue: number | number[]) => {
    setLocalFilters({
      ...localFilters,
      departureTimeRange: newValue as [number, number],
    });
  };

  const handleArrivalTimeChange = (_: Event, newValue: number | number[]) => {
    setLocalFilters({
      ...localFilters,
      arrivalTimeRange: newValue as [number, number],
    });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <Sidebar>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Stops */}
      <Typography fontWeight={600}>Stops</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={localFilters.stops.includes(0)}
            onChange={() => handleStopsChange(0)}
          />
        }
        label="Non-stop"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={localFilters.stops.includes(1)}
            onChange={() => handleStopsChange(1)}
          />
        }
        label="1 Stop"
      />

      <Divider sx={{ my: 2 }} />

      {/* Airlines */}
      <Typography fontWeight={600}>Airlines</Typography>
      {airlines.map((airline) => (
        <FormControlLabel
          key={airline}
          control={
            <Checkbox
              checked={localFilters.airlines.includes(airline)}
              onChange={() => handleAirlineChange(airline)}
            />
          }
          label={airline}
        />
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Departure Time */}
      <Typography fontWeight={600}>Departure Time</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {formatTime(localFilters.departureTimeRange[0])} -{" "}
        {formatTime(localFilters.departureTimeRange[1])}
      </Typography>
      <Slider
        value={localFilters.departureTimeRange}
        onChange={handleDepartureTimeChange}
        valueLabelDisplay="auto"
        min={0}
        max={1440}
      />

      <Divider sx={{ my: 2 }} />

      {/* Arrival Time */}
      <Typography fontWeight={600}>Arrival Time</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {formatTime(localFilters.arrivalTimeRange[0])} -{" "}
        {formatTime(localFilters.arrivalTimeRange[1])}
      </Typography>
      <Slider
        value={localFilters.arrivalTimeRange}
        onChange={handleArrivalTimeChange}
        valueLabelDisplay="auto"
        min={0}
        max={1440}
      />

      <Divider sx={{ my: 3 }} />

      {/* Buttons */}
      <Stack direction="column" spacing={1}>
        <Button variant="contained" fullWidth onClick={handleApply}>
          Apply Filters
        </Button>

        <Button variant="outlined" fullWidth onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Sidebar>
  );
}
