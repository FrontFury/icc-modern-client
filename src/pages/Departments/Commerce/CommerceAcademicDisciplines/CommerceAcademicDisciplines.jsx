import React from "react";
import { Landmark, TrendingUp, Users, Rocket } from "lucide-react";

const CommerceAcademicDisciplines = () => {
  const disciplines = [
    {
      id: 1,
      title: "Accounting",
      description:
        "Focusing on fiscal transparency, auditing standards, and advanced management accounting for the modern firm.",
      icon: Landmark,
    },
    {
      id: 2,
      title: "Finance",
      description:
        "Mastery of capital markets, investment strategies, risk assessment, and global banking operations.",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Management",
      description:
        "Strategic leadership, organizational behavior, and operations management in a globalized business context.",
      icon: Users,
    },
    {
      id: 4,
      title: "Entrepreneurship",
      description:
        "Incubating innovation, venture capital acquisition, and the development of sustainable new business models.",
      icon: Rocket,
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-16 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            BUSINESS CURRICULUM
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Core Academic Disciplines
          </h2>

          {/* Cyan Neon Accent Line */}
          <div className="w-12 h-1 bg-cyan-400 rounded-full mx-auto shadow-[0_0_10px_#22d3ee]" />

          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium pt-1">
            A comprehensive curriculum structured to provide mastery over the essential pillars of the global economy.
          </p>
        </div>

        {/* 4 Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-[#0a1120]/60 backdrop-blur-md hover:bg-[#0f172a]/90 rounded-3xl p-7 shadow-2xl border border-slate-800/80 hover:border-cyan-500/50 border-l-[3.5px] border-l-cyan-400 flex flex-col justify-start space-y-4 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Cyan Glowing Icon Wrapper */}
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                  <IconComponent className="w-6 h-6 text-cyan-400 stroke-[2]" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CommerceAcademicDisciplines;