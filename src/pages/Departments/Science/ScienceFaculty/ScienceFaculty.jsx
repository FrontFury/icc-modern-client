import React from "react";
import faculty1 from "../../../../assets/Dept/faculty-chemistry.jpg";
import faculty2 from "../../../../assets/Dept/faculty-math.png";
import faculty3 from "../../../../assets/Dept/faculty-biology.png";
import faculty4 from "../../../../assets/Dept/faculty-physics.png";

const ScienceFaculty = () => {
  const facultyMembers = [
    {
      id: 1,
      name: "MD. HABIBUR RAHMAN HABIB",
      role: "ASSISTANT PROFESSOR (CHEMISTRY)",
      qualification: "Ph.D. in Organic Chemistry, BUET",
      image: faculty1,
    },
    {
      id: 2,
      name: "MD. IMRAN HOSSAIN FAISAL",
      role: "HEAD OF DEPARTMENT (MATH)",
      qualification: "25+ Years of Academic Excellence",
      image: faculty2,
    },
    {
      id: 3,
      name: "JALAL PEARI ARJU",
      role: "LECTURER (BIOLOGY)",
      qualification: "M.Sc. in Molecular Biology, RU",
      image: faculty3,
    },
    {
      id: 4,
      name: "DIPAK BISWAS",
      role: "LECTURER (PHYSICS)",
      qualification: "M.Sc. in Theoretical Physics, DU",
      image: faculty4,
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-16 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
            OUR ACADEMICS
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Distinguished Faculty
          </h2>

          {/* Cyan Neon Accent Line */}
          <div className="w-12 h-1 bg-cyan-400 rounded-full mx-auto shadow-[0_0_10px_#22d3ee]" />

          {/* Subtitle */}
          <p className="text-slate-400 text-sm md:text-base pt-2 leading-relaxed font-medium">
            Guided by world-class educators and industry veterans dedicated to academic mentorship and research leadership.
          </p>
        </div>

        {/* Faculty Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facultyMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-[#0a1120]/60 backdrop-blur-md hover:bg-[#0f172a]/90 rounded-3xl p-5 border border-slate-800/80 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Profile Image Box */}
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-slate-800 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text Info */}
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  
                  <span className="inline-block text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Qualification Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <p className="text-xs text-slate-400 font-medium">
                  {member.qualification}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ScienceFaculty;