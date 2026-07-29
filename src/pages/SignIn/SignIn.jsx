import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdCard, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';

export default function SignIn() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ studentId, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left Column - Hero Visual Section */}
      <div className="relative md:w-7/12 bg-slate-900 text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1600&auto=format&fit=crop')` 
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  required
                  placeholder="Enter your unique ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-100/80 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition"
                />
              </div>
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
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-slate-100/80 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-black hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              Login
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
            className="w-full py-3.5 px-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm rounded-lg transition"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
}