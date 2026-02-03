import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Phone, Mail, Shield, Star, Car, Users, 
  Edit2, Camera, LogOut, Settings, Bell, HelpCircle,
  ChevronRight, Check
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', onClick: () => {} },
    { icon: Bell, label: 'Notifications', onClick: () => {} },
    { icon: Shield, label: 'Privacy & Safety', onClick: () => {} },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => {} },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {currentUser.name}
                  </h1>
                  {currentUser.verified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Shield className="h-3 w-3" />
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{currentUser.phone}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{currentUser.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{currentUser.totalRides}</span>
                    <span className="text-muted-foreground">rides</span>
                  </div>
                </div>
              </div>

              <Button
                variant={isEditing ? 'hero' : 'outline'}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Edit Profile */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6"
            >
              <h2 className="font-display text-lg font-semibold mb-4">Edit Profile</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-2">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Rides Offered</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-2">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">33</p>
              <p className="text-sm text-muted-foreground">Rides Taken</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-secondary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6"
          >
            <h2 className="font-display text-lg font-semibold mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive instant alerts on your device</p>
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-6"
          >
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={cn(
                  "w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors",
                  idx !== menuItems.length - 1 && "border-b border-border"
                )}
              >
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </motion.div>

          {/* Logout */}
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
