import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = () => {
  const benefits = [
    {
      id: 1,
      icon: 'Calendar',
      title: 'Easy Booking Management',
      description: 'Track all your tour bookings in one place'
    },
    {
      id: 2,
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Create wishlists of tours you want to explore'
    },
    {
      id: 3,
      icon: 'Bell',
      title: 'Personalized Alerts',
      description: 'Get notified about special offers and new tours'
    },
    {
      id: 4,
      icon: 'Users',
      title: 'Group Bookings',
      description: 'Organize tours for your school or college group'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
          New to EduTours?
        </h3>
        <p className="text-sm text-muted-foreground font-caption">
          Create an account to unlock exclusive features and benefits
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits?.map((benefit) => (
          <div
            key={benefit?.id}
            className="flex items-start gap-3 p-4 bg-card border border-border rounded-md hover:border-primary/30 transition-smooth"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">{benefit?.title}</h4>
              <p className="text-xs text-muted-foreground font-caption leading-relaxed">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-md">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="Gift" size={24} color="var(--color-primary-foreground)" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground mb-1">Welcome Offer</h4>
            <p className="text-sm text-muted-foreground font-caption">
              Get ₹500 off on your first booking when you create an account today!
            </p>
          </div>
        </div>
        <Link to="/register">
          <Button variant="default" size="lg" fullWidth iconName="UserPlus" iconPosition="left">
            Create Free Account
          </Button>
        </Link>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-caption mb-3">
          Already have an account?
        </p>
        <p className="text-xs text-muted-foreground font-caption">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:text-primary/80 transition-smooth">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:text-primary/80 transition-smooth">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPrompt;