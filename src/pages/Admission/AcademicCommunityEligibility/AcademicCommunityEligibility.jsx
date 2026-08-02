import React from 'react';
import { FlaskConical, Briefcase, Palette, ArrowRight, Download, Sparkles } from 'lucide-react';

export default function AcademicCommunityEligibility() {
  const eligibilityData = [
    {
      id: 'science',
      title: 'Science',
      icon: FlaskConical,
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      gpaColor: 'text-cyan-400',
      description:
        'For students pursuing advanced pathways in technology, medical studies, engineering, and scientific research.',
      gpa: 'GPA 4.00+',
    },
    {
      id: 'commerce',
      title: 'Commerce',
      icon: Briefcase,
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      gpaColor: 'text-amber-400',
      description:
        'Ideal for future leaders in finance, business analytics, accounting, management, and entrepreneurship.',
      gpa: 'GPA 3.00+',
    },
    {
      id: 'arts',
      title: 'Arts',
      icon: Palette,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      gpaColor: 'text-emerald-400',
      description:
        'Fostering critical thinking, social sciences, media, law, creative expression, and humanities.',
      gpa: 'GPA 2.50+',
    },
  ];

  return (
    <div className="w-full bg-[#030712] text-slate-100 font-sans antialiased relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Dark Hero Section */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-20 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          {/* Pill Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-bold tracking-widest uppercase rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            ENROLLMENT 2026–2027
          </span>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Academic Community</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-10 font-medium">
            Ideal Commerce College seeks intellectually curious and driven students ready to achieve academic excellence. Our admission process is designed to identify promising individuals across Science, Commerce, and Arts faculties.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#brochure"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-500/40 text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>View Prospectus</span>
            </a>
          </div>
        </div>
      </section>

      {/* Minimum Eligibility Criteria Section */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400 uppercase block">
              ADMISSION STANDARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Minimum Eligibility Criteria
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
              Based on standard academic assessment under Dhaka BISE, our admission requirements ensure a high standard of educational excellence across all faculties.
            </p>
          </div>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eligibilityData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-[#0a1120]/80 backdrop-blur-md rounded-2xl p-7 border border-slate-800/80 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Icon Badge */}
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-transform group-hover:scale-105 ${item.iconBg}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Faculty Title */}
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
                      {item.description}
                    </p>
                  </div>

                  {/* GPA Display Footer */}
                  <div className="flex items-baseline gap-2.5 pt-5 border-t border-slate-800/80">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tight ${item.gpaColor}`}>
                      {item.gpa}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Minimum
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}