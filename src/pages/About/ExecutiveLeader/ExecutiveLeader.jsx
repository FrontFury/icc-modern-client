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
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            {/* Subtitle Badge */}
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block">
              OUR PEOPLE
            </span>

            {/* Title with Gold Accent Line */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Executive Leadership
            </h2>
            <div className="w-10 h-1 bg-amber-400 rounded-full !mt-2 mb-4" />

            {/* Subtext */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-1">
              Led by visionary educators and administrators dedicated to the mission of institutional growth and student success.
            </p>
          </div>

          {/* Header Action Button */}
          <div className="shrink-0">
            <Link
              to="/faculty"
              className="inline-block bg-transparent border border-gray-400 hover:border-gray-900 text-[#111827] hover:bg-[#111827] hover:text-white text-xs font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              View All Faculty
            </Link>
          </div>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-shadow hover:shadow-md"
            >
              {/* Leader Image */}
              <div className="w-40 h-44 sm:w-44 sm:h-48 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Leader Content */}
              <div className="flex flex-col justify-between h-full space-y-3 text-center sm:text-left">
                <div>
                  {/* Name */}
                  <h3 className="text-xl font-extrabold text-[#111827]">
                    {leader.name}
                  </h3>

                  {/* Role Badge */}
                  <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase block mt-1">
                    {leader.role}
                  </span>

                  {/* Bio Paragraph */}
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mt-3">
                    {leader.description}
                  </p>
                </div>

                {/* Bottom Icon Links */}
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-gray-500">
                  <a
                    href={`mailto:${leader.email}`}
                    className="p-1 hover:text-[#2563eb] transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={leader.bioLink}
                    className="p-1 hover:text-[#2563eb] transition-colors"
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