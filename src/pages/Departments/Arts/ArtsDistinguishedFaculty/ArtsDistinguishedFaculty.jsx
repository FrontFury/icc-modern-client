import faculty1 from '../../../../assets/Dept/ArtsFaculty.png'; 
import faculty2 from '../../../../assets/Dept/ArtsFaculty.png';
import faculty3 from '../../../../assets/Dept/ArtsFaculty.png';

const ArtsDistinguishedFaculty = () => {
  const facultyMembers = [
    {
      name: 'Prof. Julian Vane',
      role: 'HEAD OF HUMANITIES & LOGIC',
      bio: 'Internationally recognized for his work in post-modern sculpture and sustainable urban installations.',
      image: faculty1,
    },
    {
      name: 'Dr. Elena Thorne',
      role: 'CHAIR OF BENGALI & LITERATURE',
      bio: 'Leading scholar in 20th-century avant-garde movements and contemporary aesthetics theory.',
      image: faculty2,
    },
    {
      name: 'Marcus Thorne',
      role: 'PROFESSOR OF ECONOMICS & CIVICS',
      bio: 'Pioneer in immersive digital design and interactive media arts, previously at the Met Media Lab.',
      image: faculty3,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#f5f3ef] via-[#faf9f6] to-[#eae6df] py-20 px-6 lg:px-16 text-[#1A1A1A] overflow-hidden">
      
      {/* Decorative background glow for enhanced glassmorphism */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#9E7A3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Title and "View All" Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-transparent">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111827]">
              Distinguished Faculty
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Mentorship from leading practitioners and acclaimed researchers.
            </p>
          </div>

          <a
            href="/faculty"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-xs font-bold tracking-widest text-[#111827] uppercase border-b-2 border-[#9E7A3B] pb-1 hover:text-[#9E7A3B] transition-colors self-start md:self-auto"
          >
            VIEW ALL FACULTY
            <span className="text-sm">→</span>
          </a>
        </div>

        {/* 3-Column Faculty Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-black/5 hover:bg-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* Faculty Image */}
              <div className="overflow-hidden mb-6 aspect-[4/5] rounded-xl bg-gray-200/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Faculty Details */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#111827]">
                    {member.name}
                  </h3>

                  <span className="block text-[11px] font-bold tracking-widest text-[#9E7A3B] uppercase mt-1">
                    {member.role}
                  </span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
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