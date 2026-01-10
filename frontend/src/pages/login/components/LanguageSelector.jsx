import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  const currentLanguage = languages?.find(lang => lang?.code === selectedLanguage);

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth focus-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="Globe" size={18} />
        <span className="text-sm font-medium text-foreground">{currentLanguage?.nativeName}</span>
        <Icon name="ChevronDown" size={16} className={`transition-smooth ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-warm-lg z-50 overflow-hidden">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-smooth ${
                  selectedLanguage === language?.code ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">{language?.nativeName}</span>
                  <span className="text-xs text-muted-foreground font-caption">{language?.name}</span>
                </div>
                {selectedLanguage === language?.code && (
                  <Icon name="Check" size={16} color="var(--color-primary)" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;