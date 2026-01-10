import React from 'react';
import Icon from '../../../components/AppIcon';

const CancellationPolicy = ({ policy }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
          <Icon name="FileText" size={24} color="var(--color-error)" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Cancellation & Refund Policy
        </h2>
      </div>
      <div className="space-y-4">
        {policy?.terms?.map((term, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-heading font-semibold text-foreground mb-1">
                {term?.timeframe}
              </p>
              <p className="text-sm text-foreground">{term?.refund}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Additional Terms</p>
            <ul className="space-y-2">
              {policy?.additionalTerms?.map((term, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;