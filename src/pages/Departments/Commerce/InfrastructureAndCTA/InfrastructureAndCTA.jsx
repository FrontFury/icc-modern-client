import React from "react";
import { TrendingUp, Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import image01 from "../../../../assets/Dept/Commerce1.jpg";
import image02 from "../../../../assets/Dept/Commerce2.jpg";
import image03 from "../../../../assets/Dept/Commerce3.jpg";

const InfrastructureAndCTA = () => {
  const features = [
    {
      id: 1,
      title: "Mock Trading Floor",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Entrepreneurship Hub",
      icon: Lightbulb,
    },
    {
      id: 3,
      title: "Digital Business Library",
      icon: BookOpen,
    },
  ];

  return (
    <div className="w-full bg-[#030712] font-sans overflow-hidden">
      
      {/* 1. Global Infrastructure Section */}
      <section className="relative w-full py-20 px-6 md:px-12 lg:px-20">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-1">
                FACILITIES
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Global Infrastructure
              </h2>
              <div className="w-12 h-1 bg-cyan-400 rounded-full mt-3 shadow-[0_0_10px_#22d3ee]" />
            </div>

            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md font-medium">
              Our facilities are designed to mirror the actual environments of the professional world, ensuring seamless transition from student to practitioner.
            </p>

            {/* Feature List with Icons */}
            <div className="space-y-3 pt-2">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-200">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Masonry Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tall Left Image */}
            <div className="sm:row-span-2 rounded-3xl overflow-hidden h-[340px] sm:h-full border border-slate-800/80 bg-[#0a1120]/60 p-2 shadow-2xl group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={image01}
                  alt="Mock Trading Floor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Top Right Image */}
            <div className="rounded-3xl overflow-hidden h-[190px] border border-slate-800/80 bg-[#0a1120]/60 p-2 shadow-2xl group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={image02}
                  alt="Entrepreneurship Hub"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bottom Right Image */}
            <div className="rounded-3xl overflow-hidden h-[190px] border border-slate-800/80 bg-[#0a1120]/60 p-2 shadow-2xl group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={image03}
                  alt="Digital Business Library"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Call-to-Action Section */}
      <section className="relative w-full py-20 px-6 text-center border-t border-slate-800/80">
        
        {/* Glowing Center Spot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            ADMISSIONS OPEN
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Begin Your Professional Journey Today
          </h2>

          <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
            Join a legacy of excellence and secure your future in the world of business and commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#apply"
              className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center gap-2 group"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#prospectus"
              className="w-full sm:w-auto bg-[#0a1120]/80 hover:bg-slate-800/80 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-bold px-8 py-3.5 rounded-2xl transition-all duration-300"
            >
              Download Prospectus
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default InfrastructureAndCTA;