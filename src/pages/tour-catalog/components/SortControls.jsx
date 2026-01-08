import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'duration-short', label: 'Duration: Shortest First' },
    { value: 'duration-long', label: 'Duration: Longest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Select
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-caption hidden md:inline">
            View:
          </span>
          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-smooth ${
                viewMode === 'grid' ?'bg-card text-primary shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Grid view"
            >
              <Icon name="Grid3x3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-smooth ${
                viewMode === 'list' ?'bg-card text-primary shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="List view"
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;