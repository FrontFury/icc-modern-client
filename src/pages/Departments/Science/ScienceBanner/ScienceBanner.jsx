import labBg from "../../../../assets/Dept/ScienceBanner.jpg";

const ScienceBanner = () => {
    return (
    <section
      className="relative w-full min-h-[500px] md:min-h-[550px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${labBg})` }}
    >
      {/* Dark Slate Blue Tint Overlay */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-brightness-90" />

      {/* Content Container */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="max-w-2xl space-y-4">
          
          {/* Top Faculty Badge */}
          <div className="inline-block bg-[#fde6d2] text-[#854d0e] text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-sm">
            FACULTY OF SCIENCE
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Science Department
          </h1>

          {/* Subtitle Text */}
          <p className="text-slate-200 text-sm md:text-base leading-relaxed pt-1 font-normal max-w-xl">
            Pioneering the future through analytical excellence and empirical rigor. Our department stands as a beacon of scientific inquiry and academic prestige.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ScienceBanner;