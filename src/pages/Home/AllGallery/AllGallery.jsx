import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { parse, isValid } from "date-fns";
import {
  X,
  Calendar,
  Eye,
  Filter,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path if needed

export default function AllGallery() {
  const axiosSecure = useAxiosSecure();

  // State
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // 1. Fetch gallery data
  const {
    data: rawGalleryItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gallery");
      return res.data;
    },
  });

  // 2. Extract Unique Years
  const uniqueYears = useMemo(() => {
    if (!rawGalleryItems.length) return [];
    const years = rawGalleryItems
      .map((item) => Number(item.year))
      .filter((yr) => !isNaN(yr));
    
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [rawGalleryItems]);

  // 3. Filter & Date Sorting Processing (LATEST DATES FIRST)
  const processedGallery = useMemo(() => {
    if (!rawGalleryItems.length) return [];

    let list = rawGalleryItems.map((item, originalIndex) => ({
      ...item,
      originalIndex,
    }));

    if (selectedYear !== "ALL") {
      list = list.filter((item) => String(item.year) === String(selectedYear));
    }

    return list.sort((a, b) => {
      const dateA = parse(a.date, "MMM dd, yyyy", new Date());
      const dateB = parse(b.date, "MMM dd, yyyy", new Date());

      const validA = isValid(dateA);
      const validB = isValid(dateB);

      if (validA && validB) {
        // b - a দিয়ে Descending করা হয়েছে যাতে Latest সবথেকে আগে আসে
        const timeDiff = dateB.getTime() - dateA.getTime();
        if (timeDiff === 0) return a.originalIndex - b.originalIndex;
        return timeDiff;
      }

      if (validA) return -1;
      if (validB) return 1;

      return a.originalIndex - b.originalIndex;
    });
  }, [rawGalleryItems, selectedYear]);

  // 4. Pagination Calculations
  const totalPages = Math.ceil(processedGallery.length / ITEMS_PER_PAGE) || 1;

  const currentPaginatedGallery = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedGallery.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedGallery, currentPage]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
    setSelectedIndex(null);
  };

  // 5. Image Download Handler
  const handleDownloadImage = async (imageUrl, title) => {
    try {
      setDownloading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, "_").toLowerCase()}_gallery.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image:", err);
      window.open(imageUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  // Lightbox Navigation
  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? currentPaginatedGallery.length - 1 : prevIndex - 1
    );
  }, [currentPaginatedGallery.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === currentPaginatedGallery.length - 1 ? 0 : prevIndex + 1
    );
  }, [currentPaginatedGallery.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

  const currentItem =
    selectedIndex !== null ? currentPaginatedGallery[selectedIndex] : null;

  return (
    <section className="min-h-screen pt-60 bg-[#030712] pb-12 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Expanded Container Width */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header & Year Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-slate-800/60 pb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 backdrop-blur-xl text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
              ARCHIVAL COLLECTION
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Campus Life{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
              Explore past college memories, cultural events, and academic traditions sorted in chronological order.
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-3 bg-gradient-to-b from-[#0d1627] to-[#0a1120] border border-slate-800/80 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl self-start md:self-auto">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Filter className="w-4 h-4 shrink-0" />
            </div>
            <div className="flex flex-col pr-1">
              <label htmlFor="year-filter" className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Filter Year
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="bg-transparent text-slate-100 text-xs font-bold focus:outline-none cursor-pointer py-0.5"
              >
                <option value="ALL" className="bg-slate-950 text-slate-200">
                  All Years
                </option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year} className="bg-slate-950 text-slate-200">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[380px] bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl backdrop-blur-2xl shadow-2xl">
            <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 animate-bounce">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
            <p className="text-sm font-bold text-slate-300">Fetching gallery entries...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-center gap-4 shadow-xl">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Failed to Load Gallery Data</h3>
              <p className="text-xs text-rose-300">{error?.message || "Something went wrong."}</p>
            </div>
          </div>
        )}

        {/* Gallery Grid View */}
        {!isLoading && !isError && (
          <>
            {processedGallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center shadow-xl">
                <ImageIcon className="w-12 h-12 text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-slate-300">No Gallery Records Found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedYear !== "ALL"
                    ? `No events found for year ${selectedYear}.`
                    : "There are no images in the gallery right now."}
                </p>
              </div>
            ) : (
              <>
                {/* 12-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {currentPaginatedGallery.map((item, index) => (
                    <div
                      key={item._id || index}
                      onClick={() => setSelectedIndex(index)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2 aspect-[4/3]"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                        <span className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                          {item.year}
                        </span>

                        <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-cyan-400 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <Eye className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                        <div className="transform sm:translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-widest block mb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                            {item.date}
                          </span>
                          <h3 className="text-white text-base md:text-lg font-bold leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-300 transition shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs font-extrabold shadow-lg">
                      <span className="text-cyan-400 font-mono text-sm">{currentPage}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-400 font-mono text-sm">{totalPages}</span>
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-300 transition shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-2xl p-3 sm:p-6 animate-fadeIn">
          
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 md:left-8 z-50 bg-slate-900/90 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 p-3.5 rounded-full border border-slate-700 hover:border-cyan-400 transition-all shadow-2xl focus:outline-none"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 md:right-8 z-50 bg-slate-900/90 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 p-3.5 rounded-full border border-slate-700 hover:border-cyan-400 transition-all shadow-2xl focus:outline-none"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col z-10">
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-full border border-slate-700/80 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-60 sm:h-80 relative bg-slate-950 flex-shrink-0">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-90" />

              <div className="sm:hidden absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="pointer-events-auto bg-slate-900/90 text-cyan-400 p-2.5 rounded-full border border-slate-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="pointer-events-auto bg-slate-900/90 text-cyan-400 p-2.5 rounded-full border border-slate-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentItem.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                    Year {currentItem.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {selectedIndex + 1} / {currentPaginatedGallery.length}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {currentItem.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {currentItem.description}
              </p>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={() => handleDownloadImage(currentItem.image, currentItem.title)}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 hover:from-cyan-500/30 hover:to-sky-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/10"
                >
                  {downloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{downloading ? "Downloading..." : "Download Image"}</span>
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <div className="hidden sm:flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleClose}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}