import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';

export default function FacultyDirectory() {
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch JSON data from public directory
  useEffect(() => {
    fetch('/faculty.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setFacultyList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load faculty data:', err);
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
      (member.specialization && member.specialization.toLowerCase().includes(query)) ||
      (member.designation && member.designation.toLowerCase().includes(query));

    const matchesDept =
      selectedDept === 'All' ||
      (member.department && member.department.toLowerCase() === selectedDept.toLowerCase());

    const matchesDesignation =
      selectedDesignation === 'All' ||
      (member.designation && member.designation.toLowerCase().includes(selectedDesignation.toLowerCase()));

    return matchesSearch && matchesDept && matchesDesignation;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacultyList = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Top Header Section */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            OUR PEOPLE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Faculty Directory
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            At Ideal Commerce College, our distinguished faculty members are leaders in their fields, 
            committed to fostering intellectual curiosity and academic excellence through rigorous 
            research and innovative teaching methods.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200/80 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Search Faculty
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, research, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-slate-800 focus:outline-none transition placeholder-slate-400"
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-slate-800 focus:outline-none transition cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Commerce">Commerce</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            {/* Designation Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Designation
              </label>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-slate-800 focus:outline-none transition cursor-pointer"
              >
                <option value="All">All Designations</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>

          </div>
        </div>

        {/* Faculty Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm font-medium">
            Loading faculty members...
          </div>
        ) : currentFacultyList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-500">
            No faculty members found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentFacultyList.map((faculty) => (
              <div
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Head of Department Badge */}
                    {faculty.isHeadOfDept && (
                      <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm z-10">
                        Head of Department
                      </span>
                    )}

                    {/* Hover Activity Bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between text-white border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-medium text-slate-200 truncate max-w-[190px]">
                          {faculty.status || 'Active Member'}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                        Click Profile
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5 mb-3">
                      {faculty.designation}, {faculty.department}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        SPECIALIZATION
                      </span>
                      <p className="text-xs font-medium text-slate-600 leading-relaxed min-h-[36px]">
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
                    className="flex-1 py-2 px-3 bg-slate-950 group-hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition text-center shadow-sm"
                  >
                    View Profile
                  </button>
                  <a
                    href={`mailto:${faculty.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition flex items-center justify-center"
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
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
                currentPage === 1
                  ? 'border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer'
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
                    className={`w-8 h-8 rounded-lg transition flex items-center justify-center font-bold ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer'
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
                  <span key={page} className="px-1 text-slate-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
                currentPage === totalPages
                  ? 'border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-slate-800">
            
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900 text-white flex items-center justify-center transition backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-48 bg-slate-900 text-white overflow-hidden">
              <img
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
                className="w-full h-full object-cover opacity-30 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
                <img
                  src={selectedFaculty.image}
                  alt={selectedFaculty.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-lg shrink-0"
                />
                <div className="text-white pb-1">
                  <h2 className="text-xl sm:text-2xl font-black">{selectedFaculty.name}</h2>
                  <p className="text-xs text-blue-300 font-semibold">
                    {selectedFaculty.designation} • {selectedFaculty.department}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Activity Status</span>
                    <span className="font-semibold">{selectedFaculty.status || 'Active'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Campus Office</span>
                    <span className="font-semibold">{selectedFaculty.room || 'Farmgate Campus'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  About
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedFaculty.bio || 'Faculty member at Ideal Commerce College teaching in the department.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Office Hours</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedFaculty.officeHours || 'By Appointment'}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>Education Background</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedFaculty.education || 'Higher Degree in Specialization'}
                  </p>
                </div>
              </div>

              {selectedFaculty.publications && selectedFaculty.publications.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span>Selected Publications & Research</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                    {selectedFaculty.publications.map((pub, idx) => (
                      <li key={idx}>{pub}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedFaculty.email}`}
                  className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
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