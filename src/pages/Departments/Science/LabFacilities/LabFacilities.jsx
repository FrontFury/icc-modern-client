import React from "react";
import scienceLabImg from ".././../../../assets/Dept/Science Pro.jpg";

const LabFacilities = () => {
  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Stats Cards */}
        <div className="lg:col-span-6 space-y-6">
          {/* Subtitle Badge */}
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            RESEARCH & INNOVATION
          </span>

          {/* Heading */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Empowering the Next Generation of Scientists
            </h2>
            <div className="w-12 h-1 bg-cyan-400 rounded-full mt-3 shadow-[0_0_10px_#22d3ee]" />
          </div>

          {/* First Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-2 font-medium">
            The Science Department at Ideal Commerce College is dedicated to providing a transformative educational experience. We focus on bridging the gap between theoretical foundations and practical application in <strong className="font-semibold text-slate-200">Physics, Chemistry, Mathematics, and Biology</strong>.
          </p>

          {/* Second Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
            Our curriculum is meticulously designed to cultivate analytical thinking, fostering a culture of curiosity and evidence-based problem solving. We believe that a strong scientific foundation is the cornerstone of modern innovation and global progress.
          </p>

          {/* Stats Boxes Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {/* Stat Box 1 */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-cyan-500/40 transition-colors">
              <h3 className="text-2xl md:text-3xl font-black text-white">
                98%
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                Board Exam Success
              </p>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-cyan-500/40 transition-colors">
              <h3 className="text-2xl md:text-3xl font-black text-cyan-400">
                15+
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                Expert Faculty
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image Container */}
        <div className="lg:col-span-6">
          <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-3 md:p-4 shadow-2xl relative overflow-hidden">
            <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 relative">
              <img
                src={scienceLabImg}
                alt="Students conducting research in the Science Laboratory"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
              State-of-the-art laboratory facilities supporting practical experimentation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LabFacilities;