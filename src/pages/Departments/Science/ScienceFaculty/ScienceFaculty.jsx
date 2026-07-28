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
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Distinguished Faculty
          </h2>

          {/* Gold Accent Line */}
          <div className="w-12 h-1 bg-[#fcd34d] rounded-full mx-auto" />

          {/* Subtitle */}
          <p className="text-gray-500 text-sm md:text-base pt-2 leading-relaxed">
            Guided by world-class educators and industry veterans dedicated to academic mentorship and research leadership.
          </p>
        </div>

        {/* Faculty Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {facultyMembers.map((member) => (
            <div key={member.id} className="flex flex-col group">
              
              {/* Profile Image Box */}
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 mb-4 shadow-sm border border-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#111827] leading-snug">
                  {member.name}
                </h3>
                
                <span className="text-[11px] font-bold tracking-wider text-[#2563eb] uppercase block">
                  {member.role}
                </span>

                <p className="text-xs text-gray-400 font-medium">
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