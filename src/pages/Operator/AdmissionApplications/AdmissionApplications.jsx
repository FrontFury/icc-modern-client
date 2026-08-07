import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import {
  Eye,
  Edit,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  Search,
  CheckCircle2,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const STATUS_OPTIONS = [
  "Submitted",
  "Under Review",
  "Contacted",
  "Documents Pending",
  "Documents Verified",
  "Interview Scheduled",
  "Waiting List",
  "Selected",
  "Admission Confirmed",
  "Enrolled",
  "Rejected",
  "Cancelled",
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Submitted":
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    case "Under Review":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Contacted":
      return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    case "Documents Pending":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "Documents Verified":
      return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    case "Interview Scheduled":
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    case "Waiting List":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Selected":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Admission Confirmed":
    case "Enrolled":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-400/20";
    case "Rejected":
    case "Cancelled":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

export default function AdmissionApplications() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Fetch Applications
  const { data: applications = [], isLoading, isError } = useQuery({
    queryKey: ['online-applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/online-applications');
      return res.data;
    },
  });

  // Update Application Status
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/online-applications/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['online-applications'] });
      setEditingApp(null);
    },
  });

  // Delete Application
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/online-applications/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['online-applications'] });
    },
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the application for "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (editingApp && newStatus) {
      updateMutation.mutate({ id: editingApp._id, status: newStatus });
    }
  };

  // Filtered applications
  const filteredApps = applications.filter((app) =>
    app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.phone?.includes(searchQuery) ||
    app.group?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // EXPORT TO EXCEL (.xlsx) FUNCTION
  const handleExportExcel = () => {
    const dataToExport = filteredApps.map((app, index) => ({
      'SL': index + 1,
      'Student Name': app.studentName || 'N/A',
      'Gender': app.gender || 'N/A',
      'Father Name': app.fatherName || 'N/A',
      'Mother Name': app.motherName || 'N/A',
      'Date of Birth': app.dob || 'N/A',
      'Phone': app.phone || 'N/A',
      'Email': app.email || 'N/A',
      'Academic Group': app.group || 'N/A',
      'SSC GPA': app.sscGpa || 'N/A',
      'Status': app.status || 'Submitted',
      'Photo URL': app.photo || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    XLSX.writeFile(workbook, "Admission_Applications.xlsx");
  };

  return (
    <div className="min-h-screen bg-[#030712] p-4 sm:p-8 lg:p-10 text-slate-200 font-sans relative antialiased">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Admin Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Admission Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage, review, and update student enrollment applications.
          </p>
        </div>

        {/* Action Controls: Search & Export Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student, group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition duration-200"
            />
          </div>

          <button
            onClick={handleExportExcel}
            disabled={filteredApps.length === 0}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 text-xs font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Data</span>
            <Download className="w-3 h-3 ml-0.5 opacity-70" />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="max-w-7xl mx-auto bg-[#0a1120]/60 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold text-slate-400">Loading Applications...</span>
          </div>
        ) : isError ? (
          <div className="py-20 flex flex-col items-center justify-center text-rose-400 gap-2">
            <AlertCircle className="w-8 h-8" />
            <span className="text-xs font-semibold">Failed to fetch application data.</span>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            No admission applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] uppercase tracking-wider text-slate-400 font-extrabold">
                  <th className="py-4 px-5">Student</th>
                  <th className="py-4 px-5">Group</th>
                  <th className="py-4 px-5">SSC GPA</th>
                  <th className="py-4 px-5">Contact</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs">
                {filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-900/40 transition duration-150">
                    
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.photo || 'https://via.placeholder.com/150'}
                          alt={app.studentName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white">{app.studentName}</div>
                          <div className="text-[11px] text-slate-400">{app.gender} • DOB: {app.dob}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-slate-300 font-medium">
                      {app.group}
                    </td>

                    <td className="py-4 px-5 font-bold text-cyan-400">
                      {app.sscGpa}
                    </td>

                    <td className="py-4 px-5">
                      <div className="text-slate-300">{app.phone}</div>
                      <div className="text-[11px] text-slate-500">{app.email}</div>
                    </td>

                    <td className="py-4 px-5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusBadgeClass(app.status || 'Submitted')}`}>
                        {app.status || 'Submitted'}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          title="View Details"
                          className="p-2 rounded-lg bg-slate-800/80 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition duration-200 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingApp(app);
                            setNewStatus(app.status || 'Submitted');
                          }}
                          title="Update Status"
                          className="p-2 rounded-lg bg-slate-800/80 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition duration-200 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(app._id, app.studentName)}
                          disabled={deleteMutation.isPending}
                          title="Delete Application"
                          className="p-2 rounded-lg bg-slate-800/80 text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition duration-200 disabled:opacity-50 cursor-pointer"
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

      {/* VIEW DETAILS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedApp.photo || 'https://via.placeholder.com/150'}
                alt={selectedApp.studentName}
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedApp.studentName}</h3>
                <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-extrabold border ${getStatusBadgeClass(selectedApp.status || 'Submitted')}`}>
                  {selectedApp.status || 'Submitted'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-slate-800/60">
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Gender:</span><span className="text-white font-semibold">{selectedApp.gender}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Date of Birth:</span><span className="text-white font-semibold">{selectedApp.dob}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Father's Name:</span><span className="text-white font-semibold">{selectedApp.fatherName}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Mother's Name:</span><span className="text-white font-semibold">{selectedApp.motherName}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Phone:</span><span className="text-white font-semibold">{selectedApp.phone}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Email:</span><span className="text-white font-semibold">{selectedApp.email}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">Academic Group:</span><span className="text-white font-semibold">{selectedApp.group}</span></div>
              <div className="pt-2 flex justify-between"><span className="text-slate-400">SSC Result (GPA):</span><span className="text-cyan-400 font-extrabold">{selectedApp.sscGpa}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL (PATCH) */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a1120] border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setEditingApp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">
              Update Application Status
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select status for <span className="text-cyan-400 font-semibold">{editingApp.studentName}</span>
            </p>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Application Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status} className="bg-slate-900 text-white">
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-1/2 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}