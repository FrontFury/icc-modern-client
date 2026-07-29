import { Link } from "react-router-dom";

const GrowingCommuning = () => {
    return (
    <section className="w-full bg-[#f0f2f5] py-20 px-6 md:px-12 text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
          Join Our Growing Community
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Discover why thousands of students choose Ideal Commerce College for their academic journey every year.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Primary Blue Button */}
          <Link
            to="/apply"
            className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-semibold px-8 py-3.5 rounded-lg shadow-sm transition-colors duration-200 inline-block text-center"
          >
            Apply Now
          </Link>

          {/* Secondary Outlined Button */}
          <a
            href="../../../../public/ICC-Prospectus.pdf"
            download
            className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 text-xs font-semibold px-8 py-3.5 rounded-lg shadow-sm transition-colors duration-200 inline-block text-center"
          >
            Download Prospectus
          </a>

        </div>

      </div>
    </section>
  );
};

export default GrowingCommuning;