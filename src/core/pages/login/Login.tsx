"use client"

import React, { useState } from 'react';
import { Button, Input, Spin } from 'antd';
import styles from './Login.module.scss';
import { auth } from '@/core/firebase/firebase';
import firebase from 'firebase/compat/app';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<firebase.auth.ConfirmationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneNumber)) {
        throw new Error('Invalid phone number');
      }

      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });

      const result = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (error: any) {
      setError(error.message);
      console.error('Error during signInWithPhoneNumber', error);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        router.push('/dashboard'); // Redirect to /dashboard on successful login
      }
    } catch (error: any) {
      setError(error.message);
      console.error('Error during confirm OTP', error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <div id="recaptcha-container"></div>
      <div className={styles.box}>
        <h1>Welcome Flavrr Admin</h1>
        <div className={styles.maininput}>
          {!otpSent ? (
            <>
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <br />
              <Button className={styles.submitbutton} onClick={handleLogin} disabled={loading}>
                {loading ? <Spin /> : 'Log In'}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                maxLength={6}
                placeholder="OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <Button className={styles.submitbutton} onClick={handleVerifyOtp} disabled={loading}>
                {loading ? <Spin /> : 'Verify OTP'}
              </Button>
              
            </>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}

      </div>
    </div>
  );
};

export default Login;