import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, IdCard, Lock, Eye, EyeOff, Building2 } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, studentId, department, password, agreedToTerms });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-slate-800">
      
      {/* Left Column - Hero Visual Section (Ideal Commerce College) */}
      <div className="relative md:w-7/12 bg-slate-100 text-white flex flex-col justify-between p-8 md:p-14 lg:p-16 overflow-hidden">
        
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://i.ibb.co.com/WpcNNKKJ/Sign-Up.jpg')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/40" />

        {/* Top Header / Branding */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/90 text-white flex items-center justify-center font-black text-lg border border-blue-400/30 shadow-lg">
              ICC
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-wide uppercase text-white leading-none">
                Ideal Commerce College
              </h2>
              <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                Dhaka • EIIN: 134207
              </p>
            </div>
          </div>
        </div>

        {/* Middle Hero Text */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>Farmgate Campus • Online Portal</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight mb-6">
            Forge your academic future today.
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
            Join a vibrant community dedicated to educational rigor, leadership, and personal development. Register to access coursework, results, and digital services.
          </p>
        </div>

        {/* Bottom Statistics / Badges */}
        <div className="relative z-10 flex items-center gap-10 pt-6 border-t border-slate-800/80">
          <div>
            <div className="text-2xl md:text-3xl font-black text-amber-400">20+</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Years of Excellence</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-400">15k+</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Successful Alumni</div>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="md:w-5/12 flex flex-col justify-between p-8 md:p-12 lg:p-14 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto my-auto">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Please enter your institutional details to register.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition"
                />
              </div>
            </div>

            {/* Email & Student ID Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Institutional Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="student@icc.edu.bd"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition"
                  />
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Roll / ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IdCard className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="ICC-2025-1042"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition"
                  />
                </div>
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department / Program
              </label>
              <select
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-xl text-xs sm:text-sm text-slate-800 transition"
              >
                <option value="" disabled>Select your department</option>
                <optgroup label="HSC Programs (Class XI & XII)">
                  <option value="hsc-business">HSC - Business Studies</option>
                  <option value="hsc-science">HSC - Science</option>
                  <option value="hsc-arts">HSC - Humanities / Arts</option>
                </optgroup>
              </select>
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-slate-800 focus:ring-0 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Verification */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] font-medium text-slate-600 leading-snug cursor-pointer select-none">
                I verify that I am an active student of Ideal Commerce College and agree to the{' '}
                <a href="#terms" className="text-blue-600 font-semibold hover:underline">Institutional Terms</a> and{' '}
                <a href="#privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg active:scale-[0.99] mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signIn')}
              className="font-bold text-blue-600 hover:underline inline-block"
            >
              Login
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}