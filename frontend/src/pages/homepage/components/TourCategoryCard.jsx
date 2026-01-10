import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TourCategoryCard = ({ category }) => {
  return (
    <Link
      to="/tour-catalog"
      className="group block bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth hover-lift"
    >
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={category?.image}
          alt={category?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium font-caption">
          {category?.tourCount} Tours
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name={category?.icon} size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1 line-clamp-1">
              {category?.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
              {category?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-caption">
              {category?.duration}
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="text-sm md:text-base">Explore</span>
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-smooth" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCategoryCard;