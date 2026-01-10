import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const getIconName = (type) => {
    switch (type) {
      case 'booking':
        return 'Calendar';
      case 'payment':
        return 'CreditCard';
      case 'reminder':
        return 'Bell';
      case 'update':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'booking':
        return 'var(--color-success)';
      case 'payment':
        return 'var(--color-warning)';
      case 'reminder':
        return 'var(--color-primary)';
      case 'update':
        return 'var(--color-accent)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-smooth ${notification?.isRead ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'}`}>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification?.isRead ? 'bg-muted' : 'bg-primary/10'}`}>
          <Icon name={getIconName(notification?.type)} size={20} color={getIconColor(notification?.type)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
              {notification?.title}
            </h4>
            <span className="text-xs text-muted-foreground font-caption whitespace-nowrap">
              {notification?.time}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-caption line-clamp-2 mb-2">
            {notification?.message}
          </p>
          {!notification?.isRead && (
            <button
              onClick={() => onMarkAsRead(notification?.id)}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;