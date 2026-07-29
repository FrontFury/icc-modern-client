import { Brain, Landmark, BookOpen, Languages } from 'lucide-react';

const ArtsCoreDisciplines = () => {
    const disciplines = [
    {
      title: 'Logic & Philosophy',
      description:
        'Exploring the principles of critical reasoning, formal logic, and ethical thought to build strong analytical skills.',
      icon: Brain,
      link: '/departments/arts/logic',
    },
    {
      title: 'History & Civics',
      description:
        'Uncovering national and global history alongside political structures to foster responsible civic leadership.',
      icon: Landmark,
      link: '/departments/arts/history',
    },
    {
      title: 'Bengali & English Literature',
      description:
        'Engaging with classic and contemporary literary works to foster deep linguistic proficiency and creative expression.',
      icon: BookOpen,
      link: '/departments/arts/literature',
    },
    {
      title: 'Economics & Social Work',
      description:
        'Understanding socio-economic frameworks, development models, and community engagement for social impact.',
      icon: Languages,
      link: '/departments/arts/economics',
    },
  ];

  return (
    <section className="bg-[#EFEFEF] py-20 px-6 lg:px-16 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111827]">
            Core Academic Disciplines
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            A comprehensive curriculum structured to provide mastery over the essential pillars of creative expression and cultural discourse.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 flex flex-col justify-between shadow-xs border-l-4 border-[#9E7A3B] transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  {/* Icon */}
                  <div className="mb-6 text-[#9E7A3B]">
                    <IconComponent className="w-8 h-8 stroke-[1.5]" />
                  </div>

                  {/* Discipline Title */}
                  <h3 className="text-xl font-serif font-bold text-[#111827] mb-4">
                    {item.title}
                  </h3>

                  {/* Discipline Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div>
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#111827] uppercase hover:text-[#9E7A3B] transition-colors"
                  >
                    Explore Program
                    <span className="text-sm font-normal">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ArtsCoreDisciplines;