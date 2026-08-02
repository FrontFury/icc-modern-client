import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  CheckCircle2,
  XCircle,
  Shield,
  UserCog,
  X,
  Building,
  AtSign
} from 'lucide-react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Modals state
  const [selectedUserForRole, setSelectedUserForRole] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Add User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    department: 'Science',
  });

  const stats = [
    { title: 'Total Registered Users', value: '3,840', sub: 'Across all departments', icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'Active Students', value: '3,210', sub: 'Currently enrolled', icon: UserCheck, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { title: 'Faculty & Staff', value: '412', sub: 'Teaching & Admin', icon: ShieldCheck, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { title: 'Pending Approval', value: '18', sub: 'New registrations', icon: UserPlus, bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  // Dynamic user list state
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Ahmed', email: 'sarah.ahmed@icc.edu.bd', role: 'Faculty', department: 'Science', status: 'Active', joined: 'Jan 12, 2024' },
    { id: 2, name: 'Tanvir Hossain', email: 'tanvir.h@student.icc.edu.bd', role: 'Student', department: 'Commerce', status: 'Active', joined: 'Mar 05, 2025' },
    { id: 3, name: 'Prof. Rafiqul Islam', email: 'rafiqul.islam@icc.edu.bd', role: 'Operator', department: 'Administration', status: 'Active', joined: 'Aug 20, 2023' },
    { id: 4, name: 'Anika Rahman', email: 'anika.r@student.icc.edu.bd', role: 'Student', department: 'Arts', status: 'Pending', joined: 'Oct 18, 2026' },
    { id: 5, name: 'Mahmud Hasan', email: 'mahmud.h@icc.edu.bd', role: 'Faculty', department: 'Commerce', status: 'Suspended', joined: 'Feb 10, 2024' },
  ]);

  // Open role change modal
  const handleOpenRoleModal = (user) => {
    setSelectedUserForRole(user);
    setNewRole(user.role);
  };

  // Save role update
  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!selectedUserForRole) return;

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === selectedUserForRole.id ? { ...u, role: newRole } : u
      )
    );

    setSelectedUserForRole(null);
  };

  // Handle Add New User Form Submit
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      alert('Please fill out all required fields.');
      return;
    }

    const createdUser = {
      id: Date.now(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      department: newUserForm.department,
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    setUsers([createdUser, ...users]);
    setNewUserForm({ name: '', email: '', role: 'Student', department: 'Science' });
    setIsAddUserOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-800 relative">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage student, faculty, and administrative accounts and access privileges.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddUserOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0d12] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-sm w-fit"
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
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{item.value}</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{item.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
        
        {/* Search & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">User Directory</h2>
            <p className="text-[11px] text-slate-500">Filter, search, or edit user roles</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 transition w-48 sm:w-60"
              />
            </div>

            <div className="relative flex items-center">
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-8 pr-4 py-1.5 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Operator">Operator</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 pr-3">
                    <div className="font-bold text-slate-800">{user.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-300" />
                      {user.email}
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        user.role === 'Operator'
                          ? 'bg-purple-50 text-purple-600 border border-purple-100'
                          : user.role === 'Faculty'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {user.role === 'Operator' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 font-medium text-slate-600">{user.department}</td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : user.status === 'Pending'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                    >
                      {user.status === 'Active' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : user.status === 'Suspended' ? (
                        <XCircle className="w-3 h-3" />
                      ) : null}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400 text-[11px]">{user.joined}</td>
                  <td className="py-3.5 text-right space-x-1">
                    <button
                      type="button"
                      onClick={() => handleOpenRoleModal(user)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[11px] transition inline-flex items-center gap-1"
                    >
                      <UserCog className="w-3.5 h-3.5 text-slate-500" />
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 1. Add User Modal Dialog */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add New User</h3>
                  <p className="text-[11px] text-slate-500">Create an account for student or staff</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahfuzur Rahman"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <AtSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="name@icc.edu.bd"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  />
                </div>
              </div>

              {/* Role & Department Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={newUserForm.department}
                    onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  >
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0a0d12] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Create Account
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 2. Change Role Modal Dialog */}
      {selectedUserForRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Change User Role</h3>
                  <p className="text-[11px] text-slate-500">Update permission clearance level</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForRole(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                <p className="font-bold text-slate-800">{selectedUserForRole.name}</p>
                <p className="text-slate-500">{selectedUserForRole.email}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select New Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedUserForRole(null)}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0a0d12] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Save Role
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}