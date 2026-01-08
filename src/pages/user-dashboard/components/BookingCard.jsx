import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-warm border border-border overflow-hidden transition-smooth hover:shadow-warm-md">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-64 h-48 lg:h-auto overflow-hidden flex-shrink-0">
          <Image
            src={booking?.tourImage}
            alt={booking?.tourImageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(booking?.status)}`}>
                  {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground font-caption">
                  Ref: {booking?.referenceNumber}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                {booking?.tourName}
              </h3>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span className="font-caption">{booking?.startDate} - {booking?.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span className="font-caption">{booking?.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span className="font-caption">{booking?.groupMembers} members</span>
                </div>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                ₹{booking?.totalAmount?.toLocaleString('en-IN')}
              </p>
              <p className={`text-sm font-medium ${getPaymentStatusColor(booking?.paymentStatus)}`}>
                Payment: {booking?.paymentStatus?.charAt(0)?.toUpperCase() + booking?.paymentStatus?.slice(1)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-3 md:p-4 bg-muted/50 rounded-md">
            <div>
              <p className="text-xs text-muted-foreground font-caption mb-1">Tour Guide</p>
              <p className="text-sm font-medium text-foreground">{booking?.tourGuide}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-caption mb-1">Emergency Contact</p>
              <p className="text-sm font-medium text-foreground">{booking?.emergencyContact}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link to="/tour-package-details" className="flex-1 md:flex-initial">
              <Button variant="outline" size="sm" iconName="Eye" iconPosition="left" fullWidth>
                View Details
              </Button>
            </Link>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Itinerary
            </Button>
            {booking?.status === 'confirmed' && (
              <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                Modify
              </Button>
            )}
            {(booking?.status === 'confirmed' || booking?.status === 'pending') && (
              <Button variant="destructive" size="sm" iconName="X" iconPosition="left">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;