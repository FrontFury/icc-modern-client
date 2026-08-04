import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FileText,
  Edit,
  Trash2,
  Calendar,
  Pin,
  ExternalLink,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

const AllNotices = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: notices = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notices");
      return res.data;
    },
  });

  // Sort notices by createdAt descending (Latest First)
  const sortedNotices = [...notices].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.publishedDate || 0).getTime();
    const dateB = new Date(b.createdAt || b.publishedDate || 0).getTime();

    if (dateA !== dateB) {
      return dateB - dateA;
    }

    if (a._id && b._id) {
      return b._id.localeCompare(a._id);
    }

    return 0;
  });

  // Edit Handler using SweetAlert2 Popup with PATCH Request
  const handleEdit = (notice) => {
    Swal.fire({
      title: "Update Notice",
      html: `
        <div class="space-y-3 text-left">
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Title</label>
            <input id="swal-input-title" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" value="${notice.title || ""}" placeholder="Notice Title">
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Summary</label>
            <textarea id="swal-input-summary" class="swal2-textarea !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" rows="3" placeholder="Brief Summary">${notice.summary || ""}</textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <input id="swal-input-category" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" value="${notice.category || "General"}" placeholder="Category">
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
              <select id="swal-input-priority" class="swal2-select !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm">
                <option value="Standard" ${notice.priority === "Standard" ? "selected" : ""}>Standard</option>
                <option value="Urgent" ${notice.priority === "Urgent" ? "selected" : ""}>Urgent</option>
                <option value="Important" ${notice.priority === "Important" ? "selected" : ""}>Important</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Image URL</label>
            <input id="swal-input-image" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" value="${notice.imageUrl || notice.image || ""}" placeholder="Image URL (optional)">
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">PDF Link</label>
            <input id="swal-input-pdf" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" value="${notice.pdfUrl || ""}" placeholder="PDF URL">
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="swal-input-pinned" class="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0" ${notice.isPinned ? "checked" : ""}>
            <label for="swal-input-pinned" class="text-xs font-semibold text-slate-300">Pin Notice to Top</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#334155",
      customClass: {
        popup: "border border-slate-800 rounded-2xl shadow-2xl max-w-lg",
        title: "text-lg font-bold text-white mb-2",
        confirmButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 border-none focus:ring-0",
        cancelButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 border-none focus:ring-0",
      },
      preConfirm: () => {
        const title = document.getElementById("swal-input-title").value.trim();
        const summary = document.getElementById("swal-input-summary").value.trim();
        const category = document.getElementById("swal-input-category").value.trim();
        const priority = document.getElementById("swal-input-priority").value;
        const imageUrl = document.getElementById("swal-input-image").value.trim();
        const pdfUrl = document.getElementById("swal-input-pdf").value.trim();
        const isPinned = document.getElementById("swal-input-pinned").checked;

        if (!title) {
          Swal.showValidationMessage("Notice title is required!");
          return false;
        }

        return {
          title,
          summary,
          category,
          priority,
          imageUrl,
          pdfUrl,
          isPinned,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          Swal.fire({
            title: "Updating...",
            text: "Saving changes to notice...",
            background: "#0f172a",
            color: "#f8fafc",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await axiosSecure.patch(`/notices/${notice._id}`, result.value);
          await refetch();

          Swal.fire({
            title: "Updated!",
            text: "Notice details updated successfully.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
              confirmButton:
                "px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-cyan-400 border-none",
            },
          });
        } catch (error) {
          console.error("Failed to update notice:", error);

          Swal.fire({
            title: "Error!",
            text: "Failed to update the notice. Please try again.",
            icon: "error",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
            },
          });
        }
      }
    });
  };

  // Delete Handler with SweetAlert2 Dark Modal
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Notice?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#334155",
      customClass: {
        popup: "border border-slate-800 rounded-2xl shadow-2xl",
        title: "text-lg font-bold text-white",
        htmlContainer: "text-slate-400 text-sm",
        confirmButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 border-none focus:ring-0",
        cancelButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 border-none focus:ring-0",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait while we remove the notice.",
            background: "#0f172a",
            color: "#f8fafc",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await axiosSecure.delete(`/notices/${id}`);
          await refetch();

          Swal.fire({
            title: "Deleted!",
            text: "The notice has been successfully deleted.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
              confirmButton:
                "px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-cyan-400 border-none",
            },
          });
        } catch (error) {
          console.error("Failed to delete notice:", error);

          Swal.fire({
            title: "Error!",
            text: "Failed to delete the notice. Please try again.",
            icon: "error",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
            },
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#030712] text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-800/80 shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            Notice Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage, update, or remove institutional announcements.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold w-fit">
          Total Notices:
          <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-md font-black text-[11px]">
            {sortedNotices.length}
          </span>
        </span>
      </div>

      {/* Desktop & Tablet Table View (Hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-800">
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Title & Details</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Published Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 text-xs">
            {sortedNotices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400 font-medium"
                >
                  <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  No notices available.
                </td>
              </tr>
            ) : (
              sortedNotices.map((notice, index) => {
                const noticeImage = notice.imageUrl || notice.image;

                return (
                  <tr
                    key={notice._id || notice.id || index}
                    className="hover:bg-slate-800/40 transition-colors duration-200 group"
                  >
                    <td className="py-4 px-4 font-bold text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <div className="flex items-start gap-3">
                        {noticeImage && (
                          <img
                            src={noticeImage}
                            alt={notice.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700/80 shrink-0 mt-0.5"
                          />
                        )}
                        <div className="flex items-start gap-1.5">
                          {notice.isPinned && (
                            <Pin className="w-3.5 h-3.5 text-amber-400 fill-amber-400 rotate-45 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h3 className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1 text-sm">
                              {notice.title}
                            </h3>
                            {notice.summary && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {notice.summary}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-extrabold uppercase">
                        <Tag className="w-3 h-3" />
                        {notice.category || "General"}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {notice.createdAt
                          ? new Date(notice.createdAt).toLocaleDateString()
                          : notice.publishedDate || "N/A"}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {notice.priority ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {notice.priority}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        {noticeImage && (
                          <a
                            href={noticeImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                            title="View Image"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {notice.pdfUrl && (
                          <a
                            href={notice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                            title="View PDF"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => handleEdit(notice)}
                          className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-200"
                          title="Edit Notice"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(notice._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-200"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (Visible only on small devices) */}
      <div className="md:hidden space-y-3">
        {sortedNotices.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-medium bg-slate-900/40 rounded-2xl border border-slate-800">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            No notices available.
          </div>
        ) : (
          sortedNotices.map((notice, index) => {
            const noticeImage = notice.imageUrl || notice.image;

            return (
              <div
                key={notice._id || notice.id || index}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3"
              >
                {/* Header: Title, Image, Pin */}
                <div className="flex items-start gap-3">
                  {noticeImage && (
                    <img
                      src={noticeImage}
                      alt={notice.title}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700/80 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1">
                      {notice.isPinned && (
                        <Pin className="w-3.5 h-3.5 text-amber-400 fill-amber-400 rotate-45 shrink-0 mt-0.5" />
                      )}
                      <h3 className="font-bold text-slate-200 text-sm line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    {notice.summary && (
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {notice.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges Row: Category, Priority, Date */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
                    <Tag className="w-3 h-3" />
                    {notice.category || "General"}
                  </span>

                  {notice.priority ? (
                    <span className="px-2 py-0.5 rounded font-black uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {notice.priority}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded font-semibold bg-slate-800 text-slate-400">
                      Standard
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-slate-400 ml-auto">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {notice.createdAt
                      ? new Date(notice.createdAt).toLocaleDateString()
                      : notice.publishedDate || "N/A"}
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                  {noticeImage && (
                    <a
                      href={noticeImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="View Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </a>
                  )}

                  {notice.pdfUrl && (
                    <a
                      href={notice.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="View PDF"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => handleEdit(notice)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllNotices;