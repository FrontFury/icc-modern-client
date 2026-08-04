import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Eye,
  Pin,
  FileUp,
  ExternalLink,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Loader2,
  X,
  Maximize2
} from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function AddNotice() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('https://i.ibb.co/JwH9xM');
  const [isPinned, setIsPinned] = useState(true);
  const [description, setDescription] = useState(
    'This is an official announcement from the administration of Ideal Commerce College regarding the Fall 2026 course registration process. Students must verify their course enrollment with their respective department advisors prior to submitting the online form.'
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: 'Registration Deadline for Semester Fall 2026',
      category: 'Academic',
      priority: 'URGENT',
      summary: 'All students are required to complete their course registration by October 30th. Failure to register will result in late fees.',
      publishedDate: '2026-10-24',
      isPinned: true,
      imageUrl: 'https://i.ibb.co/JwH9xM',
    },
  });

  // Keep description and pin status synced with react-hook-form
  React.useEffect(() => {
    register('imageUrl');
    register('content');
    setValue('imageUrl', uploadedImageUrl);
    setValue('content', description);
  }, [register, setValue, uploadedImageUrl, description]);

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

  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        isPinned,
        content: description,
        imageUrl: uploadedImageUrl,
        createdAt: new Date().toISOString(),
      };

      console.log('Final Notice Payload:', payload);
      axiosSecure.post('/notices', payload)
      .then(res => {
        console.log('after saving notice',res.data)
      })

      
      
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('Failed to save notice.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header & Breadcrumb Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <nav className="text-xs text-slate-500 font-medium space-x-1 mb-1">
              <span>Portal</span>
              <span>&gt;</span>
              <span>Notices</span>
              <span>&gt;</span>
              <span className="text-blue-600 font-semibold">Add New Notice</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create Notice
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Configure and publish a new announcement for the college community.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={() => alert('Previewing notice...')}
              className="px-4 py-2 bg-white border border-blue-400 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-50 transition flex items-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || isUploading}
              className="px-5 py-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Notice'}
            </button>
          </div>
        </div>

        {/* Main Grid Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Content Details Panel (Spans 2 Columns) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Content Details
            </h2>

            {/* Notice Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Notice Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
              />
              {errors.title && (
                <p className="text-[11px] text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category and Priority Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3.5 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Events">Events</option>
                  <option value="Admission">Admission</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Priority Level
                </label>
                <select
                  {...register('priority')}
                  className="w-full px-3.5 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition font-medium"
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="IMPORTANT">IMPORTANT</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Summary
              </label>
              <textarea
                rows={3}
                {...register('summary')}
                className="w-full p-3 bg-slate-100/80 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition resize-y"
              />
            </div>

            {/* Description (Rich Text Simulation) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Description (Rich Text)
              </label>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-100/60">
                {/* Toolbar */}
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-100 border-b border-slate-200 text-slate-600">
                  <button type="button" className="hover:text-slate-900 font-bold"><Bold className="w-4 h-4" /></button>
                  <button type="button" className="hover:text-slate-900 italic"><Italic className="w-4 h-4" /></button>
                  <button type="button" className="hover:text-slate-900 underline"><Underline className="w-4 h-4" /></button>
                  <div className="w-[1px] h-4 bg-slate-300 mx-1" />
                  <button type="button" className="hover:text-slate-900"><List className="w-4 h-4" /></button>
                  <button type="button" className="hover:text-slate-900"><ListOrdered className="w-4 h-4" /></button>
                  <div className="w-[1px] h-4 bg-slate-300 mx-1" />
                  <button type="button" className="hover:text-slate-900"><Link2 className="w-4 h-4" /></button>
                  <button type="button" className="hover:text-slate-900"><ImageIcon className="w-4 h-4" /></button>
                </div>

                {/* Editor Content Box */}
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-slate-100/40 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white transition resize-y"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Publish Settings & Attachment Panels */}
          <div className="space-y-6">

            {/* Publish Settings Panel */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                Publish Settings
              </h2>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Published Date
                </label>
                <input
                  type="date"
                  {...register('publishedDate')}
                  className="w-full px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800"
                />
              </div>

              {/* Pin notice Switch Card */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-start gap-2.5">
                  <Pin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-900">Pin this notice</p>
                    <p className="text-[10px] text-blue-600 mt-0.5">Keep at the top of the feed</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isPinned ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isPinned ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Attachment Panel (ImgBB Converter Integrated) */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Attachment</h2>
                <span className="text-[9px] font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                  PDF RECOMMENDED
                </span>
              </div>

              {/* File Drop Area */}
              <label
                htmlFor="fileAttachmentInput"
                className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:bg-blue-50/30 hover:border-blue-300 transition cursor-pointer text-center"
              >
                {isUploading ? (
                  <div className="py-2 flex flex-col items-center text-blue-600">
                    <Loader2 className="w-6 h-6 animate-spin mb-1" />
                    <span className="text-xs font-bold">Uploading to ImgBB...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center mb-1.5">
                      <FileUp className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Click to replace PDF / Image</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Notice01.pdf (420 KB)</p>
                  </>
                )}
              </label>

              <input
                id="fileAttachmentInput"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />

              {/* Direct Link Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Direct Link (Optional)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={uploadedImageUrl}
                    className="w-full px-2.5 py-1.5 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-600 truncate focus:outline-none"
                  />
                  <a
                    href={uploadedImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition shrink-0"
                    title="Open Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Document Preview Box */}
              {uploadedImageUrl && (
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-100">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-slate-200/70 border-b border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    <span>Document Preview</span>
                    <Maximize2 className="w-3 h-3 cursor-pointer hover:text-slate-900" />
                  </div>

                  <div className="relative group p-2 bg-slate-200/30">
                    <img
                      src={uploadedImageUrl}
                      alt="Notice Attachment Document"
                      className="w-full h-56 object-cover object-top rounded border border-slate-200 shadow-inner"
                    />

                    {/* View Full Overlay Button */}
                    <a
                      href={uploadedImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      <span className="px-3 py-1 bg-white/90 text-slate-900 text-xs font-bold rounded-full shadow flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View Full
                      </span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}