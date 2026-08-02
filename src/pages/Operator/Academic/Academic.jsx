import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Plus,
  Search,
  MoreVertical,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Academic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const stats = [
    { title: 'Total Departments', value: '3', sub: 'Science, Commerce, Arts', icon: Layers, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'Active Courses', value: '48', sub: 'Fall 2026 Semester', icon: BookOpen, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { title: 'Faculty Members', value: '112', sub: 'Across 3 Faculties', icon: Users, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { title: 'Current Semester', value: 'Fall 2026', sub: 'Mid-term period', icon: Calendar, bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  const departments = [
    {
      id: 'science',
      name: 'Faculty of Science',
      code: 'SCI',
      head: 'Dr. Sarah Ahmed',
      courses: 18,
      students: '1,240',
      status: 'Active',
    },
    {
      id: 'commerce',
      name: 'Faculty of Commerce',
      code: 'COM',
      head: 'Prof. Rafiqul Islam',
      courses: 16,
      students: '1,580',
      status: 'Active',
    },
    {
      id: 'arts',
      name: 'Faculty of Arts & Humanities',
      code: 'ART',
      head: 'Dr. Nusrat Jahan',
      courses: 14,
      students: '920',
      status: 'Active',
    },
  ];

  const filteredDepts = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dept.head.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedDept === 'All' || dept.code === selectedDept;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-800">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Academic Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage academic faculties, departmental programs, and term schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Add Department Modal')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0d12] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Program
        </button>
      </div>

      {/* Overview Stat Cards */}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Department List Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Academic Faculties</h2>
              <p className="text-[11px] text-slate-500">Active college departments & leadership</p>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                />
              </div>
            </div>
          </div>

          {/* Departments Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Faculty / Code</th>
                  <th className="pb-3">Department Head</th>
                  <th className="pb-3 text-center">Courses</th>
                  <th className="pb-3 text-center">Students</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDepts.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 pr-2">
                      <div className="font-bold text-slate-800">{dept.name}</div>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {dept.code}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 font-medium">{dept.head}</td>
                    <td className="py-3.5 text-center font-bold text-slate-700">{dept.courses}</td>
                    <td className="py-3.5 text-center font-bold text-slate-700">{dept.students}</td>
                    <td className="py-3.5 text-right">
                      <button type="button" className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Academic Calendar & Quick Actions */}
        <div className="space-y-5">
          
          {/* Semester Timeline Status Card */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              Academic Calendar Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Course Registration</p>
                  <p className="text-[10px] text-slate-500">Completed Oct 15, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-900">Mid-Term Exams</p>
                  <p className="text-[10px] text-blue-600">In Progress (Oct 24 - Nov 05)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Final Term Submissions</p>
                  <p className="text-[10px] text-slate-400">Scheduled Dec 10, 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Quick Links */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Quick Portal Shortcuts</h3>
            <div className="space-y-2">
              {[
                { name: 'Science Dept View', path: '/departments/science' },
                { name: 'Commerce Dept View', path: '/departments/commerce' },
                { name: 'Arts Dept View', path: '/departments/arts' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.path}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 transition"
                >
                  <span>{link.name}</span>
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}