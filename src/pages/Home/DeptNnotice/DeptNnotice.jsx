import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FlaskConical,
  Palette,
  Banknote,
  Megaphone,
  ArrowRight,
  Loader2,
  Calendar,
  Tag,
  X,
  AlertCircle,
  Pin,
  Share2,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const DeptNnotice = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Fetch notices using TanStack Query & Axios
  const {
    data: notices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestNotices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notices");
      return res.data;
    },
  });

  // Sort by latest `createdAt` date and take top 4
  const latestNotices = [...notices]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const departments = [
    {
      id: 1,
      title: "Science",
      description:
        "Exploring the laws of nature through rigorous experimentation and research.",
      icon: <FlaskConical className="w-8 h-8 text-blue-600" />,
      color: "text-blue-600",
      accentBg: "bg-blue-50/50",
      link: "/departments/science",
    },
    {
      id: 2,
      title: "Arts",
      description:
        "Nurturing creativity and critical thinking through diverse humanities studies.",
      icon: <Palette className="w-8 h-8 text-amber-500" />,
      color: "text-amber-500",
      accentBg: "bg-amber-50/50",
      link: "/departments/arts",
    },
    {
      id: 3,
      title: "Commerce",
      description:
        "Mastering business, finance, and economics in a globalized landscape.",
      icon: <Banknote className="w-8 h-8 text-blue-600" />,
      color: "text-blue-600",
      accentBg: "bg-blue-50/50",
      link: "/departments/commerce",
    },
  ];

  // Format timestamp helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-12 md:py-16">
      <div className="w-11/12 md:w-5/6 mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Academic Departments */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="w-10 h-1 bg-amber-500 rounded-full mb-3" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Academic Departments
              </h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Discover our world-class faculty and specialized curricula.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="relative bg-white border border-gray-200/80 rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow h-80"
                >
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${dept.accentBg} -z-0`}
                  />

                  <div className="relative z-10">
                    <div className="mb-6">{dept.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {dept.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <Link
                    to={dept.link}
                    className={`relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold ${dept.color} hover:underline mt-4`}
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Latest Notices Sidebar */}
          <div className="bg-[#111726] text-white rounded-xl p-5 sm:p-7 shadow-xl flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold tracking-wide">
                    Latest Notices
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Click any notice to view full details
                  </p>
                </div>
                <Megaphone className="w-5 h-5 text-amber-400" />
              </div>

              {/* Notice List */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center text-amber-400 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs text-gray-400">
                      Loading notices...
                    </span>
                  </div>
                ) : isError ? (
                  <div className="py-8 text-center text-xs text-rose-400">
                    Failed to load latest notices.
                  </div>
                ) : latestNotices.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No notices published yet.
                  </div>
                ) : (
                  latestNotices.map((notice, idx) => (
                    <div
                      key={notice._id || idx}
                      onClick={() => setSelectedNotice(notice)}
                      className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 text-amber-500 text-[11px] font-bold tracking-wider uppercase">
                          <Calendar className="w-3 h-3" />
                          {formatDate(notice.publishedDate || notice.createdAt)}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {notice.priority === "IMPORTANT" && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Important
                            </span>
                          )}

                          {notice.category && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-800 group-hover:bg-gray-700 text-amber-400/90 border border-amber-400/20">
                              <Tag className="w-2.5 h-2.5" />
                              {notice.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-gray-100 group-hover:text-amber-400 transition-colors leading-snug">
                        {notice.title}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
                        {notice.summary || notice.content}
                      </p>

                      {idx < latestNotices.length - 1 && (
                        <div className="border-b border-gray-800/80 mt-4" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <a
              href="/notices"
              className="mt-8 block text-center w-full py-2.5 px-4 rounded-md border border-gray-700 hover:border-gray-500 text-xs font-medium text-gray-200 hover:text-white transition-all bg-[#172033]"
            >
              View All Notices
            </a>
          </div>
        </div>
      </div>

      {/* Notice View Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white text-gray-900 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Body Container */}
            <div className="overflow-y-auto pr-1 space-y-5">
              {/* Top Bar / Header */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  {/* Badges Bar */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {selectedNotice.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                        <Pin className="w-3 h-3 fill-blue-600" />
                        Pinned
                      </span>
                    )}

                    {selectedNotice.priority && (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          selectedNotice.priority === "IMPORTANT"
                            ? "bg-rose-50 text-rose-600 border-rose-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {selectedNotice.priority}
                      </span>
                    )}

                    {selectedNotice.category && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        <Tag className="w-3 h-3 text-amber-600" />
                        {selectedNotice.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    {selectedNotice.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      Published:{" "}
                      {formatDate(
                        selectedNotice.publishedDate ||
                          selectedNotice.createdAt,
                      )}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Optional Notice Image Banner */}
              {selectedNotice.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-100 max-h-60 bg-gray-50">
                  <img
                    src={selectedNotice.imageUrl}
                    alt={selectedNotice.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Summary Highlight Box */}
              {selectedNotice.summary && (
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                  <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">
                    Summary
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed italic">
                    "{selectedNotice.summary}"
                  </p>
                </div>
              )}

              {/* Detailed Content */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Description
                </h4>
                <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {selectedNotice.content ||
                    selectedNotice.summary ||
                    "No additional content provided."}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-100 mt-6 pt-4 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  alert("Notice link copied!");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>

              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeptNnotice;
