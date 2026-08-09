import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Search,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Loader2,
  X,
  Plus,
  AlertCircle,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path if needed

const IMGBB_API_KEY = import.meta.env.VITE_image_host_key;

export default function ManageAlumni() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Search & Modal States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Edit Image Upload States
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 1. Fetch Alumni Data
  const { data: alumniList = [], isLoading } = useQuery({
    queryKey: ["alumni-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/alumni");
      return res.data;
    },
  });

  // 2. Delete Alumni Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/alumni/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni-list"] });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Alumni record has been removed.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0a1120",
        color: "#f8fafc",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to delete record.",
        background: "#0a1120",
        color: "#f8fafc",
      });
    },
  });

  // 3. Update Alumni Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/alumni/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni-list"] });
      setEditModalOpen(false);
      setEditImageFile(null);
      setEditImagePreview("");
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Alumni details updated successfully.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0a1120",
        color: "#f8fafc",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update record.",
        background: "#0a1120",
        color: "#f8fafc",
      });
    },
  });

  // Handle Delete Confirmation
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to remove ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
      background: "#0a1120",
      color: "#f8fafc",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Filter Alumni by Search Term
  const filteredAlumni = alumniList.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(search) ||
      item.dept?.toLowerCase().includes(search) ||
      item.passing_year?.toString().includes(search) ||
      item.blood_group?.toLowerCase().includes(search)
    );
  });

  // Open Modals
  const handleView = (alumni) => {
    setSelectedAlumni(alumni);
    setViewModalOpen(true);
  };

  const handleEdit = (alumni) => {
    setSelectedAlumni({ ...alumni });
    setEditImagePreview(alumni.image);
    setEditImageFile(null);
    setEditModalOpen(true);
  };

  // Handle Edit Image File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  // ImgBB Upload Helper Function
  const uploadImageToCloud = async (file) => {
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

  // Handle Update Submit with Image Support
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const id = selectedAlumni._id || selectedAlumni.id;

    try {
      let imageUrl = selectedAlumni.image;

      // নতুন ছবি সিলেক্ট করা হলে তা ImgBB-তে আপলোড করা হবে
      if (editImageFile) {
        setIsUploadingImage(true);
        imageUrl = await uploadImageToCloud(editImageFile);
        setIsUploadingImage(false);
      }

      const updatedPayload = {
        ...selectedAlumni,
        image: imageUrl,
      };

      updateMutation.mutate({ id, updatedData: updatedPayload });
    } catch (err) {
      setIsUploadingImage(false);
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: err.message || "Something went wrong while uploading image.",
        background: "#0a1120",
        color: "#f8fafc",
      });
    }
  };

  return (
    <section className="min-h-screen bg-[#030712] py-12 sm:py-16 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0a1120]/70 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              DIRECTORY MANAGEMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Users className="w-7 h-7 text-cyan-400" />
              Manage Alumni Directory
            </h1>
          </div>

          <Link
            to="/operator/addAlumni"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Alumni</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#0a1120]/70 border border-slate-800/80 backdrop-blur-2xl rounded-2xl p-4 shadow-xl">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, department, year, blood group..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#0a1120]/70 border border-slate-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden relative">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            </div>
          ) : filteredAlumni.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-slate-400 font-semibold text-sm">
                No alumni records found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800/80 text-[11px] uppercase tracking-wider font-extrabold text-cyan-400">
                    <th className="p-4 sm:p-5">Alumni Info</th>
                    <th className="p-4 sm:p-5">Department</th>
                    <th className="p-4 sm:p-5">Passing Year</th>
                    <th className="p-4 sm:p-5">Blood Group</th>
                    <th className="p-4 sm:p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-xs sm:text-sm">
                  {filteredAlumni.map((item) => (
                    <tr
                      key={item._id || item.id}
                      className="hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || "https://via.placeholder.com/150"}
                            alt={item.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700/80 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-100">{item.name}</p>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {item.gender}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 sm:p-5 font-medium text-slate-300">
                        {item.dept}
                      </td>

                      <td className="p-4 sm:p-5 font-semibold text-cyan-400">
                        {item.passing_year}
                      </td>

                      <td className="p-4 sm:p-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-extrabold text-[11px]">
                          {item.blood_group || "N/A"}
                        </span>
                      </td>

                      <td className="p-4 sm:p-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(item)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/50 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/50 transition-all"
                            title="Update Alumni"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id || item.id, item.name)}
                            disabled={deleteMutation.isPending}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 hover:border-rose-500/50 transition-all disabled:opacity-50"
                            title="Delete Record"
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

      {/* VIEW DETAILS MODAL */}
      {viewModalOpen && selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative space-y-6">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedAlumni.image}
                alt={selectedAlumni.name}
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAlumni.name}</h3>
                <p className="text-xs text-cyan-400 font-semibold">{selectedAlumni.gender}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block">Department</span>
                <span className="text-slate-200 font-bold">{selectedAlumni.dept}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block">Passing Year</span>
                <span className="text-cyan-400 font-bold">{selectedAlumni.passing_year}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block">Blood Group</span>
                <span className="text-rose-400 font-bold">{selectedAlumni.blood_group || "N/A"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Memories / Quote
              </span>
              <p className="text-xs text-slate-300 italic">
                "{selectedAlumni.memories || "No memories added."}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / UPDATE MODAL (WITH IMAGE UPLOAD) */}
      {editModalOpen && selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-amber-400" />
              Update Alumni Record
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              
              {/* IMAGE UPDATE SECTION */}
              <div className="space-y-2">
                <label className="text-slate-400 font-bold block">Profile Image</label>
                <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                  <img
                    src={editImagePreview}
                    alt="Current or New Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30"
                  />
                  <div>
                    <label
                      htmlFor="edit-image-upload"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 rounded-xl text-xs font-bold cursor-pointer transition"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Change Photo</span>
                    </label>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Leave empty if you don't want to change.
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-slate-400 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={selectedAlumni.name}
                  onChange={(e) =>
                    setSelectedAlumni({ ...selectedAlumni, name: e.target.value })
                  }
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Gender, Department, Passing Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Department</label>
                  <input
                    type="text"
                    value={selectedAlumni.dept}
                    onChange={(e) =>
                      setSelectedAlumni({ ...selectedAlumni, dept: e.target.value })
                    }
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Passing Year</label>
                  <input
                    type="text"
                    value={selectedAlumni.passing_year}
                    onChange={(e) =>
                      setSelectedAlumni({ ...selectedAlumni, passing_year: e.target.value })
                    }
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="text-slate-400 font-bold block mb-1">Blood Group</label>
                <select
                  value={selectedAlumni.blood_group || ""}
                  onChange={(e) =>
                    setSelectedAlumni({ ...selectedAlumni, blood_group: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Memories */}
              <div>
                <label className="text-slate-400 font-bold block mb-1">Memories</label>
                <textarea
                  rows={3}
                  value={selectedAlumni.memories}
                  onChange={(e) =>
                    setSelectedAlumni({ ...selectedAlumni, memories: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  disabled={isUploadingImage || updateMutation.isPending}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingImage || updateMutation.isPending}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Image...</span>
                    </>
                  ) : updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}