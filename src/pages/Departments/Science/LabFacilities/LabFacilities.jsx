import scienceLabImg from ".././../../../assets/Dept/Science Pro.jpg";

const LabFacilities = () => {
    return (
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Stats Cards */}
        <div className="lg:col-span-6 space-y-6">
          {/* Accent Gold Line */}
          <div className="w-10 h-1 bg-amber-400 rounded-full mb-2" />

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Empowering the Next Generation of Scientists
          </h2>

          {/* First Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-2">
            The Science Department at Ideal Commerce College is dedicated to providing a transformative educational experience. We focus on bridging the gap between theoretical foundations and practical application in <strong className="font-semibold text-gray-900">Physics, Chemistry, Mathematics, and Biology</strong>.
          </p>

          {/* Second Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Our curriculum is meticulously designed to cultivate analytical thinking, fostering a culture of curiosity and evidence-based problem solving. We believe that a strong scientific foundation is the cornerstone of modern innovation and global progress.
          </p>

          {/* Stats Boxes Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {/* Stat Box 1 */}
            <div className="bg-white border border-gray-200/80 rounded-lg p-5 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0252cc]">
                98%
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Board Exam Success
              </p>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-white border border-gray-200/80 rounded-lg p-5 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0252cc]">
                15+
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Expert Faculty
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image Container */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <img
              src={scienceLabImg}
              alt="Students conducting research in the Science Laboratory"
              className="w-full h-[380px] sm:h-[450px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default LabFacilities;