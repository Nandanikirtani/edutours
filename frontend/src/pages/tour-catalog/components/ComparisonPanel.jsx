import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ selectedTours, onRemoveTour, onClearAll }) => {
  if (selectedTours?.length === 0) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-warm-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="GitCompare" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">
                Compare Tours ({selectedTours?.length}/3)
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClearAll} iconName="X">
              Clear All
            </Button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            {selectedTours?.map((tour) => (
              <div
                key={tour?.id}
                className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md flex-shrink-0"
              >
                <span className="text-sm font-medium text-foreground line-clamp-1 max-w-[120px]">
                  {tour?.name}
                </span>
                <span className="text-xs text-primary font-semibold whitespace-nowrap">
                  {formatPrice(tour?.price)}
                </span>
                <button
                  onClick={() => onRemoveTour(tour?.id)}
                  className="p-1 hover:bg-card rounded transition-smooth"
                  aria-label={`Remove ${tour?.name} from comparison`}
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>

          <Button
            variant="default"
            iconName="ArrowRight"
            iconPosition="right"
            disabled={selectedTours?.length < 2}
          >
            Compare Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;