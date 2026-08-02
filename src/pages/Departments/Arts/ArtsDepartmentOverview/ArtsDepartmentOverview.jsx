import React from "react";
import artsImg from "../../../../assets/Dept/ArtsDepartmentOverview.jpg";

export default function ArtsDepartmentOverview() {
  return (
    <section className="relative w-full bg-[#030712] py-16 md:py-20 px-6 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Typography & Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow / Badge */}
          <div>
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[11px] tracking-wider uppercase px-3.5 py-1.5 rounded-full">
              HUMANITIES &amp; ARTS EXCELLENCE
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">
            Empowering Future Creative &amp; Social Leaders
          </h2>

          {/* Descriptive Content */}
          <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
            <p>
              The Arts (Humanities) Department at Ideal Commerce College stands at the intersection of critical thinking, cultural heritage, and modern expression. Our curriculum is thoughtfully designed to build strong academic foundations in subjects like Economics, Civics, Logic, Islamic History, and Social Work, preparing students for higher studies at top public universities and national institutes.
            </p>
            <p>
              We cultivate a disciplined learning environment supported by experienced faculty, active debate clubs, and literary initiatives. Students master analytical writing and verbal reasoning while developing an empathetic understanding of global and local social frameworks.
            </p>
          </div>

          <div className="border-t border-slate-800/80 my-6" />

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div>
              <span className="block text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                95%+
              </span>
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mt-1 block">
                University Success Rate
              </span>
            </div>

            <div>
              <span className="block text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                100%
              </span>
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mt-1 block">
                Board Exam Eligibility
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Featured Image with Glassmorphic Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[480px]">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-[#0a1120]/60 backdrop-blur-md p-2.5 transition-all duration-300 hover:border-cyan-500/40 group">
              <div className="rounded-2xl overflow-hidden bg-slate-950 relative">
                <img
                  src={artsImg}
                  alt="Ideal Commerce College Arts Department"
                  className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}