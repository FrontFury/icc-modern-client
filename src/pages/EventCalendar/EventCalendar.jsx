import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure()

  // TanStack Query: Fetch Events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      date: event.startStr,
      ...event.extendedProps,
    });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-44 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-800 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Academic & Event Calendar
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Select an event on the calendar to view full details.
            </p>
          </div>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            User View
          </span>
        </div>

        {/* Calendar */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
          />
        </div>
      </div>

      {/* View Event Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-slate-100">
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {selectedEvent.image && (
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block text-xs">Date</span>
                  <span className="font-semibold text-slate-200">
                    {selectedEvent.date}
                  </span>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block text-xs">Time</span>
                  <span className="font-semibold text-slate-200">
                    {selectedEvent.time || "N/A"}
                  </span>
                </div>
              </div>
              {selectedEvent.location && (
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 text-sm">
                  <span className="text-slate-400 block text-xs">Location</span>
                  <span className="font-semibold text-slate-200">
                    {selectedEvent.location}
                  </span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 text-sm">
                  <span className="text-slate-400 block text-xs mb-1">
                    Details
                  </span>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}