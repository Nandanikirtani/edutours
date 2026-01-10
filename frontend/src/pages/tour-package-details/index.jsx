import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ImageGallery from './components/ImageGallery';
import TourOverview from './components/TourOverview';
import ItinerarySection from './components/ItinerarySection';
import InclusionsExclusions from './components/InclusionsExclusions';
import PricingCard from './components/PricingCard';
import TourInfoCard from './components/TourInfoCard';
import SafetyGuidelines from './components/SafetyGuidelines';
import TestimonialsSection from './components/TestimonialsSection';
import CancellationPolicy from './components/CancellationPolicy';
import DownloadBrochure from './components/DownloadBrochure';

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tourData = {
    id: "tour-001",
    title: "Golden Triangle Heritage Tour - Delhi, Agra & Jaipur",
    subtitle: "7 Days Cultural & Historical Learning Experience",
    category: "Cultural Heritage",
    rating: 4.8,
    reviewCount: 156,
    images: [
    {
      url: "https://images.unsplash.com/photo-1669464957415-a4662a931524",
      alt: "Majestic Taj Mahal monument with white marble domes and minarets against clear blue sky in Agra India"
    },
    {
      url: "https://images.unsplash.com/photo-1600615237468-14076f10dce2",
      alt: "Historic India Gate war memorial with tall stone archway and green lawns in New Delhi"
    },
    {
      url: "https://images.unsplash.com/photo-1575188566830-ccc495d2f7af",
      alt: "Ornate Hawa Mahal palace with pink sandstone facade and intricate lattice windows in Jaipur Rajasthan"
    },
    {
      url: "https://images.unsplash.com/photo-1686284683344-b726a081feca",
      alt: "Red Fort massive red sandstone fortress with high walls and entrance gates in Old Delhi"
    },
    {
      url: "https://images.unsplash.com/photo-1714168441405-abfdc1db9a1d",
      alt: "Amber Fort hilltop palace complex with yellow and pink sandstone architecture overlooking Maota Lake in Jaipur"
    },
    {
      url: "https://images.unsplash.com/photo-1608738345959-222758303741",
      alt: "Qutub Minar tall brick minaret tower with intricate carvings and Islamic architecture in Delhi"
    },
    {
      url: "https://images.unsplash.com/photo-1700158964288-5546c966377c",
      alt: "Agra Fort red sandstone fortress with massive walls and palatial structures along Yamuna River"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a01b2f81-1767361573162.png",
      alt: "Jantar Mantar astronomical observatory with geometric stone instruments and sundials in Jaipur"
    }],

    overview: {
      description: "Embark on an unforgettable educational journey through India's most iconic Golden Triangle circuit. This carefully curated 7-day tour takes students through the rich tapestry of Indian history, architecture, and culture spanning three magnificent cities - Delhi, Agra, and Jaipur. Students will explore UNESCO World Heritage Sites, interact with local artisans, understand Mughal and Rajput architecture, and gain firsthand knowledge of India's independence movement. The tour combines classroom learning with real-world experiences, making history come alive through visits to monuments, museums, and cultural centers. Expert guides provide detailed historical context while ensuring student safety and engagement throughout the journey.",
      learningObjectives: [
      "Understand the architectural evolution from Mughal to British colonial periods through monument studies",
      "Analyze the socio-political factors that shaped medieval and modern Indian history",
      "Develop cultural appreciation through interaction with local communities and artisan workshops",
      "Study urban planning and sustainable heritage conservation practices in historical cities",
      "Enhance research and documentation skills through structured site visits and assignments"],

      highlights: [
      "Guided tour of Taj Mahal with sunrise photography session and architectural analysis",
      "Interactive workshop with marble inlay artisans in Agra learning traditional crafts",
      "Heritage walk through Old Delhi\'s Chandni Chowk with street food tasting experience",
      "Elephant ride experience at Amber Fort with traditional Rajasthani cultural performance",
      "Visit to Jantar Mantar astronomical observatory with hands-on astronomy demonstrations",
      "Sound and light show at Red Fort depicting Indian independence struggle"]

    },
    itinerary: [
    {
      day: 1,
      title: "Arrival in Delhi & Historical Introduction",
      duration: "Full Day",
      activities: [
      {
        time: "09:00 AM",
        title: "Airport Pickup & Hotel Check-in",
        description: "Comfortable AC coach pickup from Indira Gandhi International Airport. Transfer to hotel with welcome refreshments and tour briefing session."
      },
      {
        time: "02:00 PM",
        title: "India Gate & Rashtrapati Bhavan Visit",
        description: "Explore the iconic India Gate war memorial and understand its significance in Indian history. Photo stop at Rashtrapati Bhavan with discussion on Indian democracy and governance."
      },
      {
        time: "04:30 PM",
        title: "Qutub Minar Complex Tour",
        description: "Detailed guided tour of UNESCO World Heritage Site Qutub Minar. Study Indo-Islamic architecture, iron pillar metallurgy, and Delhi Sultanate history with expert archaeologist."
      },
      {
        time: "07:00 PM",
        title: "Welcome Dinner & Orientation",
        description: "Traditional North Indian dinner at hotel with tour orientation, safety briefing, and distribution of study materials and itinerary booklets."
      }],

      meals: ["Lunch", "Dinner"]
    },
    {
      day: 2,
      title: "Old & New Delhi Exploration",
      duration: "Full Day",
      activities: [
      {
        time: "08:00 AM",
        title: "Red Fort & Mughal Architecture Study",
        description: "Comprehensive tour of Red Fort with focus on Mughal architectural elements, Shah Jahan's reign, and 1857 revolt significance. Attend sound and light show depicting independence movement."
      },
      {
        time: "11:00 AM",
        title: "Jama Masjid & Chandni Chowk Heritage Walk",
        description: "Visit India's largest mosque followed by guided heritage walk through bustling Chandni Chowk. Experience traditional markets, sample street food, and interact with local shopkeepers."
      },
      {
        time: "02:00 PM",
        title: "Raj Ghat & Gandhi Memorial",
        description: "Pay respects at Mahatma Gandhi's memorial. Interactive session on India's freedom struggle, non-violence philosophy, and Gandhi's impact on world peace movements."
      },
      {
        time: "04:30 PM",
        title: "Humayun\'s Tomb Visit",
        description: "Explore the architectural precursor to Taj Mahal. Study Persian-influenced Mughal garden design, restoration techniques, and UNESCO conservation efforts."
      }],

      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      day: 3,
      title: "Delhi to Agra Journey & Taj Mahal",
      duration: "Full Day",
      activities: [
      {
        time: "06:00 AM",
        title: "Sunrise Taj Mahal Experience",
        description: "Early morning departure to Agra (3.5 hours). Witness breathtaking sunrise at Taj Mahal with professional photography guidance. Detailed architectural study of marble inlay work, symmetry, and Shah Jahan's love story."
      },
      {
        time: "10:00 AM",
        title: "Marble Inlay Workshop",
        description: "Hands-on workshop with master artisans learning traditional pietra dura marble inlay techniques. Create your own small marble souvenir under expert guidance."
      },
      {
        time: "01:00 PM",
        title: "Agra Fort Exploration",
        description: "Comprehensive tour of massive red sandstone Agra Fort. Study Mughal military architecture, palace complexes, and Shah Jahan's imprisonment chambers with Taj Mahal view."
      },
      {
        time: "04:00 PM",
        title: "Mehtab Bagh Sunset View",
        description: "Visit Mehtab Bagh gardens across Yamuna River for stunning sunset view of Taj Mahal. Photography session and discussion on Mughal garden planning and environmental conservation."
      }],

      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      day: 4,
      title: "Agra to Jaipur via Fatehpur Sikri",
      duration: "Full Day",
      activities: [
      {
        time: "08:00 AM",
        title: "Fatehpur Sikri Ghost City Tour",
        description: "En route stop at abandoned Mughal capital Fatehpur Sikri. Explore Buland Darwaza, Jama Masjid, and Panch Mahal. Study Akbar's religious tolerance and reasons for city abandonment."
      },
      {
        time: "12:00 PM",
        title: "Journey to Pink City Jaipur",
        description: "Scenic 4-hour drive to Jaipur with lunch break. Arrive in Rajasthan\'s capital and check into heritage-style hotel. Evening free for rest and personal exploration."
      },
      {
        time: "06:00 PM",
        title: "Chokhi Dhani Cultural Evening",
        description: "Experience authentic Rajasthani village culture at Chokhi Dhani resort. Enjoy folk dances, puppet shows, traditional games, camel rides, and elaborate Rajasthani thali dinner."
      }],

      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      day: 5,
      title: "Jaipur Heritage & Royal Legacy",
      duration: "Full Day",
      activities: [
      {
        time: "08:00 AM",
        title: "Amber Fort Elephant Ride",
        description: "Traditional elephant ride up to majestic Amber Fort. Explore palace complex with mirror work halls, Sheesh Mahal, and panoramic views. Study Rajput-Mughal architectural fusion."
      },
      {
        time: "11:30 AM",
        title: "Jal Mahal Photo Stop",
        description: "Photo opportunity at stunning Water Palace Jal Mahal in Man Sagar Lake. Discussion on water conservation systems and Rajput engineering innovations."
      },
      {
        time: "01:00 PM",
        title: "City Palace & Museum Tour",
        description: "Explore royal City Palace complex housing museum with royal artifacts, textiles, and weapons. Meet with palace curator for insights into Jaipur's royal heritage and current Maharaja's role."
      },
      {
        time: "03:30 PM",
        title: "Jantar Mantar Astronomy Session",
        description: "Interactive tour of UNESCO-listed astronomical observatory. Hands-on demonstrations of ancient astronomical instruments and their scientific principles with astronomy expert."
      },
      {
        time: "05:00 PM",
        title: "Hawa Mahal & Local Markets",
        description: "Visit iconic Palace of Winds with its unique honeycomb facade. Free time for shopping in Johari Bazaar for traditional jewelry, textiles, and handicrafts."
      }],

      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      day: 6,
      title: "Jaipur Arts & Crafts Immersion",
      duration: "Full Day",
      activities: [
      {
        time: "09:00 AM",
        title: "Block Printing Workshop",
        description: "Visit traditional block printing workshop. Learn ancient textile printing techniques and create your own printed fabric piece to take home as souvenir."
      },
      {
        time: "11:30 AM",
        title: "Blue Pottery Demonstration",
        description: "Hands-on session with master potters learning Jaipur\'s famous blue pottery craft. Understand glazing techniques and create small pottery items."
      },
      {
        time: "02:00 PM",
        title: "Albert Hall Museum Visit",
        description: "Explore Rajasthan's oldest museum with extensive collection of artifacts, miniature paintings, and cultural exhibits. Guided tour focusing on Rajasthani art history."
      },
      {
        time: "04:30 PM",
        title: "Nahargarh Fort Sunset",
        description: "Visit hilltop Nahargarh Fort for panoramic sunset views of Pink City. Photography session and discussion on Jaipur\'s urban planning and pink city architecture."
      },
      {
        time: "07:00 PM",
        title: "Farewell Cultural Performance",
        description: "Traditional Rajasthani cultural evening with folk music, Ghoomar dance performance, and elaborate farewell dinner. Certificate distribution ceremony for tour completion."
      }],

      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      day: 7,
      title: "Departure Day",
      duration: "Half Day",
      activities: [
      {
        time: "08:00 AM",
        title: "Breakfast & Hotel Checkout",
        description: "Leisurely breakfast at hotel. Final packing and checkout with assistance from tour coordinators."
      },
      {
        time: "10:00 AM",
        title: "Birla Mandir Temple Visit",
        description: "Optional visit to modern Birla Mandir temple showcasing contemporary Indian architecture and religious harmony. Brief meditation session and cultural discussion."
      },
      {
        time: "12:00 PM",
        title: "Transfer to Jaipur Airport",
        description: "Comfortable AC coach transfer to Jaipur International Airport. Distribution of tour feedback forms and group photographs. Departure assistance and farewell."
      }],

      meals: ["Breakfast"]
    }],

    inclusions: [
    "6 nights accommodation in 3-star hotels with breakfast",
    "All transportation in AC coaches with experienced drivers",
    "Professional English-speaking tour guides at all monuments",
    "All monument entry fees and camera charges included",
    "Daily breakfast, lunch, and dinner as per itinerary",
    "Elephant ride at Amber Fort with safety equipment",
    "Cultural performances and workshop participation fees",
    "Travel insurance covering medical emergencies",
    "First aid kit and emergency medical support",
    "Study materials, notebooks, and tour documentation",
    "Group photographs and digital photo album",
    "24/7 tour coordinator support and helpline"],

    exclusions: [
    "Airfare to Delhi and from Jaipur not included",
    "Personal expenses like laundry, phone calls, tips",
    "Additional meals or snacks outside itinerary",
    "Optional activities or monument visits not listed",
    "Travel insurance for lost baggage or belongings",
    "Medical expenses for pre-existing conditions",
    "Any government tax increases after booking",
    "Expenses due to flight delays or cancellations"],

    pricing: {
      individual: 24999,
      group5Plus: 22499,
      group10Plus: 19999,
      group20Plus: 17999
    },
    tourInfo: {
      duration: "7 Days / 6 Nights",
      difficulty: "Easy to Moderate",
      ageRequirement: "12 years and above",
      groupSize: "15-40 students per batch",
      startingPoint: "Delhi (IGI Airport)",
      languages: "English, Hindi",
      guide: {
        name: "Dr. Rajesh Kumar",
        credentials: "PhD in Indian History, 15+ years experience",
        rating: 5,
        reviews: 89,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_12b674a88-1763300103327.png",
        imageAlt: "Professional Indian male tour guide with gray beard wearing traditional kurta and glasses smiling warmly"
      }
    },
    safetyGuidelines: [
    {
      icon: "Shield",
      title: "COVID-19 Safety Protocols",
      description: "Regular sanitization of vehicles, mandatory masks in enclosed spaces, temperature checks, and social distancing maintained at all tourist sites."
    },
    {
      icon: "Users",
      title: "Student Supervision",
      description: "Dedicated chaperones assigned for every 10 students. Buddy system implementation and regular headcounts at all locations to ensure no student is left behind."
    },
    {
      icon: "Phone",
      title: "Emergency Communication",
      description: "24/7 emergency helpline provided to all students and parents. GPS tracking of tour buses and real-time location sharing with school authorities."
    },
    {
      icon: "Heart",
      title: "Medical Support",
      description: "Trained first-aid personnel accompanying group. Tie-ups with hospitals in all cities and comprehensive travel insurance covering medical emergencies."
    },
    {
      icon: "Utensils",
      title: "Food Safety Standards",
      description: "Meals provided only at verified hygienic restaurants. Special dietary requirements accommodated with advance notice. Bottled water provided throughout."
    },
    {
      icon: "MapPin",
      title: "Safe Transportation",
      description: "Well-maintained AC coaches with seat belts. Experienced drivers with clean records. Regular vehicle inspections and adherence to speed limits."
    }],

    testimonials: [
    {
      studentName: "Priya Sharma",
      institution: "Delhi Public School, Mumbai",
      rating: 5,
      comment: "This tour was absolutely incredible! The Taj Mahal at sunrise was breathtaking, and our guide Dr. Kumar made history come alive with his storytelling. The marble workshop in Agra was my favorite - I learned so much about traditional crafts. Highly recommend this tour to all students!",
      studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c49e80c4-1763301916337.png",
      studentImageAlt: "Smiling Indian female student with long black hair wearing blue school uniform and backpack"
    },
    {
      studentName: "Arjun Patel",
      institution: "Ryan International School, Bangalore",
      rating: 5,
      comment: "Best educational trip ever! The itinerary was perfectly planned with the right mix of learning and fun. The elephant ride at Amber Fort and cultural evening at Chokhi Dhani were unforgettable experiences. Our tour coordinators ensured we were safe and comfortable throughout.",
      studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_176c76f81-1763300561991.png",
      studentImageAlt: "Happy Indian male student with short black hair wearing red polo shirt and glasses smiling broadly"
    },
    {
      studentName: "Ananya Reddy",
      institution: "Kendriya Vidyalaya, Hyderabad",
      rating: 4,
      comment: "Wonderful learning experience exploring India\'s Golden Triangle. The hands-on workshops in block printing and pottery were amazing. Food was delicious and accommodations were comfortable. Only wish we had more time in each city!",
      studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10120f91e-1763301853398.png",
      studentImageAlt: "Cheerful Indian female student with braided hair wearing green traditional dress and earrings"
    },
    {
      studentName: "Rohan Mehta",
      institution: "St. Xavier's School, Kolkata",
      rating: 5,
      comment: "This tour exceeded all expectations! The guides were knowledgeable and patient with our questions. Visiting Fatehpur Sikri and learning about Akbar\'s reign was fascinating. The farewell cultural performance was a perfect ending to an amazing week.",
      studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb975e7d-1763296862435.png",
      studentImageAlt: "Enthusiastic Indian male student with curly black hair wearing yellow t-shirt giving thumbs up gesture"
    }],

    cancellationPolicy: {
      terms: [
      {
        timeframe: "30+ days before departure",
        refund: "Full refund minus ₹2,000 processing fee"
      },
      {
        timeframe: "15-29 days before departure",
        refund: "75% refund of total tour cost"
      },
      {
        timeframe: "7-14 days before departure",
        refund: "50% refund of total tour cost"
      },
      {
        timeframe: "Less than 7 days before departure",
        refund: "No refund applicable"
      }],

      additionalTerms: [
      "Cancellations must be submitted in writing via email to bookings@edutours.com",
      "Refunds will be processed within 15 working days of cancellation request",
      "In case of tour cancellation by EduTours, full refund will be provided within 7 days",
      "Medical emergencies with valid doctor's certificate may be considered for special refund",
      "Group bookings have different cancellation terms - please contact for details"]

    }
  };

  const navigationSections = [
  { id: 'overview', label: 'Overview', icon: 'Info' },
  { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
  { id: 'inclusions', label: 'Inclusions', icon: 'CheckCircle2' },
  { id: 'safety', label: 'Safety', icon: 'Shield' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' },
  { id: 'policy', label: 'Policy', icon: 'FileText' }];


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element?.getBoundingClientRect()?.top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <Helmet>
        <title>{tourData?.title} - EduTours</title>
        <meta name="description" content={tourData?.overview?.description?.substring(0, 160)} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[72px]">
          <div className="bg-card border-b border-border sticky top-[72px] z-50 shadow-warm">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex items-center gap-3 py-4 overflow-x-auto">
                <button
                  onClick={() => navigate('/tour-catalog')}
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-smooth whitespace-nowrap flex-shrink-0 focus-ring">

                  <Icon name="ArrowLeft" size={18} />
                  <span className="text-sm font-medium">Back to Tours</span>
                </button>
                <div className="w-px h-6 bg-border flex-shrink-0" />
                {navigationSections?.map((section) =>
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${
                  activeSection === section?.id ?
                  'bg-primary text-primary-foreground' :
                  'text-foreground hover:bg-muted'}`
                  }>

                    <Icon name={section?.icon} size={16} />
                    <span className="text-sm">{section?.label}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tourData?.category}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={18} color="var(--color-warning)" className="fill-warning" />
                  <span className="text-sm font-medium data-text">{tourData?.rating}</span>
                  <span className="text-sm text-muted-foreground">({tourData?.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                {tourData?.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">{tourData?.subtitle}</p>
            </div>

            <div className="mb-8 md:mb-12">
              <ImageGallery images={tourData?.images} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div id="overview">
                  <TourOverview overview={tourData?.overview} />
                </div>

                <div id="itinerary">
                  <ItinerarySection itinerary={tourData?.itinerary} />
                </div>

                <div id="inclusions">
                  <InclusionsExclusions
                    inclusions={tourData?.inclusions}
                    exclusions={tourData?.exclusions} />

                </div>

                <div id="safety">
                  <SafetyGuidelines guidelines={tourData?.safetyGuidelines} />
                </div>

                <div id="reviews">
                  <TestimonialsSection testimonials={tourData?.testimonials} />
                </div>

                <div id="policy">
                  <CancellationPolicy policy={tourData?.cancellationPolicy} />
                </div>

                <DownloadBrochure />
              </div>

              <div className="lg:col-span-1 space-y-6">
                <PricingCard pricing={tourData?.pricing} />
                <TourInfoCard tourInfo={tourData?.tourInfo} />
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-card border-t border-border mt-12 md:mt-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
                  </div>
                  <span className="text-lg font-heading font-semibold text-foreground">EduTours</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empowering students through educational travel experiences across India and beyond.
                </p>
              </div>

              <div>
                <h3 className="text-base font-heading font-semibold text-foreground mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => navigate('/homepage')} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/tour-catalog')} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                      All Tours
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-heading font-semibold text-foreground mb-4">Contact Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="Phone" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">+91 98765 43210</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Mail" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">info@edutours.com</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-heading font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth focus-ring">
                    <Icon name="Facebook" size={20} />
                  </button>
                  <button className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth focus-ring">
                    <Icon name="Instagram" size={20} />
                  </button>
                  <button className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth focus-ring">
                    <Icon name="Twitter" size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date()?.getFullYear()} EduTours. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default TourPackageDetails;