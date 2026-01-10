import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustBadges = [
    {
      id: 1,
      icon: "Shield",
      title: "Government Approved",
      description: "Certified by Ministry of Tourism"
    },
    {
      id: 2,
      icon: "Award",
      title: "Safety First",
      description: "ISO 9001:2015 Certified"
    },
    {
      id: 3,
      icon: "Users",
      title: "50,000+ Students",
      description: "Trusted by schools nationwide"
    },
    {
      id: 4,
      icon: "Star",
      title: "4.8/5 Rating",
      description: "Based on 12,000+ reviews"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3 md:mb-4">
            Why Choose EduTours?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            India's most trusted educational tour platform with proven safety and quality standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustBadges?.map((badge) => (
            <div
              key={badge?.id}
              className="bg-card rounded-xl p-6 md:p-8 text-center shadow-warm hover:shadow-warm-lg transition-smooth hover-lift"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Icon name={badge?.icon} size={32} color="var(--color-primary)" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                {badge?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {badge?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;