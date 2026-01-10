import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'Secure Login',
      description: '256-bit SSL encryption protects your data'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Data Protection',
      description: 'GDPR & Indian IT Act compliant'
    },
    {
      id: 3,
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Call us at 1800-123-4567'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Ministry of Tourism',
      badge: 'Approved',
      color: 'var(--color-success)'
    },
    {
      id: 2,
      name: 'ISO 9001:2015',
      badge: 'Certified',
      color: 'var(--color-primary)'
    },
    {
      id: 3,
      name: 'IATA Accredited',
      badge: 'Member',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex items-start gap-4 p-4 bg-muted/50 rounded-md border border-border hover:border-primary/30 transition-smooth"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">{badge?.title}</h4>
              <p className="text-xs text-muted-foreground font-caption leading-relaxed">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-card border border-border rounded-md">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Award" size={18} color="var(--color-primary)" />
          <h4 className="text-sm font-semibold text-foreground">Certifications & Approvals</h4>
        </div>
        <div className="space-y-3">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center justify-between">
              <span className="text-xs text-foreground font-caption">{cert?.name}</span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${cert?.color}15`,
                  color: cert?.color
                }}
              >
                {cert?.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-foreground font-caption leading-relaxed">
              Your account credentials are encrypted and stored securely. We never share your personal information with third parties without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;