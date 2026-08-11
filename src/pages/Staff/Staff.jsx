import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Mail,
  Sparkles,
  Users,
  Loader2,
  AlertCircle,
  Briefcase,
  UserCheck,
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
    <section className="min-h-screen pt-32 pb-24 bg-[#030712] relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Dynamic Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Eye-Catching Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 backdrop-blur-xl text-cyan-400 border border-cyan-500/30 text-xs font-black uppercase tracking-widest rounded-full mb-5 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            Institutional Directory
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Dedicated Staff
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Empowering our educational standard through professional leadership, administration, and academic support.
          </p>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-[#0a1120]/80 border border-slate-800/80 p-3 sm:p-4 rounded-3xl backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Total Staff: <strong className="text-white text-sm ml-1">{filteredStaff.length}</strong></span>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-28 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center backdrop-blur-xl">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
            <h3 className="text-base font-bold text-slate-300">Fetching Directory...</h3>
            <p className="text-xs text-slate-500 mt-1">Please wait while we load institutional records.</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-rose-500/5 border border-rose-500/20 rounded-3xl text-center backdrop-blur-xl">
            <AlertCircle className="w-12 h-12 text-rose-400 mb-3 animate-bounce" />
            <h3 className="text-base font-bold text-rose-300">Failed to Load Staff Members</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">An error occurred while communicating with the server.</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredStaff.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 bg-[#0a1120]/40 border border-slate-800/80 rounded-3xl text-center backdrop-blur-xl">
            <Users className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-300">No Members Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching with a different name or role.</p>
          </div>
        )}

        {/* Staff Grid: Modern Eye-Catching Cards */}
        {!isLoading && !isError && filteredStaff.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredStaff.map((member) => (
              <div
                key={member._id}
                className="group relative bg-[#0a1120]/70 hover:bg-[#0d172b]/90 border border-slate-800/80 hover:border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden backdrop-blur-2xl"
              >
                {/* Accent Gradient Line on Top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Profile Image with Glow Badge */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-cyan-400/50 transition-colors duration-300 shadow-xl bg-slate-950">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=Staff+Photo";
                      }}
                    />
                  </div>
                  {/* Verified Icon Badge */}
                  <div className="absolute -bottom-2 -right-2 p-1.5 bg-slate-950 border border-slate-800 text-cyan-400 rounded-xl shadow-lg">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between h-full space-y-3">
                  <div>
                    {/* Designation Pill */}
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full mb-2.5 shadow-sm">
                      <Briefcase className="w-3 h-3 text-cyan-400" />
                      <span>{member.designation || "Staff Member"}</span>
                    </div>

                    {/* Member Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                      {member.name}
                    </h3>
                  </div>

                  {/* Contact Email Section */}
                  <div className="pt-3 border-t border-slate-800/80">
                    {member.email && member.email !== "N/A" ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300 hover:text-cyan-300 font-medium transition-colors bg-slate-950/50 hover:bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800/80 w-full sm:w-auto"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 italic bg-slate-950/30 px-3.5 py-2 rounded-xl border border-slate-800/40 w-full sm:w-auto">
                        <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <span>Email not available</span>
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