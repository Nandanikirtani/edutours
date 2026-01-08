import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadBrochure = () => {
  const handleDownload = () => {
    console.log('Downloading brochure...');
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 md:p-8 shadow-warm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-card rounded-xl flex items-center justify-center shadow-warm">
          <Icon name="FileDown" size={36} color="var(--color-primary)" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Download Complete Tour Brochure
          </h3>
          <p className="text-sm text-muted-foreground">
            Get detailed itinerary, pricing, and all information in PDF format
          </p>
        </div>

        <Button
          variant="default"
          size="lg"
          iconName="Download"
          iconPosition="left"
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default DownloadBrochure;