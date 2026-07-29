

export default function ResearchCollaborationBanner() {
  return (
    <div className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#f1f5f9] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        
        {/* Left Content */}
        <div className="max-w-lg text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Seeking Research Collaboration?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Connect with our industry-leading experts to explore partnership
            opportunities and academic research ventures.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-colors duration-200 text-center leading-snug"
          >
            Contact<br />Department
          </button>

          <button
            type="button"
            className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl border border-slate-200/80 shadow-sm transition-colors duration-200 text-center leading-snug"
          >
            Research<br />Portal
          </button>
        </div>
      </div>
    </div>
  );
}