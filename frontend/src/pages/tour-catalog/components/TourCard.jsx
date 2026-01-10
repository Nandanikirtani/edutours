import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TourCard = ({ tour }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border-success/20';
      case 'limited':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'soldout':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited Seats';
      case 'soldout':
        return 'Sold Out';
      default:
        return 'Check Availability';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm hover:shadow-warm-md transition-smooth overflow-hidden flex flex-col h-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={tour?.image}
          alt={tour?.imageAlt}
          className="w-full h-full object-cover hover-lift transition-smooth"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {tour?.isFeatured && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md shadow-warm-sm">
              Featured
            </span>
          )}
          {tour?.isNew && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md shadow-warm-sm">
              New
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <button
            className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth shadow-warm-sm"
            aria-label="Add to favorites"
          >
            <Icon name="Heart" size={18} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-md border ${getAvailabilityColor(tour?.availability)}`}>
            {getAvailabilityText(tour?.availability)}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-2 flex-1">
            {tour?.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} color="var(--color-warning)" className="fill-warning" />
            <span className="text-sm font-medium text-foreground">{tour?.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground font-caption">
            ({tour?.reviewCount} reviews)
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span className="font-caption line-clamp-1">{tour?.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span className="font-caption">{tour?.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="GraduationCap" size={16} />
            <span className="font-caption">{tour?.educationalFocus}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tour?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs font-medium text-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-caption mb-1">Starting from</p>
              <p className="text-xl md:text-2xl font-heading font-bold text-primary">
                {formatPrice(tour?.price)}
              </p>
              <p className="text-xs text-muted-foreground font-caption">per person</p>
            </div>
            {tour?.groupDiscount && (
              <div className="text-right">
                <p className="text-xs text-success font-medium">Group Discount</p>
                <p className="text-xs text-muted-foreground font-caption">Available</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Link to="/tour-package-details" className="flex-1">
              <Button variant="outline" fullWidth size="sm">
                View Details
              </Button>
            </Link>
            <Link to="/booking-flow" className="flex-1">
              <Button
                variant="default"
                fullWidth
                size="sm"
                disabled={tour?.availability === 'soldout'}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;