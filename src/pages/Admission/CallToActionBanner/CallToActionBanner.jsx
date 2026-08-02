import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToActionBanner() {
  return (
    <div className="w-full bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 flex justify-center font-sans antialiased relative overflow-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/2 right-1/4 translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Banner Container */}
      <div className="relative max-w-5xl w-full min-h-[360px] sm:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 backdrop-blur-xl flex items-center">
        
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105 opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/rRJn68WG/Admission-Bottom.jpggit')`,
          }}
        />
        
        {/* Glassmorphic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-slate-950/85 to-transparent" />

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-xl text-white">
          
          {/* Top Tag/Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Shape Your Future
          </span>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-white">
            Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Future</span>
          </h2>

          {/* Subtitle / Description */}
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-8">
            At Ideal Commerce College, we don't just provide degrees; we build foundations for global leadership, business excellence, and lifelong success.
          </p>

          {/* Link / CTA Action */}
          <a
            href="#apply"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
          >
            <span>BEGIN YOUR JOURNEY TODAY</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

        </div>

      </div>

    </div>
  );
}