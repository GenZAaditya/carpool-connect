import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Star, Shield, ArrowRight, Car } from 'lucide-react';
import { Ride } from '@/types/ride';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RideCardProps {
  ride: Ride;
  index?: number;
}

export function RideCard({ ride, index = 0 }: RideCardProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group"
    >
      <div className="p-5">
        {/* Route */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-accent" />
            <div className="w-3 h-3 rounded-full bg-accent" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-semibold text-foreground">{ride.from.city}</p>
              <p className="text-sm text-muted-foreground">{ride.from.address}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">To</p>
              <p className="font-semibold text-foreground">{ride.to.city}</p>
              <p className="text-sm text-muted-foreground">{ride.to.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">₹{ride.pricePerSeat}</p>
            <p className="text-xs text-muted-foreground">per seat</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 mb-4 py-3 px-4 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatTime(ride.time)}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="text-sm text-muted-foreground">
            {formatDate(ride.date)}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className={cn(
              "text-sm font-medium",
              ride.seatsAvailable <= 1 ? "text-destructive" : "text-foreground"
            )}>
              {ride.seatsAvailable} seats left
            </span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ride.driver.avatar}
              alt={ride.driver.name}
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{ride.driver.name}</p>
                {ride.driver.verified && (
                  <Shield className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span>{ride.driver.rating}</span>
                <span className="mx-1">•</span>
                <span>{ride.driver.totalRides} rides</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="h-4 w-4" />
            <span>{ride.vehicleName}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
        <div className="flex gap-2">
          {ride.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
            >
              {amenity}
            </span>
          ))}
          {ride.amenities.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
              +{ride.amenities.length - 3}
            </span>
          )}
        </div>
        <Link to={`/ride/${ride.id}`}>
          <Button size="sm" className="group-hover:shadow-md transition-shadow">
            View Details
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
