import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

// Image Host API Key from .env
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

  // 1. TanStack Query: GET All Events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // 2. TanStack Mutation: POST (Create Event)
  const addEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      const res = await axiosSecure.post("/events", newEvent);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
    onError: (err) => console.error("Create event failed:", err),
  });

  // 3. TanStack Mutation: PATCH (Update Event)
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/events/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
    onError: (err) => console.error("Update event failed:", err),
  });

  // 4. TanStack Mutation: DELETE Event
  const deleteEventMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/events/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
    },
    onError: (err) => console.error("Delete event failed:", err),
  });

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    try {
      setUploadingImage(true);
      const res = await axios.post(image_hosting_api, imageFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          image: res.data.data.display_url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Calendar Click Handlers
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

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEventId) {
      updateEventMutation.mutate({
        id: selectedEventId,
        updatedData: formData,
      });
    } else {
      addEventMutation.mutate(formData);
    }
  };

  // Delete Handler
  const handleDelete = () => {
    if (!selectedEventId) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(selectedEventId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div>
            <h2 className="text-xl font-bold text-white">
              Operator Event Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any date to add an event, or click an existing event to edit.
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
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all"
          >
            + Create Event
          </button>
        </div>

        {/* Calendar View */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-base font-bold text-white">
                {selectedEventId ? "Edit Event Details" : "Create New Event"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10:30 AM"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Main Auditorium"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Event Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
                
                {/* Image Upload Loader / Preview */}
                {uploadingImage && (
                  <p className="text-xs text-indigo-400 mt-1.5 animate-pulse">
                    Uploading image...
                  </p>
                )}
                {formData.image && !uploadingImage && (
                  <div className="mt-2 relative group w-24 h-16 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={formData.image}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 text-[10px] leading-none"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={
                    addEventMutation.isPending ||
                    updateEventMutation.isPending ||
                    uploadingImage
                  }
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-xs transition-all disabled:opacity-50"
                >
                  {selectedEventId ? "Update Event" : "Save Event"}
                </button>
                {selectedEventId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteEventMutation.isPending || uploadingImage}
                    className="bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white font-medium px-4 py-2 rounded-lg text-xs transition-all disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}