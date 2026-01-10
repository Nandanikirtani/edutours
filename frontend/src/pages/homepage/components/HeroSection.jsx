import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onSearch }) => {
  const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1547300848-441153a7bf02",
    imageAlt: "Group of enthusiastic Indian students in colorful traditional attire standing in front of historic Red Fort Delhi with blue sky background",
    title: "Discover India\'s Rich Heritage",
    subtitle: "Educational tours that bring history and culture to life",
    badge: "Most Popular"
  },
  {
    id: 2,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d0cc175-1767435191938.png",
    imageAlt: "Modern university students in casual wear working together on laptops in bright contemporary classroom with large windows",
    title: "Industrial Tours & Career Exploration",
    subtitle: "Visit leading companies and learn from industry experts",
    badge: "Career Focused"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560843552-d4bbb846a8d8",
    imageAlt: "Diverse group of young students hiking through lush green mountain trail with backpacks during outdoor adventure learning camp",
    title: "Adventure Learning Camps",
    subtitle: "Combine education with outdoor experiences",
    badge: "New Arrivals"
  }];


  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides?.map((slide, index) =>
        <div
          key={slide?.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'}`
          }>

            <Image
            src={slide?.image}
            alt={slide?.imageAlt}
            className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
          </div>
        )}
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          {heroSlides?.[currentSlide]?.badge &&
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/90 text-primary-foreground rounded-full mb-4 md:mb-6">
              <Icon name="Star" size={16} />
              <span className="text-sm md:text-base font-medium font-caption">
                {heroSlides?.[currentSlide]?.badge}
              </span>
            </div>
          }
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 md:mb-6">
            {heroSlides?.[currentSlide]?.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {heroSlides?.[currentSlide]?.subtitle}
          </p>
        </div>

        <SearchBar variant="hero" onSearch={onSearch} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides?.map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
            index === currentSlide ?
            'bg-primary w-8 md:w-12' : 'bg-muted-foreground/50 hover:bg-muted-foreground'}`
            }
            aria-label={`Go to slide ${index + 1}`} />

          )}
        </div>
      </div>
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-card/80 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-warm"
        aria-label="Previous slide">

        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-card/80 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-warm"
        aria-label="Next slide">

        <Icon name="ChevronRight" size={24} />
      </button>
    </section>);

};

export default HeroSection;