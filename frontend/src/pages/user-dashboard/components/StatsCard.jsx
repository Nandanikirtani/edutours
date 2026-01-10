import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ icon, label, value, trend, trendValue }) => {
  return (
    <div className="bg-card rounded-xl shadow-warm border border-border p-4 md:p-6 transition-smooth hover:shadow-warm-md">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} color="var(--color-primary)" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
        {value}
      </p>
      <p className="text-sm text-muted-foreground font-caption">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;