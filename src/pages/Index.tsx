import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, MapPin, Shield, Leaf, Users, Star, ArrowRight, 
  TrendingUp, Clock, Wallet, ChevronRight 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SearchForm } from '@/components/rides/SearchForm';
import { RideCard } from '@/components/rides/RideCard';
import { Button } from '@/components/ui/button';
import { mockRides, popularRoutes } from '@/data/mockData';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users' },
  { icon: Car, value: '25K+', label: 'Rides Shared' },
  { icon: Leaf, value: '100T', label: 'CO₂ Saved' },
  { icon: Star, value: '4.8', label: 'Avg Rating' },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Drivers',
    description: 'All drivers undergo thorough background verification for your safety.',
  },
  {
    icon: Wallet,
    title: 'Save Money',
    description: 'Share the cost of fuel and tolls with fellow travelers.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Reduce your carbon footprint by sharing rides.',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Choose rides that match your schedule perfectly.',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Making travel sustainable
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
            >
              Share Rides,
              <br />
              <span className="text-accent">Save More</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Connect with verified drivers heading your way. Split costs, reduce emissions, 
              and make every journey memorable.
            </motion.p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <SearchForm variant="hero" />
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Popular Routes
              </h2>
              <p className="text-muted-foreground mt-2">
                Most traveled routes by our community
              </p>
            </div>
            <Link to="/find-ride">
              <Button variant="outline" className="group">
                View All Routes
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularRoutes.map((route, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Link
                  to={`/find-ride?from=${route.from}&to=${route.to}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:shadow-card hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {route.from} → {route.to}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{route.rides} rides/week</span>
                    <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Rides */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Available Rides
              </h2>
              <p className="text-muted-foreground mt-2">
                Find your perfect ride from our latest listings
              </p>
            </div>
            <Link to="/find-ride">
              <Button variant="hero" className="group">
                Browse All Rides
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockRides.slice(0, 4).map((ride, idx) => (
              <RideCard key={ride.id} ride={ride} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RideShare?
            </h2>
            <p className="text-muted-foreground">
              Experience the smarter way to travel with our trusted carpooling platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all group"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Have a Car? Start Earning!
                </h2>
                <p className="text-primary-foreground/80 max-w-lg">
                  Turn your empty seats into extra income. Share your commute and help others 
                  while reducing traffic and pollution.
                </p>
              </div>
              <Link to="/offer-ride">
                <Button variant="heroOutline" size="xl" className="whitespace-nowrap border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Car className="h-5 w-5 mr-2" />
                  Offer a Ride
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
