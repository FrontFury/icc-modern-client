import campusPhoto from "../../../assets/About/AboutSub.png"; 

const HistorySection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subtitle Badge */}
          <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block">
            HERITAGE
          </span>

          {/* Heading */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Our History
            </h2>
            <div className="w-12 h-1 bg-amber-400 rounded-full mt-3" />
          </div>

          {/* First Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-2">
            Established in 2004 under the Ideal Education Group, Ideal Commerce College (ICC) was founded with a vision to deliver exemplary academic standards in business and science education. What began as a dedicated initiative in Farmgate, Dhaka, has grown into one of the country's most respected higher secondary institutions.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-8 py-4 my-2">
            {/* Stat 1 */}
            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="text-3xl font-extrabold text-[#111827]">20+</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Years of Excellence
              </p>
            </div>

            {/* Stat 2 */}
            <div className="pl-2">
              <h3 className="text-3xl font-extrabold text-[#2563eb]">2.5k+</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                Global Alumni
              </p>
            </div>
          </div>

          {/* Second Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Throughout two decades, we have remained steadfast in our commitment to academic discipline and character development. From pioneering rigorous HSC preparation programs to fostering modern computer lab research and cultural excellence, our growth reflects our adaptability and unwavering standards.
          </p>
        </div>

        {/* Right Column: Mockup Display */}
        <div className="lg:col-span-7">
          <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            
            {/* Mini Navbar Mockup */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200/60 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">
                  I
                </div>
                <span className="font-bold text-sm text-gray-900 tracking-tight">
                  Ideal Commerce College
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-gray-500">
                <span>Home</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">About Us</span>
                <span>Academics</span>
                <span>Admissions</span>
                <span>News</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Sub-header Mockup */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                About Us <span className="text-gray-400 font-normal">| Our Heritage</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal max-w-xl">
                Since 2004, Ideal Commerce College has stood as a beacon of academic discipline and modern education. Our campus embodies the enduring spirit of our founding values.
              </p>
            </div>

            {/* Photo Card */}
            <div className="bg-white p-2 md:p-3 rounded-xl border border-gray-200/80 shadow-sm">
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={campusPhoto}
                  alt="Ideal Commerce College Campus"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                Main Campus — The heart of Ideal Commerce College academic community.
              </p>
            </div>

            {/* Mini Footer Info */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200/60 text-[10px] text-gray-500">
              <div>
                <span className="font-bold text-gray-800 block mb-1">+ Our Mission</span>
                <p className="line-clamp-2 text-gray-400">
                  Providing quality education, fostering discipline, and shaping future leaders for Bangladesh and beyond.
                </p>
              </div>
              <div>
                <span className="font-bold text-gray-800 block mb-1">Key Milestones</span>
                <div className="grid grid-cols-2 gap-y-0.5 text-gray-400">
                  <span>2004: Founding</span>
                  <span>2012: Science Dept</span>
                  <span>2018: Expansion</span>
                  <span>2024: 20th Year</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;