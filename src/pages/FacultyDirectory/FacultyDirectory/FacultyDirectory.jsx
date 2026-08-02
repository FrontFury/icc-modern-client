import React, { useEffect, useState } from "react";
import {
  Search,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  MapPin,
  GraduationCap,
  BookOpen,
  Activity,
  UserCheck,
} from "lucide-react";

export default function FacultyDirectory() {
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch JSON data from public directory
  useEffect(() => {
    fetch("/faculty.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setFacultyList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load faculty data:", err);
        setLoading(false);
      });
  }, []);

  // Reset to Page 1 whenever search or filter options change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept, selectedDesignation]);

  // Filtering Logic
  const filteredFaculty = facultyList.filter((member) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (member.name && member.name.toLowerCase().includes(query)) ||
      (member.specialization &&
        member.specialization.toLowerCase().includes(query)) ||
      (member.designation && member.designation.toLowerCase().includes(query));

    const matchesDept =
      selectedDept === "All" ||
      (member.department &&
        member.department.toLowerCase() === selectedDept.toLowerCase());

    const matchesDesignation =
      selectedDesignation === "All" ||
      (member.designation &&
        member.designation
          .toLowerCase()
          .includes(selectedDesignation.toLowerCase()));

    return matchesSearch && matchesDept && matchesDesignation;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacultyList = filteredFaculty.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pt-40 bg-[#030712] font-sans text-white pb-20 relative overflow-hidden">
      {/* Background Ambient Glowing Effects */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* Top Header Section */}
        <div className="mb-10">
          <span className="inline-block px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            OUR ACADEMIC COMMUNITY
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Faculty Directory
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            At Ideal Commerce College, our distinguished faculty members are leaders in their fields, committed to fostering intellectual curiosity and academic excellence through rigorous research and innovative teaching methods.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0a1120]/60 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Search Faculty
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, research, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-900 text-white">All Departments</option>
                <option value="Commerce" className="bg-slate-900 text-white">Commerce</option>
                <option value="Science" className="bg-slate-900 text-white">Science</option>
                <option value="Arts" className="bg-slate-900 text-white">Arts</option>
              </select>
            </div>

            {/* Designation Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Designation
              </label>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-900 text-white">All Designations</option>
                <option value="Professor" className="bg-slate-900 text-white">Professor</option>
                <option value="Associate Professor" className="bg-slate-900 text-white">Associate Professor</option>
                <option value="Lecturer" className="bg-slate-900 text-white">Lecturer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Faculty Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            Loading faculty members...
          </div>
        ) : currentFacultyList.length === 0 ? (
          <div className="text-center py-20 bg-[#0a1120]/40 backdrop-blur-md rounded-3xl border border-slate-800/80 text-slate-400 font-medium">
            No faculty members found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentFacultyList.map((faculty) => (
              <div
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className="group relative bg-[#0a1120]/60 backdrop-blur-md rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Image Frame */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent pointer-events-none" />

                    {/* Head of Department Badge */}
                    {faculty.isHeadOfDept && (
                      <span className="absolute top-3 right-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10 tracking-wide uppercase">
                        Head of Dept
                      </span>
                    )}

                    {/* Hover Activity Bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between text-white border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-[11px] font-medium text-slate-300 truncate max-w-[190px]">
                          {faculty.status || "Active Member"}
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                        View Profile
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400/90 mt-1 mb-3">
                      {faculty.designation}, {faculty.department}
                    </p>

                    <div className="pt-3 border-t border-slate-800/60">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        SPECIALIZATION
                      </span>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed min-h-[36px]">
                        {faculty.specialization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaculty(faculty);
                    }}
                    className="flex-1 py-2.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl transition text-center shadow-[0_0_15px_rgba(34,211,238,0.2)] uppercase tracking-wider"
                  >
                    View Profile
                  </button>
                  <a
                    href={`mailto:${faculty.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 border border-slate-800 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition flex items-center justify-center"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
                currentPage === 1
                  ? "border-slate-800 bg-slate-900/40 text-slate-600 cursor-not-allowed"
                  : "border-slate-800 bg-[#0a1120]/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-xl transition flex items-center justify-center font-bold ${
                        currentPage === page
                          ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                          : "border border-slate-800 bg-[#0a1120]/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={page} className="px-1 text-slate-600">
                      ...
                    </span>
                  );
                }
                return null;
              }
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
                currentPage === totalPages
                  ? "border-slate-800 bg-slate-900/40 text-slate-600 cursor-not-allowed"
                  : "border-slate-800 bg-[#0a1120]/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Glassmorphic Profile Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a1120]/90 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-800 relative text-white">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Header */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
                className="w-full h-full object-cover opacity-25 blur-md scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/60 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
                <img
                  src={selectedFaculty.image}
                  alt={selectedFaculty.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-xl shrink-0"
                />
                <div className="text-white pb-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    {selectedFaculty.name}
                  </h2>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                    {selectedFaculty.designation} • {selectedFaculty.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Activity Status
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedFaculty.status || "Active"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Campus Office
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedFaculty.room || "Farmgate Campus"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  About
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {selectedFaculty.bio ||
                    "Faculty member at Ideal Commerce College teaching in the department."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs mb-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Office Hours</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {selectedFaculty.officeHours || "By Appointment"}
                  </p>
                </div>

                <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Education Background</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {selectedFaculty.education || "Higher Degree in Specialization"}
                  </p>
                </div>
              </div>

              {selectedFaculty.publications &&
                selectedFaculty.publications.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Selected Publications & Research</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 pl-1 font-medium leading-relaxed">
                      {selectedFaculty.publications.map((pub, idx) => (
                        <li key={idx}>{pub}</li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition border border-slate-700/60"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedFaculty.email}`}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold rounded-xl transition flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-wider uppercase"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}