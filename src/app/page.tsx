"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightsList from "@/components/FlightsList";
import RightSidebar from "@/components/RightSidebar";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
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
      <Header />

      <SearchBar search={searchData} onSearch={handleSearch} />

      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <Box display="flex" alignItems="flex-start" gap={3}>
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
      </Box>
      <Footer />
    </>
  );
}
