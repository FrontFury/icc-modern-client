import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Mail,
  Sparkles,
  Users,
  Loader2,
  AlertCircle,
  Calendar,
  Briefcase,
  Hash,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const Staff = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: staffList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff");
      return res.data;
    },
  });


  const filteredStaff = useMemo(() => {
    if (!Array.isArray(staffList)) return [];


    const filtered = staffList.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesName = item.name?.toLowerCase().includes(query);
      const matchesDesignation = item.designation?.toLowerCase().includes(query);
      const matchesEmail =
        item.email && item.email !== "N/A"
          ? item.email.toLowerCase().includes(query)
          : false;

      return matchesName || matchesDesignation || matchesEmail;
    });

    return filtered.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  }, [staffList, searchQuery]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#030712] relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 backdrop-blur-xl text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
            INSTITUTIONAL DIRECTORY
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Staff Directory
            </span>
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-medium leading-relaxed">
            Detailed profiles for all registered staff members ordered by entry sequence.
          </p>
        </div>

        {/* Search & Counter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#0a1120]/60 border border-slate-800/80 p-3 sm:p-4 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Total Members: <strong className="text-white">{filteredStaff.length}</strong></span>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center shadow-xl">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
            <h3 className="text-base font-bold text-slate-300">Fetching Staff Directory...</h3>
            <p className="text-xs text-slate-500 mt-1">Please wait while we load institutional records.</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-rose-500/5 border border-rose-500/20 rounded-3xl text-center shadow-xl">
            <AlertCircle className="w-12 h-12 text-rose-400 mb-3" />
            <h3 className="text-base font-bold text-rose-300">Failed to Load Staff Directory</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              An error occurred while communicating with the server.
            </p>
            <button
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-800 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredStaff.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center shadow-xl">
            <Users className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-300">No Members Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or keywords.
            </p>
          </div>
        )}

        {/* Staff Grid: 2 Cards per Row on Medium/Large Screens */}
        {!isLoading && !isError && filteredStaff.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredStaff.map((member) => (
              <div
                key={member._id}
                className="group relative bg-[#0a1120]/70 border border-slate-800/80 hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden backdrop-blur-xl"
              >
                {/* Glow Accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Profile Image */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-cyan-400/50 transition-colors shadow-lg bg-slate-950 shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Staff+Photo";
                    }}
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 w-full space-y-3.5 text-center sm:text-left">
                  
                  {/* Name & Role */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 rounded-full mb-1.5">
                      <Briefcase className="w-3 h-3" />
                      {member.designation}
                    </span>
                    <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                  </div>

                  {/* Inline All Data Display */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    
                    {/* Member ID */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
                      <Hash className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-semibold text-slate-500">ID:</span>
                      <span className="font-mono text-slate-300 text-[11px] truncate max-w-[200px]">
                        {member._id}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-semibold text-slate-500">Email:</span>
                      {member.email && member.email !== "N/A" ? (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-cyan-300 font-medium hover:underline truncate"
                        >
                          {member.email}
                        </a>
                      ) : (
                        <span className="text-slate-600 font-semibold italic">N/A</span>
                      )}
                    </div>

                    {/* Registered Date */}
                    {member.createdAt && (
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-500">Added On:</span>
                        <span className="text-slate-300 font-medium">
                          {new Date(member.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Staff;