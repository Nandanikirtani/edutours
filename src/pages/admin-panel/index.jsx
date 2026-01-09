import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TourTable from './components/TourTable';
import BookingTable from './components/BookingTable';
import TourFormModal from './components/TourFormModal';
import SeoFormModal from './components/SeoFormModal';
import { tourService } from '../../services/tourService';
import { bookingService } from '../../services/bookingService';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTourModal, setShowTourModal] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [stats, setStats] = useState({
    totalTours: 0,
    publishedTours: 0,
    totalBookings: 0,
    pendingBookings: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [toursData, bookingsData] = await Promise.all([
        tourService?.getAllTours(),
        bookingService?.getAllBookings()
      ]);
      
      setTours(toursData);
      setBookings(bookingsData);
      
      setStats({
        totalTours: toursData?.length || 0,
        publishedTours: toursData?.filter(t => t?.status === 'published')?.length || 0,
        totalBookings: bookingsData?.length || 0,
        pendingBookings: bookingsData?.filter(b => b?.bookingStatus === 'pending')?.length || 0
      });
    } catch (err) {
      setError(err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTour = () => {
    setSelectedTour(null);
    setShowTourModal(true);
  };

  const handleEditTour = (tour) => {
    setSelectedTour(tour);
    setShowTourModal(true);
  };

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      await tourService?.deleteTour(tourId);
      await loadData();
    } catch (err) {
      alert(err?.message || 'Failed to delete tour');
    }
  };

  const handleTourSaved = async () => {
    setShowTourModal(false);
    setSelectedTour(null);
    await loadData();
  };

  const handleManageSeo = (tour) => {
    setSelectedTour(tour);
    setShowSeoModal(true);
  };

  const handleSeoSaved = async () => {
    setShowSeoModal(false);
    setSelectedTour(null);
    await loadData();
  };

  const tabs = [
    { id: 'tours', label: 'Tour Packages', icon: 'Map' },
    { id: 'bookings', label: 'Booking History', icon: 'Calendar' },
    { id: 'seo', label: 'SEO Settings', icon: 'Search' }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Panel - Tour Management | EduTours</title>
        <meta name="description" content="Manage tour packages, pricing, images, SEO metadata, and customer bookings" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-[1400px] mx-auto px-6 py-8 mt-[72px]">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage tour packages, bookings, and SEO settings</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <span className="text-error">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg p-6 shadow-warm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Tours</span>
                <Icon name="Map" size={20} color="var(--color-primary)" />
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{stats?.totalTours}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-warm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Published</span>
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{stats?.publishedTours}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-warm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Bookings</span>
                <Icon name="Calendar" size={20} color="var(--color-primary)" />
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{stats?.totalBookings}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-warm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pending</span>
                <Icon name="Clock" size={20} color="var(--color-warning)" />
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{stats?.pendingBookings}</p>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-warm">
            <div className="border-b border-border">
              <div className="flex items-center gap-2 p-2">
                {tabs?.map(tab => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {activeTab === 'tours' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-heading font-semibold text-foreground">Tour Packages</h2>
                        <Button onClick={handleAddTour} iconName="Plus" iconPosition="left">
                          Add New Tour
                        </Button>
                      </div>
                      <TourTable 
                        tours={tours}
                        onEdit={handleEditTour}
                        onDelete={handleDeleteTour}
                        onManageSeo={handleManageSeo}
                      />
                    </div>
                  )}

                  {activeTab === 'bookings' && (
                    <div>
                      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Customer Booking History</h2>
                      <BookingTable bookings={bookings} onRefresh={loadData} />
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div>
                      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">SEO Settings</h2>
                      <div className="space-y-4">
                        <div className="p-6 bg-muted rounded-lg">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Catalog Page SEO</h3>
                          <Button onClick={() => setShowSeoModal(true)} variant="outline">
                            Edit Catalog SEO
                          </Button>
                        </div>
                        <div className="p-6 bg-muted rounded-lg">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Tour Page SEO</h3>
                          <p className="text-sm text-muted-foreground mb-4">Manage SEO for individual tour pages from the Tours tab</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showTourModal && (
        <TourFormModal
          tour={selectedTour}
          onClose={() => {
            setShowTourModal(false);
            setSelectedTour(null);
          }}
          onSave={handleTourSaved}
        />
      )}
      {showSeoModal && (
        <SeoFormModal
          tour={selectedTour}
          onClose={() => {
            setShowSeoModal(false);
            setSelectedTour(null);
          }}
          onSave={handleSeoSaved}
        />
      )}
    </>
  );
};

export default AdminPanel;