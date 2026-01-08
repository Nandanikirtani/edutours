import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import LanguageSelector from './components/LanguageSelector';
import RegistrationPrompt from './components/RegistrationPrompt';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="mb-8 lg:mb-12">
                  <Link to="/homepage" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6">
                    <Icon name="ArrowLeft" size={16} />
                    <span className="font-caption">Back to Home</span>
                  </Link>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                    Welcome Back to EduTours
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground font-caption max-measure">
                    Sign in to access your educational tour bookings, saved favorites, and personalized recommendations for enriching learning experiences.
                  </p>
                </div>

                <div className="hidden lg:block mb-8">
                  <div className="relative h-[400px] rounded-xl overflow-hidden shadow-warm-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1644128284366-028c063b9faf"
                      alt="Group of diverse Indian students in school uniforms smiling and holding books while standing in front of historic Red Fort monument in Delhi during educational tour"
                      className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 rounded-full border-2 border-card overflow-hidden">
                            <Image
                              src="https://img.rocket.new/generatedImages/rocket_gen_img_18e23b0ba-1763300956208.png"
                              alt="Professional headshot of young Indian female student with long black hair wearing blue school uniform"
                              className="w-full h-full object-cover" />

                          </div>
                          <div className="w-10 h-10 rounded-full border-2 border-card overflow-hidden">
                            <Image
                              src="https://img.rocket.new/generatedImages/rocket_gen_img_10977c15f-1763295924025.png"
                              alt="Professional headshot of young Indian male student with short black hair wearing white school uniform"
                              className="w-full h-full object-cover" />

                          </div>
                          <div className="w-10 h-10 rounded-full border-2 border-card overflow-hidden">
                            <Image
                              src="https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png"
                              alt="Professional headshot of young Indian female student with braided hair wearing red school uniform"
                              className="w-full h-full object-cover" />

                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} color="var(--color-warning)" fill="var(--color-warning)" />
                          <span className="text-sm font-semibold text-card-foreground">4.9/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-card-foreground font-caption">
                        "EduTours made our school trip to historical monuments an unforgettable learning experience!"
                      </p>
                      <p className="text-xs text-card-foreground/80 font-caption mt-2">
                        - Priya Sharma, Class 10, Delhi Public School
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <TrustIndicators />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-card rounded-xl shadow-warm-lg p-6 md:p-8 lg:p-10 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                    Sign In
                  </h2>
                  <LanguageSelector />
                </div>

                <LoginForm />

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-caption mb-4">
                      Don't have an account?
                    </p>
                    <Link to="/register">
                      <button className="text-base font-semibold text-primary hover:text-primary/80 transition-smooth focus-ring rounded px-4 py-2">
                        Create Free Account →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <TrustIndicators />
              </div>

              <div className="mt-8">
                <RegistrationPrompt />
              </div>

              <div className="mt-8 p-6 bg-muted/50 rounded-md border border-border">
                <div className="flex items-start gap-3">
                  <Icon name="HelpCircle" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Need Help?</h4>
                    <p className="text-xs text-muted-foreground font-caption mb-3">
                      Our support team is available 24/7 to assist you with login issues or account questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:18001234567"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth">

                        <Icon name="Phone" size={16} />
                        <span className="font-medium">1800-123-4567</span>
                      </a>
                      <a
                        href="mailto:support@edutours.com"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth">

                        <Icon name="Mail" size={16} />
                        <span className="font-medium">support@edutours.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-lg font-heading font-semibold text-foreground">EduTours</span>
            </div>
            <p className="text-sm text-muted-foreground font-caption text-center md:text-left">
              © {new Date()?.getFullYear()} EduTours. All rights reserved. Empowering education through travel.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                Privacy
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default Login;