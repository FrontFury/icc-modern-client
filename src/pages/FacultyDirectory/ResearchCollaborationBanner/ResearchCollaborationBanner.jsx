import React from "react";
import { Mail, Compass } from "lucide-react";

export default function ResearchCollaborationBanner() {
  return (
    <div className="bg-[#030712] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto bg-[#0a1120]/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border border-slate-800/80 shadow-2xl relative z-10 hover:border-cyan-500/30 transition-all duration-300">
        
        {/* Left Content */}
        <div className="max-w-lg text-center md:text-left space-y-2">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            PARTNERSHIP OPPORTUNITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Seeking Research Collaboration?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium pt-1">
            Connect with our industry-leading experts to explore partnership
            opportunities and academic research ventures.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full md:w-auto">
          <a
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 text-center hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Dept</span>
          </a>

          <a
            href="/research"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs tracking-wider uppercase py-3.5 px-6 rounded-xl border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 text-center"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Research Portal</span>
          </a>
        </div>

      </div>
    </div>
  );
}