import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UserPlus,
  Upload,
  User,
  Briefcase,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  X,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path if needed

// Access Vite Environment Variable
const IMGBB_API_KEY = import.meta.env.VITE_image_host_key;

export default function AddStaff() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
  });

  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // 1. TanStack Query Mutation for posting staff member
  const addStaffMutation = useMutation({
    mutationFn: async (newStaffData) => {
      const res = await axiosSecure.post("/staff", newStaffData);
      return res.data;
    },
    onSuccess: () => {
      setStatus({
        type: "success",
        message: "Staff member added successfully!",
      });

      // Invalidate query to refresh staff directory list automatically
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });

      // Reset form fields
      setFormData({ name: "", designation: "", email: "" });
      setImageFile(null);
      setImagePreview("");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/operator/manageStaff");
      }, 1500);
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Failed to add staff member.",
      });
    },
  });

  // Handle Text Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: "error", message: "Image size must be less than 5MB." });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setStatus({ type: "", message: "" });
    }
  };

  // Clear Selected Image
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // Helper Function: Upload Image to ImgBB
  const uploadImageToCloud = async (file) => {
    if (!IMGBB_API_KEY) {
      throw new Error("ImgBB API key is missing in your .env file (VITE_image_host_key).");
    }

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: imageFormData,
    });

    const data = await res.json();
    if (data.success) {
      return data.data.display_url;
    }

    throw new Error(data?.error?.message || "Image upload failed.");
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.name || !formData.designation) {
      setStatus({ type: "error", message: "Name and designation are required." });
      return;
    }

    if (!imageFile) {
      setStatus({ type: "error", message: "Please select an image file to upload." });
      return;
    }

    try {
      setIsUploadingImage(true);

      // Step 1: Upload photo to ImgBB
      const imageUrl = await uploadImageToCloud(imageFile);
      setIsUploadingImage(false);

      // Step 2: Payload construction with flexible email fallback
      const staffPayload = {
        name: formData.name.trim(),
        designation: formData.designation.trim(),
        image: imageUrl,
        email: formData.email.trim() ? formData.email.trim() : "N/A",
      };

      // Step 3: Trigger TanStack Mutation
      addStaffMutation.mutate(staffPayload);
    } catch (err) {
      setIsUploadingImage(false);
      setStatus({
        type: "error",
        message: err.message || "An error occurred during image upload.",
      });
    }
  };

  const isSubmitting = isUploadingImage || addStaffMutation.isPending;

  return (
    <section className="min-h-screen bg-[#030712] py-12 sm:py-16 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Navigation */}
        <div className="mb-6">
          <Link
            to="/staff"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-[#0a1120]/70 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Border Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Form Header */}
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              ADMIN CONTROL
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Add Staff Member
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              Upload staff credentials and profile photo to register them in the system.
            </p>
          </div>

          {/* Status Alert Banner */}
          {status.message && (
            <div
              className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all ${
                status.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Profile Photo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Profile Photo *
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-950/60 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-colors">
                
                {/* Preview Box */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Staff Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-1.5 right-1.5 bg-slate-950/80 text-slate-300 hover:text-white p-1 rounded-full border border-slate-700 transition"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-slate-600">
                      <Upload className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-bold uppercase">Upload</span>
                    </div>
                  )}
                </div>

                {/* File Choice Info */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <label
                    htmlFor="staff-image-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                  </label>
                  <input
                    id="staff-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-[11px] text-slate-500 font-medium">
                    Supports PNG, JPG, or WEBP up to 5MB.
                  </p>
                  {imageFile && (
                    <p className="text-xs font-semibold text-emerald-400">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="MD. ABDUL MANNAN"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Designation / Role *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Accounts Officer"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

            </div>

            {/* Email Field (Optional - Plain Text to allow N/A or empty inputs) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full uppercase">
                  Optional
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. email@institution.edu or N/A"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", designation: "", email: "" });
                  handleClearImage();
                  setStatus({ type: "", message: "" });
                }}
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isUploadingImage ? "Uploading Photo..." : "Saving..."}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Add Member</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}