import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Megaphone, ChevronRight } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdmissionMarquee = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcement, isLoading } = useQuery({
    queryKey: ["admission-announcement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admission-announcement");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || !announcement?.enabled) {
    return null;
  }

  const items = Array(3).fill(announcement?.text);

  return (
    <div className="w-full bg-[#0a1120]/90 backdrop-blur-md border-y border-cyan-500/20 text-slate-100 overflow-hidden relative shadow-[0_0_20px_rgba(6,182,212,0.15)] z-40">
      <Link
        to="/admission"
        className="flex items-center group relative overflow-hidden"
      >
        {/* Neon Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Badge Label */}
        <div className="z-20 shrink-0 bg-slate-950/90 border-r border-cyan-500/30 px-4 md:px-6 py-2.5 sm:py-3 flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider text-cyan-400 shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
          <Megaphone className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Admission</span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-0.5 transition-transform hidden sm:inline" />
        </div>

        {/* Marquee Content */}
        <div className="overflow-hidden flex-1 py-2.5 sm:py-3 relative flex items-center">
          <div className="inline-flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] font-medium text-xs sm:text-sm text-slate-200 items-center">
            {items.map((text, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="hover:text-cyan-300 transition-colors font-bold">
                  {text}
                </span>
                
                {idx < items.length - 1 && (
                  <span 
                    className="text-cyan-500/70 font-bold select-none"
                    style={{ marginLeft: "1in", marginRight: "1in" }} 
                  >
                    ||
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdmissionMarquee;