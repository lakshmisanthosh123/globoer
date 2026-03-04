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
  const [airlines, setSelectedAirline] = useState("ALL");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Dayjs | null>(dayjs());
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [travellers, setTravellers] = useState(1);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setDeparture(null);
    setReturnDate(null);
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
  const handleResetSearch = () => {
    onSearch({
      from: "",
      to: "",
      departure: "",
      returnDate: "",
      travellers: 0,
      tripType: "",
      flightClass: "",
      airlines: "",
    });
  };
  const airline = Array.from(new Set(flights.map((f) => f.airline)));
  return (
    <Wrapper>
      <TopRow
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <Select
          value={airlines}
          onChange={(e) => setSelectedAirline(e.target.value)}
          size="small"
          sx={{ minWidth: 160, height: 40 }}
        >
          <MenuItem value="ALL">All Airlines</MenuItem>

          {airline.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
          size="small"
          sx={{ minWidth: 160, height: 40 }}
        >
          <MenuItem value="ALL">All Classes</MenuItem>
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>

        <Select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          size="small"
          sx={{ minWidth: 160, height: 40 }}
        >
          <MenuItem value="ALL">All Trips</MenuItem>
          <MenuItem value="oneway">One Way</MenuItem>
          <MenuItem value="round">Round Trip</MenuItem>
        </Select>
      </TopRow>

      {/* BOTTOM ROW */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BottomRow
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              sx: { height: 40 },
              startAdornment: (
                <InputAdornment position="start">
                  <FlightTakeoffIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <SwapBox
            onClick={handleSwap}
            sx={{
              height: 40,
              width: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
              borderRadius: 1,
              cursor: "pointer",
            }}
          >
            <SwapHorizIcon color="primary" />
          </SwapBox>

          <TextField
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              sx: { height: 40 },
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
            sx={{ width: 140 }}
            InputProps={{
              sx: { height: 40 },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              height: 40,
              px: 4,
              whiteSpace: "nowrap",
            }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            onClick={handleResetSearch}
            sx={{
              height: 40,
              px: 4,
              whiteSpace: "nowrap",
            }}
          >
            RESET
          </Button>
        </BottomRow>
      </LocalizationProvider>
    </Wrapper>
  );
}
