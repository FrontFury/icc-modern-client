import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";
import heroBg from "../../../assets/Campus Culture/6.png"; 

const Banner = () => {
  const stats = [
    {
      icon: <Users className="w-7 h-7 text-blue-600" />,
      value: "5000+",
      label: "STUDENTS",
      borderColor: "border-blue-500",
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-amber-500" />,
      value: "50+",
      label: "TEACHERS",
      borderColor: "border-amber-400",
    },
    {
      icon: <Award className="w-7 h-7 text-blue-600" />,
      value: "22+",
      label: "YEARS EXPERIENCE",
      borderColor: "border-blue-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-amber-500" />,
      value: "95%",
      label: "PASS RATE",
      borderColor: "border-amber-400",
    },
  ];

  return (
    <div className="relative h-full mb-24 min-h-[600px] flex flex-col justify-between">
      {/* Background Image Container with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-5/6 mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-block bg-[#f3a638] text-black font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider mb-6">
            Est. 2004
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Welcome to Ideal Commerce College
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
            Empowering Students for a Better Future through rigorous academic tradition,
            cutting-edge research, and a community built on integrity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#0b63e5] hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-md transition-colors shadow-md">
              Apply Now
            </button>
            <button className="border border-white/80 text-white hover:bg-white/10 font-medium px-7 py-3 rounded-md transition-colors">
              Explore Departments
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Bottom Stat Cards */}
      <div className="relative z-20 w-5/6 mx-auto px-6 -mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center border-b-4 ${stat.borderColor}`}
            >
              <div className="mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;