export interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  refundable: boolean;
  stops: number;
  seatsRemaining: number;
  flightClass: string;
  tripType: string;
}

export const flights: Flight[] = [
  {
    id: 1,
    airline: "ABC Airline",
    tripType: "oneway",
    from: "Nairobi",
    to: "Mombasa",
    departure: "14:50",
    arrival: "16:20",
    duration: "1h 30m",
    price: 18500,
    refundable: true,
    stops: 0,
    seatsRemaining: 90,
    flightClass: "Economy",
  },
  {
    id: 2,
    airline: "XYZ Airways",
    flightClass: "Business",
    tripType: "round",
    seatsRemaining: 80,
    from: "knya",
    to: "Mombasa",
    departure: "10:30",
    arrival: "12:40",
    duration: "2h 10m",
    price: 15400,
    refundable: false,
    stops: 1,
  },
];
export interface FlightFilters {
  stops: number[];
  airlines: string[];
  luggageOptions: string[];
  arrivalTimeRange: [number, number];
  departureTimeRange: [number, number];
}
export interface FlightSearch {
  from: string;
  airlines: string;
  to: string;
  departure: string | null;
  returnDate: string | null;
  travellers: number;
  tripType: string;
  flightClass: string;
}
