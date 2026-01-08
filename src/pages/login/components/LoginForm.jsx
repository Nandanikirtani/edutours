import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const mockCredentials = [
    { emailOrPhone: 'student@edutours.com', password: 'Student@123', role: 'Student' },
    { emailOrPhone: '+919876543210', password: 'Parent@456', role: 'Parent' },
    { emailOrPhone: 'admin@edutours.com', password: 'Admin@789', role: 'Admin' }
  ];

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    setGeneratedCaptcha(captcha);
    return captcha;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, rememberMe: e?.target?.checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const isPhone = /^[+]?[0-9]{10,13}$/?.test(formData?.emailOrPhone?.replace(/\s/g, ''));
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.emailOrPhone);
      if (!isPhone && !isEmail) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (showCaptcha && captchaValue !== generatedCaptcha) {
      newErrors.captcha = 'Incorrect CAPTCHA. Please try again.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const matchedCredential = mockCredentials?.find(
        cred => 
          (cred?.emailOrPhone === formData?.emailOrPhone || 
           cred?.emailOrPhone === formData?.emailOrPhone?.replace(/\s/g, '')) &&
          cred?.password === formData?.password
      );

      if (matchedCredential) {
        navigate('/user-dashboard');
      } else {
        setErrors({ 
          general: `Invalid credentials. Please use:\nEmail: student@edutours.com | Password: Student@123\nPhone: +919876543210 | Password: Parent@456\nEmail: admin@edutours.com | Password: Admin@789` 
        });
        setShowCaptcha(true);
        generateCaptcha();
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/user-dashboard');
    }, 1000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-error mb-1">Login Failed</p>
                <p className="text-xs text-error/80 whitespace-pre-line font-caption">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        <Input
          type="text"
          name="emailOrPhone"
          label="Email or Phone Number"
          placeholder="Enter email or +91 phone number"
          value={formData?.emailOrPhone}
          onChange={handleInputChange}
          error={errors?.emailOrPhone}
          required
          description="Use Indian mobile format: +919876543210"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>

        {showCaptcha && (
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-md border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={18} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-foreground">Security Verification</span>
                </div>
                <button
                  type="button"
                  onClick={() => generateCaptcha()}
                  className="p-1 hover:bg-background rounded transition-smooth"
                  aria-label="Regenerate CAPTCHA"
                >
                  <Icon name="RefreshCw" size={16} />
                </button>
              </div>
              <div className="bg-background p-4 rounded border border-border text-center">
                <span className="text-2xl font-bold tracking-wider text-foreground select-none" style={{ fontFamily: 'monospace', letterSpacing: '0.3em' }}>
                  {generatedCaptcha}
                </span>
              </div>
            </div>
            <Input
              type="text"
              name="captcha"
              label="Enter CAPTCHA"
              placeholder="Type the characters above"
              value={captchaValue}
              onChange={(e) => {
                setCaptchaValue(e?.target?.value);
                if (errors?.captcha) {
                  setErrors(prev => ({ ...prev, captcha: '' }));
                }
              }}
              error={errors?.captcha}
              required
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleCheckboxChange}
            size="sm"
          />
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth focus-ring rounded px-2 py-1"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-caption">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full"
          >
            <Icon name="Mail" size={18} className="mr-2" />
            <span className="text-sm">Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="w-full"
          >
            <Icon name="Facebook" size={18} className="mr-2" />
            <span className="text-sm">Facebook</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('phone')}
            disabled={isLoading}
            className="w-full"
          >
            <Icon name="Smartphone" size={18} className="mr-2" />
            <span className="text-sm">OTP Login</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;