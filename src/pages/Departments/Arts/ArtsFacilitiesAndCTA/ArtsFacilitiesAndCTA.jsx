import { Monitor, Archive, Users } from 'lucide-react';

// Internal image imports (update paths to match your folder structure)
import tallFacilityImg from '../../../../assets/Dept/Arts1.jpg';
import topRightImg from '../../../../assets/Dept/Arts2.jpg';
import bottomRightImg from '../../../../assets/Dept/Arts3.jpg';

export default function ArtsFacilitiesAndCTA() {
  const facilities = [
    {
      title: 'Digital Humanities & Computer Lab',
      description: 'Modern computational facilities for academic research and media studies.',
      icon: Monitor,
    },
    {
      title: 'Central Library & Seminar Archive',
      description: 'Rich collection of academic journals, rare references, and historical records.',
      icon: Archive,
    },
    {
      title: 'Interactive Seminar Rooms',
      description: 'Collaborative spaces built for group discussions, debate practice, and presentations.',
      icon: Users,
    },
  ];

  return (
    <div className="w-full">
      {/* SECTION 1: Dark Research Facilities Section */}
      <section className="bg-black text-white py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Feature Icons (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
                Humanities &amp; Academic Facilities
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Our campus facilities are thoughtfully designed to nurture academic rigor, analytical discussion, and a rich understanding of human culture.
              </p>
            </div>

            {/* Feature List with Dark Square Icons */}
            <div className="space-y-6 pt-2">
              {facilities.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[#1A1A1A] p-3 rounded-md shrink-0 flex items-center justify-center border border-gray-800">
                      <IconComponent className="w-5 h-5 text-gray-200" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3-Image Collage Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Left Tall Image */}
            <div className="h-[420px] sm:h-[500px] overflow-hidden bg-neutral-900 rounded-sm">
              <img
                src={tallFacilityImg}
                alt="Digital Humanities Lab"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Stacked 2 Images */}
            <div className="flex flex-col gap-4 h-[420px] sm:h-[500px]">
              <div className="h-1/2 overflow-hidden bg-neutral-900 rounded-sm">
                <img
                  src={topRightImg}
                  alt="Student Discussion Area"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-1/2 overflow-hidden bg-neutral-900 rounded-sm">
                <img
                  src={bottomRightImg}
                  alt="Cultural Exhibition"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Light CTA Section (Join the Movement) */}
      <section className="bg-[#FAF9F6] py-24 px-6 text-[#1A1A1A] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111827]">
            Join the Movement
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Embark on a journey of academic excellence and secure your future in higher education. Higher Secondary admission applications for the Arts group are now open.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/admission"
              className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 transition-colors"
            >
              APPLY NOW
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto bg-transparent border border-gray-300 hover:border-black text-[#111827] font-bold text-xs tracking-widest uppercase px-8 py-4 transition-colors"
            >
              REQUEST PROSPECTUS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}