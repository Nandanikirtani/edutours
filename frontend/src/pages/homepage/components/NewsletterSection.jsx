import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <Icon name="Mail" size={32} className="text-primary-foreground" />
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-3 md:mb-4">
            Stay Updated with Latest Tours
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-6 md:mb-8">
            Subscribe to our newsletter and get exclusive deals, new tour announcements, and educational travel tips
          </p>

          {subscribed ? (
            <div className="bg-success/20 border border-success/30 rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Icon name="CheckCircle" size={24} className="text-success" />
                <span className="text-lg md:text-xl font-heading font-semibold text-primary-foreground">
                  Successfully Subscribed!
                </span>
              </div>
              <p className="text-sm md:text-base text-primary-foreground/90">
                Thank you for subscribing. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  className="h-12 md:h-14 bg-primary-foreground text-foreground"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                iconName="Send"
                iconPosition="right"
                className="h-12 md:h-14 px-6 md:px-8"
              >
                Subscribe Now
              </Button>
            </form>
          )}

          <p className="text-xs md:text-sm text-primary-foreground/70 mt-4 font-caption">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;