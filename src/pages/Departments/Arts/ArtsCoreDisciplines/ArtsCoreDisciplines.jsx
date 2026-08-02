import React from "react";
import { Brain, Landmark, BookOpen, Languages, ArrowRight } from "lucide-react";

const ArtsCoreDisciplines = () => {
  const disciplines = [
    {
      title: "Logic & Philosophy",
      description:
        "Exploring the principles of critical reasoning, formal logic, and ethical thought to build strong analytical skills.",
      icon: Brain,
      link: "/departments/arts/logic",
    },
    {
      title: "History & Civics",
      description:
        "Uncovering national and global history alongside political structures to foster responsible civic leadership.",
      icon: Landmark,
      link: "/departments/arts/history",
    },
    {
      title: "Bengali & English Literature",
      description:
        "Engaging with classic and contemporary literary works to foster deep linguistic proficiency and creative expression.",
      icon: BookOpen,
      link: "/departments/arts/literature",
    },
    {
      title: "Economics & Social Work",
      description:
        "Understanding socio-economic frameworks, development models, and community engagement for social impact.",
      icon: Languages,
      link: "/departments/arts/economics",
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 lg:px-16 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            HUMANITIES & ARTS
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Core Academic Disciplines
          </h2>

          {/* Cyan Neon Accent Line */}
          <div className="w-12 h-1 bg-cyan-400 rounded-full mx-auto shadow-[0_0_10px_#22d3ee]" />

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium pt-1">
            A comprehensive curriculum structured to provide mastery over the essential pillars of creative expression and cultural discourse.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group bg-[#0a1120]/60 backdrop-blur-md hover:bg-[#0f172a]/90 rounded-3xl p-7 shadow-2xl border border-slate-800/80 hover:border-cyan-500/50 border-l-[3.5px] border-l-cyan-400 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Cyan Glowing Icon Box */}
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:border-cyan-500/40 transition-colors">
                    <IconComponent className="w-6 h-6 text-cyan-400 stroke-[2]" />
                  </div>

                  {/* Discipline Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Discipline Description */}
                  <p className="text-slate-400 text-xs leading-relaxed font-medium mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-300 uppercase hover:text-cyan-400 transition-colors group/link"
                  >
                    Explore Program
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ArtsCoreDisciplines;