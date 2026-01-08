import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm hover:shadow-warm-lg transition-smooth">
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <Image
          src={testimonial?.avatar}
          alt={testimonial?.avatarAlt}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-1">
            {testimonial?.name}
          </h4>
          <p className="text-sm text-muted-foreground font-caption line-clamp-1">
            {testimonial?.role}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="Star"
                size={14}
                className={`${
                  index < testimonial?.rating
                    ? 'text-warning fill-warning' :'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm md:text-base text-foreground mb-4 line-clamp-4">
        "{testimonial?.content}"
      </p>
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Icon name="MapPin" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-caption">
          {testimonial?.tourName}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;