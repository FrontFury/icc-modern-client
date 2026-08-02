import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  Pin,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Calendar,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Search,
  BellRing,
  Sparkles,
} from "lucide-react";

export default function NoticeBoard() {
  const notices = useLoaderData() || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  // Handle Opening Notice PDF in a New Tab
  const handleDownload = (e, pdfUrl) => {
    e.stopPropagation();
    if (!pdfUrl) {
      alert("Notice file is not available for download.");
      return;
    }
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  // Filter and Sort Logic
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      activeCategory === "All" ||
      notice.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.publishedDate);
    const dateB = new Date(b.publishedDate);
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Limit pinned notices strictly to the TOP 2
  const pinnedNotices = notices.filter((item) => item.isPinned).slice(0, 2);
  const unpinnedNotices = sortedNotices.filter((item) => !item.isPinned);

  // Pagination Logic for Recent Notices
  const totalPages = Math.ceil(unpinnedNotices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecentNotices = unpinnedNotices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Category counts
  const categories = [
    "All",
    "Academic",
    "Examination",
    "Administrative",
    "Events",
  ];
  const getCategoryCount = (cat) => {
    if (cat === "All") return notices.length;
    return notices.filter(
      (n) => n.category.toLowerCase() === cat.toLowerCase()
    ).length;
  };

  return (
    <div className="min-h-screen pt-40 bg-[#030712] text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Background Glow Accents matching design theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[250px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* Main Header Banner */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-md text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-inner">
            <BellRing className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            INSTITUTIONAL UPDATES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Notice{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Board
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Stay informed with the latest official announcements, academic schedules, and campus events from Ideal Commerce College.
          </p>
        </div>

        {/* PINNED ANNOUNCEMENTS */}
        {pinnedNotices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Pin className="w-4 h-4 text-amber-400 fill-amber-400 rotate-45" />
              <h2 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                PINNED ANNOUNCEMENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-[#0a192f]/80 to-slate-950/90 backdrop-blur-md text-slate-100 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/60 hover:-translate-y-1 flex flex-col justify-between min-h-[220px]"
                >
                  {/* Subtle inner card glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {notice.priority || "IMPORTANT"}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Published: {notice.publishedDate}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold mb-3 text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-300 line-clamp-3">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 group-hover:border-slate-700 transition-colors flex items-center justify-between">
                    <span className="text-xs font-bold inline-flex items-center gap-1.5 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      <span>View Notice Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, notice.pdfUrl)}
                      className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-cyan-500/40 transition"
                      title="Open PDF in New Tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Section Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Categories Sidebar & Support Card */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <span className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                Categories
              </span>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                          : "bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-100 border-slate-800/80 backdrop-blur-md"
                      }`}
                    >
                      <span>{cat === "All" ? "All Notices" : cat}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          isActive
                            ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {getCategoryCount(cat)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-gradient-to-b from-slate-900/90 via-[#071927]/80 to-slate-950/90 backdrop-blur-md rounded-2xl p-5 border border-slate-800/80 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-sm font-black text-white mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Support Center
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Have questions regarding a specific notice or examination routine?
                </p>
                <a
                  href="mailto:info@idealcommercecollege.edu.bd"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Contact Admin
                </a>
              </div>
            </div>
          </div>

          {/* Recent Notices List */}
          <div className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Recent Notices
              </h2>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search notice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500/50 transition placeholder-slate-500"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="newest" className="bg-slate-900 text-slate-200">
                      Newest First
                    </option>
                    <option value="oldest" className="bg-slate-900 text-slate-200">
                      Oldest First
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {currentRecentNotices.length === 0 ? (
              <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-12 text-center border border-slate-800/80 text-slate-400">
                <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-200">No notices found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try resetting your search filter or category selection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {currentRecentNotices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className="group bg-gradient-to-b from-slate-900/90 via-[#071927]/80 to-slate-950/90 backdrop-blur-md rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {notice.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {notice.publishedDate}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2 leading-snug">
                        {notice.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {notice.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400">
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, notice.pdfUrl)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                        title="Open PDF in New Tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Control */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
                    currentPage === 1
                      ? "border-slate-800/50 bg-slate-900/40 text-slate-600 cursor-not-allowed"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-700 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-xl font-bold transition flex items-center justify-center ${
                        currentPage === page
                          ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                          : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
                    currentPage === totalPages
                      ? "border-slate-800/50 bg-slate-900/40 text-slate-600 cursor-not-allowed"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-700 cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL NOTICE DETAIL MODAL */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200 p-6 sm:p-8">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {selectedNotice.category}
                </span>
                {selectedNotice.priority && (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {selectedNotice.priority}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
                {selectedNotice.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Published: {selectedNotice.publishedDate}
                </span>
                <span>•</span>
                <span>Ideal Commerce College Admin</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-8 pt-4 border-t border-slate-800">
              <p className="font-semibold text-white">
                {selectedNotice.summary}
              </p>
              <p className="text-slate-400">
                {selectedNotice.description || selectedNotice.summary}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={(e) => handleDownload(e, selectedNotice.pdfUrl)}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open PDF in New Tab</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}