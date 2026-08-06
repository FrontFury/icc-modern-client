import React, { useEffect, useState } from "react";
import {
  Search,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Activity,
  Award,
  Sparkles,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function FacultyDirectory() {
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axiosSecure = useAxiosSecure();

  // Fetch faculty data using axiosSecure and sort by oldest first (Ascending order)
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/faculty")
      .then((res) => {
        // Sort by createdAt: Oldest added items come first
        const sortedData = (res.data || []).sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setFacultyList(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load faculty data:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Reset to Page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDesignation]);

  // Filtering Logic
  const filteredFaculty = facultyList.filter((member) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (member.name && member.name.toLowerCase().includes(query)) ||
      (member.subject && member.subject.toLowerCase().includes(query)) ||
      (member.designation && member.designation.toLowerCase().includes(query));

    const matchesDesignation =
      selectedDesignation === "All" ||
      (member.designation &&
        member.designation
          .toLowerCase()
          .includes(selectedDesignation.toLowerCase()));

    return matchesSearch && matchesDesignation;
  });

  // Separate Principal from standard faculty
  const principalMember = filteredFaculty.find(
    (member) => member.designation?.toLowerCase().includes("principal")
  );

  const regularFacultyList = filteredFaculty.filter(
    (member) => !member.designation?.toLowerCase().includes("principal")
  );

  // Pagination Logic for Regular Faculty
  const totalPages = Math.ceil(regularFacultyList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacultyList = regularFacultyList.slice(
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
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <span className="inline-block px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            OUR ACADEMIC COMMUNITY
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Faculty Directory
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            At Ideal Commerce College, our distinguished faculty members are leaders in their fields, committed to fostering intellectual curiosity and academic excellence.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0a1120]/60 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Search Faculty
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, subject, or designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            {/* Designation Filter Dropdown */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Designation
              </label>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition cursor-pointer font-medium"
              >
                <option value="All">All Designations</option>
                <option value="Principal">Principal</option>
                <option value="Professor">Professor</option>
                <option value="Asst. Professor">Asst. Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Loading & Empty States */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            Loading faculty members...
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-20 bg-[#0a1120]/40 backdrop-blur-md rounded-3xl border border-slate-800/80 text-slate-400 font-medium">
            No faculty members found matching your search criteria.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Eye-Catching Principal Card */}
            {principalMember && currentPage === 1 && (
              <div className="max-w-2xl mx-auto w-full">
                <PrincipalCard
                  faculty={principalMember}
                  onSelect={setSelectedFaculty}
                />
              </div>
            )}

            {/* Faculty List (2 Columns Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentFacultyList.map((faculty) => (
                <FacultyCard
                  key={faculty._id}
                  faculty={faculty}
                  onSelect={setSelectedFaculty}
                />
              ))}
            </div>
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

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => {
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
            })}

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

      {/* Profile Details Modal */}
      {selectedFaculty && (
        <FacultyModal
          faculty={selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
        />
      )}
    </div>
  );
}

// Dedicated Premium Principal Card Component
const PrincipalCard = ({ faculty, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(faculty)}
      className="group relative bg-gradient-to-br from-[#0c192e] via-[#0b1426] to-[#0d1b32] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-400 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer"
    >
      {/* Accent Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-500" />

      {/* Profile Image with Ring Badge */}
      <div className="w-full sm:w-48 h-56 sm:h-auto bg-slate-950 shrink-0 overflow-hidden relative">
        <img
          src={faculty.imageUrl}
          alt={faculty.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-transparent to-transparent sm:hidden" />
      </div>

      {/* Content Details */}
      <div className="p-6 flex flex-col justify-between flex-1 relative z-10">
        <div>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <Award className="w-3 h-3 text-amber-400" /> Institution Leadership
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
            {faculty.name}
          </h3>

          <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/30 via-slate-700 to-transparent my-3" />

          <p className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {faculty.designation}
          </p>

          {faculty.subject && (
            <p className="text-xs text-slate-300 font-medium mt-1">
              Department: {faculty.subject}
            </p>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
            View Full Profile →
          </span>

          <a
            href={`mailto:${faculty.email}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-[0_0_10px_rgba(34,211,238,0.15)]"
            title="Email Principal"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Custom Horizontal Card Component
const FacultyCard = ({ faculty, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(faculty)}
      className="group relative bg-[#0d1527] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg hover:border-cyan-500/50 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer border-b-2 border-b-cyan-500"
    >
      {/* Profile Image */}
      <div className="w-full sm:w-44 h-52 sm:h-auto bg-slate-950 shrink-0 overflow-hidden relative">
        <img
          src={faculty.imageUrl}
          alt={faculty.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#0d1527]">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {faculty.name}
          </h3>

          <div className="w-full h-[1px] bg-slate-800 my-2.5" />

          <p className="text-sm font-semibold text-slate-300">
            {faculty.designation}
          </p>

          {faculty.subject && (
            <p className="text-xs text-cyan-400 font-medium mt-1">
              Subject: {faculty.subject}
            </p>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-4 pt-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider group-hover:underline">
            View Details →
          </span>

          <a
            href={`mailto:${faculty.email}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition"
            title="Email Faculty"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Profile Detail Modal Component
const FacultyModal = ({ faculty, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0a1120] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-800 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="relative h-48 bg-slate-950 overflow-hidden">
          <img
            src={faculty.imageUrl}
            alt={faculty.name}
            className="w-full h-full object-cover opacity-20 blur-md scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/60 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
            <img
              src={faculty.imageUrl}
              alt={faculty.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-xl shrink-0"
            />
            <div className="text-white pb-1">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {faculty.name}
              </h2>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                {faculty.designation} {faculty.subject && `• ${faculty.subject}`}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Contact Email
                </span>
                <span className="font-semibold text-slate-200">
                  {faculty.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Added On
                </span>
                <span className="font-semibold text-slate-200">
                  {faculty.createdAt ? new Date(faculty.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Faculty Profile Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {faculty.name} serves as a {faculty.designation} specializing in {faculty.subject || "their respective field"} at Ideal Commerce College.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition border border-slate-700/60"
            >
              Close
            </button>
            <a
              href={`mailto:${faculty.email}`}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold rounded-xl transition flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-wider uppercase"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};