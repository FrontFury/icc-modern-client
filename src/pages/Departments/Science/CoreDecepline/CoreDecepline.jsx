import { ArrowRight, FlaskConical, Dna, Sigma, Terminal, Bot } from "lucide-react";

const CoreDecepline = () => {
  return (
    <section className="w-full bg-[#f4f9f6] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Core Academic Disciplines
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              A comprehensive curriculum designed for competitive excellence in higher education.
            </p>
          </div>

          <a
            href="/syllabus"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] hover:text-[#003da8] transition-colors self-start md:self-auto"
          >
            View Full Syllabus <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Top Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Featured Physics Card */}
          <div className="group lg:col-span-8 bg-white hover:bg-[#111827] transition-all duration-300 rounded-2xl p-8 border border-gray-200/80 hover:border-gray-800 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-[#2563eb] group-hover:text-blue-400 uppercase block mb-1 transition-colors">
                ADVANCED PHYSICS
              </span>
              <h3 className="text-2xl font-extrabold text-[#111827] group-hover:text-white mb-3 transition-colors">
                Physics
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed max-w-lg mb-8 transition-colors">
                Exploring the fundamental laws of the universe, from quantum mechanics to astrophysics. Emphasis on experimental verification and mathematical modeling.
              </p>

              {/* Sub-topics list */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-gray-700 group-hover:text-gray-300 font-semibold max-w-md transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] group-hover:bg-blue-400" />
                  Mechanics
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] group-hover:bg-blue-400" />
                  Thermodynamics
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] group-hover:bg-blue-400" />
                  Electromagnetism
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] group-hover:bg-blue-400" />
                  Optics
                </div>
              </div>
            </div>

            {/* Background Illustration Icon */}
            <div className="absolute right-6 top-8 text-gray-200/80 group-hover:text-gray-800/50 pointer-events-none hidden sm:block transition-colors">
              <Bot className="w-28 h-28 stroke-[1]" />
            </div>
          </div>

          {/* Featured Chemistry Card with Hover Effect */}
          <div className="group lg:col-span-4 bg-white hover:bg-[#111827] transition-all duration-300 rounded-2xl p-8 border border-gray-200/80 hover:border-gray-800 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <FlaskConical className="w-7 h-7 text-[#2563eb] group-hover:text-gray-300 mb-6 transition-colors" />
              <h3 className="text-2xl font-bold text-[#111827] group-hover:text-white mb-3 transition-colors">
                Chemistry
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-xs leading-relaxed transition-colors">
                Investigating the composition, structure, and properties of matter and chemical transformations.
              </p>
            </div>

            <button className="w-full mt-6 bg-transparent border border-gray-300 group-hover:border-gray-700 text-gray-700 group-hover:text-gray-300 text-xs font-semibold py-2.5 rounded-lg transition-all duration-300">
              Course Details
            </button>
          </div>

        </div>

        {/* Bottom Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Biology */}
          <div className="group bg-white hover:bg-[#111827] transition-all duration-300 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-800 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <Dna className="w-6 h-6 text-[#2563eb] group-hover:text-gray-300 mb-4 transition-colors" />
              <h3 className="text-lg font-extrabold text-[#111827] group-hover:text-white mb-2 transition-colors">
                Biology
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-xs leading-relaxed transition-colors">
                Comprehensive study of life sciences, genetics, and ecology.
              </p>
            </div>

            <button className="w-full mt-4 bg-transparent border border-transparent group-hover:border-gray-700 text-transparent group-hover:text-gray-300 text-xs font-semibold py-2 rounded-lg transition-all duration-300">
              Course Details
            </button>
          </div>

          {/* Higher Mathematics */}
          <div className="group bg-white hover:bg-[#111827] transition-all duration-300 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-800 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <Sigma className="w-6 h-6 text-[#2563eb] group-hover:text-gray-300 mb-4 transition-colors" />
              <h3 className="text-lg font-extrabold text-[#111827] group-hover:text-white mb-2 transition-colors">
                Higher Mathematics
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-xs leading-relaxed transition-colors">
                Advanced calculus, linear algebra, and discrete structures.
              </p>
            </div>

            <button className="w-full mt-4 bg-transparent border border-transparent group-hover:border-gray-700 text-transparent group-hover:text-gray-300 text-xs font-semibold py-2 rounded-lg transition-all duration-300">
              Course Details
            </button>
          </div>

          {/* ICT */}
          <div className="group bg-white hover:bg-[#111827] transition-all duration-300 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-800 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <Terminal className="w-6 h-6 text-[#2563eb] group-hover:text-gray-300 mb-4 transition-colors" />
              <h3 className="text-lg font-extrabold text-[#111827] group-hover:text-white mb-2 transition-colors">
                ICT
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-xs leading-relaxed transition-colors">
                Foundational computer science, programming, and data systems.
              </p>
            </div>

            <button className="w-full mt-4 bg-transparent border border-transparent group-hover:border-gray-700 text-transparent group-hover:text-gray-300 text-xs font-semibold py-2 rounded-lg transition-all duration-300">
              Course Details
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoreDecepline;