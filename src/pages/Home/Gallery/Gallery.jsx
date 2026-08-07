import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { parse, isValid } from "date-fns";
import {
  X,
  Calendar,
  Eye,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path if needed

const Gallery = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 1. Fetch gallery data from backend using Axios
  const {
    data: rawGalleryItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["home-gallery"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gallery");
      return res.data;
    },
  });

  // 2. Sort by date (Latest First) and select the top 9 items
  const galleryItems = useMemo(() => {
    if (!rawGalleryItems.length) return [];

    const sortedList = [...rawGalleryItems].sort((a, b) => {
      const dateA = parse(a.date, "MMM dd, yyyy", new Date());
      const dateB = parse(b.date, "MMM dd, yyyy", new Date());

      const validA = isValid(dateA);
      const validB = isValid(dateB);

      if (validA && validB) {
        return dateB.getTime() - dateA.getTime(); // Latest dates first
      }

      if (validA) return -1;
      if (validB) return 1;

      return 0;
    });

    return sortedList.slice(0, 9); // Limit to top 9 latest items
  }, [rawGalleryItems]);

  // Navigation handlers with array wrap-around
  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  }, [galleryItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryItems.length]);

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

  const currentItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <section className="w-full bg-[#030712] py-16 sm:py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="w-12 h-1 bg-cyan-400 rounded-full mx-auto mb-4 shadow-[0_0_10px_#22d3ee]" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Campus Life Gallery
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base font-medium">
            A glimpse into our vibrant, diverse, and modern academic community.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl backdrop-blur-2xl">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-400">Loading campus memories...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold">{error?.message || "Failed to load gallery items."}</p>
          </div>
        )}

        {/* 9-Image Grid */}
        {!isLoading && !isError && (
          <>
            {galleryItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center">
                <ImageIcon className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-sm font-medium text-slate-400">No gallery images available right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {galleryItems.map((item, index) => (
                  <div
                    key={item._id || item.id || index}
                    onClick={() => setSelectedIndex(index)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0a1120]/60 border border-slate-800/80 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-1.5 aspect-[4/3]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Hover Dark Overlay with Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6">
                      
                      <div className="flex justify-end">
                        <span className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-cyan-400 p-2.5 rounded-full shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4" />
                        </span>
                      </div>

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
            )}
          </>
        )}

        {/* View Entire Gallery Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/allGallery"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
          >
            <span>View Entire Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Interactive Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-xl p-3 sm:p-6 animate-fadeIn">
          
          {/* External Left Navigation Arrow (Desktop) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 md:left-8 z-50 bg-slate-900/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 p-3 rounded-full border border-slate-700/80 hover:border-cyan-400 transition-all shadow-xl focus:outline-none"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* External Right Navigation Arrow (Desktop) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 md:right-8 z-50 bg-slate-900/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 p-3 rounded-full border border-slate-700/80 hover:border-cyan-400 transition-all shadow-xl focus:outline-none"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Card */}
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col z-10">
            
            {/* Modal Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-full border border-slate-700/80 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Container */}
            <div className="w-full h-56 sm:h-80 relative bg-slate-950 flex-shrink-0">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-80" />

              {/* Mobile Quick Navigation Controls */}
              <div className="sm:hidden absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="pointer-events-auto bg-slate-900/80 text-cyan-400 p-2 rounded-full border border-slate-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="pointer-events-auto bg-slate-900/80 text-cyan-400 p-2 rounded-full border border-slate-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Details */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentItem.date}</span>
                </div>

                <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                  {selectedIndex + 1} / {galleryItems.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {currentItem.title}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {currentItem.description}
              </p>

              {/* Footer Controls */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-colors ml-auto"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;