import React, { useState } from 'react';
import { 
  Languages, 
  Trophy, 
  MessageSquare, 
  Theater, 
  Briefcase, 
  Cpu, 
  Atom,
  X, 
  User, 
  ArrowRight,
  ShieldCheck,
  Users
} from 'lucide-react';

export default function CampusLifeSection() {
  const [selectedClub, setSelectedClub] = useState(null);

  // Images reference handwritten lists: Cultural, Sports, Science, English Language, Business, Debate, IT
  const clubs = [
    {
      id: 1,
      title: "Cultural Club",
      description: "Celebrating diversity and artistic expression through music, dance, drama, and traditional festivals.",
      icon: Theater,
      badge: "Arts",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      accentColor: "text-purple-400",
      convener: {
        name: "Shahnaz Binte Islam",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Khama Rani Das" },
        { role: "Member 2", name: "Dipak Biswas" },
        { role: "Member 3", name: "Rokiya Hossain Harem" },
        { role: "Member 4", name: "Umme Roksana Tabassum" },
        { role: "Member 5", name: "Krishibid Mehedi Hasan" }
      ]
    },
    {
      id: 2,
      title: "Sports Club",
      description: "Promoting physical fitness, teamwork, and competitive spirit through a variety of indoor and outdoor sports.",
      icon: Trophy,
      badge: "Athletics",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentColor: "text-amber-400",
      convener: {
        name: "Abu Al Bashar",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Kaniz Fatema" },
        { role: "Member 2", name: "Dipak Biswas" },
        { role: "Member 3", name: "Md. Robiul Hasan" }
      ]
    },
    {
      id: 3,
      title: "Science Club",
      description: "Fostering scientific curiosity, innovation, and practical experimentation through research and science fairs.",
      icon: Atom,
      badge: "Science",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentColor: "text-emerald-400",
      convener: {
        name: "Jalal Peari Arju",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Md. Imran Hossain Faisal" },
        { role: "Member 2", name: "Khama Rani Das" },
        { role: "Member 3", name: "Dipak Biswas" },
        { role: "Member 4", name: "Tarannum Mukhlasina Mahee" },
        { role: "Member 5", name: "Krishibid Mehedi Hasan" }
      ]
    },
    {
      id: 4,
      title: "English Language Club",
      description: "Fostering linguistic excellence and cross-cultural communication through workshops and multilingual events.",
      icon: Languages,
      badge: "Language",
      gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
      accentColor: "text-cyan-400",
      convener: {
        name: "Rokiya Hossain Harem",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Md. Mehedi Hasan" },
        { role: "Member 2", name: "Umme Roksana Tabassum" }
      ]
    },
    {
      id: 5,
      title: "Business Club",
      description: "Nurturing future entrepreneurs and corporate leaders through case competitions, seminars, and networking.",
      icon: Briefcase,
      badge: "Corporate",
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      accentColor: "text-blue-400",
      convener: {
        name: "Md. Shahjahan Alamgir",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Shahnaz Binte Islam" },
        { role: "Member 2", name: "Kaniz Fatema" },
        { role: "Member 3", name: "Md. Faisal Ali" }
      ]
    },
    {
      id: 6,
      title: "Debate Club",
      description: "Developing critical thinking, public speaking, and logical reasoning through structured arguments and competitions.",
      icon: MessageSquare,
      badge: "Oratory",
      gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
      accentColor: "text-yellow-400",
      convener: {
        name: "Shamima Easmin",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Kaniz Fatema" },
        { role: "Member 2", name: "Md. Faisal Ali" },
        { role: "Member 3", name: "Krishibid Mehedi Hasan" },
        { role: "Member 4", name: "Md. Robiul Hasan" }
      ]
    },
    {
      id: 7,
      title: "IT Club",
      description: "Empowering technological innovation through programming contests, web dev workshops, and tech research.",
      icon: Cpu,
      badge: "Technology",
      gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      accentColor: "text-rose-400",
      convener: {
        name: "Md. Omor Faruk",
        designation: "Convener"
      },
      panel: [
        { role: "Member 1", name: "Jharna Akter Sharna" },
        { role: "Member 2", name: "Dipak Biswas" },
        { role: "Member 3", name: "Yeahia" }
      ]
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#030712] py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden flex items-center justify-center">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 shadow-[0_0_12px_#22d3ee]" />
          <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">
            Student Experience & Leadership
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Campus Life & Executive Clubs
          </h2>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {clubs.map((club) => {
            const IconComponent = club.icon;
            return (
              <div 
                key={club.id}
                className="group relative bg-[#0a1120]/70 hover:bg-[#0d172b]/90 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700/80 rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 ${club.accentColor} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className={`text-[11px] font-bold tracking-wider uppercase bg-slate-900/90 ${club.accentColor} px-3.5 py-1.5 rounded-full border border-slate-800 shadow-md`}>
                      {club.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white mb-3 tracking-snug group-hover:text-cyan-400 transition-colors">
                    {club.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium mb-6">
                    {club.description}
                  </p>
                </div>

                {/* See More Button */}
                <div className="relative z-10 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Executive Body</span>
                  <button
                    onClick={() => setSelectedClub(club)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn cursor-pointer"
                  >
                    See More 
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal System */}
      {selectedClub && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedClub(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0b1324] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-slate-950 rounded-2xl border border-slate-800 ${selectedClub.accentColor}`}>
                  <selectedClub.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                    {selectedClub.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    {selectedClub.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedClub(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              {/* Convener Section */}
              <div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Club Convener</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl text-cyan-400 border border-slate-800">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedClub.convener.name}</h4>
                    <p className="text-xs text-slate-400">{selectedClub.convener.designation}</p>
                  </div>
                </div>
              </div>

              {/* Executive Panel Section */}
              <div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-3">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Panel Members ({selectedClub.panel.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedClub.panel.map((member, idx) => (
                    <div key={idx} className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-xl flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{member.role}</p>
                        <p className="text-sm font-bold text-white mt-0.5">{member.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedClub(null)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}