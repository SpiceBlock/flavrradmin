"use client"

import React, { useState } from 'react';
import { Button, Input, Spin } from 'antd';
import styles from './Login.module.scss';
import { auth } from '@/core/firebase/firebase';
import firebase from 'firebase/compat/app';


function Login() {
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<firebase.auth.ConfirmationResult | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });
      const result = await auth.signInWithPhoneNumber(`+1${phoneNumber}`, recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (error) {
      console.error('Error during signInWithPhoneNumber', error);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        alert('Phone number verified successfully!');
      }
    } catch (error) {
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
                maxLength={13}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <br />
              <Button className={styles.submitbutton} onClick={handleLogin}>
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
              <Button className={styles.submitbutton} onClick={handleVerifyOtp}>
                {loading ? <Spin /> : 'Verify OTP'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
