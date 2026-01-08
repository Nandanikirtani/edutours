import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import BookingProgress from './components/BookingProgress';
import TourSummaryCard from './components/TourSummaryCard';
import StudentDetailsForm from './components/StudentDetailsForm';
import GroupBookingForm from './components/GroupBookingForm';
import PaymentForm from './components/PaymentForm';
import BookingReview from './components/BookingReview';

const BookingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const steps = [
  { id: 1, title: 'Student Details', subtitle: 'Participant information' },
  { id: 2, title: 'Group Booking', subtitle: 'Institution details' },
  { id: 3, title: 'Payment', subtitle: 'Secure checkout' },
  { id: 4, title: 'Review', subtitle: 'Confirm booking' }];


  const mockTourData = {
    title: "Historical Heritage Tour of Rajasthan",
    destination: "Jaipur, Udaipur, Jodhpur",
    duration: "7 Days / 6 Nights",
    departureDate: "15/03/2026",
    price: 18500,
    image: "https://images.unsplash.com/photo-1612105301362-0d4900e364fa",
    imageAlt: "Majestic Hawa Mahal palace in Jaipur with intricate pink sandstone architecture and ornate windows against clear blue sky"
  };

  const [students, setStudents] = useState([
  {
    id: 1,
    fullName: '',
    age: '',
    gender: '',
    educationLevel: '',
    institution: '',
    email: '',
    mobile: '',
    guardianName: '',
    guardianMobile: ''
  }]
  );

  const [groupData, setGroupData] = useState({
    groupType: '',
    institutionName: '',
    coordinatorName: '',
    coordinatorMobile: '',
    coordinatorEmail: '',
    institutionAddress: '',
    dietaryRestrictions: false,
    accessibilityNeeds: false,
    medicalConditions: false,
    additionalNotes: ''
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    upiId: '',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    selectedBank: '',
    selectedWallet: '',
    billingAddress: '',
    city: '',
    state: '',
    pinCode: '',
    termsAccepted: false,
    refundPolicyAccepted: false
  });

  const groupDiscount = students?.length >= 10 ? 15 : students?.length >= 5 ? 10 : 0;
  const basePrice = mockTourData?.price * students?.length;
  const discountAmount = basePrice * groupDiscount / 100;
  const taxAmount = (basePrice - discountAmount) * 0.18;
  const totalAmount = basePrice - discountAmount + taxAmount;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleStudentChange = (studentId, field, value) => {
    setStudents(students?.map((student) =>
    student?.id === studentId ? { ...student, [field]: value } : student
    ));
  };

  const handleAddStudent = () => {
    const newStudent = {
      id: students?.length + 1,
      fullName: '',
      age: '',
      gender: '',
      educationLevel: '',
      institution: '',
      email: '',
      mobile: '',
      guardianName: '',
      guardianMobile: ''
    };
    setStudents([...students, newStudent]);
  };

  const handleRemoveStudent = (studentId) => {
    if (students?.length > 1) {
      setStudents(students?.filter((student) => student?.id !== studentId));
    }
  };

  const handleGroupDataChange = (field, value) => {
    setGroupData({ ...groupData, [field]: value });
  };

  const handlePaymentDataChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
  };

  const validateStep = () => {
    if (currentStep === 1) {
      const isValid = students?.every((student) =>
      student?.fullName && student?.age && student?.gender && student?.educationLevel &&
      student?.institution && student?.email && student?.mobile &&
      student?.guardianName && student?.guardianMobile
      );
      if (!isValid) {
        alert('Please fill in all student details before proceeding.');
        return false;
      }
    }

    if (currentStep === 2) {
      if (!groupData?.groupType) {
        alert('Please select a booking type.');
        return false;
      }
      if ((groupData?.groupType === 'school' || groupData?.groupType === 'college') && (
      !groupData?.institutionName || !groupData?.coordinatorName ||
      !groupData?.coordinatorMobile || !groupData?.coordinatorEmail ||
      !groupData?.institutionAddress)) {
        alert('Please fill in all group booking details.');
        return false;
      }
    }

    if (currentStep === 3) {
      if (!paymentData?.paymentMethod) {
        alert('Please select a payment method.');
        return false;
      }
      if (!paymentData?.billingAddress || !paymentData?.city || !paymentData?.state || !paymentData?.pinCode) {
        alert('Please fill in complete billing address.');
        return false;
      }
      if (!paymentData?.termsAccepted || !paymentData?.refundPolicyAccepted) {
        alert('Please accept the terms and conditions and refund policy.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    alert('Booking confirmed successfully! You will receive a confirmation email shortly.');
    navigate('/user-dashboard');
  };

  const handleSaveProgress = () => {
    alert('Your booking progress has been saved. You can continue later from your dashboard.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StudentDetailsForm
            students={students}
            onStudentChange={handleStudentChange}
            onAddStudent={handleAddStudent}
            onRemoveStudent={handleRemoveStudent} />);


      case 2:
        return (
          <GroupBookingForm
            groupData={groupData}
            onGroupDataChange={handleGroupDataChange} />);


      case 3:
        return (
          <PaymentForm
            paymentData={paymentData}
            onPaymentDataChange={handlePaymentDataChange} />);


      case 4:
        return (
          <BookingReview
            tourData={mockTourData}
            students={students}
            groupData={groupData}
            paymentData={paymentData}
            totalAmount={totalAmount} />);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate('/tour-package-details')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-4">

              <Icon name="ArrowLeft" size={16} />
              <span className="font-caption">Back to Tour Details</span>
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
              Complete Your Booking
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-caption">
              Fill in the details below to secure your educational tour
            </p>
          </div>

          <BookingProgress currentStep={currentStep} steps={steps} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {renderStepContent()}

              <div className="flex flex-col sm:flex-row gap-4">
                {currentStep > 1 &&
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={handlePrevious}
                  className="sm:flex-1">

                    Previous Step
                  </Button>
                }
                {currentStep < steps?.length ?
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleNext}
                  className="sm:flex-1">

                    Continue to {steps?.[currentStep]?.title}
                  </Button> :

                <Button
                  variant="default"
                  size="lg"
                  iconName="Check"
                  iconPosition="left"
                  onClick={handleConfirmBooking}
                  className="sm:flex-1">

                    Confirm Booking
                  </Button>
                }
              </div>

              <Button
                variant="ghost"
                fullWidth
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveProgress}>

                Save Progress &amp; Continue Later
              </Button>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-lg shadow-warm">

                  <span className="font-semibold text-foreground">Booking Summary</span>
                  <Icon
                    name={isSummaryExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={20} />

                </button>
              </div>

              <div className={`${isSummaryExpanded ? 'block' : 'hidden'} lg:block`}>
                <TourSummaryCard
                  tourData={mockTourData}
                  participantCount={students?.length}
                  groupDiscount={groupDiscount} />

              </div>
            </div>
          </div>

          <div className="mt-8 bg-card rounded-lg shadow-warm p-4 md:p-6">
            <div className="flex items-start gap-4">
              <Icon name="Headphones" size={24} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground font-caption mb-4">
                  Our support team is available 24/7 to assist you with your booking
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground data-text">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">support@edutours.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-caption">
              © {new Date()?.getFullYear()} EduTours. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-caption">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-caption">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-caption">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default BookingFlow;