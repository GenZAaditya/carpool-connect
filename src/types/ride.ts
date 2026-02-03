export interface User {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  totalRides: number;
  verified: boolean;
  phone?: string;
}

export interface Location {
  city: string;
  address: string;
  landmark?: string;
}

export interface Ride {
  id: string;
  driver: User;
  from: Location;
  to: Location;
  date: string;
  time: string;
  seatsAvailable: number;
  totalSeats: number;
  pricePerSeat: number;
  vehicleType: 'car' | 'suv';
  vehicleName: string;
  vehicleNumber: string;
  amenities: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  stops?: Location[];
  notes?: string;
}

export interface RideBooking {
  id: string;
  ride: Ride;
  passenger: User;
  seatsBooked: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookedAt: string;
  pickupPoint?: Location;
  dropPoint?: Location;
}

export interface SearchFilters {
  from: string;
  to: string;
  date: string;
  seats: number;
  sortBy: 'price' | 'time' | 'rating';
  priceRange: [number, number];
  vehicleType?: 'car' | 'suv' | 'all';
  verifiedOnly: boolean;
}
