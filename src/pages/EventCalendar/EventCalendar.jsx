import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar as CalendarIcon,
  X,
  MapPin,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EventCalendar() {
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // GET Events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // Event Click Handler (View Details)
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent({
      title: event.title,
      date: event.startStr,
      time: event.extendedProps.time || "",
      location: event.extendedProps.location || "",
      description: event.extendedProps.description || "",
      image: event.extendedProps.image || "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-36 bg-[#030712] text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[250px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-md text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-inner">
              <CalendarIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              SCHEDULE & TIMELINE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              Event{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Calendar
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Explore upcoming campus events, view schedules, and stay informed on college activities.
            </p>
          </div>
        </div>

        {/* Calendar View Board */}
        <div className="bg-gradient-to-b from-slate-900/90 via-[#071927]/80 to-slate-950/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 shadow-2xl relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[450px] gap-3 text-cyan-400">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Events...</span>
            </div>
          ) : (
            <div className="custom-calendar-theme">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                height="auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* EVENT DETAILS VIEW MODAL */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Event Details
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Event Banner */}
            {selectedEvent.image && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-52 bg-slate-950">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white">
                {selectedEvent.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <CalendarIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedEvent.date}</span>
                </div>

                {selectedEvent.time && (
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
              </div>

              {selectedEvent.location && (
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}

              {selectedEvent.description && (
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Description</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FullCalendar Custom Theme Overrides */}
      <style>{`
        .custom-calendar-theme .fc {
          --fc-border-color: rgba(30, 41, 59, 0.8);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: rgba(15, 23, 42, 0.6);
          --fc-list-event-hover-bg-color: rgba(6, 182, 212, 0.1);
          --fc-today-bg-color: rgba(6, 182, 212, 0.08) !important;
          font-family: inherit;
        }

        .custom-calendar-theme .fc-toolbar-title {
          font-size: 1.125rem !important;
          font-weight: 800 !important;
          color: #f8fafc !important;
        }

        .custom-calendar-theme .fc-button-primary {
          background-color: rgba(15, 23, 42, 0.8) !important;
          border-color: rgba(51, 65, 85, 0.8) !important;
          color: #cbd5e1 !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          border-radius: 0.75rem !important;
          padding: 0.4rem 0.8rem !important;
          text-transform: capitalize !important;
          box-shadow: none !important;
        }

        .custom-calendar-theme .fc-button-primary:hover {
          background-color: rgba(30, 41, 59, 1) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
          color: #06b6d4 !important;
        }

        .custom-calendar-theme .fc-button-active {
          background-color: rgba(6, 182, 212, 0.2) !important;
          border-color: rgba(6, 182, 212, 0.5) !important;
          color: #22d3ee !important;
        }

        .custom-calendar-theme .fc-col-header-cell {
          padding: 0.75rem 0 !important;
          background-color: rgba(15, 23, 42, 0.4);
        }

        .custom-calendar-theme .fc-col-header-cell-cushion {
          color: #94a3b8 !important;
          font-size: 0.7rem !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em;
        }

        .custom-calendar-theme .fc-daygrid-day-number {
          color: #cbd5e1 !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          padding: 0.4rem 0.6rem !important;
        }

        .custom-calendar-theme .fc-event {
          background-color: rgba(6, 182, 212, 0.15) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 0.5rem !important;
          padding: 2px 4px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }

        .custom-calendar-theme .fc-event:hover {
          background-color: rgba(6, 182, 212, 0.25) !important;
          border-color: rgba(34, 211, 238, 0.6) !important;
          transform: translateY(-1px);
        }

        .custom-calendar-theme .fc-event-title {
          color: #22d3ee !important;
          font-size: 0.7rem !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
}