import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, Users, Car, IndianRupee, 
  Music, Zap, Briefcase, Heart, Check, Plus, X 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const amenitiesList = [
  { id: 'ac', label: 'AC', icon: Zap },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'charging', label: 'Charging Point', icon: Zap },
  { id: 'luggage', label: 'Extra Luggage', icon: Briefcase },
  { id: 'firstaid', label: 'First Aid', icon: Heart },
];

const OfferRide = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromCity: '',
    fromAddress: '',
    toCity: '',
    toAddress: '',
    date: '',
    time: '',
    seats: 3,
    price: '',
    vehicleType: 'car' as 'car' | 'suv',
    vehicleName: '',
    vehicleNumber: '',
    amenities: ['ac', 'music'] as string[],
    notes: '',
  });
  const [stops, setStops] = useState<{ city: string; address: string }[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filteredFromCities = cities.filter(city =>
    city.toLowerCase().includes(formData.fromCity.toLowerCase())
  );
  const filteredToCities = cities.filter(city =>
    city.toLowerCase().includes(formData.toCity.toLowerCase())
  );

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id],
    }));
  };

  const addStop = () => {
    setStops(prev => [...prev, { city: '', address: '' }]);
  };

  const removeStop = (index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Dummy endpoint call
    console.log('Submitting ride:', { ...formData, stops });
    toast.success('Ride published successfully!', {
      description: 'Your ride is now visible to passengers.',
    });
    navigate('/my-rides');
  };

  const isStep1Valid = formData.fromCity && formData.toCity && formData.date && formData.time;
  const isStep2Valid = formData.vehicleName && formData.vehicleNumber;
  const isStep3Valid = formData.price && parseInt(formData.price) > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                  step >= s
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div className={cn(
                  "w-16 sm:w-24 h-1 mx-2 rounded-full transition-colors",
                  step > s ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8"
        >
          {/* Step 1: Route Details */}
          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Route Details
              </h2>

              <div className="space-y-6">
                {/* From */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      From City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                      <Input
                        type="text"
                        placeholder="Leaving from..."
                        value={formData.fromCity}
                        onChange={(e) => updateForm('fromCity', e.target.value)}
                        onFocus={() => setShowFromSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                        className="pl-10"
                      />
                    </div>
                    {showFromSuggestions && formData.fromCity && filteredFromCities.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
                        {filteredFromCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                            onClick={() => {
                              updateForm('fromCity', city);
                              setShowFromSuggestions(false);
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Pickup Point
                    </label>
                    <Input
                      type="text"
                      placeholder="Address or landmark"
                      value={formData.fromAddress}
                      onChange={(e) => updateForm('fromAddress', e.target.value)}
                    />
                  </div>
                </div>

                {/* Stops */}
                {stops.map((stop, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 relative">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                    <Input
                      type="text"
                      placeholder="Stop city"
                      value={stop.city}
                      onChange={(e) => {
                        const newStops = [...stops];
                        newStops[index].city = e.target.value;
                        setStops(newStops);
                      }}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Stop address"
                        value={stop.address}
                        onChange={(e) => {
                          const newStops = [...stops];
                          newStops[index].address = e.target.value;
                          setStops(newStops);
                        }}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeStop(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={addStop} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>

                {/* To */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      To City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                      <Input
                        type="text"
                        placeholder="Going to..."
                        value={formData.toCity}
                        onChange={(e) => updateForm('toCity', e.target.value)}
                        onFocus={() => setShowToSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                        className="pl-10"
                      />
                    </div>
                    {showToSuggestions && formData.toCity && filteredToCities.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
                        {filteredToCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                            onClick={() => {
                              updateForm('toCity', city);
                              setShowToSuggestions(false);
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Drop Point
                    </label>
                    <Input
                      type="text"
                      placeholder="Address or landmark"
                      value={formData.toAddress}
                      onChange={(e) => updateForm('toAddress', e.target.value)}
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateForm('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Departure Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => updateForm('time', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Vehicle Details */}
          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Vehicle Details
              </h2>

              <div className="space-y-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['car', 'suv'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateForm('vehicleType', type)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          formData.vehicleType === type
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Car className={cn(
                          "h-8 w-8 mx-auto mb-2",
                          formData.vehicleType === type ? "text-primary" : "text-muted-foreground"
                        )} />
                        <p className={cn(
                          "font-medium",
                          formData.vehicleType === type ? "text-primary" : "text-foreground"
                        )}>
                          {type === 'car' ? 'Hatchback/Sedan' : 'SUV/MUV'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Vehicle Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Honda City, Swift Dzire"
                      value={formData.vehicleName}
                      onChange={(e) => updateForm('vehicleName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Vehicle Number
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., KA 01 AB 1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => updateForm('vehicleNumber', e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Available Seats
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateForm('seats', num)}
                        className={cn(
                          "h-12 w-12 rounded-xl font-semibold transition-all",
                          formData.seats === num
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                          formData.amenities.includes(amenity.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        <amenity.icon className="h-4 w-4" />
                        {amenity.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Set Your Price
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Price per Seat (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter price per seat"
                      value={formData.price}
                      onChange={(e) => updateForm('price', e.target.value)}
                      className="pl-10 text-2xl h-14"
                      min={0}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Suggested: ₹300 - ₹800 based on distance
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium text-foreground mb-2">Your Earnings</h4>
                  <p className="text-3xl font-bold text-primary">
                    ₹{formData.price ? parseInt(formData.price) * formData.seats : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If all {formData.seats} seats are booked
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    placeholder="Any special instructions or information for passengers..."
                    value={formData.notes}
                    onChange={(e) => updateForm('notes', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl border border-border bg-card">
                  <h4 className="font-medium text-foreground mb-4">Ride Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span className="font-medium">{formData.fromCity} → {formData.toCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-medium">{formData.date} at {formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-medium">{formData.vehicleName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seats Available</span>
                      <span className="font-medium">{formData.seats}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            {step < 3 ? (
              <Button
                variant="hero"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!isStep3Valid}
              >
                Publish Ride
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default OfferRide;
