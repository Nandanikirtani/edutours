import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedTourCard = ({ tour, onRemove }) => {
  return (
    <div className="bg-card rounded-xl shadow-warm border border-border overflow-hidden transition-smooth hover:shadow-warm-md">
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={tour?.image}
          alt={tour?.imageAlt}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onRemove(tour?.id)}
          className="absolute top-3 right-3 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-smooth hover:bg-error hover:text-error-foreground focus-ring"
          aria-label="Remove from saved tours"
        >
          <Icon name="Heart" size={20} className="fill-current" />
        </button>
        {tour?.isNew && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium">
            New
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-2">
            {tour?.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-medium text-foreground">{tour?.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span className="font-caption">{tour?.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="font-caption">{tour?.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span className="font-caption">{tour?.groupSize}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground font-caption mb-1">Starting from</p>
            <p className="text-xl md:text-2xl font-heading font-bold text-primary">
              ₹{tour?.price?.toLocaleString('en-IN')}
            </p>
          </div>
          <span className="px-3 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium">
            {tour?.category}
          </span>
        </div>

        <div className="flex gap-2">
          <Link to="/tour-package-details" className="flex-1">
            <Button variant="default" size="sm" fullWidth iconName="Eye" iconPosition="left">
              View Tour
            </Button>
          </Link>
          <Link to="/booking-flow">
            <Button variant="outline" size="sm" iconName="Calendar">
              Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedTourCard;