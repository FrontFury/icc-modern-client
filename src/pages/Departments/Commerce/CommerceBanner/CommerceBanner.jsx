import { ArrowRight } from "lucide-react";
import campusBg from "../../../../assets/Dept/CommerceBanner.jpg";

const CommerceBanner = () => {
    return (
    <section
      className="relative w-full min-h-[580px] md:min-h-screen flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${campusBg})` }}
    >
      {/* Dark Gradient / Tint Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/60 backdrop-brightness-90" />

      {/* Content Container */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="max-w-xl space-y-6">
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Commerce & Business Department
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal max-w-lg">
            Developing the next generation of global leaders with strategic insights and ethical foundations. Join an elite community committed to intellectual rigor and professional distinction.
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <a
              href="#programs"
              className="inline-flex items-center justify-center gap-2 bg-[#0252cc] hover:bg-[#003da8] text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-200"
            >
              Explore Programs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommerceBanner;