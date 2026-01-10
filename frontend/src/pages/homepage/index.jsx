import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TourCategoryCard from './components/TourCategoryCard';
import FeaturedTourCard from './components/FeaturedTourCard';
import TrustSection from './components/TrustSection';
import TestimonialCard from './components/TestimonialCard';
import DestinationCard from './components/DestinationCard';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Homepage = () => {
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const tourCategories = [
  {
    id: 1,
    title: "Learning Camps",
    description: "Immersive educational experiences combining academics with outdoor activities",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aef53b9c-1765028285156.png",
    imageAlt: "Group of diverse students in colorful casual wear sitting in circle outdoors on green grass during interactive learning session with instructor",
    icon: "Tent",
    tourCount: 45,
    duration: "3-7 days"
  },
  {
    id: 2,
    title: "Industrial Tours",
    description: "Visit leading companies and manufacturing facilities to understand real-world applications",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1540e3edf-1767103234296.png",
    imageAlt: "Modern industrial factory interior with bright lighting showing advanced manufacturing equipment and professional workers in safety gear",
    icon: "Factory",
    tourCount: 38,
    duration: "1-3 days"
  },
  {
    id: 3,
    title: "Heritage Tours",
    description: "Explore India\'s rich cultural heritage and historical monuments",
    image: "https://images.unsplash.com/photo-1701068156780-3acbc0597049",
    imageAlt: "Majestic ancient Indian temple with intricate stone carvings and towering gopuram against clear blue sky with tourists exploring",
    icon: "Landmark",
    tourCount: 52,
    duration: "2-5 days"
  },
  {
    id: 4,
    title: "Science & Technology",
    description: "Visit research centers, planetariums, and science museums",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16cd97918-1766860630020.png",
    imageAlt: "Modern science museum interior with interactive exhibits showing space exploration displays and students engaging with technology demonstrations",
    icon: "Microscope",
    tourCount: 29,
    duration: "1-2 days"
  },
  {
    id: 5,
    title: "Adventure Learning",
    description: "Combine education with thrilling outdoor adventures and team building",
    image: "https://images.unsplash.com/photo-1646082194696-96774d6e9fe9",
    imageAlt: "Young students in safety helmets and harnesses rock climbing on natural cliff face with instructor supervising during adventure learning activity",
    icon: "Mountain",
    tourCount: 34,
    duration: "3-6 days"
  },
  {
    id: 6,
    title: "International Tours",
    description: "Explore global destinations and experience international education systems",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_108a98185-1767777675703.png",
    imageAlt: "International students with backpacks standing in front of famous European landmark holding world map during educational exchange program",
    icon: "Globe",
    tourCount: 18,
    duration: "7-14 days"
  }];


  const featuredTours = [
  {
    id: 1,
    title: "Golden Triangle Heritage Tour",
    description: "Explore Delhi, Agra, and Jaipur's magnificent monuments and learn about Mughal and Rajput history",
    image: "https://images.unsplash.com/photo-1688277316695-d1a211114940",
    imageAlt: "Iconic white marble Taj Mahal monument with reflecting pool in foreground during golden hour sunset with tourists walking along pathway",
    category: "Heritage",
    destination: "Delhi-Agra-Jaipur",
    duration: "5 Days",
    groupSize: "25-30 students",
    studentLevel: "Class 8-12",
    price: 12500,
    originalPrice: 15000,
    discount: 17,
    rating: 4.8,
    reviews: 342,
    featured: true
  },
  {
    id: 2,
    title: "Bangalore Tech Valley Industrial Tour",
    description: "Visit leading IT companies, startups, and innovation centers in India's Silicon Valley",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14c2893e9-1766574808249.png",
    imageAlt: "Modern glass office building with tech company logo showing professional workspace with employees collaborating on computers and innovative projects",
    category: "Industrial",
    destination: "Bangalore",
    duration: "3 Days",
    groupSize: "20-25 students",
    studentLevel: "College/PG",
    price: 8999,
    rating: 4.9,
    reviews: 287,
    featured: true
  },
  {
    id: 3,
    title: "Himalayan Adventure Learning Camp",
    description: "Experience mountain trekking, camping, and environmental education in the Himalayas",
    image: "https://images.unsplash.com/photo-1675854973712-cdce5dddaace",
    imageAlt: "Colorful camping tents set up on green mountain meadow with snow-capped Himalayan peaks in background and students gathered around campfire",
    category: "Adventure",
    destination: "Manali",
    duration: "6 Days",
    groupSize: "15-20 students",
    studentLevel: "Class 9-12",
    price: 16500,
    originalPrice: 19000,
    discount: 13,
    rating: 4.7,
    reviews: 198,
    featured: false
  },
  {
    id: 4,
    title: "Space Science & Planetarium Tour",
    description: "Visit ISRO centers, planetariums, and space museums to learn about India's space program",
    image: "https://images.unsplash.com/photo-1662476210613-11800fffea92",
    imageAlt: "Modern planetarium dome interior showing projected night sky with constellations and planets while students sit in comfortable seats observing",
    category: "Science",
    destination: "Bangalore-Mysore",
    duration: "4 Days",
    groupSize: "30-35 students",
    studentLevel: "Class 6-10",
    price: 10500,
    rating: 4.8,
    reviews: 256,
    featured: false
  }];


  const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Class 11 Student, Delhi Public School",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    avatarAlt: "Professional headshot of young Indian female student with long black hair wearing blue school uniform smiling warmly at camera",
    rating: 5,
    content: "The Golden Triangle tour was absolutely amazing! We learned so much about Indian history and the monuments were breathtaking. Our guide was very knowledgeable and made everything interesting. Highly recommend EduTours!",
    tourName: "Golden Triangle Heritage Tour"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Engineering Student, IIT Delhi",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_198499785-1763295471528.png",
    avatarAlt: "Professional headshot of young Indian male engineering student with short black hair wearing casual shirt with confident expression",
    rating: 5,
    content: "The industrial tour to Bangalore was eye-opening. We visited top tech companies and got insights into real-world software development. This experience helped me understand my career path better. Thank you EduTours!",
    tourName: "Bangalore Tech Valley Tour"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Class 10 Student, Vibgyor High School",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    avatarAlt: "Professional headshot of young Indian female student with shoulder-length black hair wearing red school uniform with cheerful smile",
    rating: 5,
    content: "The Himalayan adventure camp was the best experience of my life! We learned teamwork, environmental conservation, and had so much fun. The safety measures were excellent and our instructors were very supportive.",
    tourName: "Himalayan Adventure Camp"
  },
  {
    id: 4,
    name: "Arjun Reddy",
    role: "Science Teacher, Kendriya Vidyalaya",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f755ba97-1763300560912.png",
    avatarAlt: "Professional headshot of middle-aged Indian male teacher with glasses and short black hair wearing formal shirt with friendly expression",
    rating: 5,
    content: "As a teacher, I've organized multiple tours with EduTours. Their attention to safety, educational content, and student engagement is exceptional. The space science tour was particularly well-organized and informative.",
    tourName: "Space Science Tour"
  }];


  const popularDestinations = [
  {
    id: 1,
    name: "Rajasthan",
    state: "Heritage & Culture",
    description: "Explore majestic forts, palaces, and vibrant cultural traditions",
    image: "https://images.unsplash.com/photo-1728361593319-b613466d4add",
    imageAlt: "Magnificent Amber Fort palace in Rajasthan with golden sandstone architecture and intricate carvings against clear blue sky with tourists exploring",
    tourCount: 28
  },
  {
    id: 2,
    name: "Kerala",
    state: "Nature & Wildlife",
    description: "Experience backwaters, wildlife sanctuaries, and eco-tourism",
    image: "https://images.unsplash.com/photo-1563731316056-8dacf9a43c68",
    imageAlt: "Serene Kerala backwaters with traditional wooden houseboat floating on calm green water surrounded by lush coconut palm trees and tropical vegetation",
    tourCount: 22
  },
  {
    id: 3,
    name: "Himachal Pradesh",
    state: "Adventure & Mountains",
    description: "Mountain trekking, camping, and adventure sports",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c129ac0-1765083019181.png",
    imageAlt: "Stunning snow-covered Himalayan mountain peaks with pine forests in foreground and adventure trekkers hiking on mountain trail",
    tourCount: 19
  },
  {
    id: 4,
    name: "Tamil Nadu",
    state: "Temples & Science",
    description: "Ancient temples, space centers, and technological hubs",
    image: "https://images.unsplash.com/flagged/photo-1582101164197-78a982d7724d",
    imageAlt: "Ancient Tamil Nadu temple with towering gopuram featuring colorful intricate sculptures of deities and devotees performing traditional rituals",
    tourCount: 25
  }];


  const handleSearch = (searchData) => {
    navigate('/tour-catalog', { state: { searchData } });
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const visibleTestimonials = [
  testimonials?.[currentTestimonialIndex],
  testimonials?.[(currentTestimonialIndex + 1) % testimonials?.length],
  testimonials?.[(currentTestimonialIndex + 2) % testimonials?.length]];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <HeroSection onSearch={handleSearch} />

        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3 md:mb-4">
                Explore Tour Categories
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our diverse range of educational tour packages designed for different learning objectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {tourCategories?.map((category) =>
              <TourCategoryCard key={category?.id} category={category} />
              )}
            </div>
          </div>
        </section>

        <TrustSection />

        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2 md:mb-3">
                  Featured Tours
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Handpicked educational experiences for students
                </p>
              </div>
              <Button
                variant="outline"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/tour-catalog')}
                className="hidden md:flex">

                View All Tours
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {featuredTours?.map((tour) =>
              <FeaturedTourCard key={tour?.id} tour={tour} />
              )}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button
                variant="outline"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/tour-catalog')}
                fullWidth>

                View All Tours
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3 md:mb-4">
                Popular Destinations
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover India's most sought-after educational tour destinations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {popularDestinations?.map((destination) =>
              <DestinationCard key={destination?.id} destination={destination} />
              )}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3 md:mb-4">
                What Students Say
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real experiences from students and teachers who traveled with us
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {visibleTestimonials?.map((testimonial) =>
                <TestimonialCard key={testimonial?.id} testimonial={testimonial} />
                )}
              </div>

              <button
                onClick={handlePrevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-card hover:bg-primary rounded-full flex items-center justify-center transition-smooth shadow-warm z-10"
                aria-label="Previous testimonial">

                <Icon name="ChevronLeft" size={24} />
              </button>

              <button
                onClick={handleNextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-card hover:bg-primary rounded-full flex items-center justify-center transition-smooth shadow-warm z-10"
                aria-label="Next testimonial">

                <Icon name="ChevronRight" size={24} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentTestimonialIndex ?
                'bg-primary w-8 md:w-12' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>);

};

export default Homepage;