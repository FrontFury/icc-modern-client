import React from "react";
import { Monitor, Archive, Users, ArrowRight } from "lucide-react";

// Internal image imports
import tallFacilityImg from "../../../../assets/Dept/Arts1.jpg";
import topRightImg from "../../../../assets/Dept/Arts2.jpg";
import bottomRightImg from "../../../../assets/Dept/Arts3.jpg";

export default function ArtsFacilitiesAndCTA() {
  const facilities = [
    {
      title: "Digital Humanities & Computer Lab",
      description:
        "Modern computational facilities for academic research and media studies.",
      icon: Monitor,
    },
    {
      title: "Central Library & Seminar Archive",
      description:
        "Rich collection of academic journals, rare references, and historical records.",
      icon: Archive,
    },
    {
      title: "Interactive Seminar Rooms",
      description:
        "Collaborative spaces built for group discussions, debate practice, and presentations.",
      icon: Users,
    },
  ];

  return (
    <div className="w-full bg-[#030712] font-sans text-white overflow-hidden">
      {/* SECTION 1: Dark Research Facilities Section */}
      <section className="relative py-20 px-6 lg:px-16">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Heading & Feature Icons (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
                WORLD-CLASS INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">
                Humanities &amp; Academic Facilities
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium pt-1">
                Our campus facilities are thoughtfully designed to nurture academic rigor, analytical discussion, and a rich understanding of human culture.
              </p>
            </div>

            {/* Feature List with Glassmorphic Badges */}
            <div className="space-y-4 pt-2">
              {facilities.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                  >
                    <div className="bg-cyan-500/10 p-3 rounded-xl shrink-0 flex items-center justify-center border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3-Image Collage Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Left Tall Image */}
            <div className="h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-slate-800/80 bg-[#0a1120]/60 backdrop-blur-md p-2 hover:border-cyan-500/40 transition-all duration-300 group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={tallFacilityImg}
                  alt="Digital Humanities Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Stacked 2 Images */}
            <div className="flex flex-col gap-4 h-[420px] sm:h-[520px]">
              <div className="h-1/2 rounded-3xl overflow-hidden border border-slate-800/80 bg-[#0a1120]/60 backdrop-blur-md p-2 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src={topRightImg}
                    alt="Student Discussion Area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="h-1/2 rounded-3xl overflow-hidden border border-slate-800/80 bg-[#0a1120]/60 backdrop-blur-md p-2 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src={bottomRightImg}
                    alt="Cultural Exhibition"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Glassmorphic Dark CTA Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Background Glow Filter */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 p-10 sm:p-14 rounded-3xl bg-[#0a1120]/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-6">
          
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full">
            ADMISSIONS NOW OPEN
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Join the Movement
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Embark on a journey of academic excellence and secure your future in higher education. Higher Secondary admission applications for the Arts group are now open.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              APPLY NOW
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 hover:text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl border border-slate-700/80 hover:border-slate-600 transition-all duration-300"
            >
              REQUEST PROSPECTUS
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}