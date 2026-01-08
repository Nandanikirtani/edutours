import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingReview = ({ tourData, students, groupData, paymentData, totalAmount }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Package" size={20} color="var(--color-primary)" />
          Tour Details
        </h3>
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={tourData?.image}
              alt={tourData?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-foreground">{tourData?.title}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span className="font-caption">{tourData?.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span className="font-caption">{tourData?.departureDate} • {tourData?.duration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          Participant Details
        </h3>
        <div className="space-y-4">
          {students?.map((student, index) => (
            <div key={student?.id} className="border border-border rounded-md p-4">
              <p className="font-medium text-foreground mb-2">Student {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground font-caption">Name: </span>
                  <span className="text-foreground">{student?.fullName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-caption">Age: </span>
                  <span className="text-foreground">{student?.age} years</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-caption">Institution: </span>
                  <span className="text-foreground">{student?.institution}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-caption">Mobile: </span>
                  <span className="text-foreground data-text">{student?.mobile}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {(groupData?.groupType === 'school' || groupData?.groupType === 'college') && (
        <div className="bg-card rounded-lg shadow-warm p-4 md:p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
            Group Booking Details
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground font-caption">Institution: </span>
              <span className="text-foreground">{groupData?.institutionName}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-caption">Coordinator: </span>
              <span className="text-foreground">{groupData?.coordinatorName}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-caption">Contact: </span>
              <span className="text-foreground data-text">{groupData?.coordinatorMobile}</span>
            </div>
            {groupData?.additionalNotes && (
              <div>
                <span className="text-muted-foreground font-caption">Special Requirements: </span>
                <span className="text-foreground">{groupData?.additionalNotes}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" />
          Payment Details
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground font-caption">Payment Method: </span>
            <span className="text-foreground capitalize">{paymentData?.paymentMethod?.replace('-', ' ')}</span>
          </div>
          <div>
            <span className="text-muted-foreground font-caption">Billing Address: </span>
            <span className="text-foreground">{paymentData?.billingAddress}, {paymentData?.city}, {paymentData?.state} - {paymentData?.pinCode}</span>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary data-text">₹{totalAmount?.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-xs text-muted-foreground font-caption">Including all taxes and fees</p>
      </div>
      <div className="bg-warning/5 border border-warning/20 rounded-md p-4">
        <div className="flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Important Information</p>
            <ul className="text-xs text-muted-foreground font-caption space-y-1 list-disc list-inside">
              <li>Please review all details carefully before confirming</li>
              <li>Cancellation charges apply as per our refund policy</li>
              <li>You will receive booking confirmation via email and SMS</li>
              <li>Keep your booking ID safe for future reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingReview;