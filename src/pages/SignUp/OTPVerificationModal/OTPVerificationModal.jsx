import React, { useState, useRef } from 'react';
import { KeyRound, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

export default function OTPVerificationModal({ isOpen, email, onVerify, onClose, isVerifying, error }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  if (!isOpen) return null;

  // Handle Input Changes & Auto-Focus Next Field
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace Key Navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste Event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(char => isNaN(char))) return;

    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      onVerify(fullOtp);
    }
  };

  const isComplete = otp.join('').length === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Dynamic Background Glow Effect */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl overflow-hidden">
        
        {/* Top Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800/80 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 bg-slate-950 border border-slate-800 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
          <KeyRound className="w-7 h-7" />
        </div>

        {/* Modal Title & Subtitle */}
        <h3 className="text-2xl font-black text-center text-white mb-2 tracking-tight">
          Verify Your Email
        </h3>
        
        <p className="text-xs sm:text-sm text-center text-slate-400 mb-6 leading-relaxed">
          We sent a 6-digit verification code to <br />
          <span className="font-bold text-cyan-400">{email}</span>
        </p>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-xs text-rose-400 shadow-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">
              Enter 6-Digit Code
            </label>

            {/* Individual Input Boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-black bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                  required
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying || !isComplete}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-400/10 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Verify & Complete</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Action */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Cancel and edit registration details
          </button>
        </div>

      </div>
    </div>
  );
}