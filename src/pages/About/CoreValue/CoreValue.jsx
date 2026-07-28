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
    <section className="relative w-full min-h-[70vh] bg-secondary from-slate-900 via-blue-950 to-slate-900 py-20 px-6 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center">
      
      {/* Background Decorative Glow Blobs (To enhance the glass effect) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Why Choose Us
          </h2>
          <div className="w-12 h-1 bg-amber-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-300 text-sm md:text-base">
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
                className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-white/40 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon & Glass Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-white/10 text-slate-200 px-3 py-1 rounded-full border border-white/10">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1 cursor-pointer">
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