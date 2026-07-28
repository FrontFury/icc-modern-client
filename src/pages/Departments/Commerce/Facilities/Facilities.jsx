import businessLeaderImg from "../../../../assets/Dept/CommerceFacilities.jpg";

const Facilities = () => {
    return (
    <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Metrics */}
        <div className="lg:col-span-6 space-y-6">
          {/* Badge Label */}
          <div>
            <span className="inline-block bg-[#e0e7ff] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
              Academic Excellence
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Empowering Future Business Leaders
          </h2>

          {/* First Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-1">
            The Business Studies Department at Ideal Commerce College stands at the intersection of traditional academic rigor and modern corporate practice. Our curriculum is meticulously designed to provide students with a deep understanding of market dynamics, financial systems, and ethical governance.
          </p>

          {/* Second Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We cultivate a high-performance culture where theoretical knowledge meets real-world application, ensuring our graduates are not just prepared for the workforce, but ready to lead it.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-8 pt-6">
            {/* Stat 1 */}
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0252cc]">
                95%
              </h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Board & Career Success
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0252cc]">
                50+
              </h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Academic & Corporate Network
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Image with Light Border Frame */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 bg-white p-2">
            <div className="rounded-xl overflow-hidden aspect-[4/3] md:aspect-[5/4]">
              <img
                src={businessLeaderImg}
                alt="Student working on business strategy in computer lab"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Facilities;