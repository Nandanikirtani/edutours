import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthIndicator = ({ isAuthenticated = false, userName = 'Guest User' }) => {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-md">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground font-caption">Verified Student</p>
        </div>
        <Link to="/user-dashboard">
          <Button variant="ghost" size="sm" iconName="Settings">
            Manage
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-primary/5 border border-primary/20 rounded-md">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground mb-1">
          Sign in to access exclusive features
        </p>
        <p className="text-xs text-muted-foreground font-caption">
          Track bookings, save favorites, and get personalized recommendations
        </p>
      </div>
      <Link to="/login">
        <Button variant="default" iconName="LogIn" iconPosition="left">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default AuthIndicator;