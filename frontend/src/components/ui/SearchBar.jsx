import React, { useState } from 'react';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const SearchBar = ({ variant = 'hero', onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({ searchQuery, destination, duration });
    }
  };

  const handleQuickSearch = () => {
    if (onSearch) {
      onSearch({ searchQuery });
    }
  };

  if (variant === 'hero') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="bg-card rounded-xl shadow-warm-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            <Input
              type="text"
              label="Destination"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e?.target?.value)}
              className="w-full"
            />
            <Input
              type="text"
              label="Duration"
              placeholder="How many days?"
              value={duration}
              onChange={(e) => setDuration(e?.target?.value)}
              className="w-full"
            />
            <Input
              type="text"
              label="Keywords"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            iconName="Search"
            iconPosition="left"
          >
            Search Educational Tours
          </Button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <span className="text-sm text-muted-foreground font-caption">Popular searches:</span>
          {['Historical Tours', 'Science Museums', 'Cultural Heritage', 'Adventure Learning']?.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                if (onSearch) {
                  onSearch({ searchQuery: tag });
                }
              }}
              className="px-4 py-2 bg-muted rounded-md text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search tours by destination, theme, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-3 transition-smooth"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          onClick={handleQuickSearch}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;