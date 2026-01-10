import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingCard from './components/BookingCard';
import SavedTourCard from './components/SavedTourCard';
import ProfileSection from './components/ProfileSection';
import NotificationCard from './components/NotificationCard';
import StatsCard from './components/StatsCard';
import QuickActionCard from './components/QuickActionCard';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const mockBookings = [
  {
    id: 1,
    referenceNumber: "EDT2026001234",
    tourName: "Historical Heritage Tour - Delhi & Agra",
    tourImage: "https://images.unsplash.com/photo-1586168713136-b40c7cb84eec",
    tourImageAlt: "Majestic view of Taj Mahal with white marble dome and minarets against clear blue sky in Agra India",
    destination: "Delhi & Agra",
    startDate: "15/02/2026",
    endDate: "18/02/2026",
    groupMembers: 4,
    totalAmount: 45000,
    paymentStatus: "paid",
    status: "confirmed",
    tourGuide: "Rajesh Kumar",
    emergencyContact: "+91 98765 43210"
  },
  {
    id: 2,
    referenceNumber: "EDT2026001567",
    tourName: "Science & Technology Industrial Tour - Bangalore",
    tourImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd003770-1764656509147.png",
    tourImageAlt: "Modern technology campus building with glass facade and innovative architecture in Bangalore tech hub",
    destination: "Bangalore",
    startDate: "05/03/2026",
    endDate: "08/03/2026",
    groupMembers: 2,
    totalAmount: 38000,
    paymentStatus: "pending",
    status: "pending",
    tourGuide: "Priya Sharma",
    emergencyContact: "+91 98765 43211"
  },
  {
    id: 3,
    referenceNumber: "EDT2025009876",
    tourName: "Cultural Learning Camp - Rajasthan",
    tourImage: "https://images.unsplash.com/photo-1612105301362-0d4900e364fa",
    tourImageAlt: "Colorful traditional Rajasthani palace with intricate architecture and vibrant pink walls in Jaipur",
    destination: "Jaipur & Udaipur",
    startDate: "10/12/2025",
    endDate: "15/12/2025",
    groupMembers: 3,
    totalAmount: 52000,
    paymentStatus: "paid",
    status: "completed",
    tourGuide: "Amit Singh",
    emergencyContact: "+91 98765 43212"
  }];


  const mockSavedTours = [
  {
    id: 1,
    name: "Marine Biology Learning Camp - Andaman Islands",
    image: "https://images.unsplash.com/photo-1724257718553-168ab3c307f6",
    imageAlt: "Crystal clear turquoise waters with coral reefs and tropical fish in Andaman Islands marine ecosystem",
    destination: "Port Blair, Andaman",
    duration: "6 Days / 5 Nights",
    groupSize: "15-20 students",
    price: 48000,
    rating: 4.8,
    category: "Learning Camp",
    isNew: true
  },
  {
    id: 2,
    name: "Space Science Industrial Tour - ISRO Bangalore",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_130376e76-1767777653578.png",
    imageAlt: "Modern ISRO space research facility with satellite models and advanced technology equipment in Bangalore",
    destination: "Bangalore",
    duration: "3 Days / 2 Nights",
    groupSize: "20-25 students",
    price: 28000,
    rating: 4.9,
    category: "Industrial Tour",
    isNew: false
  },
  {
    id: 3,
    name: "Wildlife Conservation Camp - Jim Corbett National Park",
    image: "https://images.unsplash.com/photo-1704473034581-22f5b9990b85",
    imageAlt: "Majestic Bengal tiger walking through lush green forest in Jim Corbett National Park wildlife sanctuary",
    destination: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    groupSize: "12-18 students",
    price: 42000,
    rating: 4.7,
    category: "Learning Camp",
    isNew: false
  }];


  const mockProfile = {
    fullName: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "2005-08-15",
    studentLevel: "college",
    institution: "Delhi University",
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110001",
    preferredLanguage: "en",
    emergencyContactName: "Rajesh Mehta",
    emergencyContactPhone: "+91 98765 43211",
    emergencyContactRelation: "Father"
  };

  const mockNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Historical Heritage Tour has been confirmed. Reference: EDT2026001234",
    time: "2 hours ago",
    isRead: false
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Reminder",
    message: "Complete payment for Science & Technology Industrial Tour by 10/01/2026",
    time: "5 hours ago",
    isRead: false
  },
  {
    id: 3,
    type: "reminder",
    title: "Tour Starting Soon",
    message: "Your Historical Heritage Tour starts in 7 days. Please review your itinerary.",
    time: "1 day ago",
    isRead: true
  },
  {
    id: 4,
    type: "update",
    title: "New Tour Available",
    message: "Check out our new Marine Biology Learning Camp in Andaman Islands",
    time: "2 days ago",
    isRead: true
  }];


  const [savedTours, setSavedTours] = useState(mockSavedTours);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [profile, setProfile] = useState(mockProfile);

  const handleRemoveSavedTour = (tourId) => {
    setSavedTours((prev) => prev?.filter((tour) => tour?.id !== tourId));
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
    prev?.map((notif) =>
    notif?.id === notificationId ? { ...notif, isRead: true } : notif
    )
    );
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const tabs = [
  { id: 'bookings', label: 'My Bookings', icon: 'Calendar' },
  { id: 'saved', label: 'Saved Tours', icon: 'Heart' },
  { id: 'profile', label: 'Profile', icon: 'User' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' }];


  const activeBookings = mockBookings?.filter((b) => b?.status === 'confirmed' || b?.status === 'pending');
  const completedBookings = mockBookings?.filter((b) => b?.status === 'completed');
  const unreadNotifications = notifications?.filter((n) => !n?.isRead)?.length;

  return (
    <>
      <Helmet>
        <title>My Dashboard - EduTours</title>
        <meta name="description" content="Manage your educational tour bookings, profile, and saved tours on EduTours dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[72px]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Welcome back, {profile?.fullName?.split(' ')?.[0]}!
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-caption">
                Manage your bookings, explore saved tours, and update your profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <StatsCard
                icon="Calendar"
                label="Active Bookings"
                value={activeBookings?.length}
                trend="up"
                trendValue="+2" />

              <StatsCard
                icon="CheckCircle"
                label="Completed Tours"
                value={completedBookings?.length} />

              <StatsCard
                icon="Heart"
                label="Saved Tours"
                value={savedTours?.length} />

              <StatsCard
                icon="Bell"
                label="Notifications"
                value={unreadNotifications}
                trend={unreadNotifications > 0 ? "up" : null}
                trendValue={unreadNotifications > 0 ? `${unreadNotifications} new` : null} />

            </div>

            <div className="mb-6 md:mb-8 overflow-x-auto">
              <div className="flex gap-2 border-b border-border min-w-max">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 font-medium transition-smooth relative ${
                  activeTab === tab?.id ?
                  'text-primary' : 'text-muted-foreground hover:text-foreground'}`
                  }>

                    <Icon name={tab?.icon} size={20} />
                    <span className="whitespace-nowrap">{tab?.label}</span>
                    {tab?.id === 'notifications' && unreadNotifications > 0 &&
                  <span className="w-5 h-5 bg-error text-error-foreground rounded-full text-xs flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                  }
                    {activeTab === tab?.id &&
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  }
                  </button>
                )}
              </div>
            </div>

            {activeTab === 'bookings' &&
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    My Bookings
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" iconName="Filter">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" iconName="Download">
                      Export
                    </Button>
                  </div>
                </div>

                {activeBookings?.length > 0 &&
              <div className="mb-8">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Active & Upcoming Tours
                    </h3>
                    <div className="space-y-4">
                      {activeBookings?.map((booking) =>
                  <BookingCard key={booking?.id} booking={booking} />
                  )}
                    </div>
                  </div>
              }

                {completedBookings?.length > 0 &&
              <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Completed Tours
                    </h3>
                    <div className="space-y-4">
                      {completedBookings?.map((booking) =>
                  <BookingCard key={booking?.id} booking={booking} />
                  )}
                    </div>
                  </div>
              }

                {mockBookings?.length === 0 &&
              <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Calendar" size={40} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                      No bookings yet
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-caption mb-6">
                      Start exploring our educational tours and make your first booking
                    </p>
                    <Button variant="default" iconName="Search" iconPosition="left">
                      Explore Tours
                    </Button>
                  </div>
              }
              </div>
            }

            {activeTab === 'saved' &&
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    Saved Tours
                  </h2>
                  <p className="text-sm text-muted-foreground font-caption">
                    {savedTours?.length} tours saved
                  </p>
                </div>

                {savedTours?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {savedTours?.map((tour) =>
                <SavedTourCard
                  key={tour?.id}
                  tour={tour}
                  onRemove={handleRemoveSavedTour} />

                )}
                  </div> :

              <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={40} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                      No saved tours
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-caption mb-6">
                      Save tours you're interested in to easily find them later
                    </p>
                    <Button variant="default" iconName="Search" iconPosition="left">
                      Browse Tours
                    </Button>
                  </div>
              }
              </div>
            }

            {activeTab === 'profile' &&
            <div className="space-y-6">
                <ProfileSection profile={profile} onUpdate={handleProfileUpdate} />

                <div className="bg-card rounded-xl shadow-warm border border-border p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickActionCard
                    icon="Calendar"
                    title="Book New Tour"
                    description="Explore and book educational tours"
                    link="/tour-catalog" />

                    <QuickActionCard
                    icon="Download"
                    title="Download Brochures"
                    description="Access tour brochures and itineraries"
                    link="/tour-catalog"
                    iconColor="var(--color-accent)" />

                    <QuickActionCard
                    icon="Users"
                    title="Refer Friends"
                    description="Invite friends and earn rewards"
                    link="/user-dashboard"
                    iconColor="var(--color-success)" />

                    <QuickActionCard
                    icon="MessageCircle"
                    title="Contact Support"
                    description="Get help with your bookings"
                    link="/user-dashboard"
                    iconColor="var(--color-warning)" />

                  </div>
                </div>
              </div>
            }

            {activeTab === 'notifications' &&
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    Notifications
                  </h2>
                  <Button
                  variant="outline"
                  size="sm"
                  iconName="CheckCheck"
                  onClick={() => setNotifications((prev) => prev?.map((n) => ({ ...n, isRead: true })))}>

                    Mark all as read
                  </Button>
                </div>

                {notifications?.length > 0 ?
              <div className="space-y-3">
                    {notifications?.map((notification) =>
                <NotificationCard
                  key={notification?.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead} />

                )}
                  </div> :

              <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Bell" size={40} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                      No notifications
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-caption">
                      You're all caught up! Check back later for updates
                    </p>
                  </div>
              }
              </div>
            }
          </div>
        </main>

        <footer className="bg-card border-t border-border mt-12 md:mt-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-caption text-center md:text-left">
                © {new Date()?.getFullYear()} EduTours. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default UserDashboard;