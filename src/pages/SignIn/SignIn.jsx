import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IdCard, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../SocialLogin/SocialLogin';
import OTPVerificationModal from '../SignUp/OTPVerificationModal/OTPVerificationModal';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Modal & OTP States
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [tempCredentials, setTempCredentials] = useState(null);

  const { signInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Step 1: Login Form Submit -> Send OTP and Open Modal
  const onSubmit = async (data) => {
    setAuthError('');
    try {
      setTempCredentials(data);

      const backendUrl = import.meta.env.VITE_API_URL || 'https://icc-modern-server.vercel.app';

      const response = await axios.post(
        `${backendUrl}/send-otp`,
        { email: data.email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        setIsOtpModalOpen(true);
      }
    } catch (error) {
      console.error('Send OTP Error:', error);
      const serverErrorMsg =
        error.response?.data?.message || 'Failed to send OTP code. Please check server logs.';
      setAuthError(serverErrorMsg);
    }
  };

  // Step 2: Handle OTP Verification & Redirect
  const handleVerifyOtp = async (enteredOtp) => {
    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://icc-modern-server.vercel.app';

      const verifyRes = await axios.post(
        `${backendUrl}/verify-otp`,
        {
          email: tempCredentials.email,
          otp: enteredOtp,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (verifyRes.data.success) {
        // Sign in user via Firebase / Auth Context
        await signInUser(tempCredentials.email, tempCredentials.password);

        setIsOtpModalOpen(false);
        navigate(location?.state || '/', { replace: true });
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setOtpError(error.response?.data?.message || 'Invalid or expired verification code.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 font-sans text-slate-100">
      {/* OTP Verification Modal */}
      <OTPVerificationModal
        isOpen={isOtpModalOpen}
        email={tempCredentials?.email}
        onVerify={handleVerifyOtp}
        onClose={() => setIsOtpModalOpen(false)}
        isVerifying={isVerifyingOtp}
        error={otpError}
      />

      {/* Left Column - Hero Visual Section */}
      <div className="relative md:w-7/12 bg-slate-900 text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/G48W1pSR/Sign-In.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40" />

        <div className="relative z-10 flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/src/assets/icc-logo.png"
              alt="Ideal Commerce College Logo"
              className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-0 group-hover:invert"
            />
            <h2 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white transition-colors group-hover:text-cyan-400">
              Ideal Commerce College
            </h2>
          </Link>
        </div>

        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Empowering Minds,
            <br />
            Envisioning Futures.
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Join our community of scholars and innovators. Access your academic dashboard,
            resources, and institutional services through our secure unified portal.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-3.5 py-2 rounded-full border border-slate-700/60 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-3.5 py-2 rounded-full border border-slate-700/60 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Global Recognition</span>
          </div>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="md:w-5/12 flex flex-col justify-between p-8 md:p-16 lg:p-20 bg-slate-950">
        <div className="w-full max-w-md mx-auto my-auto p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-sm text-slate-400">
              Please enter your credentials to access your account.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-xs text-red-400">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                Student Email / ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IdCard className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/80 border rounded-lg text-sm text-slate-100 placeholder-slate-500 transition focus:bg-slate-800 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 font-medium mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={`w-full pl-11 pr-11 py-3 bg-slate-800/80 border rounded-lg text-sm text-slate-100 placeholder-slate-500 transition focus:bg-slate-800 focus:outline-none ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-medium mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2.5 text-xs font-medium text-slate-300 cursor-pointer select-none"
              >
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-lg transition shadow-md hover:shadow-amber-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Sending Code...' : 'Login & Verify'}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-900 px-3 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              OR
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/signup', { state: location.state })}
            className="w-full py-3.5 px-4 mb-4 bg-transparent border border-cyan-500/80 text-cyan-400 hover:bg-cyan-500/10 font-bold text-sm rounded-lg transition cursor-pointer"
          >
            Create an Account
          </button>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}