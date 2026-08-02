import React from "react";
import { ArrowRight } from "lucide-react";

const CommerceFaculty = () => {
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Khandaker M. Sohel",
      role: "PRINCIPAL & PROFESSOR OF COMMERCE",
      bio: "Leading academic in corporate governance and educational management with over 20 years of academic excellence.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "Prof. Bazlur Rahman",
      role: "HEAD OF ACCOUNTING & FINANCE",
      bio: "Expert in financial risk management, fiscal strategy, and national curricula development for commerce education.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Prof. Moniruzzaman",
      role: "DIRECTOR OF BUSINESS STUDIES",
      bio: "Specializing in corporate strategy, organizational behavior, and modern entrepreneurship training.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-1">
              OUR LEADERSHIP
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Distinguished Faculty
              </h2>
              <div className="w-10 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] hidden sm:block" />
            </div>
          </div>

          <a
            href="#all-faculty"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto group"
          >
            View All Faculty{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((faculty) => (
            <div
              key={faculty.id}
              className="group bg-[#0a1120]/60 backdrop-blur-md hover:bg-[#0f172a]/90 rounded-3xl p-6 border border-slate-800/80 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Container */}
                <div className="aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Information */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                    {faculty.name}
                  </h3>

                  <span className="inline-block text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    {faculty.role}
                  </span>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium pt-1">
                    {faculty.bio}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommerceFaculty;