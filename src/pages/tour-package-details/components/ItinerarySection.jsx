import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ItinerarySection = ({ itinerary }) => {
  const [expandedDay, setExpandedDay] = useState(0);

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? -1 : index);
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-6">
        Day-by-Day Itinerary
      </h2>
      <div className="space-y-4">
        {itinerary?.map((day, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-smooth"
          >
            <button
              onClick={() => toggleDay(index)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted transition-smooth text-left focus-ring"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-heading font-semibold text-primary data-text">
                    {day?.day}
                  </span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    {day?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption mt-1">
                    {day?.duration}
                  </p>
                </div>
              </div>
              <Icon
                name="ChevronDown"
                size={20}
                className={`transition-smooth flex-shrink-0 ${
                  expandedDay === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedDay === index && (
              <div className="px-4 md:px-6 pb-6 border-t border-border">
                <div className="mt-6 space-y-6">
                  {day?.activities?.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" size={16} color="var(--color-accent)" />
                        </div>
                        {actIndex < day?.activities?.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground font-caption">
                            {activity?.time}
                          </span>
                        </div>
                        <h4 className="text-base font-heading font-semibold text-foreground mb-2">
                          {activity?.title}
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {activity?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {day?.meals && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Utensils" size={18} color="var(--color-primary)" />
                      <span className="text-sm font-heading font-semibold text-foreground">
                        Meals Included
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day?.meals?.map((meal, mealIndex) => (
                        <span
                          key={mealIndex}
                          className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium text-foreground"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItinerarySection;