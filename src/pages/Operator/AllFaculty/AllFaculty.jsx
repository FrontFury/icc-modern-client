import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Search,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Mail,
  Briefcase,
  BookOpen,
  User,
  Plus,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function AllFaculty() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Local state for search & modal handling
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [editingFaculty, setEditingFaculty] = useState(null);
  const [deletingFaculty, setDeletingFaculty] = useState(null);

  // Edit Modal Specific States
  const [isUploading, setIsUploading] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState('');

  // 1. GET Request - Fetch all faculty members
  const {
    data: faculties = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['faculties'],
    queryFn: async () => {
      const response = await axiosSecure.get('/faculty');
      return response.data;
    },
  });

  // Open Edit Modal & initialize image state
  const handleOpenEditModal = (member) => {
    setEditingFaculty(member);
    setEditImageUrl(member.imageUrl || '');
  };

  // Image Upload Handler for ImgBB inside Edit Modal
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
      setEditImageUrl(directUrl);
    } catch (err) {
      console.error('ImgBB Upload Error:', err);
      alert('Failed to upload image to ImgBB.');
    } finally {
      setIsUploading(false);
    }
  };

  // 2. PATCH Request - Update faculty member with optional image
  const updateFacultyMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await axiosSecure.patch(`/faculty/${id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      setEditingFaculty(null);
    },
    onError: (err) => {
      console.error('Update failed:', err);
      alert('Failed to update faculty member.');
    },
  });

  // 3. DELETE Request - Delete faculty member
  const deleteFacultyMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/faculty/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] });
      setDeletingFaculty(null);
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      alert('Failed to delete faculty member.');
    },
  });

  // Sort newest first & filter search term
  const filteredFaculties = faculties
    .slice()
    .reverse() // Shows newest added data at the top
    .filter((faculty) => {
      const search = searchTerm.toLowerCase();
      return (
        faculty.name?.toLowerCase().includes(search) ||
        faculty.designation?.toLowerCase().includes(search) ||
        faculty.subject?.toLowerCase().includes(search) ||
        faculty.email?.toLowerCase().includes(search)
      );
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const paginatedFaculties = filteredFaculties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      name: formData.get('name').trim().toUpperCase(),
      designation: formData.get('designation').trim(),
      subject: formData.get('subject').trim(),
      email: formData.get('email').trim(),
      imageUrl: editImageUrl, // Updated image URL sent in PATCH body
    };

    updateFacultyMutation.mutate({
      id: editingFaculty._id || editingFaculty.id,
      updatedData,
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] p-4 sm:p-8 font-sans text-slate-100 rounded-2xl">
      <div className="w-full mx-auto space-y-6">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-7 h-7 text-cyan-400" />
              Faculty Members Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Manage and view all registered academic faculty profiles.
            </p>
          </div>

          <button
            onClick={() => navigate('/operator/addFaculty')}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Faculty
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 border border-slate-800/80 rounded-2xl backdrop-blur-md">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, role, department..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3.5 py-2 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-auto">
            Showing <span className="text-cyan-400 font-bold">{filteredFaculties.length}</span> faculty members
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
            <p className="text-sm font-semibold">Loading faculty data...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 p-6">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-sm font-bold">Failed to load faculty directory</p>
            <p className="text-xs text-rose-300/80 mt-1">{error?.message || 'Something went wrong.'}</p>
          </div>
        )}

        {/* Faculty Table / List */}
        {!isLoading && !isError && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Faculty Member</th>
                    <th className="py-3.5 px-4">Designation</th>
                    <th className="py-3.5 px-4">Subject / Department</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {paginatedFaculties.length > 0 ? (
                    paginatedFaculties.map((member) => {
                      const memberId = member._id || member.id;
                      return (
                        <tr key={memberId} className="hover:bg-slate-800/30 transition-colors">
                          {/* Member Profile */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {member.imageUrl ? (
                                <img
                                  src={member.imageUrl}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                              <div>
                                <span className="font-bold text-white block uppercase">
                                  {member.name}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Designation */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              <Briefcase className="w-3 h-3" />
                              {member.designation}
                            </span>
                          </td>

                          {/* Subject / Department */}
                          <td className="py-3.5 px-4 text-slate-300 font-medium">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                              {member.subject}
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-3.5 px-4 text-slate-400 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              {member.email}
                            </div>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Edit Button */}
                              <button
                                onClick={() => handleOpenEditModal(member)}
                                className="p-2 bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 rounded-lg transition border border-slate-700/80"
                                title="Edit Member"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Button (Red Icon) */}
                              <button
                                onClick={() => setDeletingFaculty(member)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 hover:text-rose-400 rounded-lg transition border border-rose-500/30"
                                title="Delete Member"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-500">
                        No faculty members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80 bg-slate-950/40">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <span className="text-xs text-slate-400 font-medium">
                  Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Edit Faculty Modal (PATCH including image upload) */}
      {editingFaculty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Pencil className="w-4 h-4 text-cyan-400" />
                Edit Faculty Details
              </h3>
              <button
                onClick={() => setEditingFaculty(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              
              {/* Image Upload/Update Section */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0 flex items-center justify-center">
                    {editImageUrl ? (
                      <img src={editImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-slate-600" />
                    )}
                  </div>

                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/50 transition">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span>Change Photo</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingFaculty.name}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  defaultValue={editingFaculty.designation}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subject / Department</label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={editingFaculty.subject}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Official Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingFaculty.email}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFaculty(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateFacultyMutation.isPending || isUploading}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {updateFacultyMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (DELETE) */}
      {deletingFaculty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-rose-500" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove <span className="text-white font-bold">{deletingFaculty.name}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingFaculty(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteFacultyMutation.mutate(deletingFaculty._id || deletingFaculty.id)}
                disabled={deleteFacultyMutation.isPending}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20"
              >
                {deleteFacultyMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}