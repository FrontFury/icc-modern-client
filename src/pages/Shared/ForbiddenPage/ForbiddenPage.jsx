import React from "react";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Card */}
      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Icon & Error Code Badge */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-slate-950 text-rose-400 border border-rose-500/30 p-1.5 rounded-lg shadow-md">
              <Lock className="w-4 h-4" />
            </span>
          </div>

          <span className="text-xs font-black tracking-widest text-rose-400 uppercase bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
            Error 403
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Access Restricted
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            You don't have the required permissions to view this page. If you believe this is an error, please contact your administrator.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800/80 w-full" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <a
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/10"
          >
            <Home className="w-4 h-4" />
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}