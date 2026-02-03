import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Users, Plus, Clock, MapPin, Calendar, 
  CheckCircle2, XCircle, AlertCircle, ArrowRight 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { myOfferedRides, myBookings } from '@/data/mockData';
import { cn } from '@/lib/utils';

type TabType = 'passenger' | 'driver';

const MyRides = () => {
  const [activeTab, setActiveTab] = useState<TabType>('passenger');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-accent" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'pending':
        return 'Pending';
      case 'upcoming':
        return 'Upcoming';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">My Rides</h1>
              <p className="text-muted-foreground">Manage your bookings and offered rides</p>
            </div>
            <Link to="/offer-ride">
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Offer New Ride
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('passenger')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all",
                activeTab === 'passenger'
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              As Passenger
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
                activeTab === 'passenger'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20"
              )}>
                {myBookings.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('driver')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all",
                activeTab === 'driver'
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Car className="h-4 w-4" />
              As Driver
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
                activeTab === 'driver'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20"
              )}>
                {myOfferedRides.length}
              </span>
            </button>
          </div>

          {/* Content */}
          {activeTab === 'passenger' ? (
            <div className="space-y-4">
              {myBookings.length > 0 ? (
                myBookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <span className={cn(
                            "text-sm font-medium",
                            booking.status === 'confirmed' && "text-primary",
                            booking.status === 'pending' && "text-accent",
                            booking.status === 'cancelled' && "text-destructive"
                          )}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Booked {new Date(booking.bookedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <div className="w-0.5 h-10 bg-gradient-to-b from-primary to-accent" />
                          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-3">
                            <p className="font-medium text-foreground">{booking.ride.from.city}</p>
                            <p className="text-sm text-muted-foreground">{booking.ride.from.address}</p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{booking.ride.to.city}</p>
                            <p className="text-sm text-muted-foreground">{booking.ride.to.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">₹{booking.totalAmount}</p>
                          <p className="text-sm text-muted-foreground">{booking.seatsBooked} seat(s)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(booking.ride.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatTime(booking.ride.time)}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <img
                            src={booking.ride.driver.avatar}
                            alt={booking.ride.driver.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-medium">{booking.ride.driver.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-4 border-t border-border bg-muted/30 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {booking.ride.vehicleName} • {booking.ride.vehicleNumber}
                      </p>
                      <Link to={`/ride/${booking.ride.id}`}>
                        <Button variant="ghost" size="sm">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Start exploring available rides and book your first carpooling journey!
                  </p>
                  <Link to="/find-ride">
                    <Button variant="hero">Find a Ride</Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {myOfferedRides.length > 0 ? (
                myOfferedRides.map((ride, idx) => (
                  <motion.div
                    key={ride.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ride.status)}
                          <span className={cn(
                            "text-sm font-medium",
                            ride.status === 'upcoming' && "text-primary"
                          )}>
                            {getStatusLabel(ride.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {ride.totalSeats - ride.seatsAvailable} / {ride.totalSeats} booked
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <div className="w-0.5 h-10 bg-gradient-to-b from-primary to-accent" />
                          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-3">
                            <p className="font-medium text-foreground">{ride.from.city}</p>
                            <p className="text-sm text-muted-foreground">{ride.from.address}</p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{ride.to.city}</p>
                            <p className="text-sm text-muted-foreground">{ride.to.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">₹{ride.pricePerSeat}</p>
                          <p className="text-sm text-muted-foreground">per seat</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(ride.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatTime(ride.time)}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{ride.vehicleName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-4 border-t border-border bg-muted/30 flex justify-between items-center">
                      <div className="flex gap-2">
                        {ride.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Requests
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Car className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No rides offered yet
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Share your journey and help others while earning money!
                  </p>
                  <Link to="/offer-ride">
                    <Button variant="hero">
                      <Plus className="h-4 w-4 mr-2" />
                      Offer a Ride
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyRides;
