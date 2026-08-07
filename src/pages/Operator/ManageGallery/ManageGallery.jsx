import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import {
  Eye,
  Edit2,
  Trash2,
  Loader2,
  AlertTriangle,
  X,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path if needed

export default function ManageGallery() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Modal States
  const [viewingItem, setViewingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Edit Form Fields
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    year: "",
    image: "",
  });
  const [editDate, setEditDate] = useState(new Date());

  // Edit Image State
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // 1. Fetch All Gallery Data (GET)
  const {
    data: galleryItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gallery");
      return res.data;
    },
  });

  // 2. Delete Mutation (DELETE)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/gallery/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setDeletingId(null);
    },
  });

  // 3. Update Mutation (PATCH)
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axiosSecure.patch(`/gallery/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setEditingItem(null);
      setEditImageFile(null);
      setEditImagePreview(null);
    },
  });

  // Handle Edit File Selection
  const handleEditFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleEditFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Upload image to ImgBB
  const uploadToImgBB = async (file) => {
    const apiKey = import.meta.env.VITE_image_host_key;
    if (!apiKey) throw new Error("ImgBB API key missing.");

    const bodyData = new FormData();
    bodyData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: bodyData }
    );
    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Image upload failed.");
    }
  };

  // Prepare Edit Modal Data
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title || "",
      description: item.description || "",
      year: item.year || new Date().getFullYear(),
      image: item.image || "",
    });
    setEditImagePreview(item.image || null);
    setEditImageFile(null);

    try {
      const parsedDate = parse(item.date, "MMM dd, yyyy", new Date());
      setEditDate(isNaN(parsedDate) ? new Date() : parsedDate);
    } catch {
      setEditDate(new Date());
    }
  };

  // Submit Patch Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      let finalImageUrl = editFormData.image;

      // Upload new image if selected
      if (editImageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadToImgBB(editImageFile);
        setUploadingImage(false);
      }

      const formattedDateStr = format(editDate, "MMM dd, yyyy").toUpperCase();

      const payload = {
        title: editFormData.title,
        description: editFormData.description,
        date: formattedDateStr,
        year: parseInt(editFormData.year, 10),
        image: finalImageUrl,
      };

      updateMutation.mutate({ id: editingItem._id, payload });
    } catch (err) {
      setUploadingImage(false);
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-[#030712] text-slate-100 font-sans relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full mx-auto sm:px-6 lg:px-8 relative z-10 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-md text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            ADMIN PANEL
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Manage{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
              Gallery Items
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            View, edit, or purge published gallery entries from your central system.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
            <p className="text-sm font-semibold text-slate-400">Loading gallery database...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Failed to Load Data</h3>
              <p className="text-xs text-rose-300">{error?.message || "An unexpected error occurred."}</p>
            </div>
          </div>
        )}

        {/* Tabular Data View */}
        {!isLoading && !isError && (
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs font-extrabold uppercase text-slate-400 border-b border-slate-800 tracking-wider">
                  <tr>
                    <th scope="col" className="py-4 px-6">Image</th>
                    <th scope="col" className="py-4 px-6">Title</th>
                    <th scope="col" className="py-4 px-6">Date</th>
                    <th scope="col" className="py-4 px-6">Year</th>
                    <th scope="col" className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {galleryItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                        No gallery records found.
                      </td>
                    </tr>
                  ) : (
                    galleryItems.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-10 object-cover rounded-lg border border-slate-700/60"
                          />
                        </td>
                        <td className="py-3 px-6 font-semibold text-slate-100 max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="py-3 px-6 text-xs text-slate-400 font-mono">
                          {item.date}
                        </td>
                        <td className="py-3 px-6 text-xs">
                          <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold rounded-md">
                            {item.year}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <div className="inline-flex items-center gap-2">
                            {/* View Icon */}
                            <button
                              onClick={() => setViewingItem(item)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition"
                              title="View Record"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Update Icon */}
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 transition"
                              title="Edit Record"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete Icon */}
                            <button
                              onClick={() => setDeletingId(item._id)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* 1. VIEW MODAL */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setViewingItem(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={viewingItem.image}
              alt={viewingItem.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2">
                <span>{viewingItem.date}</span>
                <span>•</span>
                <span>Year: {viewingItem.year}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{viewingItem.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{viewingItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPDATE (PATCH) MODAL WITH IMAGE UPLOAD & DRAG/DROP */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => {
                setEditingItem(null);
                setEditImageFile(null);
                setEditImagePreview(null);
              }}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-white mb-6">Update Gallery Item</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Date & Year Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Date</label>
                  <DatePicker
                    selected={editDate}
                    onChange={(d) => {
                      setEditDate(d);
                      if (d) setEditFormData((prev) => ({ ...prev, year: d.getFullYear() }));
                    }}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
                    wrapperClassName="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={editFormData.year}
                    onChange={(e) => setEditFormData({ ...editFormData, year: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Image Upload / Drag Drop Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Update Image
                </label>

                {!editImagePreview ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 text-center bg-slate-950/50 hover:bg-slate-950 transition cursor-pointer group"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleEditFileSelect(e.target.files[0])}
                      className="hidden"
                      id="edit-gallery-image-input"
                    />
                    <label
                      htmlFor="edit-gallery-image-input"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <UploadCloud className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-200 mb-1">
                        Click to upload or drag new image
                      </p>
                      <p className="text-[10px] text-slate-500">PNG, JPG, WEBP</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-44 flex items-center justify-center group">
                    <img
                      src={editImagePreview}
                      alt="Edit Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setEditImageFile(null);
                          setEditImagePreview(null);
                          setEditFormData({ ...editFormData, image: "" });
                        }}
                        className="p-2 rounded-full bg-rose-600 text-white shadow-lg transition hover:scale-110"
                        title="Remove / Change Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setEditImageFile(null);
                    setEditImagePreview(null);
                  }}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending || uploadingImage}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl transition inline-flex items-center gap-2"
                >
                  {updateMutation.isPending || uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Confirm Deletion</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to delete this gallery item? This action is permanent and cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deletingId)}
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-2"
              >
                {deleteMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}