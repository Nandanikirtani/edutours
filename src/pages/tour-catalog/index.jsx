import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from '../../components/ui/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TourCard from './components/TourCard';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ComparisonPanel from './components/ComparisonPanel';
import MobileFilterDrawer from './components/MobileFilterDrawer';

const TourCatalog = () => {
  const [filters, setFilters] = useState({
    studentLevel: 'all',
    tourType: 'all',
    destination: 'all',
    duration: 'all',
    budget: 'all',
    educationalFocus: [],
    groupDiscount: false,
    featuredOnly: false,
    availableThisMonth: false
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTours, setSelectedTours] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mockTours = [
  {
    id: 1,
    name: "Golden Triangle Heritage Tour",
    image: "https://images.unsplash.com/photo-1669464957415-a4662a931524",
    imageAlt: "Majestic Taj Mahal monument with white marble domes and minarets against clear blue sky in Agra India",
    destination: "Delhi, Agra, Jaipur",
    duration: "5 Days / 4 Nights",
    price: 18500,
    rating: 4.8,
    reviewCount: 342,
    educationalFocus: "History & Culture",
    tags: ["UNESCO Sites", "Monuments", "Cultural Heritage"],
    availability: "available",
    isFeatured: true,
    isNew: false,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "cultural-heritage"
  },
  {
    id: 2,
    name: "ISRO Space Center Industrial Tour",
    image: "https://images.unsplash.com/photo-1710761382335-66d7db319f41",
    imageAlt: "Modern rocket launch facility with tall white spacecraft on launch pad surrounded by technical infrastructure and clear sky",
    destination: "Bangalore, Karnataka",
    duration: "3 Days / 2 Nights",
    price: 12000,
    rating: 4.9,
    reviewCount: 198,
    educationalFocus: "Science & Technology",
    tags: ["Space Science", "Technology", "Innovation"],
    availability: "limited",
    isFeatured: true,
    isNew: true,
    groupDiscount: true,
    studentLevel: "college",
    tourType: "industrial-tour"
  },
  {
    id: 3,
    name: "Himalayan Adventure Learning Camp",
    image: "https://images.unsplash.com/photo-1618246676962-425dc442fea9",
    imageAlt: "Snow-capped Himalayan mountain peaks with lush green valleys and winding trails in foreground under bright sunlight",
    destination: "Manali, Himachal Pradesh",
    duration: "7 Days / 6 Nights",
    price: 24500,
    rating: 4.7,
    reviewCount: 276,
    educationalFocus: "Environment & Nature",
    tags: ["Adventure", "Ecology", "Team Building"],
    availability: "available",
    isFeatured: false,
    isNew: true,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "adventure-learning"
  },
  {
    id: 4,
    name: "Silicon Valley Tech Innovation Tour",
    image: "https://images.unsplash.com/photo-1715950227433-4cd241cc50b2",
    imageAlt: "Modern glass and steel corporate office buildings with tech company logos in Silicon Valley California under clear sky",
    destination: "San Francisco, USA",
    duration: "10 Days / 9 Nights",
    price: 185000,
    rating: 4.9,
    reviewCount: 124,
    educationalFocus: "Science & Technology",
    tags: ["Technology", "Innovation", "Startups"],
    availability: "available",
    isFeatured: true,
    isNew: false,
    groupDiscount: true,
    studentLevel: "postgraduate",
    tourType: "industrial-tour"
  },
  {
    id: 5,
    name: "Kerala Backwaters Ecology Camp",
    image: "https://images.unsplash.com/photo-1563731316056-8dacf9a43c68",
    imageAlt: "Serene Kerala backwater canal with traditional wooden houseboat floating on calm green water surrounded by coconut palm trees",
    destination: "Alleppey, Kerala",
    duration: "4 Days / 3 Nights",
    price: 15000,
    rating: 4.6,
    reviewCount: 189,
    educationalFocus: "Environment & Nature",
    tags: ["Ecology", "Biodiversity", "Sustainable Tourism"],
    availability: "available",
    isFeatured: false,
    isNew: false,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "learning-camp"
  },
  {
    id: 6,
    name: "Rajasthan Folk Arts & Crafts Tour",
    image: "https://images.unsplash.com/photo-1538840890175-b04dee6b6962",
    imageAlt: "Colorful traditional Rajasthani handicrafts display with intricate embroidered textiles and handmade pottery in vibrant market setting",
    destination: "Jaipur, Udaipur, Jodhpur",
    duration: "6 Days / 5 Nights",
    price: 21000,
    rating: 4.7,
    reviewCount: 234,
    educationalFocus: "Arts & Literature",
    tags: ["Traditional Arts", "Handicrafts", "Cultural Heritage"],
    availability: "limited",
    isFeatured: false,
    isNew: false,
    groupDiscount: true,
    studentLevel: "college",
    tourType: "cultural-heritage"
  },
  {
    id: 7,
    name: "IIT Bombay Engineering Campus Tour",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcfec75e-1767330899905.png",
    imageAlt: "Modern university campus building with contemporary architecture featuring glass facades and students walking on landscaped pathways",
    destination: "Mumbai, Maharashtra",
    duration: "2 Days / 1 Night",
    price: 8500,
    rating: 4.8,
    reviewCount: 156,
    educationalFocus: "Science & Technology",
    tags: ["Engineering", "Innovation", "Research"],
    availability: "available",
    isFeatured: false,
    isNew: true,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "industrial-tour"
  },
  {
    id: 8,
    name: "Ancient Temples of South India",
    image: "https://images.unsplash.com/photo-1727993995329-fe20d4f65972",
    imageAlt: "Magnificent ancient South Indian temple with towering gopuram featuring intricate stone carvings and colorful sculptures against blue sky",
    destination: "Chennai, Madurai, Thanjavur",
    duration: "5 Days / 4 Nights",
    price: 16500,
    rating: 4.6,
    reviewCount: 201,
    educationalFocus: "History & Culture",
    tags: ["Architecture", "Religion", "Heritage"],
    availability: "available",
    isFeatured: false,
    isNew: false,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "cultural-heritage"
  },
  {
    id: 9,
    name: "Marine Biology Research Camp",
    image: "https://images.unsplash.com/photo-1660151184281-baebda0b4c4f",
    imageAlt: "Crystal clear turquoise ocean water with vibrant coral reef and colorful tropical fish swimming in shallow coastal waters",
    destination: "Andaman Islands",
    duration: "8 Days / 7 Nights",
    price: 32000,
    rating: 4.9,
    reviewCount: 167,
    educationalFocus: "Environment & Nature",
    tags: ["Marine Biology", "Research", "Conservation"],
    availability: "limited",
    isFeatured: true,
    isNew: true,
    groupDiscount: true,
    studentLevel: "college",
    tourType: "learning-camp"
  },
  {
    id: 10,
    name: "European History & Art Tour",
    image: "https://images.unsplash.com/photo-1591689662262-8536dd412db6",
    imageAlt: "Illuminated Eiffel Tower standing tall against night sky with golden lights reflecting on Seine River in Paris France",
    destination: "Paris, Rome, London",
    duration: "12 Days / 11 Nights",
    price: 225000,
    rating: 4.8,
    reviewCount: 89,
    educationalFocus: "Arts & Literature",
    tags: ["Museums", "Art History", "Architecture"],
    availability: "available",
    isFeatured: true,
    isNew: false,
    groupDiscount: true,
    studentLevel: "postgraduate",
    tourType: "cultural-heritage"
  },
  {
    id: 11,
    name: "Goa Beach Ecology & Conservation",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_110b869e0-1767736994432.png",
    imageAlt: "Pristine Goa beach with golden sand and turquoise waves meeting shore lined with swaying coconut palm trees under sunny sky",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    price: 13500,
    rating: 4.5,
    reviewCount: 178,
    educationalFocus: "Environment & Nature",
    tags: ["Beach Ecology", "Conservation", "Marine Life"],
    availability: "available",
    isFeatured: false,
    isNew: false,
    groupDiscount: true,
    studentLevel: "school",
    tourType: "learning-camp"
  },
  {
    id: 12,
    name: "Automobile Manufacturing Plant Tour",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a4bbfd8d-1767641848433.png",
    imageAlt: "Modern automobile assembly line with robotic arms and workers in safety gear assembling cars in well-lit manufacturing facility",
    destination: "Chennai, Tamil Nadu",
    duration: "2 Days / 1 Night",
    price: 9500,
    rating: 4.7,
    reviewCount: 143,
    educationalFocus: "Science & Technology",
    tags: ["Manufacturing", "Automation", "Engineering"],
    availability: "available",
    isFeatured: false,
    isNew: true,
    groupDiscount: true,
    studentLevel: "college",
    tourType: "industrial-tour"
  }];


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      studentLevel: 'all',
      tourType: 'all',
      destination: 'all',
      duration: 'all',
      budget: 'all',
      educationalFocus: [],
      groupDiscount: false,
      featuredOnly: false,
      availableThisMonth: false
    });
  };

  const handleSearch = (searchData) => {
    console.log('Search data:', searchData);
  };

  const handleToggleComparison = (tour) => {
    setSelectedTours((prev) => {
      const exists = prev?.find((t) => t?.id === tour?.id);
      if (exists) {
        return prev?.filter((t) => t?.id !== tour?.id);
      }
      if (prev?.length >= 3) {
        return prev;
      }
      return [...prev, tour];
    });
  };

  const handleRemoveFromComparison = (tourId) => {
    setSelectedTours((prev) => prev?.filter((t) => t?.id !== tourId));
  };

  const handleClearComparison = () => {
    setSelectedTours([]);
  };

  const filteredTours = mockTours?.filter((tour) => {
    if (filters?.studentLevel !== 'all' && tour?.studentLevel !== filters?.studentLevel) return false;
    if (filters?.tourType !== 'all' && tour?.tourType !== filters?.tourType) return false;
    if (filters?.featuredOnly && !tour?.isFeatured) return false;
    if (filters?.groupDiscount && !tour?.groupDiscount) return false;

    if (filters?.budget !== 'all') {
      const [min, max] = filters?.budget?.split('-')?.map((v) => v?.replace('+', ''));
      const minPrice = parseInt(min);
      const maxPrice = max ? parseInt(max) : Infinity;
      if (tour?.price < minPrice || tour?.price > maxPrice) return false;
    }

    if (filters?.educationalFocus?.length > 0) {
      const focusMatch = filters?.educationalFocus?.some((focus) => {
        if (focus === 'history') return tour?.educationalFocus === 'History & Culture';
        if (focus === 'science') return tour?.educationalFocus === 'Science & Technology';
        if (focus === 'arts') return tour?.educationalFocus === 'Arts & Literature';
        if (focus === 'environment') return tour?.educationalFocus === 'Environment & Nature';
        return false;
      });
      if (!focusMatch) return false;
    }

    return true;
  });

  const sortedTours = [...filteredTours]?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'rating':
        return b?.rating - a?.rating;
      case 'popularity':
        return b?.reviewCount - a?.reviewCount;
      case 'newest':
        return b?.isNew - a?.isNew;
      default:
        return 0;
    }
  });

  return (
    <>
      <Helmet>
        <title>Tour Catalog - Discover Educational Tours | EduTours</title>
        <meta name="description" content="Browse comprehensive educational tour packages for Indian students. Filter by destination, duration, budget, and educational focus. Book learning camps and industrial tours." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[72px]">
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 md:py-12">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
                  Explore Educational Tours
                </h1>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-caption">
                  Discover enriching learning experiences across India and the world. Filter by your preferences to find the perfect educational journey.
                </p>
              </div>

              <SearchBar variant="compact" onSearch={handleSearch} />
            </div>
          </section>

          <section className="py-6 md:py-8 lg:py-12">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
                    Available Tours
                  </h2>
                  <p className="text-sm text-muted-foreground font-caption">
                    Showing {sortedTours?.length} of {mockTours?.length} tours
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => setIsMobileFilterOpen(true)}>

                  Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                <aside className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-24">
                    <FilterPanel
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                      resultCount={sortedTours?.length} />

                  </div>
                </aside>

                <div className="lg:col-span-3">
                  <div className="mb-6">
                    <SortControls
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      viewMode={viewMode}
                      onViewModeChange={setViewMode} />

                  </div>

                  {isLoading ?
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {[1, 2, 3, 4, 5, 6]?.map((i) =>
                    <div key={i} className="bg-card rounded-lg shadow-warm overflow-hidden animate-pulse">
                          <div className="w-full aspect-[4/3] bg-muted" />
                          <div className="p-4 md:p-5 space-y-3">
                            <div className="h-6 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-10 bg-muted rounded" />
                          </div>
                        </div>
                    )}
                    </div> :
                  sortedTours?.length === 0 ?
                  <div className="bg-card rounded-lg shadow-warm p-8 md:p-12 text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Search" size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                        No tours found
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-6 font-caption">
                        Try adjusting your filters or search criteria to find more tours
                      </p>
                      <Button variant="default" onClick={handleClearFilters}>
                        Clear All Filters
                      </Button>
                    </div> :

                  <div className={`grid gap-4 md:gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`
                  }>
                      {sortedTours?.map((tour) =>
                    <TourCard key={tour?.id} tour={tour} />
                    )}
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </main>

        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          resultCount={sortedTours?.length} />


        <ComparisonPanel
          selectedTours={selectedTours}
          onRemoveTour={handleRemoveFromComparison}
          onClearAll={handleClearComparison} />

      </div>
    </>);

};

export default TourCatalog;