import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  Droplet,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import CustomLoader from '../../Shared/CustomLoader/CustomLoader';

const Alumni = () => {
  // Data, loading, and error states
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch alumni data
  useEffect(() => {
    fetch('/alumniData.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch alumni data.');
        }
        return res.json();
      })
      .then((data) => {
        setAlumniData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading alumni data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Alumni for Modal
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Extract unique filter options dynamically
  const passingYears = useMemo(() => {
    const years = alumniData.map((item) => item.passing_year).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [alumniData]);

  const departments = useMemo(() => {
    const depts = alumniData.map((item) => item.dept).filter(Boolean);
    return [...new Set(depts)];
  }, [alumniData]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return alumniData.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name?.toLowerCase().includes(q) ||
        item.address?.toLowerCase().includes(q) ||
        item.dept?.toLowerCase().includes(q) ||
        item.father_name?.toLowerCase().includes(q) ||
        item.mother_name?.toLowerCase().includes(q);

      const matchesYear = !selectedYear || String(item.passing_year) === String(selectedYear);
      const matchesDept = !selectedDept || item.dept === selectedDept;
      const matchesGender = !selectedGender || item.gender === selectedGender;

      return matchesSearch && matchesYear && matchesDept && matchesGender;
    });
  }, [alumniData, searchQuery, selectedYear, selectedDept, selectedGender]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedDept, selectedGender]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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

  // Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Display Loader while fetching data
  if (loading) {
    return <CustomLoader />;
  }

  // Display Error message if fetch fails
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] p-4 text-slate-200">
        <div className="bg-[#0a1120]/80 border border-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-md backdrop-blur-md">
          <p className="text-rose-400 font-bold text-lg mb-2">Unable to Load Alumni Data</p>
          <p className="text-slate-400 text-xs mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-cyan-500/20"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-16 font-sans relative overflow-x-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <header className="text-center pt-14 pb-8 px-4 max-w-4xl mx-auto relative z-10">
        <div className="w-10 h-1 bg-cyan-400 rounded-full mx-auto mb-4 shadow-[0_0_10px_#22d3ee]" />
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Alumni Network
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Connecting generations of college graduates. Discover, engage, and grow with a community of vibrant professionals worldwide.
        </p>
      </header>

      {/* Glassmorphic Search & Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 mb-10 relative z-10">
        <div className="bg-[#0a1120]/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-800/80 flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, address, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900/80 focus:bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-slate-200 placeholder-slate-500 text-xs transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-900/80 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-200">Passing Year</option>
              {passingYears.map((yr) => (
                <option key={yr} value={yr} className="bg-slate-900 text-slate-200">
                  Batch of {yr}
                </option>
              ))}
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-900/80 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-200">Department</option>
              {departments.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-slate-200">
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-900/80 text-slate-200 text-xs font-medium rounded-xl border border-slate-800 focus:border-cyan-500/50 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-200">Gender</option>
              <option value="Male" className="bg-slate-900 text-slate-200">Male</option>
              <option value="Female" className="bg-slate-900 text-slate-200">Female</option>
            </select>

            {(searchQuery || selectedYear || selectedDept || selectedGender) && (
              <button
                onClick={handleClearFilters}
                className="px-3.5 py-2.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Alumni Glass Card Grid */}
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {currentItems.length === 0 ? (
          <div className="bg-[#0a1120]/60 backdrop-blur-md rounded-2xl p-12 text-center text-slate-500 border border-slate-800/80 max-w-md mx-auto shadow-xl">
            <Users className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-slate-600" />
            <p className="text-base font-bold text-slate-300">No Alumni Found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((alumni) => (
              <div
                key={alumni.id}
                onClick={() => setSelectedAlumni(alumni)}
                className="group relative bg-[#0a1120]/60 hover:bg-[#0a1120]/90 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Upper Avatar & Info */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-300 bg-slate-900"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-rose-500/20 border border-rose-500/30 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-bold text-rose-400 shadow-sm flex items-center gap-0.5">
                      <Droplet className="w-2.5 h-2.5 fill-rose-400" />
                      {alumni.blood_group}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {alumni.name}
                  </h3>
                  
                  <p className="text-[11px] font-bold text-cyan-400 mt-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    Batch of {alumni.passing_year}
                  </p>

                  <p className="text-xs text-slate-400 font-medium mt-2 line-clamp-1">
                    {alumni.dept}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="w-full pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px] font-medium text-slate-400 truncate max-w-[120px]">
                    {alumni.address ? alumni.address.split(',')[0] : 'Dhaka'}
                  </span>
                  <span className="text-cyan-400 font-bold text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Profile &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0a1120]/60 backdrop-blur-md border border-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-800 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-[#0a1120]/60 backdrop-blur-md border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0a1120]/60 backdrop-blur-md border border-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-800 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Detail Glass Modal */}
      {selectedAlumni && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedAlumni(null)}
        >
          <div
            className="bg-[#0a1120]/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-800/80 transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Top Banner */}
            <div className="h-28 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 relative">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-slate-950/40 hover:bg-slate-950/60 w-8 h-8 rounded-full flex items-center justify-center transition border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Picture Overlap */}
            <div className="relative px-6 -mt-14 pb-4 border-b border-slate-800/80 text-center">
              <img
                src={selectedAlumni.image}
                alt={selectedAlumni.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-[#0a1120] shadow-xl bg-slate-900"
              />
              <h2 className="text-2xl font-black text-white mt-3">
                {selectedAlumni.name}
              </h2>
              <p className="text-cyan-400 font-bold text-xs mt-0.5">
                {selectedAlumni.dept}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-bold text-slate-300">
                  Batch of {selectedAlumni.passing_year}
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-bold text-slate-300">
                  {selectedAlumni.gender}
                </span>
              </div>
            </div>

            {/* Detailed Body */}
            <div className="p-6 space-y-4 text-xs max-h-[55vh] overflow-y-auto">
              
              {/* Highlights Row (Blood & DOB) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-rose-500/10 p-3.5 rounded-2xl border border-rose-500/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 fill-rose-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Blood Group</p>
                    <p className="font-black text-white text-base">{selectedAlumni.blood_group}</p>
                  </div>
                </div>

                <div className="bg-cyan-500/10 p-3.5 rounded-2xl border border-cyan-500/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Date of Birth</p>
                    <p className="font-bold text-white text-xs mt-0.5">{formatDate(selectedAlumni.dob)}</p>
                  </div>
                </div>
              </div>

              {/* Family Details */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 grid grid-cols-2 gap-3 text-slate-300">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Father's Name</p>
                    <p className="font-semibold text-slate-200 text-xs mt-0.5">{selectedAlumni.father_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Mother's Name</p>
                    <p className="font-semibold text-slate-200 text-xs mt-0.5">{selectedAlumni.mother_name || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-2.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Details</p>
                {selectedAlumni.contact?.email && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium text-xs">{selectedAlumni.contact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium text-xs">+{selectedAlumni.contact?.phone}</span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address</p>
                  <p className="font-medium text-slate-200 text-xs mt-0.5 leading-snug">
                    {selectedAlumni.address || 'Address details unavailable'}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/80 text-center border-t border-slate-800/80">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
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