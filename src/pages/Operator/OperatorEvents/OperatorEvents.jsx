import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import {
  Calendar as CalendarIcon,
  Plus,
  X,
  Upload,
  MapPin,
  Clock,
  Trash2,
  Sparkles,
  Edit2,
} from "lucide-react";

const image_hosting_key = import.meta.env.VITE_image_host_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function OperatorEvents() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  // GET Events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // POST Event
  const addEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      const res = await axiosSecure.post("/events", newEvent);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
  });

  // PATCH Event
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/events/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
  });

  // DELETE Event
  const deleteEventMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/events/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
  });

  // Upload Handler
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    try {
      setUploadingImage(true);
      const res = await axios.post(image_hosting_api, imageFormData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          image: res.data.data.display_url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  // Click Handlers
  const handleDateClick = (arg) => {
    setSelectedEventId(null);
    setFormData({
      title: "",
      date: arg.dateStr,
      time: "",
      location: "",
      description: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEventId(event.id);
    setFormData({
      title: event.title,
      date: event.startStr,
      time: event.extendedProps.time || "",
      location: event.extendedProps.location || "",
      description: event.extendedProps.description || "",
      image: event.extendedProps.image || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEventId) {
      updateEventMutation.mutate({ id: selectedEventId, updatedData: formData });
    } else {
      addEventMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (!selectedEventId) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(selectedEventId);
    }
  };

  return (
    <div className="min-h-screen  bg-[#030712] text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[250px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-md text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-inner">
              <CalendarIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              OPERATOR PANEL
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              Manage{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Add new campus activities, modify schedules, or delete outdated events across the system.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedEventId(null);
              setFormData({
                title: "",
                date: new Date().toISOString().split("T")[0],
                time: "",
                location: "",
                description: "",
                image: "",
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create New Event</span>
          </button>
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
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* OPERATOR MODAL (CREATE / EDIT / DELETE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200 p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {selectedEventId ? "Edit Event Details" : "Create Event Entry"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Hackathon 2026"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500/50 transition"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                    Event Time
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g., 09:00 AM - 05:00 PM"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g., Seminar Hall B"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                  Event Banner Image
                </label>

                {formData.image ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 max-h-40 bg-slate-950 group">
                    <img
                      src={formData.image}
                      alt="Event Banner"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-2 right-2 p-1.5 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700/50 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition group">
                    <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 mb-1 transition" />
                    <span className="text-slate-400 text-xs font-semibold">
                      {uploadingImage ? "Uploading to host..." : "Click to upload banner image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Event objective, guidelines, and rules..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={
                    addEventMutation.isPending ||
                    updateEventMutation.isPending ||
                    uploadingImage
                  }
                  className="flex-1 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {selectedEventId ? "Update Event" : "Save Event"}
                </button>

                {selectedEventId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteEventMutation.isPending || uploadingImage}
                    className="p-3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl transition disabled:opacity-50 cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
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