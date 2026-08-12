import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UserPlus,
  Upload,
  User,
  GraduationCap,
  Calendar,
  Heart,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const IMGBB_API_KEY = import.meta.env.VITE_image_host_key;

export default function AddAlumni() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dept: "",
    passing_year: "",
    blood_group: "",
    memories: "",
  });

  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // TanStack Query Mutation for adding Alumni
  const addAlumniMutation = useMutation({
    mutationFn: async (newAlumniData) => {
      const res = await axiosSecure.post("/alumni", newAlumniData);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate queries to refresh alumni list automatically
      queryClient.invalidateQueries({ queryKey: ["alumni-list"] });

      // Clear inline alerts & trigger Success Modal
      setStatus({ type: "", message: "" });
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        name: "",
        gender: "",
        dept: "",
        passing_year: "",
        blood_group: "",
        memories: "",
      });
      setImageFile(null);
      setImagePreview("");
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Failed to add alumni member.",
      });
    },
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
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

  // ImgBB Upload Helper
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

    // Validation
    if (!formData.name || !formData.gender || !formData.dept || !formData.passing_year) {
      setStatus({ type: "error", message: "Please fill in all required fields marked with *." });
      return;
    }

    if (!imageFile) {
      setStatus({ type: "error", message: "Please select a profile photo." });
      return;
    }

    try {
      setIsUploadingImage(true);

      // Step 1: Upload Image
      const imageUrl = await uploadImageToCloud(imageFile);
      setIsUploadingImage(false);

      // Step 2: Construct Payload
      const alumniPayload = {
        name: formData.name.trim(),
        gender: formData.gender,
        dept: formData.dept.trim(),
        passing_year: formData.passing_year.trim(),
        image: imageUrl,
        blood_group: formData.blood_group || "N/A",
        memories: formData.memories.trim() || "N/A",
      };

      // Step 3: Trigger Mutation
      addAlumniMutation.mutate(alumniPayload);
    } catch (err) {
      setIsUploadingImage(false);
      setStatus({
        type: "error",
        message: err.message || "An error occurred during image upload.",
      });
    }
  };

  const isSubmitting = isUploadingImage || addAlumniMutation.isPending;

  return (
    <section className="min-h-screen bg-[#030712] py-12 sm:py-16 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Navigation */}
        <div className="mb-6">
          <Link
            to="/alumni"
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
              ALUMNI REGISTRATION
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-cyan-400" />
              Add Alumni Profile
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              Register former students and preserve institutional memories.
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
                        alt="Alumni Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-1.5 right-1.5 bg-slate-950/80 text-slate-300 hover:text-white p-1 rounded-full border border-slate-700 transition cursor-pointer"
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

                {/* File Upload Trigger */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <label
                    htmlFor="alumni-image-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo</span>
                  </label>
                  <input
                    id="alumni-image-upload"
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

            {/* Row 1: Name & Gender */}
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
                    placeholder="e.g. Tanvir Ahmed"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Gender Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-900 text-slate-500">
                    Select Gender
                  </option>
                  <option value="Male" className="bg-slate-900 text-slate-200">Male</option>
                  <option value="Female" className="bg-slate-900 text-slate-200">Female</option>
                  <option value="Other" className="bg-slate-900 text-slate-200">Other</option>
                </select>
              </div>

            </div>

            {/* Row 2: Department & Passing Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Department *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Tech"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Passing Year */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Passing Year *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="passing_year"
                    value={formData.passing_year}
                    onChange={handleChange}
                    placeholder="e.g. 2022"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

            </div>

            {/* Row 3: Blood Group Select */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Blood Group
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full uppercase">
                  Optional
                </span>
              </div>
              <div className="relative">
                <Heart className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-500">Select Blood Group</option>
                  <option value="A+" className="bg-slate-900 text-slate-200">A+</option>
                  <option value="A-" className="bg-slate-900 text-slate-200">A-</option>
                  <option value="B+" className="bg-slate-900 text-slate-200">B+</option>
                  <option value="B-" className="bg-slate-900 text-slate-200">B-</option>
                  <option value="O+" className="bg-slate-900 text-slate-200">O+</option>
                  <option value="O-" className="bg-slate-900 text-slate-200">O-</option>
                  <option value="AB+" className="bg-slate-900 text-slate-200">AB+</option>
                  <option value="AB-" className="bg-slate-900 text-slate-200">AB-</option>
                </select>
              </div>
            </div>

            {/* Row 4: Memories Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Campus Memories & Quote
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full uppercase">
                  Optional
                </span>
              </div>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                <textarea
                  name="memories"
                  rows={4}
                  value={formData.memories}
                  onChange={handleChange}
                  placeholder="Share notable campus experiences or a quote..."
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "",
                    gender: "",
                    dept: "",
                    passing_year: "",
                    blood_group: "",
                    memories: "",
                  });
                  handleClearImage();
                  setStatus({ type: "", message: "" });
                }}
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isUploadingImage ? "Uploading Photo..." : "Saving..."}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Add Alumni</span>
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
          <div className="bg-gradient-to-b from-slate-900 via-[#0a1120] to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl shadow-cyan-500/10 space-y-5 relative">
            {/* Glowing Background Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none" />

            {/* Check Icon with Cyan Glow */}
            <div className="relative w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>

            {/* Content */}
            <div className="space-y-2 relative z-10">
              <h3 className="text-xl font-black text-white tracking-tight">
                Alumni Member Added!
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                The alumni record and profile photo have been saved successfully.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2 relative z-10">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/operator/manageAlumni");
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                Go to Manage Alumni
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}