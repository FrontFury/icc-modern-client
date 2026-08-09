import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  X,
  Droplet,
  Users,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // আপনার প্রজেক্ট এর পাথ অনুযায়ী এডজাস্ট করে নিন
import CustomLoader from '../../Shared/CustomLoader/CustomLoader';

const Alumni = () => {
  const axiosSecure = useAxiosSecure();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Alumni for Modal
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Fetch alumni data using TanStack Query & axiosSecure
  const {
    data: alumniData = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['alumni'],
    queryFn: async () => {
      const response = await axiosSecure.get('/alumni');
      return response.data;
    }
  });

  // Dynamic filter lists based on API Data
  const passingYears = useMemo(() => {
    const years = alumniData.map((item) => item.passing_year).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [alumniData]);

  const departments = useMemo(() => {
    const depts = alumniData.map((item) => item.dept).filter(Boolean);
    return [...new Set(depts)];
  }, [alumniData]);

  // Filter dataset
  const filteredData = useMemo(() => {
    return alumniData.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.dept?.toLowerCase().includes(q);

      const matchesYear = !selectedYear || String(item.passing_year) === String(selectedYear);
      const matchesDept = !selectedDept || item.dept === selectedDept;
      const matchesGender = !selectedGender || item.gender === selectedGender;

      return matchesSearch && matchesYear && matchesDept && matchesGender;
    });
  }, [alumniData, searchQuery, selectedYear, selectedDept, selectedGender]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedDept, selectedGender]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedDept('');
    setSelectedGender('');
    setCurrentPage(1);
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-slate-200">
        <div className="bg-slate-900/90 border border-red-500/20 p-8 rounded-3xl shadow-2xl text-center max-w-md backdrop-blur-xl">
          <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Failed to Load Alumni</h3>
          <p className="text-slate-400 text-xs mb-6">{error?.message || 'An unexpected error occurred while fetching network data.'}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-[#020617] text-slate-200 pb-20 font-sans relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-[-100px] w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-100px] w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <header className="text-center pt-10 pb-8 px-4 max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" /> Direct Community Directory
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">Network</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Connecting generations of college graduates. Discover, engage, and grow with a community of vibrant professionals worldwide.
        </p>
      </header>

      {/* Glassmorphic Search & Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 mb-10 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col lg:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950/70 focus:bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-slate-200 placeholder-slate-500 text-xs transition-all shadow-inner"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3.5 py-3 bg-slate-950/70 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">Passing Year</option>
              {passingYears.map((yr) => (
                <option key={yr} value={yr} className="bg-slate-900">
                  Batch of {yr}
                </option>
              ))}
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3.5 py-3 bg-slate-950/70 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">Department</option>
              {departments.map((d) => (
                <option key={d} value={d} className="bg-slate-900">
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3.5 py-3 bg-slate-950/70 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">Gender</option>
              <option value="Male" className="bg-slate-900">Male</option>
              <option value="Female" className="bg-slate-900">Female</option>
            </select>

            {(searchQuery || selectedYear || selectedDept || selectedGender) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-3 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-xl transition"
              >
                Reset
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Grid Display */}
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {filteredData.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-12 text-center text-slate-500 border border-slate-800/80 max-w-md mx-auto shadow-2xl">
            <Users className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-slate-600" />
            <p className="text-base font-bold text-slate-300">No Alumni Found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((alumni, index) => (
              <div
                key={alumni._id || alumni.id || index}
                onClick={() => setSelectedAlumni(alumni)}
                className="group relative bg-slate-900/50 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl p-5 shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image Container with Blood Group Badge */}
                  <div className="relative mb-4">
                    <img
                      src={alumni.image || 'https://via.placeholder.com/150'}
                      alt={alumni.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700/80 shadow-lg group-hover:scale-105 group-hover:border-cyan-500/50 transition-all duration-300 bg-slate-950"
                    />
                    {alumni.blood_group && (
                      <span className="absolute -bottom-1 -right-1 bg-rose-500/20 border border-rose-500/30 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-bold text-rose-400 shadow-sm flex items-center gap-0.5">
                        <Droplet className="w-2.5 h-2.5 fill-rose-400" />
                        {alumni.blood_group}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {alumni.name}
                  </h3>

                  {/* Passing Year Badge */}
                  <p className="text-[11px] font-bold text-cyan-400 mt-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    Batch of {alumni.passing_year || 'N/A'}
                  </p>

                  {/* Department */}
                  <p className="text-xs text-slate-400 font-medium mt-2 line-clamp-1">
                    {alumni.dept || 'N/A'}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="w-full pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400">
                    {alumni.gender || 'N/A'}
                  </span>
                  <span className="text-cyan-400 font-bold text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Profile &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-800 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-800 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Detail Glass Modal */}
      {selectedAlumni && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedAlumni(null)}
        >
          <div
            className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-800 transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Banner */}
            <div className="h-28 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 relative">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-slate-950/40 hover:bg-slate-950/70 w-8 h-8 rounded-full flex items-center justify-center transition border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Picture & Main Details */}
            <div className="relative px-6 -mt-14 pb-4 border-b border-slate-800/80 text-center">
              <img
                src={selectedAlumni.image || 'https://via.placeholder.com/150'}
                alt={selectedAlumni.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-slate-900 shadow-2xl bg-slate-950"
              />
              <h2 className="text-2xl font-black text-white mt-3">
                {selectedAlumni.name}
              </h2>
              <p className="text-cyan-400 font-bold text-xs mt-0.5">
                {selectedAlumni.dept}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[11px] font-bold text-slate-300">
                  Batch of {selectedAlumni.passing_year || 'N/A'}
                </span>
                {selectedAlumni.gender && (
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[11px] font-bold text-slate-300">
                    {selectedAlumni.gender}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body Info Cards */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {/* Blood Group */}
                <div className="bg-rose-500/10 p-3.5 rounded-2xl border border-rose-500/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 fill-rose-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Blood Group</p>
                    <p className="font-black text-white text-base">{selectedAlumni.blood_group || 'N/A'}</p>
                  </div>
                </div>

                {/* Academic Batch */}
                <div className="bg-cyan-500/10 p-3.5 rounded-2xl border border-cyan-500/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Passing Year</p>
                    <p className="font-bold text-white text-sm mt-0.5">{selectedAlumni.passing_year || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950/80 text-center border-t border-slate-800">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumni;