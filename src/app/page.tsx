"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightsList from "@/components/FlightsList";
import RightSidebar from "@/components/RightSidebar";
import SearchBar from "@/components/SearchBar";
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
      <SearchBar search={searchData || undefined} onSearch={handleSearch} />
      <Box display="flex" gap={3} p={4}>
        <FiltersSidebar filters={filters} onFilterChange={setFilters} />

        <Box flex={1}>
          <FlightsList filters={filters} search={searchData} />
        </Box>

        <RightSidebar />
      </Box>
    </>
  );
}
