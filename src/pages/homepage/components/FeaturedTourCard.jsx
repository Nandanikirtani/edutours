import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedTourCard = ({ tour }) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth">
      <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
        <Image
          src={tour?.image}
          alt={tour?.imageAlt}
          className="w-full h-full object-cover hover:scale-110 transition-smooth duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tour?.featured && (
            <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs md:text-sm font-medium font-caption">
              Featured
            </div>
          )}
          {tour?.discount && (
            <div className="px-3 py-1 bg-warning text-warning-foreground rounded-full text-xs md:text-sm font-medium font-caption">
              {tour?.discount}% OFF
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-card transition-smooth">
          <Icon name="Heart" size={20} className="text-muted-foreground hover:text-error" />
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs md:text-sm font-medium font-caption">
            {tour?.category}
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="text-warning fill-warning" />
            <span className="text-sm font-medium text-foreground">{tour?.rating}</span>
            <span className="text-xs text-muted-foreground">({tour?.reviews})</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2 line-clamp-2">
          {tour?.title}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
          {tour?.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground line-clamp-1">{tour?.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground whitespace-nowrap">{tour?.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground whitespace-nowrap">{tour?.groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground line-clamp-1">{tour?.studentLevel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs md:text-sm text-muted-foreground font-caption mb-1">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-heading font-bold text-primary">
                ₹{tour?.price?.toLocaleString('en-IN')}
              </span>
              {tour?.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{tour?.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground font-caption">per student</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/tour-package-details" className="flex-1">
            <Button variant="outline" fullWidth iconName="Eye" iconPosition="left">
              View Details
            </Button>
          </Link>
          <Link to="/booking-flow" className="flex-1">
            <Button variant="default" fullWidth iconName="Calendar" iconPosition="left">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTourCard;