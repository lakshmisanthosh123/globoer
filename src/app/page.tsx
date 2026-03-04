"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightsList from "@/components/FlightsList";
import RightSidebar from "@/components/RightSidebar";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { styled } from "@mui/material/styles";
import { FlightSearch, FlightFilters } from "@/data/flights";
export default function Home() {
  const [filters, setFilters] = useState<FlightFilters>({
    stops: [],
    airlines: [],
    luggageOptions: [],
    arrivalTimeRange: [0, 1440],
    departureTimeRange: [0, 1440],
  });
  const [searchData, setSearchData] = useState<FlightSearch>({
    from: "",
    to: "",
    departure: null,
    returnDate: null,
    travellers: 1,
    tripType: "oneway",
    flightClass: "ALL",
    airlines: "All Airlines",
  });
  const handleSearch = (data: FlightSearch) => {
    setSearchData(data);
  };

  return (
    <>
      <div style={{ width: "100%", maxWidth: "100vw" }}>
        <Header />

        <SearchBar search={searchData} onSearch={handleSearch} />

        <Box
          gap={3}
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            padding: "32px 24px",
          }}
        >
          <Box sx={{ width: 300, flexShrink: 0 }}>
            <FiltersSidebar filters={filters} onFilterChange={setFilters} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <FlightsList filters={filters} search={searchData} />
          </Box>

          <Box sx={{ width: 300, flexShrink: 0 }}>
            <RightSidebar />
          </Box>
        </Box>

        <Footer />
      </div>
    </>
  );
}
