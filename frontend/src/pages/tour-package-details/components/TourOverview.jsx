import React from 'react';
import Icon from '../../../components/AppIcon';

const TourOverview = ({ overview }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
        Tour Overview
      </h2>
      <div className="prose prose-sm md:prose-base max-w-none">
        <p className="text-foreground leading-relaxed mb-6">
          {overview?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Target" size={20} color="var(--color-primary)" />
              Learning Objectives
            </h3>
            <ul className="space-y-3">
              {overview?.learningObjectives?.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={18} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Award" size={20} color="var(--color-primary)" />
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {overview?.highlights?.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon name="Star" size={18} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOverview;