import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TourSummaryCard = ({ tourData, participantCount, groupDiscount }) => {
  const basePrice = tourData?.price * participantCount;
  const discountAmount = groupDiscount > 0 ? (basePrice * groupDiscount) / 100 : 0;
  const taxAmount = (basePrice - discountAmount) * 0.18;
  const totalAmount = basePrice - discountAmount + taxAmount;

  return (
    <div className="bg-card rounded-lg shadow-warm-md overflow-hidden sticky top-24">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={tourData?.image}
          alt={tourData?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-1">
            {tourData?.title}
          </h3>
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="MapPin" size={16} />
            <span className="text-sm font-caption">{tourData?.destination}</span>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">Duration</span>
            <span className="font-medium text-foreground">{tourData?.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">Departure Date</span>
            <span className="font-medium text-foreground">{tourData?.departureDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">Participants</span>
            <span className="font-medium text-foreground">{participantCount} {participantCount === 1 ? 'Student' : 'Students'}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">Base Price</span>
            <span className="font-medium text-foreground data-text">₹{basePrice?.toLocaleString('en-IN')}</span>
          </div>
          {groupDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-success font-caption">Group Discount ({groupDiscount}%)</span>
              <span className="font-medium text-success data-text">-₹{discountAmount?.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">GST (18%)</span>
            <span className="font-medium text-foreground data-text">₹{taxAmount?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-primary data-text">₹{totalAmount?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
          <div className="flex items-start gap-2">
            <Icon name="Shield" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground mb-1">100% Secure Payment</p>
              <p className="text-xs text-muted-foreground font-caption">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSummaryCard;