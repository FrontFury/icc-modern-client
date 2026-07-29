import studioImg from '../../../../assets/Dept/ArtsBanner.jpg';

const ArtsBanner = () => {
    return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-start overflow-hidden">
      {/* Use the imported variable inside src */}
      <img
        src={studioImg}
        alt="Art Studio Classroom"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <div className="max-w-xl space-y-6">
          <span className="block text-amber-300 font-semibold text-xs md:text-sm tracking-[0.25em] uppercase">
            EXCELLENCE IN EXPRESSION
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
            Empowering the Study of Human Culture
          </h1>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
            Nurturing the next generation of global thinkers through critical inquiry, historical perspective, and deep cultural understanding.
          </p>

          <div className="pt-2">
            <button className="bg-white hover:bg-gray-100 text-black font-semibold text-xs md:text-sm px-8 py-3.5 tracking-wider uppercase transition-all duration-200 shadow-lg">
              EXPLORE PROGRAMS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtsBanner;