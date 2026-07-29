import artsImg from '../../../../assets/Dept/ArtsDepartmentOverview.jpg'; 

export default function ArtsDepartmentOverview() {
  return (
    <section className="bg-[#FAF9F6] py-16 px-6 lg:px-20 text-[#1C1C1C] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Typography & Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow / Tag */}
          <div>
            <span className="inline-block bg-[#EAE8E3] text-[#5A5852] font-semibold text-xs tracking-widest uppercase px-3.5 py-1.5 rounded-xs">
              HUMANITIES &amp; ARTS EXCELLENCE
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight text-[#111827]">
            Empowering Future Creative &amp; Social Leaders
          </h2>

          {/* Descriptive Content tailored to Ideal Commerce College */}
          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              The Arts (Humanities) Department at Ideal Commerce College stands at the intersection of critical thinking, cultural heritage, and modern expression. Our curriculum is thoughtfully designed to build strong academic foundations in subjects like Economics, Civics, Logic, Islamic History, and Social Work, preparing students for higher studies at top public universities and national institutes.
            </p>
            <p>
              We cultivate a disciplined learning environment supported by experienced faculty, active debate clubs, and literary initiatives. Students master analytical writing and verbal reasoning while developing an empathetic understanding of global and local social frameworks.
            </p>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#111827]">
                95%+
              </span>
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase mt-1 block">
                University Success Rate
              </span>
            </div>

            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#111827]">
                100%
              </span>
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase mt-1 block">
                Board Exam Eligibility
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Image with Offset Backing Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative pr-4 pb-4 sm:pr-8 sm:pb-8">
          <div className="relative w-full max-w-[450px]">
            
            {/* Background Accent Frame */}
            <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 border-4 border-[#E2DDD3] -z-0 pointer-events-none" />

            {/* Main Foreground Image */}
            <div className="relative z-10 shadow-lg bg-white p-1">
              <img
                src={artsImg}
                alt="Ideal Commerce College Arts Department"
                className="w-full h-[380px] sm:h-[450px] object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}