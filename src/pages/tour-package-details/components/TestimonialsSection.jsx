import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-6">
        What Students Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="p-6 bg-muted rounded-lg">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  color={i < testimonial?.rating ? 'var(--color-warning)' : 'var(--color-muted)'}
                  className={i < testimonial?.rating ? 'fill-warning' : ''}
                />
              ))}
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-4 italic">
              "{testimonial?.comment}"
            </p>

            <div className="flex items-center gap-3">
              <Image
                src={testimonial?.studentImage}
                alt={testimonial?.studentImageAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-heading font-semibold text-foreground">
                  {testimonial?.studentName}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {testimonial?.institution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;