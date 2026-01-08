import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DestinationCard = ({ destination }) => {
  return (
    <Link
      to="/tour-catalog"
      className="group block bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth hover-lift"
    >
      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
        <Image
          src={destination?.image}
          alt={destination?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <span className="text-sm md:text-base text-primary-foreground font-medium font-caption">
              {destination?.state}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-foreground mb-2">
            {destination?.name}
          </h3>
          <p className="text-sm md:text-base text-primary-foreground/90 mb-3 line-clamp-2">
            {destination?.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-base text-primary-foreground font-medium">
              {destination?.tourCount} Educational Tours
            </span>
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="text-sm md:text-base font-medium">Explore</span>
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-smooth" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;