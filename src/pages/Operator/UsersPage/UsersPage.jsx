import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  Mail,
  CheckCircle2,
  XCircle,
  Shield,
  UserCog,
  Trash2,
  Calendar,
  Building,
} from "lucide-react";

export default function UsersPage() {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Fetch users with TanStack Query
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Calculate dynamic statistics
  const totalUsers = users.length;
  const activeStudents = users.filter(
    (u) => u.role === "Student" && u.status === "Active"
  ).length;
  const facultyStaff = users.filter((u) => u.role === "Faculty").length;
  const pendingApprovals = users.filter((u) => u.status === "Pending").length;

  const stats = [
    {
      title: "Total Registered Users",
      value: totalUsers,
      sub: "Across all departments",
      icon: Users,
      bg: "bg-cyan-500/10",
      color: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      title: "Active Students",
      value: activeStudents,
      sub: "Currently enrolled",
      icon: UserCheck,
      bg: "bg-emerald-500/10",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    {
      title: "Faculty & Staff",
      value: facultyStaff,
      sub: "Teaching & Admin",
      icon: ShieldCheck,
      bg: "bg-indigo-500/10",
      color: "text-indigo-400",
      border: "border-indigo-500/20",
    },
    {
      title: "Pending Approval",
      value: pendingApprovals,
      sub: "New registrations",
      icon: UserPlus,
      bg: "bg-amber-500/10",
      color: "text-amber-400",
      border: "border-amber-500/20",
    },
  ];

  // Handle Create User using SweetAlert2 Dark Modal
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
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Operator">Operator</option>
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

          await axiosSecure.post("/users", result.value);
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
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
            },
          });
        } catch (error) {
          console.error("Failed to create user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to create user account. Please try again.",
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

  // Handle Role Change using SweetAlert2 Dark Modal
  const handleChangeRole = (user) => {
    Swal.fire({
      title: "Update Permission Level",
      html: `
        <div class="space-y-3 text-left">
          <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs space-y-1">
            <p class="font-bold text-slate-100">${user.name}</p>
            <p class="text-slate-400">${user.email}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Select New Role</label>
            <select id="swal-user-new-role" class="swal2-select !m-0 !w-full !bg-slate-900 !text-slate-100 !border-slate-700 !rounded-xl text-sm">
              <option value="Student" ${user.role === "Student" ? "selected" : ""}>Student</option>
              <option value="Faculty" ${user.role === "Faculty" ? "selected" : ""}>Faculty</option>
              <option value="Operator" ${user.role === "Operator" ? "selected" : ""}>Operator</option>
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
        return document.getElementById("swal-user-new-role").value;
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

          await axiosSecure.patch(`/users/${user._id || user.id}`, {
            role: result.value,
          });
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
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
            },
          });
        } catch (error) {
          console.error("Failed to update role:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update user role. Please try again.",
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

  // Handle User Deletion using SweetAlert2 Dark Modal
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

          await axiosSecure.delete(`/users/${id}`);
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
            customClass: {
              popup: "border border-slate-800 rounded-2xl shadow-2xl",
            },
          });
        } catch (error) {
          console.error("Failed to delete user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user account. Please try again.",
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

  const filteredUsers = users.filter((user) => {
    const nameStr = user.name || "";
    const emailStr = user.email || "";
    const matchesSearch =
      nameStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emailStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#030712] text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            User Access Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage student, faculty, and administrative accounts and privileges.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddUser}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/10 w-fit"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-sm space-y-2 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} border ${item.border}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{item.value}</p>
                <p className="text-xs font-bold text-slate-300 mt-0.5">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directory & Controls Area */}
      <div className="space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
          <div>
            <h2 className="text-sm font-bold text-white">User Directory</h2>
            <p className="text-[11px] text-slate-400">Search, filter, or manage user capabilities</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition w-48 sm:w-60"
              />
            </div>

            <div className="relative flex items-center">
              <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Operator">Operator</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Joined</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user._id || user.id || index} className="hover:bg-slate-800/40 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-200 group-hover:text-cyan-300 transition">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {user.email}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md border uppercase ${
                          user.role === "Operator"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : user.role === "Faculty"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {user.role === "Operator" && <Shield className="w-3 h-3" />}
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-400 whitespace-nowrap">
                      {user.department || "N/A"}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md border uppercase ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : user.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {user.status === "Active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : user.status === "Suspended" ? (
                          <XCircle className="w-3 h-3" />
                        ) : null}
                        {user.status || "Active"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {user.joined || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleChangeRole(user)}
                          className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition"
                          title="Change Role"
                        >
                          <UserCog className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user._id || user.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View (Visible only on small screens) */}
        <div className="md:hidden space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium bg-slate-900/40 rounded-2xl border border-slate-800">
              <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              No users matching criteria.
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user._id || user.id || index}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-200 text-sm">{user.name}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-500" />
                      {user.email}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase shrink-0 ${
                      user.role === "Operator"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : user.role === "Faculty"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {user.role === "Operator" && <Shield className="w-3 h-3" />}
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <Building className="w-3 h-3 text-slate-500" />
                    {user.department || "N/A"}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ml-auto ${
                      user.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : user.status === "Pending"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : user.status === "Suspended" ? (
                      <XCircle className="w-3 h-3" />
                    ) : null}
                    {user.status || "Active"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-600" />
                    {user.joined || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleChangeRole(user)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold"
                    >
                      <UserCog className="w-3.5 h-3.5" />
                      Role
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user._id || user.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}