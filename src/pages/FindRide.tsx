import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X, Car, Shield } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SearchForm } from '@/components/rides/SearchForm';
import { RideCard } from '@/components/rides/RideCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { mockRides } from '@/data/mockData';
import { cn } from '@/lib/utils';

type SortOption = 'price' | 'time' | 'rating';

const FindRide = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [vehicleType, setVehicleType] = useState<'all' | 'car' | 'suv'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const initialValues = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    seats: parseInt(searchParams.get('seats') || '1'),
  };

  const filteredRides = useMemo(() => {
    let rides = [...mockRides];

    // Filter by search params
    if (initialValues.from) {
      rides = rides.filter(r => 
        r.from.city.toLowerCase().includes(initialValues.from.toLowerCase())
      );
    }
    if (initialValues.to) {
      rides = rides.filter(r => 
        r.to.city.toLowerCase().includes(initialValues.to.toLowerCase())
      );
    }
    if (initialValues.date) {
      rides = rides.filter(r => r.date === initialValues.date);
    }
    if (initialValues.seats) {
      rides = rides.filter(r => r.seatsAvailable >= initialValues.seats);
    }

    // Filter by price
    rides = rides.filter(r => 
      r.pricePerSeat >= priceRange[0] && r.pricePerSeat <= priceRange[1]
    );

    // Filter by vehicle type
    if (vehicleType !== 'all') {
      rides = rides.filter(r => r.vehicleType === vehicleType);
    }

    // Filter by verified
    if (verifiedOnly) {
      rides = rides.filter(r => r.driver.verified);
    }

    // Sort
    switch (sortBy) {
      case 'price':
        rides.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
        break;
      case 'time':
        rides.sort((a, b) => a.time.localeCompare(b.time));
        break;
      case 'rating':
        rides.sort((a, b) => b.driver.rating - a.driver.rating);
        break;
    }

    return rides;
  }, [initialValues, priceRange, vehicleType, verifiedOnly, sortBy]);

  return (
    <Layout>
      {/* Search Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <SearchForm variant="compact" initialValues={initialValues} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 1500]);
                    setVehicleType('all');
                    setVerifiedOnly(false);
                  }}
                >
                  Reset
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-4">
                  Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1500}
                  step={50}
                  className="mt-2"
                />
              </div>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Vehicle Type
                </label>
                <div className="flex gap-2">
                  {(['all', 'car', 'suv'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setVehicleType(type)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                        vehicleType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {type === 'all' ? 'All' : type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Verified Drivers Only</span>
                </div>
                <Switch
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {filteredRides.length} Rides Found
                </h1>
                {initialValues.from && initialValues.to && (
                  <p className="text-muted-foreground">
                    {initialValues.from} → {initialValues.to}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort */}
                <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex-1 sm:flex-initial h-10 px-3 rounded-lg border border-input bg-background text-sm"
                  >
                    <option value="time">Departure Time</option>
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Driver Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rides List */}
            {filteredRides.length > 0 ? (
              <div className="space-y-4">
                {filteredRides.map((ride, idx) => (
                  <RideCard key={ride.id} ride={ride} index={idx} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Car className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No rides found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search criteria or check back later for new rides.
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border p-6 overflow-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Same filter content as desktop */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-4">
                Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1500}
                step={50}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Vehicle Type
              </label>
              <div className="flex gap-2">
                {(['all', 'car', 'suv'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setVehicleType(type)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                      vehicleType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {type === 'all' ? 'All' : type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Verified Drivers Only</span>
              </div>
              <Switch
                checked={verifiedOnly}
                onCheckedChange={setVerifiedOnly}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setPriceRange([0, 1500]);
                  setVehicleType('all');
                  setVerifiedOnly(false);
                }}
              >
                Reset
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default FindRide;
