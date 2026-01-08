import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentDetailsForm = ({ students, onStudentChange, onAddStudent, onRemoveStudent }) => {
  const educationLevelOptions = [
    { value: 'school-8-10', label: 'School (Class 8-10)' },
    { value: 'school-11-12', label: 'School (Class 11-12)' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      {students?.map((student, index) => (
        <div key={student?.id} className="bg-card rounded-lg shadow-warm p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="User" size={20} color="var(--color-primary)" />
              Student {index + 1}
            </h3>
            {students?.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onRemoveStudent(student?.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              value={student?.fullName}
              onChange={(e) => onStudentChange(student?.id, 'fullName', e?.target?.value)}
              required
            />
            <Input
              label="Age"
              type="number"
              placeholder="Enter age"
              value={student?.age}
              onChange={(e) => onStudentChange(student?.id, 'age', e?.target?.value)}
              required
              min="10"
              max="30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Gender"
              options={genderOptions}
              value={student?.gender}
              onChange={(value) => onStudentChange(student?.id, 'gender', value)}
              placeholder="Select gender"
              required
            />
            <Select
              label="Education Level"
              options={educationLevelOptions}
              value={student?.educationLevel}
              onChange={(value) => onStudentChange(student?.id, 'educationLevel', value)}
              placeholder="Select education level"
              required
            />
          </div>

          <Input
            label="Educational Institution"
            type="text"
            placeholder="Enter school/college name"
            value={student?.institution}
            onChange={(e) => onStudentChange(student?.id, 'institution', e?.target?.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="student@example.com"
              value={student?.email}
              onChange={(e) => onStudentChange(student?.id, 'email', e?.target?.value)}
              required
            />
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={student?.mobile}
              onChange={(e) => onStudentChange(student?.id, 'mobile', e?.target?.value)}
              required
              pattern="[+]91[0-9]{10}"
            />
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Phone" size={16} color="var(--color-primary)" />
              Emergency Contact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Guardian Name"
                type="text"
                placeholder="Enter guardian name"
                value={student?.guardianName}
                onChange={(e) => onStudentChange(student?.id, 'guardianName', e?.target?.value)}
                required
              />
              <Input
                label="Guardian Mobile"
                type="tel"
                placeholder="+91 98765 43210"
                value={student?.guardianMobile}
                onChange={(e) => onStudentChange(student?.id, 'guardianMobile', e?.target?.value)}
                required
                pattern="[+]91[0-9]{10}"
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        fullWidth
        iconName="Plus"
        iconPosition="left"
        onClick={onAddStudent}
      >
        Add Another Student
      </Button>
    </div>
  );
};

export default StudentDetailsForm;