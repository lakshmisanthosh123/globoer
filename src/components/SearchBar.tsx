"use client";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { flights, FlightSearch } from "@/data/flights";

interface Props {
  search: FlightSearch;
  onSearch: (data: FlightSearch) => void;
}

const Wrapper = styled(Box)({
  background: "#f5f6fa",
  padding: "24px 40px",
});

const TopRow = styled(Box)({
  display: "flex",
  gap: 16,
  marginBottom: 16,
});

const BottomRow = styled(Box)({
  display: "flex",
  gap: 16,
  alignItems: "center",
});

const SwapBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ede7ff",
  borderRadius: 6,
  width: 45,
  height: 56,
  cursor: "pointer",
});

export default function SearchBar({ onSearch }: Props) {
  const [tripType, setTripType] = useState("ALL");
  const [flightClass, setFlightClass] = useState("ALL");
  const [airlines, setSelectedAirline] = useState("All Airlines");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Dayjs | null>(dayjs());
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [travellers, setTravellers] = useState(1);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    onSearch({
      from,
      to,
      departure: departure ? departure.format("YYYY-MM-DD") : null,
      returnDate: returnDate ? returnDate.format("YYYY-MM-DD") : null,
      travellers,
      tripType,
      flightClass,
      airlines,
    });
  };
  const airline = Array.from(new Set(flights.map((f) => f.airline)));
  return (
    <Wrapper>
      <TopRow>
        <Select
          value={airlines}
          onChange={(e) => setSelectedAirline(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All Airlines</MenuItem>

          {airline.map((airline) => (
            <MenuItem key={airline} value={airline}>
              {airline}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>

        <Select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="oneway">One Way</MenuItem>
          <MenuItem value="round">Round Trip</MenuItem>
        </Select>
      </TopRow>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BottomRow>
          <TextField
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightTakeoffIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <SwapBox onClick={handleSwap}>
            <SwapHorizIcon color="primary" />
          </SwapBox>

          <TextField
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightLandIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="number"
            label="Travellers"
            value={travellers}
            onChange={(e) => setTravellers(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 120 }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ height: 56 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </BottomRow>
      </LocalizationProvider>
    </Wrapper>
  );
}
