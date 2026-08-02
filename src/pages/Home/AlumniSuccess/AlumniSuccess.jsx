import { useEffect, useState } from "react";
import { Quote, Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";

// Safely handle default/named ESM import mismatches
const MarqueeContainer = Marquee.default || Marquee;

const AlumniStories = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    // Fetch data from public/alumni.json
    fetch("/alumni.json")
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error loading alumni data:", err));
  }, []);

  return (
    <section className="w-full bg-[#030712] py-20 md:py-28 overflow-hidden relative">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="w-full sm:w-11/12 md:w-5/6 mx-auto px-4 md:px-6 text-center max-w-3xl mb-14 relative z-10">
        {/* Pill Badge */}
        <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold text-xs uppercase px-4 py-1.5 rounded-full tracking-wider mb-5 shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          Alumni Voices
        </span>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
          Alumni <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">Success Stories</span>
        </h2>

        {/* Section Subtitle */}
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Discover how our graduates are shaping the global commerce landscape.
          From innovative entrepreneurs to corporate leaders, these are the
          legacies of Ideal Commerce College.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="w-full overflow-hidden relative z-10 [&>div]:!overflow-x-hidden [&>div]:!overflow-y-hidden">
        <MarqueeContainer
          pauseOnHover={true}
          speed={40}
          gradient={true}
          gradientColor="#030712"
          gradientWidth={120}
          className="py-6 overflow-hidden"
          style={{ overflow: "hidden" }}
        >
          {alumni.map((item) => (
            <div
              key={item.id}
              className="group w-[300px] sm:w-[340px] md:w-[370px] bg-gradient-to-b from-slate-900/90 via-[#071927]/80 to-slate-950/90 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between relative mx-3.5 my-2 hover:-translate-y-1.5"
            >
              {/* Decorative Accent Glow on Card Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Top Accent Quote Icon */}
              <div className="absolute top-5 right-5 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                <Quote className="w-4 h-4 fill-cyan-400/20" />
              </div>

              <div>
                {/* Header Profile Section */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-cyan-500/30 bg-slate-800 flex-shrink-0 group-hover:border-cyan-400 transition-colors shadow-md"
                    />
                  </div>

                  <div className="pr-8">
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      Batch of {item.passing_year}
                    </p>
                    <p className="text-xs font-semibold text-cyan-400/90">
                      Dept. of {item.dept}
                    </p>
                  </div>
                </div>

                {/* Quote Body */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic line-clamp-4 relative z-10">
                  "{item.memories}"
                </p>
              </div>
            </div>
          ))}
        </MarqueeContainer>
      </div>
    </section>
  );
};

export default AlumniStories;