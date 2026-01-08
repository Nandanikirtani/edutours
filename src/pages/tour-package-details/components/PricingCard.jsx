import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingCard = ({ pricing }) => {
  const [groupSize, setGroupSize] = useState(1);

  const calculatePrice = () => {
    if (groupSize >= 20) return pricing?.group20Plus;
    if (groupSize >= 10) return pricing?.group10Plus;
    if (groupSize >= 5) return pricing?.group5Plus;
    return pricing?.individual;
  };

  const calculateDiscount = () => {
    const individualTotal = pricing?.individual * groupSize;
    const groupTotal = calculatePrice() * groupSize;
    const savings = individualTotal - groupTotal;
    return savings > 0 ? savings : 0;
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm-lg sticky top-24">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl md:text-4xl font-heading font-bold text-primary data-text">
            ₹{calculatePrice()?.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-muted-foreground font-caption">per person</span>
        </div>
        {calculateDiscount() > 0 && (
          <div className="flex items-center gap-2 text-success">
            <Icon name="TrendingDown" size={16} />
            <span className="text-sm font-medium">
              Save ₹{calculateDiscount()?.toLocaleString('en-IN')} with group booking
            </span>
          </div>
        )}
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Number of Students
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
              className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth focus-ring"
              aria-label="Decrease group size"
            >
              <Icon name="Minus" size={18} />
            </button>
            <input
              type="number"
              value={groupSize}
              onChange={(e) => setGroupSize(Math.max(1, parseInt(e?.target?.value) || 1))}
              className="flex-1 h-10 px-4 bg-input border border-border rounded-md text-center font-medium data-text focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
              min="1"
            />
            <button
              onClick={() => setGroupSize(groupSize + 1)}
              className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth focus-ring"
              aria-label="Increase group size"
            >
              <Icon name="Plus" size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Subtotal</span>
            <span className="text-base font-heading font-semibold text-foreground data-text">
              ₹{(calculatePrice() * groupSize)?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>GST (5%)</span>
            <span className="data-text">
              ₹{Math.round(calculatePrice() * groupSize * 0.05)?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-base font-heading font-semibold text-foreground">Total Amount</span>
          <span className="text-xl font-heading font-bold text-primary data-text">
            ₹{Math.round(calculatePrice() * groupSize * 1.05)?.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <Link to="/booking-flow">
          <Button variant="default" size="lg" fullWidth iconName="Calendar" iconPosition="left">
            Book Now
          </Button>
        </Link>
        <Button variant="outline" size="lg" fullWidth iconName="MessageCircle" iconPosition="left">
          Inquiry
        </Button>
      </div>
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-3 text-sm text-foreground">
          <Icon name="Shield" size={18} color="var(--color-success)" />
          <span>100% Safe & Secure Payment</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground">
          <Icon name="RefreshCw" size={18} color="var(--color-success)" />
          <span>Free Cancellation up to 7 days</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground">
          <Icon name="Headphones" size={18} color="var(--color-success)" />
          <span>24/7 Customer Support</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;