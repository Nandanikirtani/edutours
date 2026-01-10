import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FilterPanel from './FilterPanel';

const MobileFilterDrawer = ({ isOpen, onClose, filters, onFilterChange, onClearFilters, resultCount }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Filter Tours
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4">
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            resultCount={resultCount}
          />
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <Button variant="default" fullWidth onClick={onClose}>
            Show {resultCount} Results
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;