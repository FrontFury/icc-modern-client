import React from "react";
import { ArrowRight } from "lucide-react";
import faculty1 from "../../../../assets/Dept/ArtsFaculty.png";
import faculty2 from "../../../../assets/Dept/ArtsFaculty.png";
import faculty3 from "../../../../assets/Dept/ArtsFaculty.png";

const ArtsDistinguishedFaculty = () => {
  const facultyMembers = [
    {
      name: "Prof. Julian Vane",
      role: "HEAD OF HUMANITIES & LOGIC",
      bio: "Internationally recognized for his work in post-modern sculpture and sustainable urban installations.",
      image: faculty1,
    },
    {
      name: "Dr. Elena Thorne",
      role: "CHAIR OF BENGALI & LITERATURE",
      bio: "Leading scholar in 20th-century avant-garde movements and contemporary aesthetics theory.",
      image: faculty2,
    },
    {
      name: "Marcus Thorne",
      role: "PROFESSOR OF ECONOMICS & CIVICS",
      bio: "Pioneer in immersive digital design and interactive media arts, previously at the Met Media Lab.",
      image: faculty3,
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 lg:px-16 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Title and "View All" Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-1">
              OUR MENTORS
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Distinguished Faculty
              </h2>
              <div className="w-10 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] hidden sm:block" />
            </div>
            <p className="text-slate-400 text-sm sm:text-base mt-2 font-medium">
              Mentorship from leading practitioners and acclaimed researchers.
            </p>
          </div>

          <a
            href="/faculty"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 hover:text-cyan-300 uppercase transition-colors self-start md:self-auto group"
          >
            VIEW ALL FACULTY
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3-Column Faculty Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col p-6 rounded-3xl bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 justify-between"
            >
              
              {/* Faculty Image */}
              <div className="overflow-hidden mb-6 aspect-[4/5] rounded-2xl bg-slate-950 border border-slate-800 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Faculty Details */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>

                  <span className="inline-block text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full mt-2">
                    {member.role}
                  </span>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium pt-1">
                  {member.bio}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArtsDistinguishedFaculty;