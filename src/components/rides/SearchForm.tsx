import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cities } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
  initialValues?: {
    from?: string;
    to?: string;
    date?: string;
    seats?: number;
  };
}

export function SearchForm({ variant = 'hero', initialValues }: SearchFormProps) {
  const navigate = useNavigate();
  const [from, setFrom] = useState(initialValues?.from || '');
  const [to, setTo] = useState(initialValues?.to || '');
  const [date, setDate] = useState(initialValues?.date || '');
  const [seats, setSeats] = useState(initialValues?.seats || 1);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filteredFromCities = cities.filter(city =>
    city.toLowerCase().includes(from.toLowerCase()) && city !== to
  );
  const filteredToCities = cities.filter(city =>
    city.toLowerCase().includes(to.toLowerCase()) && city !== from
  );

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from,
      to,
      date,
      seats: seats.toString(),
    });
    navigate(`/find-ride?${params.toString()}`);
  };

  const isHero = variant === 'hero';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSearch}
      className={cn(
        "w-full",
        isHero ? "bg-card/95 backdrop-blur-sm rounded-2xl shadow-elevated p-6 md:p-8" : "bg-card rounded-xl shadow-card p-4"
      )}
    >
      <div className={cn(
        "grid gap-4",
        isHero ? "md:grid-cols-[1fr,auto,1fr,auto,auto,auto] items-end" : "md:grid-cols-5 items-end"
      )}>
        {/* From */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            From
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="text"
              placeholder="Leaving from..."
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              className={cn(
                "pl-10",
                isHero && "h-12 text-base"
              )}
            />
          </div>
          {showFromSuggestions && from && filteredFromCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
              {filteredFromCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                  onClick={() => {
                    setFrom(city);
                    setShowFromSuggestions(false);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        {isHero && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSwap}
            className="h-12 w-12 rounded-full hover:bg-primary/10 hidden md:flex"
          >
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </Button>
        )}

        {/* To */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            To
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
            <Input
              type="text"
              placeholder="Going to..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              className={cn(
                "pl-10",
                isHero && "h-12 text-base"
              )}
            />
          </div>
          {showToSuggestions && to && filteredToCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
              {filteredToCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                  onClick={() => {
                    setTo(city);
                    setShowToSuggestions(false);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={cn(
                "pl-10",
                isHero && "h-12 text-base"
              )}
            />
          </div>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Seats
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className={cn(
                "w-full pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                isHero ? "h-12 text-base" : "h-10 text-sm"
              )}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'seat' : 'seats'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="hero"
          className={cn(
            isHero ? "h-12 px-8" : "h-10"
          )}
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline ml-2">Search</span>
        </Button>
      </div>
    </motion.form>
  );
}
