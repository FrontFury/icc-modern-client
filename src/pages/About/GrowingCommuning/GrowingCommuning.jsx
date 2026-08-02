import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

const GrowingCommuning = () => {
  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 text-center overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Glassmorphic Container Card */}
        <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl space-y-6">
          
          {/* Cyan Pill Decorative Line */}
          <div className="w-10 h-1 bg-cyan-400 rounded-full mx-auto shadow-[0_0_10px_#22d3ee]" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Join Our Growing Community
          </h2>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Discover why thousands of students choose Ideal Commerce College for their academic journey every year.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            
            {/* Primary Cyan Button */}
            <Link
              to="/apply"
              className="w-full sm:w-auto flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Glass Button */}
            <a
              href="/ICC-Prospectus.pdf"
              download
              className="w-full sm:w-auto flex-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Prospectus</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default GrowingCommuning;