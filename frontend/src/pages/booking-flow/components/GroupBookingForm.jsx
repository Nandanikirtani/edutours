import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const GroupBookingForm = ({ groupData, onGroupDataChange }) => {
  const groupTypeOptions = [
    { value: 'school', label: 'School Group' },
    { value: 'college', label: 'College Group' },
    { value: 'individual', label: 'Individual Booking' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
          <Icon name="Users" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Group Booking Details</h3>
          <p className="text-sm text-muted-foreground font-caption">Get special discounts for group bookings</p>
        </div>
      </div>
      <Select
        label="Booking Type"
        options={groupTypeOptions}
        value={groupData?.groupType}
        onChange={(value) => onGroupDataChange('groupType', value)}
        placeholder="Select booking type"
        required
      />
      {(groupData?.groupType === 'school' || groupData?.groupType === 'college') && (
        <>
          <Input
            label="Institution Name"
            type="text"
            placeholder="Enter institution name"
            value={groupData?.institutionName}
            onChange={(e) => onGroupDataChange('institutionName', e?.target?.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Coordinator Name"
              type="text"
              placeholder="Enter coordinator name"
              value={groupData?.coordinatorName}
              onChange={(e) => onGroupDataChange('coordinatorName', e?.target?.value)}
              required
            />
            <Input
              label="Coordinator Mobile"
              type="tel"
              placeholder="+91 98765 43210"
              value={groupData?.coordinatorMobile}
              onChange={(e) => onGroupDataChange('coordinatorMobile', e?.target?.value)}
              required
              pattern="[+]91[0-9]{10}"
            />
          </div>

          <Input
            label="Coordinator Email"
            type="email"
            placeholder="coordinator@institution.edu"
            value={groupData?.coordinatorEmail}
            onChange={(e) => onGroupDataChange('coordinatorEmail', e?.target?.value)}
            required
          />

          <Input
            label="Institution Address"
            type="text"
            placeholder="Enter complete address with PIN code"
            value={groupData?.institutionAddress}
            onChange={(e) => onGroupDataChange('institutionAddress', e?.target?.value)}
            required
          />

          <div className="bg-success/5 border border-success/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <Icon name="Gift" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Group Discount Applied!</p>
                <p className="text-xs text-muted-foreground font-caption">
                  You're eligible for a special group discount. The discount will be automatically applied to your booking.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Special Requirements</h4>
        <div className="space-y-3">
          <Checkbox
            label="Dietary restrictions (vegetarian/vegan meals)"
            checked={groupData?.dietaryRestrictions}
            onChange={(e) => onGroupDataChange('dietaryRestrictions', e?.target?.checked)}
          />
          <Checkbox
            label="Accessibility requirements (wheelchair access)"
            checked={groupData?.accessibilityNeeds}
            onChange={(e) => onGroupDataChange('accessibilityNeeds', e?.target?.checked)}
          />
          <Checkbox
            label="Medical conditions requiring attention"
            checked={groupData?.medicalConditions}
            onChange={(e) => onGroupDataChange('medicalConditions', e?.target?.checked)}
          />
        </div>
      </div>
      <Input
        label="Additional Notes"
        type="text"
        placeholder="Any special requests or requirements..."
        value={groupData?.additionalNotes}
        onChange={(e) => onGroupDataChange('additionalNotes', e?.target?.value)}
      />
    </div>
  );
};

export default GroupBookingForm;