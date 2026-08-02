import React from "react";
import campusPhoto from "../../../assets/About/AboutSub.png";

const HistorySection = () => {
  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subtitle Badge */}
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            HERITAGE
          </span>

          {/* Heading */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Our History
            </h2>
            <div className="w-12 h-1 bg-cyan-400 rounded-full mt-3 shadow-[0_0_10px_#22d3ee]" />
          </div>

          {/* First Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-2 font-medium">
            Established in 2004 under the Ideal Education Group, Ideal Commerce College (ICC) was founded with a vision to deliver exemplary academic standards in business and science education. What began as a dedicated initiative in Farmgate, Dhaka, has grown into one of the country's most respected higher secondary institutions.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-8 py-4 my-2">
            {/* Stat 1 */}
            <div className="border-l-2 border-cyan-400 pl-4">
              <h3 className="text-3xl font-black text-white">20+</h3>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                Years of Excellence
              </p>
            </div>

            {/* Stat 2 */}
            <div className="border-l-2 border-indigo-500/50 pl-4">
              <h3 className="text-3xl font-black text-cyan-400">2.5k+</h3>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                Global Alumni
              </p>
            </div>
          </div>

          {/* Second Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
            Throughout two decades, we have remained steadfast in our commitment to academic discipline and character development. From pioneering rigorous HSC preparation programs to fostering modern computer lab research and cultural excellence, our growth reflects our adaptability and unwavering standards.
          </p>
        </div>

        {/* Right Column: Glassmorphic UI Mockup Display */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Mini Navbar Mockup */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20">
                  I
                </div>
                <span className="font-bold text-sm text-white tracking-tight">
                  Ideal Commerce College
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                <span className="hover:text-slate-200 transition-colors">Home</span>
                <span className="text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                  About Us
                </span>
                <span className="hover:text-slate-200 transition-colors">Academics</span>
                <span className="hover:text-slate-200 transition-colors">Admissions</span>
                <span className="hover:text-slate-200 transition-colors">News</span>
                <span className="hover:text-slate-200 transition-colors">Contact</span>
              </div>
            </div>

            {/* Sub-header Mockup */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white">
                About Us <span className="text-slate-500 font-normal">| Our Heritage</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xl font-medium">
                Since 2004, Ideal Commerce College has stood as a beacon of academic discipline and modern education. Our campus embodies the enduring spirit of our founding values.
              </p>
            </div>

            {/* Photo Card */}
            <div className="bg-slate-900/80 p-2.5 md:p-3 rounded-2xl border border-slate-800 shadow-md">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={campusPhoto}
                  alt="Ideal Commerce College Campus"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2.5 font-medium">
                Main Campus — The heart of Ideal Commerce College academic community.
              </p>
            </div>

            {/* Mini Footer Info */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-400">
              <div>
                <span className="font-bold text-cyan-400 block mb-1 uppercase tracking-wider">
                  + Our Mission
                </span>
                <p className="line-clamp-2 text-slate-400 leading-relaxed font-medium">
                  Providing quality education, fostering discipline, and shaping future leaders for Bangladesh and beyond.
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-300 block mb-1 uppercase tracking-wider">
                  Key Milestones
                </span>
                <div className="grid grid-cols-2 gap-y-0.5 text-slate-400 font-medium">
                  <span>2004: Founding</span>
                  <span>2012: Science Dept</span>
                  <span>2018: Expansion</span>
                  <span>2024: 20th Year</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;