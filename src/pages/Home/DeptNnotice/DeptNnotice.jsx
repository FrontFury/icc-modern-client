import { FlaskConical, Palette, Banknote, Megaphone, ArrowRight } from "lucide-react";
import noticesData from "../../../../public/notice.json";

const DeptNnotice = () => {
  const departments = [
    {
      id: 1,
      title: "Science",
      description: "Exploring the laws of nature through rigorous experimentation and research.",
      icon: <FlaskConical className="w-8 h-8 text-blue-600" />,
      color: "text-blue-600",
      accentBg: "bg-blue-50/50",
      link: "/departments/science"
    },
    {
      id: 2,
      title: "Arts",
      description: "Nurturing creativity and critical thinking through diverse humanities studies.",
      icon: <Palette className="w-8 h-8 text-amber-500" />,
      color: "text-amber-500",
      accentBg: "bg-amber-50/50",
      link: "/departments/arts"
    },
    {
      id: 3,
      title: "Commerce",
      description: "Mastering business, finance, and economics in a globalized landscape.",
      icon: <Banknote className="w-8 h-8 text-blue-600" />,
      color: "text-blue-600",
      accentBg: "bg-blue-50/50",
      link: "/departments/commerce"
    }
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-12 md:py-16">
      {/* Reduced padding on mobile from px-6 to px-3 */}
      <div className="w-11/12 md:w-5/6 mx-auto px-3 md:px-6">
        {/* Main Grid: Left for Departments, Right for Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Departments - Spans 2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="w-10 h-1 bg-amber-500 rounded-full mb-3" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Academic Departments
              </h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Discover our world-class faculty and specialized curricula.
              </p>
            </div>

            {/* Department Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="relative bg-white border border-gray-200/80 rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow h-80"
                >
                  {/* Decorative Subtle Background Corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${dept.accentBg} -z-0`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">{dept.icon}</div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {dept.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  {/* Link */}
                  <a
                    href={dept.link}
                    className={`relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold ${dept.color} hover:underline mt-4`}
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Latest Notices Sidebar) */}
          <div className="bg-[#111726] text-white rounded-xl p-5 sm:p-7 shadow-xl flex flex-col justify-between min-h-[460px]">
            <div>
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                <h3 className="text-lg font-bold tracking-wide">
                  Latest Notices
                </h3>
                <Megaphone className="w-5 h-5 text-amber-400" />
              </div>

              {/* Notice List Dynamic Mapping */}
              <div className="space-y-6">
                {noticesData.map((notice, idx) => (
                  <div key={notice.id}>
                    <p className="text-amber-500 text-[11px] font-bold tracking-wider uppercase mb-1">
                      {notice.date}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-100 hover:text-amber-400 cursor-pointer transition-colors leading-snug">
                      {notice.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
                      {notice.description}
                    </p>
                    {idx < noticesData.length - 1 && (
                      <div className="border-b border-gray-800/80 mt-5" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* View All Notices Button */}
            <a
              href="/notices"
              className="mt-8 block text-center w-full py-2.5 px-4 rounded-md border border-gray-700 hover:border-gray-500 text-xs font-medium text-gray-200 hover:text-white transition-all bg-[#172033]"
            >
              View All Notices
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeptNnotice;