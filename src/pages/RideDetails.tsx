import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, Users, Star, Shield, Car, Phone,
  MessageCircle, Share2, Heart, ArrowLeft, Check, AlertCircle
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockRides } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const RideDetails = () => {
  const { id } = useParams();
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const ride = mockRides.find(r => r.id === id);

  if (!ride) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Ride not found</h1>
          <Link to="/find-ride">
            <Button variant="hero">Browse Rides</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleBook = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    toast.success('Booking request sent!', {
      description: `You requested ${seatsToBook} seat(s). The driver will confirm shortly.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ride from ${ride.from.city} to ${ride.to.city}`,
        text: `Check out this ride on RideShare!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const totalPrice = ride.pricePerSeat * seatsToBook;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/find-ride" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
                    <Car className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{ride.vehicleType.toUpperCase()}</p>
                    <p className="font-display text-lg font-semibold">{ride.vehicleName}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSaved(!isSaved)}
                      className={cn(isSaved && "text-destructive")}
                    >
                      <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Route */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-accent my-1" />
                    <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                      <p className="font-display text-xl font-bold text-foreground">{ride.from.city}</p>
                      <p className="text-muted-foreground">{ride.from.address}</p>
                      {ride.from.landmark && (
                        <p className="text-sm text-muted-foreground">Near {ride.from.landmark}</p>
                      )}
                    </div>
                    {ride.stops && ride.stops.length > 0 && (
                      <div className="pl-4 border-l-2 border-dashed border-muted">
                        {ride.stops.map((stop, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                            <span>{stop.city}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Drop-off</p>
                      <p className="font-display text-xl font-bold text-foreground">{ride.to.city}</p>
                      <p className="text-muted-foreground">{ride.to.address}</p>
                      {ride.to.landmark && (
                        <p className="text-sm text-muted-foreground">Near {ride.to.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(ride.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Departure</p>
                      <p className="font-medium">{formatTime(ride.time)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Driver Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
              >
                <h3 className="font-display text-lg font-semibold mb-4">Driver</h3>
                
                <div className="flex items-start gap-4">
                  <img
                    src={ride.driver.avatar}
                    alt={ride.driver.name}
                    className="w-16 h-16 rounded-full border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display text-lg font-semibold">{ride.driver.name}</h4>
                      {ride.driver.verified && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          <Shield className="h-3 w-3" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{ride.driver.rating}</span>
                      </div>
                      <span>{ride.driver.totalRides} rides completed</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Amenities & Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
              >
                <h3 className="font-display text-lg font-semibold mb-4">Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {ride.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Vehicle</p>
                    <p className="font-medium">{ride.vehicleName} ({ride.vehicleNumber})</p>
                  </div>

                  {ride.notes && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Notes from driver</p>
                      <p className="text-foreground">{ride.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6 sticky top-24"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <p className="text-3xl font-bold text-primary">₹{ride.pricePerSeat}</p>
                    <p className="text-sm text-muted-foreground">per seat</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className={cn(
                      "font-medium",
                      ride.seatsAvailable <= 1 ? "text-destructive" : "text-foreground"
                    )}>
                      {ride.seatsAvailable} left
                    </span>
                  </div>
                </div>

                {/* Seats Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Select Seats
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: ride.seatsAvailable }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => setSeatsToBook(num)}
                        className={cn(
                          "flex-1 h-12 rounded-xl font-semibold transition-all",
                          seatsToBook === num
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price x {seatsToBook} seat(s)</span>
                    <span>₹{ride.pricePerSeat * seatsToBook}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full h-12"
                  onClick={handleBook}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Requesting...
                    </>
                  ) : (
                    'Request to Book'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  You won't be charged until the driver confirms
                </p>

                {/* Info Box */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Instant booking</p>
                    <p className="text-muted-foreground">
                      Get confirmed instantly after the driver accepts your request.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RideDetails;
