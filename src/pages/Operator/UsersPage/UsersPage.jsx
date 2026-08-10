import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Search,
  Plus,
  Shield,
  Trash2,
  Filter,
  CheckCircle,
  AlertCircle,
  UserCheck,
  UserX,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UsersPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  // Component States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Users using React Query
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Helper to fetch fresh authorization headers
  const getAuthHeader = async () => {
    if (currentUser) {
      const freshToken = await currentUser.getIdToken(true);
      localStorage.setItem("access-token", freshToken);
      return { Authorization: `Bearer ${freshToken}` };
    }
    return {};
  };

  // 1. Handle Create User
  const handleAddUser = () => {
    Swal.fire({
      title: "Add New User",
      html: `
        <div class="space-y-3 text-left">
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Full Name *</label>
            <input id="swal-user-name" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" placeholder="e.g. Mahfuzur Rahman">
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Institutional Email *</label>
            <input id="swal-user-email" type="email" class="swal2-input !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm" placeholder="name@icc.edu.bd">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Role</label>
              <select id="swal-user-role" class="swal2-select !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm">
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="operator">Operator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Department</label>
              <select id="swal-user-dept" class="swal2-select !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm">
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Create Account",
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
        const name = document.getElementById("swal-user-name").value.trim();
        const email = document.getElementById("swal-user-email").value.trim();
        const role = document.getElementById("swal-user-role").value;
        const department = document.getElementById("swal-user-dept").value;

        if (!name || !email) {
          Swal.showValidationMessage("Please complete all required fields.");
          return false;
        }

        return {
          name,
          email,
          role,
          department,
          status: "Active",
          joined: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          Swal.fire({
            title: "Creating User...",
            background: "#0f172a",
            color: "#f8fafc",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          const headers = await getAuthHeader();
          await axiosSecure.post("/users", result.value, { headers });
          await refetch();

          Swal.fire({
            title: "User Created!",
            text: "The new user account has been successfully created.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Failed to create user:", error);
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to create user account.",
            icon: "error",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
          });
        }
      }
    });
  };

  // 2. Handle Role Change
  const handleChangeRole = (userTarget) => {
    const currentRole = userTarget.role?.toLowerCase() || "student";

    Swal.fire({
      title: "Update Permission Level",
      html: `
        <div class="space-y-3 text-left">
          <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs space-y-1">
            <p class="font-bold text-slate-100">${userTarget.name}</p>
            <p class="text-slate-400">${userTarget.email}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Select New Role</label>
            <select id="swal-user-new-role" class="swal2-select !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm">
              <option value="user" ${currentRole === "user" ? "selected" : ""}>User</option>
              <option value="student" ${currentRole === "student" ? "selected" : ""}>Student</option>
              <option value="faculty" ${currentRole === "faculty" ? "selected" : ""}>Faculty</option>
              <option value="operator" ${currentRole === "operator" ? "selected" : ""}>Operator</option>
              <option value="admin" ${currentRole === "admin" ? "selected" : ""}>Admin</option>
            </select>
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
        popup: "border border-slate-800 rounded-2xl shadow-2xl max-w-sm",
        title: "text-lg font-bold text-white mb-2",
        confirmButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 border-none focus:ring-0",
        cancelButton:
          "px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 border-none focus:ring-0",
      },
      preConfirm: () => {
        return document.getElementById("swal-user-new-role").value.toLowerCase();
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          Swal.fire({
            title: "Updating Role...",
            background: "#0f172a",
            color: "#f8fafc",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          const headers = await getAuthHeader();
          const userId = userTarget._id || userTarget.id;

          await axiosSecure.patch(
            `/users/${userId}/role`,
            { role: result.value },
            { headers }
          );

          await refetch();

          Swal.fire({
            title: "Updated!",
            text: "User permissions updated successfully.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Failed to update role:", error);
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to update user role.",
            icon: "error",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
          });
        }
      }
    });
  };

  // 3. Handle User Deletion
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action will revoke all access privileges permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Account",
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
            title: "Removing Account...",
            background: "#0f172a",
            color: "#f8fafc",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          const headers = await getAuthHeader();
          await axiosSecure.delete(`/users/${id}`, { headers });
          await refetch();

          Swal.fire({
            title: "Account Removed",
            text: "The user has been removed successfully.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Failed to delete user:", error);
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete user account.",
            icon: "error",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#06b6d4",
          });
        }
      }
    });
  };

  // Client-side Filtering
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole =
      roleFilter === "All" ||
      (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (u.status && u.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Dynamic Badge Helpers
  const getRoleBadge = (role) => {
    const r = role ? role.toLowerCase() : "student";
    switch (r) {
      case "admin":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "operator":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "faculty":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : "active";
    switch (s) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "inactive":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            System Users
            <span className="text-xs font-medium px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
              {users.length} Total
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage user accounts, update security privileges, and control platform access.
          </p>
        </div>

        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-cyan-500/10 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add User Account
        </button>
      </div>

      {/* Control Bar (Search & Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>

        {/* Role Filter */}
        <div className="md:col-span-3 relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3 relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-md">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="animate-spin mx-auto text-cyan-400" size={28} />
            <p className="text-sm font-medium">Fetching accounts database...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="mx-auto text-rose-500" size={32} />
            <p className="text-slate-200 font-semibold">Failed to load users</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">{error?.message || "Authorization failed."}</p>
            <button
              onClick={() => refetch()}
              className="mt-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl transition-all"
            >
              Retry Load
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-sm">No accounts found matching your query criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">User Info</th>
                  <th className="py-4 px-6">Role Privilege</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Account Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredUsers.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-slate-800/20 transition-colors">
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold overflow-hidden shrink-0">
                          {item.image || item.photoURL ? (
                            <img src={item.image || item.photoURL} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            item.name?.charAt(0).toUpperCase() || "U"
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{item.name || "Unnamed User"}</p>
                          <p className="text-xs text-slate-400">{item.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getRoleBadge(item.role)}`}>
                        {item.role || "student"}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-6 text-slate-300 text-xs">
                      {item.department || item.dept || "General"}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(item.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleChangeRole(item)}
                        title="Change Access Role"
                        className="p-2 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 rounded-xl border border-slate-700/50 transition-all"
                      >
                        <Shield size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(item._id || item.id)}
                        title="Remove Account"
                        className="p-2 bg-slate-800/80 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-700/50 hover:border-rose-500/20 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;