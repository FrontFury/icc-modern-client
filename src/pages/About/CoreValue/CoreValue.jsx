import React from "react";
import { BookOpen, Trophy, Compass } from "lucide-react";

const CoreValue = () => {
  const cards = [
    {
      id: 1,
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "Comprehensive curricula designed to foster critical thinking, discipline, and outstanding HSC results across all departments.",
      badge: "Curriculum",
    },
    {
      id: 2,
      icon: Trophy,
      title: "Co-Curricular Success",
      description:
        "Empowering students through debate, sports, cultural events, and leadership programs to build well-rounded personalities.",
      badge: "Activities",
    },
    {
      id: 3,
      icon: Compass,
      title: "Career Guidance",
      description:
        "Dedicated counseling and university preparation sessions helping students navigate their higher education pathways.",
      badge: "Mentorship",
    },
  ];

  return (
    <section className="relative w-full min-h-[70vh] bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-10 h-1 bg-cyan-400 rounded-full mx-auto mb-4 shadow-[0_0_10px_#22d3ee]" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Why Choose Us
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium">
            Building a strong foundation for future academic and professional triumphs.
          </p>
        </div>

        {/* 3 Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-[#0a1120]/60 hover:bg-[#0a1120]/90 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon & Glass Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-white mb-3 tracking-snug group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1 cursor-pointer">
                    Learn more &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CoreValue;