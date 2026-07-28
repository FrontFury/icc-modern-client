import { Landmark, TrendingUp, Users, Rocket } from "lucide-react";

const CommerceAcademicDisciplines = () => {
    const disciplines = [
    {
      id: 1,
      title: "Accounting",
      description:
        "Focusing on fiscal transparency, auditing standards, and advanced management accounting for the modern firm.",
      icon: Landmark,
    },
    {
      id: 2,
      title: "Finance",
      description:
        "Mastery of capital markets, investment strategies, risk assessment, and global banking operations.",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Management",
      description:
        "Strategic leadership, organizational behavior, and operations management in a globalized business context.",
      icon: Users,
    },
    {
      id: 4,
      title: "Entrepreneurship",
      description:
        "Incubating innovation, venture capital acquisition, and the development of sustainable new business models.",
      icon: Rocket,
    },
  ];

  return (
    <section className="w-full bg-[#f4f6f8] py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Core Academic Disciplines
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            A comprehensive curriculum structured to provide mastery over the essential pillars of the global economy.
          </p>
        </div>

        {/* 4 Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-r-lg p-7 shadow-sm border border-gray-200/80 border-l-[3.5px] border-l-[#2563eb] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300"
              >
                {/* Blue Icon */}
                <div className="text-[#2563eb]">
                  <IconComponent className="w-7 h-7 stroke-[2]" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-extrabold text-[#111827]">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CommerceAcademicDisciplines;