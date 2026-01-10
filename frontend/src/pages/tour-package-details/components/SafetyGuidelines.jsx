import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyGuidelines = ({ guidelines }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={24} color="var(--color-success)" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Safety Guidelines & Protocols
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidelines?.map((guideline, index) => (
          <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-success/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name={guideline?.icon} size={20} color="var(--color-success)" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                {guideline?.title}
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {guideline?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Important Notice</p>
            <p className="text-sm text-foreground leading-relaxed">
              All participants must carry valid ID proof and medical fitness certificate. Emergency contact numbers will be shared before tour commencement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;