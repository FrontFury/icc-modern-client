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
  // Data, loading, and error states (Replaces useLoaderData)
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch alumni data inside useEffect after authentication check completes
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
          <p className="text-red-500 font-bold text-lg mb-2">Unable to Load Alumni Data</p>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/30 to-blue-50/50 text-slate-800 pb-16 font-sans relative overflow-x-hidden">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <header className="text-center pt-14 pb-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
          Alumni Network
        </h1>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Connecting generations of college graduates. Discover, engage, and grow with a community of vibrant professionals worldwide.
        </p>
      </header>

      {/* Glassmorphic Search & Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/80 flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, address, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-xl outline-none text-slate-700 text-sm transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-100/80 focus:bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200/60 focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value="">Passing Year</option>
              {passingYears.map((yr) => (
                <option key={yr} value={yr}>
                  Batch of {yr}
                </option>
              ))}
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-100/80 focus:bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200/60 focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value="">Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-100/80 focus:bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200/60 focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {(searchQuery || selectedYear || selectedDept || selectedGender) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Alumni Glass Card Grid */}
      <main className="max-w-6xl mx-auto px-4">
        {currentItems.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center text-slate-400 border border-white/80 max-w-md mx-auto shadow-sm">
            <Users className="w-12 h-12 mx-auto mb-3 stroke-[1.5]" />
            <p className="text-base font-semibold text-slate-600">No Alumni Found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((alumni) => (
              <div
                key={alumni.id}
                onClick={() => setSelectedAlumni(alumni)}
                className="group relative bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 hover:border-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Upper Avatar & Info */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300 bg-slate-100"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-bold text-red-500 shadow-sm border border-red-100 flex items-center gap-0.5">
                      <Droplet className="w-2.5 h-2.5 fill-red-500" />
                      {alumni.blood_group}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {alumni.name}
                  </h3>
                  
                  <p className="text-xs font-semibold text-blue-600 mt-1 bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100/50">
                    Batch of {alumni.passing_year}
                  </p>

                  <p className="text-xs text-slate-500 font-medium mt-2 line-clamp-1">
                    {alumni.dept}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="w-full pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] font-medium text-slate-500 truncate max-w-[120px]">
                    {alumni.address ? alumni.address.split(',')[0] : 'Dhaka'}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-slate-600 disabled:opacity-40 hover:bg-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white/70 backdrop-blur-md border border-white/80 text-slate-600 hover:bg-white'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-slate-600 disabled:opacity-40 hover:bg-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Detail Glass Modal */}
      {selectedAlumni && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedAlumni(null)}
        >
          <div
            className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-white/80 transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Top Banner */}
            <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Picture Overlap */}
            <div className="relative px-6 -mt-14 pb-4 border-b border-slate-100 text-center">
              <img
                src={selectedAlumni.image}
                alt={selectedAlumni.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-white shadow-lg bg-slate-100"
              />
              <h2 className="text-2xl font-bold text-slate-900 mt-3">
                {selectedAlumni.name}
              </h2>
              <p className="text-blue-600 font-medium text-sm">
                {selectedAlumni.dept}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-0.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                  Batch of {selectedAlumni.passing_year}
                </span>
                <span className="px-3 py-0.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                  {selectedAlumni.gender}
                </span>
              </div>
            </div>

            {/* Detailed Body */}
            <div className="p-6 space-y-4 text-sm max-h-[55vh] overflow-y-auto">
              
              {/* Highlights Row (Blood & DOB) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50/80 p-3.5 rounded-2xl border border-red-100/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 fill-red-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Blood Group</p>
                    <p className="font-extrabold text-red-900 text-base">{selectedAlumni.blood_group}</p>
                  </div>
                </div>

                <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-100/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Date of Birth</p>
                    <p className="font-semibold text-blue-900 text-xs mt-0.5">{formatDate(selectedAlumni.dob)}</p>
                  </div>
                </div>
              </div>

              {/* Family Details */}
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-3 text-slate-700">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Father's Name</p>
                    <p className="font-medium text-slate-800 text-xs mt-0.5">{selectedAlumni.father_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Mother's Name</p>
                    <p className="font-medium text-slate-800 text-xs mt-0.5">{selectedAlumni.mother_name || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Details</p>
                {selectedAlumni.contact?.email && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium text-xs">{selectedAlumni.contact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-xs">+{selectedAlumni.contact?.phone}</span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex items-start gap-3 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="font-medium text-slate-800 text-xs mt-0.5 leading-snug">
                    {selectedAlumni.address || 'Address details unavailable'}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition shadow-md"
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