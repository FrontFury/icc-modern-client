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
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="w-12 h-0.5 bg-amber-500 mb-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Distinguished Faculty
            </h2>
          </div>

          <a
            href="#all-faculty"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0252cc] hover:text-[#003da8] transition-colors self-start sm:self-auto"
          >
            View All Faculty <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((faculty) => (
            <div key={faculty.id} className="group space-y-4">
              
              {/* Image Container */}
              <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-gray-200">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Information */}
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#111827]">
                  {faculty.name}
                </h3>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {faculty.role}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed pt-2 font-normal">
                  {faculty.bio}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommerceFaculty;