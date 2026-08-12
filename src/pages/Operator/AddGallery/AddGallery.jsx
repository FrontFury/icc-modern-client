import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Image as ImageIcon,
  Calendar,
  Sparkles,
  UploadCloud,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  X,
  FileText,
  AlertCircle,
  Hash,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust import path if needed

export default function AddGallery() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // DatePicker State
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
  });

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // TanStack Query Mutation for Posting Gallery Data
  const galleryMutation = useMutation({
    mutationFn: async (newGalleryItem) => {
      const response = await axiosSecure.post("/gallery", newGalleryItem);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate existing gallery cache so feed automatically refreshes
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      
      // Clear status message and trigger Success Modal
      setStatusMessage({ type: "", text: "" });
      setShowSuccessModal(true);
    },
    onError: (error) => {
      console.error("Gallery Submission Error:", error);
      setStatusMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to submit gallery item. Please try again.",
      });
    },
  });

  // Handle Text/Number Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sync DatePicker change with Year state automatically
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        year: date.getFullYear(),
      }));
    }
  };

  // Handle File Selection
  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage({
        type: "error",
        text: "Please select a valid image file (PNG, JPG, WEBP).",
      });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setStatusMessage({ type: "", text: "" });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Upload image directly to ImgBB
  const uploadToImgBB = async (file) => {
    const apiKey = import.meta.env.VITE_image_host_key;

    if (!apiKey) {
      throw new Error(
        "ImgBB API key missing. Please add VITE_image_host_key to your .env file."
      );
    }

    const bodyData = new FormData();
    bodyData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: bodyData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(
        data.error?.message || "Failed to upload image to ImgBB."
      );
    }
  };

  // Submit Handler using TanStack Mutation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setStatusMessage({
        type: "error",
        text: "Please select an image file to upload.",
      });
      return;
    }

    try {
      setStatusMessage({
        type: "info",
        text: "Uploading image to hosting server...",
      });
      setUploadingImage(true);

      // 1. Upload file to ImgBB
      const uploadedImageUrl = await uploadToImgBB(imageFile);
      setUploadingImage(false);

      setStatusMessage({
        type: "info",
        text: "Saving gallery record...",
      });

      // 2. Prepare payload
      const formattedDateStr = format(selectedDate, "MMM dd, yyyy").toUpperCase();

      const galleryPayload = {
        title: formData.title,
        description: formData.description,
        date: formattedDateStr,
        year: parseInt(formData.year, 10),
        image: uploadedImageUrl,
      };

      // 3. Execute TanStack Query Mutation
      galleryMutation.mutate(galleryPayload);
    } catch (error) {
      setUploadingImage(false);
      setStatusMessage({
        type: "error",
        text: error.message || "An unexpected error occurred while processing.",
      });
    }
  };

  const isSubmitting = galleryMutation.isPending || uploadingImage;

  return (
    <div className="min-h-screen pb-24 bg-[#030712] text-slate-100 font-sans relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-full h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full mx-auto sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </button>

        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-md text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            GALLERY CONTROL CENTER
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Create{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
              Gallery Record
            </span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Publish event highlights, cultural performances, and institutional memories directly to the live gallery feed.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-gradient-to-b from-slate-900/90 via-[#071927]/90 to-slate-950/95 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/20 relative">
          {/* Status Message Banner */}
          {statusMessage.text && (
            <div
              className={`mb-8 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border transition-all ${
                statusMessage.type === "error"
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                  : statusMessage.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              }`}
            >
              {statusMessage.type === "success" && (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              {statusMessage.type === "error" && (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              {statusMessage.type === "info" && (
                <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2.5">
                Event Title *
              </label>
              <div className="relative group">
                <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors z-10" />
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Alumni Reunion & Cultural Program"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
                />
              </div>
            </div>

            {/* Grid for Date Picker & Year Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Date (DatePicker) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2.5">
                  Event Date *
                </label>
                <div className="relative group">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors z-10 pointer-events-none" />
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition cursor-pointer"
                    wrapperClassName="w-full"
                  />
                </div>
              </div>

              {/* Event Year Field */}
              <div>
                <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2.5">
                  Year *
                </label>
                <div className="relative group">
                  <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors z-10" />
                  <input
                    type="number"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2026"
                    min="1900"
                    max="2100"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
                  />
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2.5">
                Event Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Grand cultural performance and gathering of former students celebrating college traditions..."
                className="w-full p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition resize-none"
              />
            </div>

            {/* Image Selection & Preview */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2.5">
                Gallery Image *
              </label>

              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-900/50 hover:bg-slate-900/80 transition cursor-pointer group relative overflow-hidden"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    className="hidden"
                    id="gallery-image-input"
                  />
                  <label
                    htmlFor="gallery-image-input"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-slate-200 mb-1">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-slate-500">
                      Supports PNG, JPG, WEBP
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-72 flex items-center justify-center group shadow-inner">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="p-3 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="Remove Image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 disabled:text-slate-500 text-xs font-extrabold rounded-xl transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 text-slate-950" />
                    <span>Publish Gallery Item</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Theme Matching Custom Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-slate-900 via-[#071927] to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl shadow-cyan-500/10 space-y-5 relative">
            {/* Glowing Background Glow effect inside modal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none" />

            {/* Check Icon with Cyan Glow */}
            <div className="relative w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>

            {/* Content */}
            <div className="space-y-2 relative z-10">
              <h3 className="text-xl font-black text-white tracking-tight">
                Published Successfully!
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Gallery item has been created and updated in the live feed records.
              </p>
            </div>

            {/* Button */}
            <div className="pt-2 relative z-10">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/operator/manageGallery");
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                Go to Manage Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}