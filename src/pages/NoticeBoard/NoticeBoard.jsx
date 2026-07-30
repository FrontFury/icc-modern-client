import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
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
    <div className="min-h-screen bg-slate-900/5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] text-slate-800 font-sans pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Main Header Banner */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/80 backdrop-blur-md text-blue-700 text-xs font-extrabold uppercase tracking-widest rounded-full border border-blue-200/60 mb-3 shadow-xs">
            <BellRing className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            INSTITUTIONAL UPDATES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Notice Board
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            Stay informed with the latest official announcements, academic schedules, and campus events from Ideal Commerce College.
          </p>
        </div>

        {/* PINNED ANNOUNCEMENTS */}
        {pinnedNotices.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Pin className="w-4 h-4 text-blue-600 fill-blue-600 rotate-45" />
              <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
                PINNED ANNOUNCEMENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-200/80 bg-white/90 backdrop-blur-md text-slate-800 shadow-sm hover:bg-[#0f172a] hover:border-[#1e293b] hover:shadow-2xl flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase bg-blue-600 text-white group-hover:bg-amber-500/20 group-hover:text-amber-400 group-hover:border group-hover:border-amber-500/30 transition-colors">
                        {notice.priority || "IMPORTANT"}
                      </span>
                      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-400 transition-colors">
                        Published: {notice.publishedDate}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold mb-3 text-slate-900 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-600 group-hover:text-slate-300 transition-colors line-clamp-3">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 group-hover:border-slate-800 transition-colors flex items-center justify-between">
                    <span className="text-xs font-bold inline-flex items-center gap-1.5 text-blue-600 group-hover:text-white transition-colors">
                      <span className="hidden group-hover:inline">Read More</span>
                      <span className="group-hover:hidden">View PDF</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden group-hover:inline" />
                      <ExternalLink className="w-3.5 h-3.5 group-hover:hidden" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, notice.pdfUrl)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 group-hover:bg-slate-800 group-hover:text-white group-hover:hover:bg-slate-700 transition"
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
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-white/70 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60 backdrop-blur-sm"
                      }`}
                    >
                      <span>{cat === "All" ? "All Notices" : cat}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {getCategoryCount(cat)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-sm font-black text-slate-900 mb-1">
                  Support Center
                </h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Have questions regarding a specific notice or examination routine?
                </p>
                <a
                  href="mailto:info@idealcommercecollege.edu.bd"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
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
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
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
                    className="w-full pl-8 pr-3 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-800 focus:ring-0 transition placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-slate-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {currentRecentNotices.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 text-center border border-slate-200/80 text-slate-500">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700">No notices found</p>
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
                    className="group bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/70 shadow-2xs hover:shadow-xl hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                          {notice.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {notice.publishedDate}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 leading-snug">
                        {notice.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {notice.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span className="inline-flex items-center gap-1 group-hover:underline">
                        View Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, notice.pdfUrl)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
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
              <div className="mt-8 flex items-center justify-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition ${
                    currentPage === 1
                      ? "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-xl font-bold transition flex items-center justify-center ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-xs"
                          : "border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition ${
                    currentPage === totalPages
                      ? "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-slate-800 p-6 sm:p-8">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                  {selectedNotice.category}
                </span>
                {selectedNotice.priority && (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100">
                    {selectedNotice.priority}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                {selectedNotice.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Published: {selectedNotice.publishedDate}
                </span>
                <span>•</span>
                <span>Ideal Commerce College Admin</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed mb-8 pt-4 border-t border-slate-100">
              <p className="font-semibold text-slate-800">
                {selectedNotice.summary}
              </p>
              <p>{selectedNotice.description || selectedNotice.summary}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={(e) => handleDownload(e, selectedNotice.pdfUrl)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-2 shadow-md shadow-blue-500/20"
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