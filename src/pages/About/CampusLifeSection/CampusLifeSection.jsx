import React from 'react';
import { Languages, Trophy, MessageSquare, Theater } from 'lucide-react';

export default function CampusLifeSection() {
  const clubs = [
    {
      id: 1,
      title: "Language Club",
      description: "Fostering linguistic excellence and cross-cultural communication through workshops and multilingual events.",
      icon: Languages,
      badge: "Language"
    },
    {
      id: 2,
      title: "Sports Club",
      description: "Promoting physical fitness, teamwork, and competitive spirit through a variety of indoor and outdoor sports.",
      icon: Trophy,
      badge: "Athletics"
    },
    {
      id: 3,
      title: "Debate Club",
      description: "Developing critical thinking, public speaking, and logical reasoning through structured arguments and competitions.",
      icon: MessageSquare,
      badge: "Oratory"
    },
    {
      id: 4,
      title: "Cultural Club",
      description: "Celebrating diversity and artistic expression through music, dance, drama, and traditional festivals.",
      icon: Theater,
      badge: "Arts"
    }
  ];

  return (
    <section className="relative w-full min-h-[70vh] bg-[#030712] py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden flex items-center justify-center">
      
      {/* Dynamic Background Ambient Light Glows */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-10 h-1 bg-cyan-400 rounded-full mx-auto mb-4 shadow-[0_0_10px_#22d3ee]" />
          <p className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2">
            Student Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Campus Life & Clubs
          </h2>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club) => {
            const IconComponent = club.icon;
            return (
              <div 
                key={club.id}
                className="group relative bg-[#0a1120]/60 hover:bg-[#0a1120]/90 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon & Glowing Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                      {club.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-white mb-3 tracking-snug group-hover:text-cyan-400 transition-colors">
                    {club.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {club.description}
                  </p>
                </div>


              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}