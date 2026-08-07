import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Eye,
  Edit3,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Sparkles,
  UserPlus,
  Mail,
  Briefcase,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust import path as needed

const IMGBB_API_KEY = import.meta.env.VITE_image_host_key;

export default function ManageStaff() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Search, Pagination & Modal States
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMember, setViewMember] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    name: "",
    designation: "",
    email: "",
    image: "",
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 1. GET Operation: Fetch all staff members
  const {
    data: staffList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff");
      return res.data;
    },
  });

  // 2. PATCH Operation: Update staff member
  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/staff/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      setStatus({ type: "success", message: "Staff details updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      closeEditModal();
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Failed to update staff member.",
      });
    },
  });

  // 3. DELETE Operation: Remove staff member
  const deleteStaffMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/staff/${id}`);
      return res.data;
    },
    onSuccess: () => {
      setStatus({ type: "success", message: "Staff member deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      setDeleteId(null);
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Failed to delete staff member.",
      });
    },
  });

  // Filtered staff based on search query
  const filteredStaff = staffList.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Edit Modal & Populate Form
  const handleOpenEdit = (member) => {
    setEditMember(member);
    setEditFormData({
      name: member.name || "",
      designation: member.designation || "",
      email: member.email === "N/A" ? "" : member.email || "",
      image: member.image || "",
    });
    setEditImagePreview(member.image || "");
    setEditImageFile(null);
  };

  const closeEditModal = () => {
    setEditMember(null);
    setEditImageFile(null);
    setEditImagePreview("");
  };

  // Upload Photo to ImgBB
  const uploadImageToCloud = async (file) => {
    if (!IMGBB_API_KEY) throw new Error("ImgBB API key is missing.");
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) return data.data.display_url;
    throw new Error("Failed to upload new image.");
  };

  // Submit Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.designation) {
      setStatus({ type: "error", message: "Name and designation are required." });
      return;
    }

    try {
      let finalImageUrl = editFormData.image;

      if (editImageFile) {
        setIsUploadingImage(true);
        finalImageUrl = await uploadImageToCloud(editImageFile);
        setIsUploadingImage(false);
      }

      const updatedPayload = {
        name: editFormData.name.trim(),
        designation: editFormData.designation.trim(),
        image: finalImageUrl,
        email: editFormData.email.trim() ? editFormData.email.trim() : "N/A",
      };

      updateStaffMutation.mutate({
        id: editMember._id || editMember.id,
        updatedData: updatedPayload,
      });
    } catch (err) {
      setIsUploadingImage(false);
      setStatus({ type: "error", message: err.message || "Failed to process update." });
    }
  };

  return (
    <section className="min-h-screen bg-[#030712] py-12 sm:py-16 relative overflow-hidden text-slate-100 font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              MANAGEMENT SYSTEM
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Manage Staff Directory
            </h1>
          </div>

          <Link
            to="/operator/addStaff"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
          >
            <UserPlus className="w-4 h-4" />
            Add New Member
          </Link>
        </div>

        {/* Global Status Banner */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-semibold transition-all ${
              status.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
            <button onClick={() => setStatus({ type: "", message: "" })}>
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        )}

        {/* Search Bar Container */}
        <div className="mb-6 bg-[#0a1120]/70 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
            />
          </div>
          <p className="text-xs font-bold text-slate-400 hidden sm:block">
            Total Members: <span className="text-cyan-400">{filteredStaff.length}</span>
          </p>
        </div>

        {/* Main Staff Data Table */}
        <div className="bg-[#0a1120]/70 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          {isLoading ? (
            <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              <p className="text-xs font-bold uppercase tracking-wider">Loading Directory...</p>
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-rose-400 flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8" />
              <p className="text-sm font-bold">Failed to load staff list.</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="p-16 text-center text-slate-500 flex flex-col items-center gap-2">
              <Users className="w-10 h-10 text-slate-600" />
              <p className="text-sm font-bold text-slate-400">No staff members found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Member</th>
                    <th className="py-4 px-6">Designation</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredStaff.map((member) => (
                    <tr
                      key={member._id || member.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Photo & Name */}
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700/80 shrink-0"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150?text=User";
                          }}
                        />
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {member.name}
                        </span>
                      </td>

                      {/* Designation */}
                      <td className="py-4 px-6 text-slate-300">
                        <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                          {member.designation}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-slate-400">
                        {member.email && member.email !== "N/A" ? (
                          member.email
                        ) : (
                          <span className="text-slate-600 italic">N/A</span>
                        )}
                      </td>

                      {/* Action Icons */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewMember(member)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(member)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors"
                            title="Edit Member"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteId(member._id || member.id)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-md p-4">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-6">
            <button
              onClick={() => setViewMember(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-900 border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={viewMember.image}
                alt={viewMember.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-500/30"
              />
              <div>
                <h3 className="text-xl font-black text-white">{viewMember.name}</h3>
                <p className="text-xs font-semibold text-cyan-400 mt-1">{viewMember.designation}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
                  <p className="text-slate-200 font-semibold">{viewMember.email || "N/A"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewMember(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL (PATCH) */}
      {editMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-md p-4">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-900 border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-white">Update Staff Details</h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Photo Change Input */}
              <div className="flex items-center gap-4 p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <img
                  src={editImagePreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor="edit-image"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-bold rounded-lg cursor-pointer border border-slate-700"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Change Image
                  </label>
                  <input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEditImageFile(file);
                        setEditImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <p className="text-[10px] text-slate-500">Leave unchanged to keep current photo.</p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Full Name *</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              {/* Designation */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Designation *</label>
                <input
                  type="text"
                  value={editFormData.designation}
                  onChange={(e) => setEditFormData({ ...editFormData, designation: e.target.value })}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Email Address (Optional)</label>
                <input
                  type="text"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  placeholder="e.g. user@domain.com or N/A"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateStaffMutation.isPending || isUploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase flex items-center gap-2 disabled:opacity-50"
                >
                  {(updateStaffMutation.isPending || isUploadingImage) && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-md p-4">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Member?</h3>
              <p className="text-xs text-slate-400 mt-1">
                This action cannot be undone. This record will be permanently removed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteStaffMutation.mutate(deleteId)}
                disabled={deleteStaffMutation.isPending}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-black uppercase flex items-center gap-2 disabled:opacity-50"
              >
                {deleteStaffMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}