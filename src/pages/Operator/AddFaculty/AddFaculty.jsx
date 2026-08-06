import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UserPlus,
  Upload,
  ExternalLink,
  ChevronRight,
  Loader2,
  Save,
  Mail,
  User,
  Briefcase,
  BookOpen,
  Eye,
  Check
} from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function AddFaculty() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      designation: '',
      subject: '',
      email: '',
      imageUrl: '',
    },
  });

  const watchAllFields = watch();

  // TanStack Query Mutation for saving Faculty Data
  const addFacultyMutation = useMutation({
    mutationFn: async (newFaculty) => {
      const response = await axiosSecure.post('/faculty', newFaculty);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate faculties cache to auto-refetch list pages
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      alert('Faculty member added successfully!');
      navigate('/operator/allFaculty');
    },
    onError: (error) => {
      console.error('Error adding faculty member:', error);
      alert('Failed to save faculty details. Please try again.');
    },
  });

  // ImgBB Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiKey = import.meta.env.VITE_image_host_key;
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const directUrl = response.data.data.display_url;
      setUploadedImageUrl(directUrl);
      setValue('imageUrl', directUrl, { shouldValidate: true });
    } catch (error) {
      console.error('ImgBB Upload Error:', error);
      alert('Failed to upload image to ImgBB. Check your API key.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      name: data.name.trim().toUpperCase(), // Converts name to uppercase before sending
      imageUrl: uploadedImageUrl,
      createdAt: new Date().toISOString(),
    };

    // Trigger TanStack Mutation
    addFacultyMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#030712] p-4 sm:p-8 font-sans text-slate-100 rounded-2xl">
      <div className="w-full mx-auto space-y-6">

        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <nav className="flex items-center text-xs text-slate-400 font-medium space-x-1.5 mb-1.5">
              <span>Academic</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span>Faculty</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-cyan-400 font-semibold">Add Member</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <UserPlus className="w-7 h-7 text-cyan-400" />
              Add Faculty Member
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Create and publish profile details for new academic staff members.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-xs font-semibold text-slate-300 transition shadow-lg"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={addFacultyMutation.isPending || isUploading}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-1.5"
            >
              {addFacultyMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {addFacultyMutation.isPending ? 'Saving...' : 'Save Faculty'}
            </button>
          </div>
        </div>

        {/* Form Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Form Fields Panel (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-5">
            <h2 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
              Faculty Profile Details
            </h2>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. DR. MD. ARIFUL ISLAM"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Designation & Department/Subject Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Designation */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Designation <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Assistant Professor"
                    {...register('designation', { required: 'Designation is required' })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                  />
                </div>
                {errors.designation && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.designation.message}</p>
                )}
              </div>

              {/* Subject / Department */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Subject / Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Accounting & Finance"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                  />
                </div>
                {errors.subject && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.subject.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Official Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="faculty@college.edu.bd"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>
              )}
            </div>

          </div>

          {/* Right Column: ImgBB Avatar Upload & Profile Card Preview */}
          <div className="space-y-6">

            {/* Image Upload Panel */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-4">
              <h2 className="text-xs font-bold text-white border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
                <span>Profile Photo</span>
                <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
                  ImgBB Storage
                </span>
              </h2>

              {/* Upload Drop Zone */}
              <label
                htmlFor="facultyAvatarInput"
                className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 bg-slate-950/50 hover:bg-cyan-500/5 transition cursor-pointer text-center group"
              >
                {isUploading ? (
                  <div className="py-3 flex flex-col items-center text-cyan-400">
                    <Loader2 className="w-7 h-7 animate-spin mb-1.5" />
                    <span className="text-xs font-bold">Uploading to ImgBB...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-200">Upload Portrait Photo</p>
                    <p className="text-[10px] text-slate-500 mt-1">PNG, JPG or WEBP up to 5MB</p>
                  </>
                )}
              </label>

              <input
                id="facultyAvatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />

              {/* Uploaded Link Bar */}
              {uploadedImageUrl && (
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="flex-1 px-2.5 py-1.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-[11px] font-mono text-cyan-300 truncate">
                    {uploadedImageUrl}
                  </div>
                  <a
                    href={uploadedImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-cyan-400 transition"
                    title="Open Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Live Profile Card Preview */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                  <Eye className="w-3 h-3 text-cyan-400" /> Live Preview
                </span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> Ready
                </span>
              </div>

              {/* Cyberpunk Member Card Mockup */}
              <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 text-center space-y-3">
                <div className="relative w-20 h-20 mx-auto">
                  {uploadedImageUrl ? (
                    <img
                      src={uploadedImageUrl}
                      alt="Faculty Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40 p-0.5 shadow-lg shadow-cyan-500/10"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-600">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white truncate uppercase">
                    {watchAllFields.name || 'FACULTY NAME'}
                  </h3>
                  <p className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                    {watchAllFields.designation || 'Designation'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {watchAllFields.subject || 'Department Name'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono truncate">
                  {watchAllFields.email || 'email@college.edu.bd'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}