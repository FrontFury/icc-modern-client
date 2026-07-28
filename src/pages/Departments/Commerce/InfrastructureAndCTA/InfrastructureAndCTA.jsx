import { TrendingUp, Lightbulb, BookOpen } from "lucide-react";
import image01 from '../../../../assets/Dept/Commerce1.jpg'
import image02 from '../../../../assets/Dept/Commerce2.jpg'
import image03 from '../../../../assets/Dept/Commerce3.jpg'

const InfrastructureAndCTA = () => {
  const features = [
    {
      id: 1,
      title: "Mock Trading Floor",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Entrepreneurship Hub",
      icon: Lightbulb,
    },
    {
      id: 3,
      title: "Digital Business Library",
      icon: BookOpen,
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Global Infrastructure Section (Dark Theme) */}
      <section className="w-full bg-secondary text-white py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Global Infrastructure
            </h2>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-md">
              Our facilities are designed to mirror the actual environments of the professional world, ensuring seamless transition from student to practitioner.
            </p>

            {/* Feature List with Icons */}
            <div className="space-y-4 pt-2">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#1e293b] border border-gray-700/60 flex items-center justify-center text-blue-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-gray-200">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Masonry Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tall Left Image */}
            <div className="sm:row-span-2 rounded-2xl overflow-hidden h-[340px] sm:h-full">
              <img
                src={image01}
                alt="Mock Trading Floor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Right Image */}
            <div className="rounded-2xl overflow-hidden h-[180px]">
              <img
                src={image02}
                alt="Entrepreneurship Hub"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="rounded-2xl overflow-hidden h-[180px]">
              <img
                src={image03}
                alt="Digital Business Library"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 2. Call-to-Action Section (Light Theme) */}
      <section className="w-full bg-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Begin Your Professional Journey Today
          </h2>

          <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
            Join a legacy of excellence and secure your future in the world of business and commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#apply"
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white text-xs font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Apply Now
            </a>

            <a
              href="#prospectus"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#2563eb] border border-[#2563eb] text-xs font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Download Prospectus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfrastructureAndCTA;