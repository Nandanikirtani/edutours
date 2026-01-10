import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InclusionsExclusions = ({ inclusions, exclusions }) => {
  const [activeTab, setActiveTab] = useState('inclusions');

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-warm">
      <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('inclusions')}
          className={`px-6 py-3 font-heading font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${
            activeTab === 'inclusions' ?'text-primary border-b-3 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          What's Included
        </button>
        <button
          onClick={() => setActiveTab('exclusions')}
          className={`px-6 py-3 font-heading font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${
            activeTab === 'exclusions' ?'text-primary border-b-3 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          What's Not Included
        </button>
      </div>
      {activeTab === 'inclusions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inclusions?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-success/5 rounded-lg">
              <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'exclusions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exclusions?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Icon name="XCircle" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InclusionsExclusions;