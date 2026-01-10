import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProfileSection = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'mr', label: 'मराठी (Marathi)' }
  ];

  const studentLevelOptions = [
    { value: 'school', label: 'School Student' },
    { value: 'college', label: 'College Student' },
    { value: 'postgraduate', label: 'Postgraduate Student' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl shadow-warm border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Profile Information
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Full Name"
          type="text"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Select
          label="Student Level"
          options={studentLevelOptions}
          value={formData?.studentLevel}
          onChange={(value) => handleInputChange('studentLevel', value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Educational Institution"
          type="text"
          value={formData?.institution}
          onChange={(e) => handleInputChange('institution', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="City"
          type="text"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="State"
          type="text"
          value={formData?.state}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="PIN Code"
          type="text"
          value={formData?.pinCode}
          onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          disabled={!isEditing}
          required
        />
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Emergency Contact Name"
            type="text"
            value={formData?.emergencyContactName}
            onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Emergency Contact Phone"
            type="tel"
            value={formData?.emergencyContactPhone}
            onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Relationship"
            type="text"
            value={formData?.emergencyContactRelation}
            onChange={(e) => handleInputChange('emergencyContactRelation', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
      {isEditing && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            className="flex-1 sm:flex-initial"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
            className="flex-1 sm:flex-initial"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;