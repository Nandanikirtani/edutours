import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

import Button from '../../../components/ui/Button';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, resultCount }) => {
  const studentLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'school', label: 'School Students (12-18)' },
    { value: 'college', label: 'College Students (18-22)' },
    { value: 'postgraduate', label: 'Postgraduate (22+)' }
  ];

  const tourTypeOptions = [
    { value: 'all', label: 'All Tour Types' },
    { value: 'learning-camp', label: 'Learning Camps' },
    { value: 'industrial-tour', label: 'Industrial Tours' },
    { value: 'cultural-heritage', label: 'Cultural Heritage' },
    { value: 'science-exploration', label: 'Science Exploration' },
    { value: 'adventure-learning', label: 'Adventure Learning' }
  ];

  const destinationOptions = [
    { value: 'all', label: 'All Destinations' },
    { value: 'domestic', label: 'Domestic Tours' },
    { value: 'international', label: 'International Tours' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '1-3', label: '1-3 Days' },
    { value: '4-7', label: '4-7 Days' },
    { value: '8-14', label: '8-14 Days' },
    { value: '15+', label: '15+ Days' }
  ];

  const budgetRanges = [
    { value: 'all', label: 'Any Budget' },
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000+', label: 'Above ₹1,00,000' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters} iconName="X">
          Clear All
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <Select
            label="Student Level"
            options={studentLevelOptions}
            value={filters?.studentLevel}
            onChange={(value) => onFilterChange('studentLevel', value)}
          />
        </div>

        <div>
          <Select
            label="Tour Type"
            options={tourTypeOptions}
            value={filters?.tourType}
            onChange={(value) => onFilterChange('tourType', value)}
            searchable
          />
        </div>

        <div>
          <Select
            label="Destination"
            options={destinationOptions}
            value={filters?.destination}
            onChange={(value) => onFilterChange('destination', value)}
          />
        </div>

        <div>
          <Select
            label="Duration"
            options={durationOptions}
            value={filters?.duration}
            onChange={(value) => onFilterChange('duration', value)}
          />
        </div>

        <div>
          <Select
            label="Budget Range"
            options={budgetRanges}
            value={filters?.budget}
            onChange={(value) => onFilterChange('budget', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Educational Focus
          </label>
          <CheckboxGroup>
            <Checkbox
              label="History & Culture"
              checked={filters?.educationalFocus?.includes('history')}
              onChange={(e) => {
                const newFocus = e?.target?.checked
                  ? [...filters?.educationalFocus, 'history']
                  : filters?.educationalFocus?.filter(f => f !== 'history');
                onFilterChange('educationalFocus', newFocus);
              }}
            />
            <Checkbox
              label="Science & Technology"
              checked={filters?.educationalFocus?.includes('science')}
              onChange={(e) => {
                const newFocus = e?.target?.checked
                  ? [...filters?.educationalFocus, 'science']
                  : filters?.educationalFocus?.filter(f => f !== 'science');
                onFilterChange('educationalFocus', newFocus);
              }}
            />
            <Checkbox
              label="Arts & Literature"
              checked={filters?.educationalFocus?.includes('arts')}
              onChange={(e) => {
                const newFocus = e?.target?.checked
                  ? [...filters?.educationalFocus, 'arts']
                  : filters?.educationalFocus?.filter(f => f !== 'arts');
                onFilterChange('educationalFocus', newFocus);
              }}
            />
            <Checkbox
              label="Environment & Nature"
              checked={filters?.educationalFocus?.includes('environment')}
              onChange={(e) => {
                const newFocus = e?.target?.checked
                  ? [...filters?.educationalFocus, 'environment']
                  : filters?.educationalFocus?.filter(f => f !== 'environment');
                onFilterChange('educationalFocus', newFocus);
              }}
            />
          </CheckboxGroup>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Special Features
          </label>
          <CheckboxGroup>
            <Checkbox
              label="Group Discounts Available"
              checked={filters?.groupDiscount}
              onChange={(e) => onFilterChange('groupDiscount', e?.target?.checked)}
            />
            <Checkbox
              label="Featured Tours Only"
              checked={filters?.featuredOnly}
              onChange={(e) => onFilterChange('featuredOnly', e?.target?.checked)}
            />
            <Checkbox
              label="Available This Month"
              checked={filters?.availableThisMonth}
              onChange={(e) => onFilterChange('availableThisMonth', e?.target?.checked)}
            />
          </CheckboxGroup>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-caption">Results found:</span>
          <span className="font-semibold text-foreground data-text">{resultCount}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;