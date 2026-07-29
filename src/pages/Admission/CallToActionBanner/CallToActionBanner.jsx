import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CallToActionBanner() {
  return (
    <div className="w-full bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 flex justify-center font-sans antialiased">
      
      {/* Main Banner Container */}
      <div className="relative max-w-5xl w-full min-h-[360px] sm:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex items-center">
        
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/rRJn68WG/Admission-Bottom.jpggit')`,
          }}
        />
        
        {/* Dark Linear Gradient Overlay for High Contrast Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-xl text-white">
          
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Invest in Your Future
          </h2>

          {/* Subtitle / Description */}
          <p className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed mb-8 text-shadow-sm">
            At Ideal Commerce College, we don't just provide degrees; we build foundations for global leadership, business excellence, and lifelong success.
          </p>

          {/* Link / CTA Action */}
          <a
            href="#apply"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white hover:text-blue-400 transition-colors duration-200"
          >
            <span className="border-b-2 border-transparent group-hover:border-blue-400 pb-0.5 transition-all">
              BEGIN YOUR JOURNEY TODAY
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </a>

        </div>

      </div>

    </div>
  );
}