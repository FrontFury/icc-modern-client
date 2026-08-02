import React from "react";
import { Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

// Replace these imports with your actual leader photo assets
import leader1 from "../../../assets/Esteemed Leaders/Principle.png";
import leader2 from "../../../assets/Esteemed Leaders/vice-principal.png";

const ExecutiveLeader = () => {
  const leaders = [
    {
      id: 1,
      name: "MD. AMJAD HOSSAIN",
      role: "PRINCIPAL",
      description:
        "With over 20 years in academic administration, Md. Amjad Hossain has pioneered numerous college excellence initiatives and remains dedicated to student success and discipline.",
      image: leader1,
      email: "principal@icc.edu.bd",
      bioLink: "#",
    },
    {
      id: 2,
      name: "SHAHNAZ BINTE ISLAM",
      role: "VICE-PRINCIPAL",
      description:
        "Shahnaz Binte Islam leads the Academic Affairs division, focusing on HSC curriculum innovation, student mentorship, and fostering an inspiring campus environment.",
      image: leader2,
      email: "viceprincipal@icc.edu.bd",
      bioLink: "#",
    },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-20 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            {/* Subtitle Badge */}
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
              OUR PEOPLE
            </span>

            {/* Title with Cyan Accent Line */}
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Executive Leadership
            </h2>
            <div className="w-10 h-1 bg-cyan-400 rounded-full !mt-2 mb-4 shadow-[0_0_10px_#22d3ee]" />

            {/* Subtext */}
            <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-1 font-medium">
              Led by visionary educators and administrators dedicated to the mission of institutional growth and student success.
            </p>
          </div>

          {/* Header Action Button */}
          <div className="shrink-0">
            <Link
              to="/faculty"
              className="inline-block bg-[#0a1120]/80 hover:bg-cyan-500 hover:text-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-200 text-xs font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
            >
              View All Faculty &rarr;
            </Link>
          </div>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="group bg-[#0a1120]/60 hover:bg-[#0a1120]/90 backdrop-blur-md rounded-2xl border border-slate-800/80 hover:border-slate-700 p-6 md:p-8 shadow-xl flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Leader Image */}
              <div className="w-40 h-44 sm:w-44 sm:h-48 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800 shadow-md">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Leader Content */}
              <div className="flex flex-col justify-between h-full space-y-3 text-center sm:text-left flex-1">
                <div>
                  {/* Name */}
                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                    {leader.name}
                  </h3>

                  {/* Role Badge */}
                  <span className="inline-block text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full mt-2">
                    {leader.role}
                  </span>

                  {/* Bio Paragraph */}
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-3 font-medium">
                    {leader.description}
                  </p>
                </div>

                {/* Bottom Icon Links */}
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-3 text-slate-400 border-t border-slate-800/80">
                  <a
                    href={`mailto:${leader.email}`}
                    className="p-2 bg-slate-900/80 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-800 rounded-lg transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={leader.bioLink}
                    className="p-2 bg-slate-900/80 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-800 rounded-lg transition-colors"
                    title="View Bio/Document"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExecutiveLeader;