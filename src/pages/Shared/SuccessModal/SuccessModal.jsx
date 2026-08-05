
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose, title, message, buttonText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 transform transition-all scale-100">
        
        {/* Animated Icon Container */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-black text-slate-800 tracking-tight">
          {title || "Registration Successful!"}
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {message || "Your account has been created. You can now access all institutional features."}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>{buttonText || "Continue to Dashboard"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}