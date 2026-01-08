import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgress = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-10">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
              <div className="hidden md:flex flex-col items-center gap-1">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  {step?.title}
                </span>
                <span className="text-xs text-muted-foreground font-caption">{step?.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile Step Title */}
      <div className="md:hidden mt-4 text-center">
        <h3 className="text-lg font-semibold text-foreground">{steps?.[currentStep - 1]?.title}</h3>
        <p className="text-sm text-muted-foreground font-caption">{steps?.[currentStep - 1]?.subtitle}</p>
      </div>
    </div>
  );
};

export default BookingProgress;