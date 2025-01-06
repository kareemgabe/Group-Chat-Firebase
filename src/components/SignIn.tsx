import { useState } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useFirebase } from '../context/FirebaseContext';
import '../index.css';
const SignIn = ({ onSignInSuccess }: { onSignInSuccess: (user: any) => void }) => {
  const { auth } = useFirebase();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePhoneSignIn = async () => {
    if (!phoneNumber) return;
  
    // Basic phone number validation (can be adjusted for different formats)
    const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setError('Invalid phone number format. Please enter a valid phone number.');
      return;
    }
  
    setLoading(true);
    try {
      // Initialize RecaptchaVerifier here when needed
      const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
  
      // Render the invisible reCAPTCHA
      window.recaptchaVerifier = recaptchaVerifier;
      await recaptchaVerifier.render();
  
      // Send OTP
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setStep('otp');
      window.confirmationResult = confirmationResult;
      setError(null); // Clear any previous error
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error('Error during phone sign-in:', error);
  
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Please enter a valid phone number.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6">
        <div id="recaptcha-container"></div>
        {step === 'phone' ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-700">Sign in with your phone number</h3>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePhoneSignIn}
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-700">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Submit OTP
            </button>
          </div>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
