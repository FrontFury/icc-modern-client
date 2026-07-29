import React from 'react';
import { FlaskConical, Briefcase, Palette, ArrowRight, Download } from 'lucide-react';

export default function AcademicCommunityEligibility() {
  const eligibilityData = [
    {
      id: 'science',
      title: 'Science',
      icon: FlaskConical,
      iconBg: 'bg-blue-100 text-blue-600',
      description:
        'For students pursuing advanced pathways in technology, medical studies, engineering, and scientific research.',
      gpa: 'GPA 4.00+',
    },
    {
      id: 'commerce',
      title: 'Commerce',
      icon: Briefcase,
      iconBg: 'bg-amber-100 text-amber-700',
      description:
        'Ideal for future leaders in finance, business analytics, accounting, management, and entrepreneurship.',
      gpa: 'GPA 3.00+',
    },
    {
      id: 'arts',
      title: 'Arts',
      icon: Palette,
      iconBg: 'bg-indigo-100 text-indigo-600',
      description:
        'Fostering critical thinking, social sciences, media, law, creative expression, and humanities.',
      gpa: 'GPA 2.50+',
    },
  ];

  return (
    <div className="w-full font-sans antialiased text-slate-800">
      
      {/* Dark Hero Section */}
      <section className="bg-secondary text-white py-16 px-6 sm:px-12 lg:px-45 border-b border-slate-800">
        <div className="max-w-4xl">
          {/* Pill Badge */}
          <span className="inline-block px-3 py-1 bg-[#d97706]/20 border border-[#d97706]/30 text-[#fef3c7] text-[11px] font-bold uppercase tracking-wider rounded-full mb-6">
            ENROLLMENT 2026–2027
          </span>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Join Our Academic Community
          </h1>

          {/* Subtext */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Ideal Commerce College seeks intellectually curious and driven students ready to achieve academic excellence. Our admission process is designed to identify promising individuals across Science, Commerce, and Arts faculties.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1d4ed8] hover:bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md transition"
            >
              Apply Now
            </a>
            <a
              href="#brochure"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold rounded-lg transition"
            >
              View Prospectus
            </a>
          </div>
        </div>
      </section>

      {/* Light Minimum Eligibility Criteria Section */}
      <section className="bg-[#f8fafc] py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Minimum Eligibility Criteria
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
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
                  className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Icon Badge */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${item.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Faculty Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-8">
                      {item.description}
                    </p>
                  </div>

                  {/* GPA Display Footer */}
                  <div className="flex items-baseline gap-2 pt-4 border-t border-slate-100">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {item.gpa}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
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