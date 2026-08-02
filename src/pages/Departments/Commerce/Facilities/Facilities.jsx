import React from "react";
import businessLeaderImg from "../../../../assets/Dept/CommerceFacilities.jpg";

const Facilities = () => {
  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Metrics */}
        <div className="lg:col-span-6 space-y-6">
          {/* Badge Label */}
          <div>
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
              Academic Excellence
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Empowering Future Business Leaders
          </h2>

          {/* First Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-1 font-medium">
            The Business Studies Department at Ideal Commerce College stands at the intersection of traditional academic rigor and modern corporate practice. Our curriculum is meticulously designed to provide students with a deep understanding of market dynamics, financial systems, and ethical governance.
          </p>

          {/* Second Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
            We cultivate a high-performance culture where theoretical knowledge meets real-world application, ensuring our graduates are not just prepared for the workforce, but ready to lead it.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-800/80">
            {/* Stat 1 */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                95%
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Board & Career Success
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                50+
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Academic & Corporate Network
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Image with Glassmorphic Frame */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-[#0a1120]/60 backdrop-blur-md p-2.5 transition-all duration-300 hover:border-cyan-500/40 group">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[5/4] bg-slate-950 relative">
              <img
                src={businessLeaderImg}
                alt="Student working on business strategy in computer lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Facilities;