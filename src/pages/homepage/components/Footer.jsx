import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/homepage' },
      { label: 'Our Team', path: '/homepage' },
      { label: 'Careers', path: '/homepage' },
      { label: 'Press', path: '/homepage' }
    ],
    tours: [
      { label: 'Learning Camps', path: '/tour-catalog' },
      { label: 'Industrial Tours', path: '/tour-catalog' },
      { label: 'Heritage Tours', path: '/tour-catalog' },
      { label: 'Adventure Tours', path: '/tour-catalog' }
    ],
    support: [
      { label: 'Help Center', path: '/homepage' },
      { label: 'Safety Guidelines', path: '/homepage' },
      { label: 'Booking Policy', path: '/homepage' },
      { label: 'Contact Us', path: '/homepage' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/homepage' },
      { label: 'Terms of Service', path: '/homepage' },
      { label: 'Cancellation Policy', path: '/homepage' },
      { label: 'Refund Policy', path: '/homepage' }
    ]
  };

  const socialLinks = [
    { icon: 'Facebook', url: '#', label: 'Facebook' },
    { icon: 'Twitter', url: '#', label: 'Twitter' },
    { icon: 'Instagram', url: '#', label: 'Instagram' },
    { icon: 'Linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'Youtube', url: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="GraduationCap" size={28} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold">EduTours</span>
            </Link>
            <p className="text-sm md:text-base text-secondary-foreground/80 mb-4 md:mb-6 max-w-sm">
              India's leading educational tour platform connecting students with enriching learning experiences across the country and beyond.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.icon}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-md flex items-center justify-center transition-smooth"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">Tours</h3>
            <ul className="space-y-3">
              {footerLinks?.tours?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/70 font-caption text-center md:text-left">
              © {currentYear} EduTours. All rights reserved. Registered with Ministry of Tourism, Government of India.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-secondary-foreground/70" />
                <span className="text-sm text-secondary-foreground/70 font-caption">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-secondary-foreground/70" />
                <span className="text-sm text-secondary-foreground/70 font-caption">
                  support@edutours.in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;