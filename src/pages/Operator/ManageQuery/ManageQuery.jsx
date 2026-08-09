import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  X, 
  Loader2, 
  AlertCircle,
  Mail,
  Phone,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // আপনার প্রজেক্ট এর পাথ অনুযায়ী এডজাস্ট করুন

export default function ManageQuery() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null); // Modal state for viewing details

  // 1. Fetching all queries
  const { data: queries = [], isLoading, isError, error } = useQuery({
    queryKey: ['student-queries'],
    queryFn: async () => {
      const res = await axiosSecure.get('/student-query');
      return res.data;
    }
  });

  // 2. Mutation for Updating Query Status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/student-query/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['student-queries']);
      Swal.fire({
        title: 'Updated!',
        text: 'Query status has been updated successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#0a1120',
        color: '#fff'
      });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  });

  // 3. Mutation for Deleting a Query
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/student-query/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['student-queries']);
      Swal.fire({
        title: 'Deleted!',
        text: 'Query has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#0a1120',
        color: '#fff'
      });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete query', 'error');
    }
  });

  // Handlers
  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Resolved' ? 'Pending' : 'Resolved';
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#334155',
      confirmButtonText: 'Yes, delete it!',
      background: '#0a1120',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Export to XLSX Handler
  const handleExportXLSX = () => {
    if (!queries.length) {
      Swal.fire('No Data', 'There are no queries to export.', 'info');
      return;
    }

    // Format data for excel sheet
    const formattedData = queries.map((q, index) => ({
      'SL': index + 1,
      'Student Name': q.name || 'N/A',
      'Email': q.email || 'N/A',
      'Phone': q.phone || 'N/A',
      'Subject/Program': q.subject || 'N/A',
      'Message': q.message || 'N/A',
      'Status': q.status || 'Pending',
      'Date': q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'
    }));

    // Create Worksheet and Workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Queries');

    // Auto-fit column width (optional improvement)
    const maxWidths = [
      { wch: 5 },  // SL
      { wch: 20 }, // Name
      { wch: 28 }, // Email
      { wch: 16 }, // Phone
      { wch: 25 }, // Subject
      { wch: 40 }, // Message
      { wch: 12 }, // Status
      { wch: 12 }  // Date
    ];
    worksheet['!cols'] = maxWidths;

    // Trigger XLSX file download
    XLSX.writeFile(workbook, `Student_Queries_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Filter queries based on search
  const filteredQueries = queries.filter((q) =>
    q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#030712] font-sans text-slate-200 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Manage Student Queries</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review, filter, manage status, and export student inquiry records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-xs text-slate-200 placeholder-slate-500 transition"
              />
            </div>

            {/* Export XLSX Button */}
            <button
              onClick={handleExportXLSX}
              disabled={isLoading || queries.length === 0}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export All Queries</span>
            </button>
          </div>
        </div>

        {/* Main Content Table / Loader */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <p className="text-xs text-slate-400">Loading queries...</p>
          </div>
        ) : isError ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error?.message || 'Failed to fetch student queries.'}</span>
          </div>
        ) : (
          <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 border-b border-slate-800 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredQueries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-500">
                        No queries found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredQueries.map((query) => (
                      <tr key={query._id} className="hover:bg-slate-900/40 transition">
                        
                        {/* Name */}
                        <td className="py-3.5 px-4 font-bold text-slate-100">
                          {query.name || 'N/A'}
                        </td>

                        {/* Email & Phone */}
                        <td className="py-3.5 px-4 space-y-0.5">
                          <div className="text-slate-300">{query.email}</div>
                          <div className="text-[11px] text-slate-500">{query.phone || 'No phone provided'}</div>
                        </td>

                        {/* Subject */}
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-[11px] font-semibold">
                            {query.subject}
                          </span>
                        </td>

                        {/* Status Toggle Badge */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleStatusToggle(query._id, query.status)}
                            disabled={updateStatusMutation.isPending}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer ${
                              query.status === 'Resolved'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                            }`}
                          >
                            {query.status === 'Resolved' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Resolved</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                <span>Pending</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* View Details */}
                            <button
                              onClick={() => setSelectedQuery(query)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete Query */}
                            <button
                              onClick={() => handleDelete(query._id)}
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition cursor-pointer"
                              title="Delete Query"
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

      {/* VIEW QUERY DETAILS MODAL */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0a1120] border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Query Details</h3>
              <button
                onClick={() => setSelectedQuery(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block mb-1">Student Name</span>
                  <span className="font-bold text-slate-200 text-sm">{selectedQuery.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Subject Area</span>
                  <span className="font-semibold text-cyan-400">{selectedQuery.subject}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{selectedQuery.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{selectedQuery.phone || 'Not Provided'}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1.5 pt-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Message Content</span>
                <p className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300 leading-relaxed max-h-40 overflow-y-auto font-sans whitespace-pre-wrap">
                  {selectedQuery.message}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  handleStatusToggle(selectedQuery._id, selectedQuery.status);
                  setSelectedQuery(null);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition text-slate-200 cursor-pointer"
              >
                Toggle Status ({selectedQuery.status === 'Resolved' ? 'Set Pending' : 'Set Resolved'})
              </button>

              <button
                onClick={() => setSelectedQuery(null)}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}