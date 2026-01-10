import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TourInfoCard = ({ tourInfo }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
        Tour Information
      </h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Duration</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.duration}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Difficulty Level</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.difficulty}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Age Requirement</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.ageRequirement}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="UserCheck" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Group Size</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.groupSize}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Starting Point</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.startingPoint}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Languages" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground font-caption mb-1">Languages</p>
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.languages}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-base font-heading font-semibold text-foreground mb-4">Tour Guide</h4>
        <div className="flex items-center gap-4">
          <Image
            src={tourInfo?.guide?.image}
            alt={tourInfo?.guide?.imageAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-base font-heading font-semibold text-foreground">{tourInfo?.guide?.name}</p>
            <p className="text-sm text-muted-foreground font-caption">{tourInfo?.guide?.credentials}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  color={i < tourInfo?.guide?.rating ? 'var(--color-warning)' : 'var(--color-muted)'}
                  className={i < tourInfo?.guide?.rating ? 'fill-warning' : ''}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1 data-text">
                ({tourInfo?.guide?.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInfoCard;