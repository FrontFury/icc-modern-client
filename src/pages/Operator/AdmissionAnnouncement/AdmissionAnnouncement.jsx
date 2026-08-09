import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Megaphone, Power, PowerOff, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdmissionAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: announcement = {},
    isLoading,
  } = useQuery({
    queryKey: ["admission-announcement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admission-announcement");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(
        "/admission-announcement",
        data
      );
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admission-announcement"],
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
        background: "#0a1120",
        color: "#f8fafc",
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
        background: "#0a1120",
        color: "#f8fafc",
      });
    },
  });

  // Toggle Function: Enable থাকলে Disable করবে, Disable থাকলে Enable করবে
  const handleToggleStatus = (e) => {
    e.preventDefault();

    const form = e.currentTarget.form;
    const text = form?.text?.value?.trim() || announcement?.text || "";

    // Enable করার সময়ে টেক্সট ফিল্ড ফাঁকা থাকলে অ্যালার্ট দিবে
    if (!announcement?.enabled && !text) {
      Swal.fire({
        icon: "warning",
        title: "Announcement Required",
        text: "Please enter admission announcement text before enabling.",
        background: "#0a1120",
        color: "#f8fafc",
      });
      return;
    }

    mutation.mutate({
      text,
      enabled: !announcement?.enabled, // Toggle standard Boolean value
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const isEnabled = announcement?.enabled;

  return (
    <section className="min-h-screen bg-[#030712] py-12 sm:py-16 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Card Container */}
        <div className="bg-[#0a1120]/70 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Border Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Form Header */}
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              ANNOUNCEMENT CONTROL
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3">
              <Megaphone className="w-8 h-8 text-cyan-400" />
              Admission Marquee
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              Update and manage the broadcast banner shown across the platform.
            </p>
          </div>

          <form className="space-y-6">
            {/* Text Input Area */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Announcement Text *
              </label>
              <textarea
                name="text"
                defaultValue={announcement?.text || ""}
                rows={4}
                placeholder="Enter admission announcement message..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Current Status Box */}
            <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Current Visibility
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {isEnabled
                    ? "Announcement is active and visible to all users."
                    : "Announcement is offline and hidden."}
                </p>
              </div>

              <div>
                {isEnabled ? (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-4 h-4" />
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-extrabold rounded-full shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                    <AlertCircle className="w-4 h-4" />
                    Disabled
                  </span>
                )}
              </div>
            </div>

            {/* CONDITIONAL ACTION BUTTON */}
            <div className="pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleToggleStatus}
                disabled={mutation.isPending}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  isEnabled
                    ? "bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:shadow-rose-500/10"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/30"
                }`}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isEnabled ? (
                  <>
                    <PowerOff className="w-4 h-4" />
                    <span>Disable Announcement</span>
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4" />
                    <span>Enable & Publish</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Marquee Live Preview Section */}
        {announcement?.text && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Live Preview
            </h3>

            <div className="bg-[#0a1120]/90 border border-cyan-500/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase rounded-lg shrink-0">
                  <Megaphone className="w-3.5 h-3.5" />
                  Admission
                </span>

                <div className="overflow-hidden flex-1">
                  <div className="whitespace-nowrap text-xs sm:text-sm font-semibold text-slate-200 animate-marquee">
                    {announcement.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AdmissionAnnouncement;