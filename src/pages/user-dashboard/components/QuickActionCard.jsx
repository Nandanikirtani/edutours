import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ icon, title, description, link, iconColor }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-card rounded-xl shadow-warm border border-border p-4 md:p-5 transition-smooth hover:shadow-warm-md hover-lift">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={icon} size={24} color={iconColor || 'var(--color-primary)'} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground font-caption line-clamp-2">
              {description}
            </p>
          </div>
          <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;