import { Link } from "react-router-dom";
import heroBg from "../../../assets/About/2.png";

const AboutBanner = () => {
  return (
    <section 
      className="relative w-full min-h-screen h-full flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark Overlay to ensure high contrast and readability */}
      <div className="absolute inset-0 bg-black/55 backdrop-brightness-90" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6">
          
          {/* Accent Line */}
          <div className="w-10 h-1 bg-amber-400/90 rounded-full mb-4" />

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Empowering minds, fostering innovation, and building leaders of tomorrow.
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal pt-1">
            Founded on the principles of academic rigor and character development, ABC College 
            remains at the forefront of global education, shaping the visionaries of the 21st century.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {/* Primary Button */}
            <Link
              to="/vision"
              className="bg-white hover:bg-gray-100 text-[#111827] text-sm font-semibold px-7 py-3.5 rounded-md transition-colors duration-200 shadow-md inline-block text-center"
            >
              Our Vision
            </Link>

            {/* Secondary Glassmorphism Button */}
            <Link
              to="/campus"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold px-7 py-3.5 rounded-md backdrop-blur-sm transition-all duration-200 inline-block text-center"
            >
              Explore Campus
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBanner;