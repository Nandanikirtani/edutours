import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ paymentData, onPaymentDataChange }) => {
  const paymentMethodOptions = [
    { value: 'upi', label: 'UPI Payment', description: 'Pay using Google Pay, PhonePe, Paytm' },
    { value: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, RuPay' },
    { value: 'netbanking', label: 'Net Banking', description: 'All major Indian banks' },
    { value: 'wallet', label: 'Digital Wallet', description: 'Paytm, PhonePe, Amazon Pay' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name="CreditCard" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Payment Information</h3>
            <p className="text-sm text-muted-foreground font-caption">Choose your preferred payment method</p>
          </div>
        </div>

        <Select
          label="Payment Method"
          options={paymentMethodOptions}
          value={paymentData?.paymentMethod}
          onChange={(value) => onPaymentDataChange('paymentMethod', value)}
          placeholder="Select payment method"
          required
        />

        {paymentData?.paymentMethod === 'upi' && (
          <Input
            label="UPI ID"
            type="text"
            placeholder="yourname@upi"
            value={paymentData?.upiId}
            onChange={(e) => onPaymentDataChange('upiId', e?.target?.value)}
            required
            description="Enter your UPI ID (e.g., 9876543210@paytm)"
          />
        )}

        {paymentData?.paymentMethod === 'card' && (
          <>
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData?.cardNumber}
              onChange={(e) => onPaymentDataChange('cardNumber', e?.target?.value)}
              required
              maxLength="19"
            />
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="Name as on card"
              value={paymentData?.cardholderName}
              onChange={(e) => onPaymentDataChange('cardholderName', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={paymentData?.expiryDate}
                onChange={(e) => onPaymentDataChange('expiryDate', e?.target?.value)}
                required
                maxLength="5"
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={paymentData?.cvv}
                onChange={(e) => onPaymentDataChange('cvv', e?.target?.value)}
                required
                maxLength="3"
              />
            </div>
          </>
        )}

        {paymentData?.paymentMethod === 'netbanking' && (
          <Select
            label="Select Bank"
            options={[
              { value: 'sbi', label: 'State Bank of India' },
              { value: 'hdfc', label: 'HDFC Bank' },
              { value: 'icici', label: 'ICICI Bank' },
              { value: 'axis', label: 'Axis Bank' },
              { value: 'pnb', label: 'Punjab National Bank' },
              { value: 'other', label: 'Other Banks' }
            ]}
            value={paymentData?.selectedBank}
            onChange={(value) => onPaymentDataChange('selectedBank', value)}
            placeholder="Choose your bank"
            required
            searchable
          />
        )}

        {paymentData?.paymentMethod === 'wallet' && (
          <Select
            label="Select Wallet"
            options={[
              { value: 'paytm', label: 'Paytm' },
              { value: 'phonepe', label: 'PhonePe' },
              { value: 'amazonpay', label: 'Amazon Pay' },
              { value: 'mobikwik', label: 'MobiKwik' }
            ]}
            value={paymentData?.selectedWallet}
            onChange={(value) => onPaymentDataChange('selectedWallet', value)}
            placeholder="Choose your wallet"
            required
          />
        )}
      </div>
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 space-y-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Billing Address</h4>
        <Input
          label="Full Address"
          type="text"
          placeholder="House/Flat No., Street, Area"
          value={paymentData?.billingAddress}
          onChange={(e) => onPaymentDataChange('billingAddress', e?.target?.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={paymentData?.city}
            onChange={(e) => onPaymentDataChange('city', e?.target?.value)}
            required
          />
          <Input
            label="State"
            type="text"
            placeholder="Enter state"
            value={paymentData?.state}
            onChange={(e) => onPaymentDataChange('state', e?.target?.value)}
            required
          />
        </div>
        <Input
          label="PIN Code"
          type="text"
          placeholder="Enter 6-digit PIN code"
          value={paymentData?.pinCode}
          onChange={(e) => onPaymentDataChange('pinCode', e?.target?.value)}
          required
          maxLength="6"
          pattern="[0-9]{6}"
        />
      </div>
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={paymentData?.termsAccepted}
          onChange={(e) => onPaymentDataChange('termsAccepted', e?.target?.checked)}
          required
        />
        <Checkbox
          label="I have read and understood the Cancellation and Refund Policy"
          checked={paymentData?.refundPolicyAccepted}
          onChange={(e) => onPaymentDataChange('refundPolicyAccepted', e?.target?.checked)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-md p-4 flex items-center gap-3">
          <Icon name="Shield" size={24} color="var(--color-success)" />
          <div>
            <p className="text-xs font-medium text-foreground">SSL Encrypted</p>
            <p className="text-xs text-muted-foreground font-caption">Secure Payment</p>
          </div>
        </div>
        <div className="bg-muted rounded-md p-4 flex items-center gap-3">
          <Icon name="Lock" size={24} color="var(--color-success)" />
          <div>
            <p className="text-xs font-medium text-foreground">PCI Compliant</p>
            <p className="text-xs text-muted-foreground font-caption">Safe &amp; Secure</p>
          </div>
        </div>
        <div className="bg-muted rounded-md p-4 flex items-center gap-3">
          <Icon name="RefreshCw" size={24} color="var(--color-success)" />
          <div>
            <p className="text-xs font-medium text-foreground">Easy Refunds</p>
            <p className="text-xs text-muted-foreground font-caption">Hassle-free Process</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;