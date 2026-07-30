import React, { useState } from 'react';
import { Search, Home, GraduationCap, ArrowRight } from 'lucide-react';

export default function ErrorPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Perform search navigation or logic here
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/70 to-slate-200/50 flex flex-col items-center justify-center px-4 font-sans text-slate-800">
      <div className="max-w-xl w-full text-center relative">
        
        {/* Large Faded "404" Background Text */}
        <div className="relative mb-[-3.5rem] sm:mb-[-4.5rem] select-none pointer-events-none">
          <span className="text-[120px] sm:text-[170px] font-extrabold tracking-tight text-slate-200/80 leading-none">
            404
          </span>
        </div>

        {/* Page Title */}
        <h1 className="relative text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Page Not Found
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto">
          We apologize for the inconvenience. The scholarly resources or institutional pages you are seeking might have been relocated, archived, or are currently unavailable.
        </p>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search academic resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-100/80 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition shadow-sm"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </a>

          <a
            href="/portal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-blue-600 font-medium text-sm rounded-xl border border-blue-500/80 transition shadow-sm"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Visit Student Portal</span>
          </a>
        </div>

        {/* Divider Line */}
        <div className="w-full border-t border-slate-200/80 mb-8" />

        {/* Support Link */}
        <p className="text-xs sm:text-sm text-slate-500">
          Need further assistance?{' '}
          <a
            href="/support"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition group"
          >
            <span>Contact Support Center</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </p>

      </div>
    </div>
  );
}