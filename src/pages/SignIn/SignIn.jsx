import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IdCard, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../SocialLogin/SocialLogin';

export default function SignIn() {
  const navigate = useNavigate();
  // Password visibility state stays as UI state
  const [showPassword, setShowPassword] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      studentId: '',
      password: '',
      rememberMe: false,
    },
  });

  const {signInUser} = useAuth()

  // Submission handler
  const onSubmit = (data) => {
    signInUser(data.email,data.password)
    .then(result => {
      console.log(result.user)
    })
    .catch(error =>{
      console.log(error)
    })
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left Column - Hero Visual Section */}
      <div className="relative md:w-7/12 bg-slate-900 text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://i.ibb.co.com/G48W1pSR/Sign-In.jpg')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30" />

        {/* Top Header / Branding */}
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white">
            Ideal Commerce College
          </h2>
        </div>

        {/* Middle Heading and Subtitle */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Empowering Minds,<br />
            Envisioning Futures.
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Join our community of scholars and innovators. Access your academic dashboard, resources, and institutional services through our secure unified portal.
          </p>
        </div>

        {/* Bottom Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800/60 px-3.5 py-2 rounded-full border border-slate-700/60 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800/60 px-3.5 py-2 rounded-full border border-slate-700/60 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Global Recognition</span>
          </div>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="md:w-5/12 flex flex-col justify-between p-8 md:p-16 lg:p-20 bg-white">
        <div className="w-full max-w-md mx-auto my-auto">
          
          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Sign In
            </h2>
            <p className="text-sm text-slate-500">
              Please enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            
            {/* Student / Staff ID Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Student / Staff ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IdCard className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your unique ID"
                  {...register('email', {
                    required: 'Student/Staff ID is required',
                  })}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-100/80 border rounded-lg text-sm text-slate-800 placeholder-slate-400 transition focus:bg-white focus:outline-none ${
                    errors.studentId ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-slate-800'
                  }`}
                />
              </div>
              {errors.studentId && (
                <p className="text-xs text-red-500 font-medium mt-1">{errors.studentId.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-blue-600 hover:underline">
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
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must be 8+ characters with at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                  className={`w-full pl-11 pr-11 py-3 bg-slate-100/80 border rounded-lg text-sm text-slate-800 placeholder-slate-400 transition focus:bg-white focus:outline-none ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-slate-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-black hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              OR
            </span>
          </div>

          {/* Create Account Button linked to /signup */}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full py-3.5 px-4 mb-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm rounded-lg transition"
          >
            Create an Account
          </button>
          <SocialLogin></SocialLogin>
        </div>
        

      </div>
    </div>
  );
}