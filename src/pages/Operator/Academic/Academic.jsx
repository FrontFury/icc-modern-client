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
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function Academic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const stats = [
    { title: 'Total Departments', value: '3', sub: 'Science, Commerce, Arts', icon: Layers, bg: 'bg-cyan-500/10 border-cyan-500/20', color: 'text-cyan-400' },
    { title: 'Active Courses', value: '48', sub: 'Fall 2026 Semester', icon: BookOpen, bg: 'bg-indigo-500/10 border-indigo-500/20', color: 'text-indigo-400' },
    { title: 'Faculty Members', value: '112', sub: 'Across 3 Faculties', icon: Users, bg: 'bg-emerald-500/10 border-emerald-500/20', color: 'text-emerald-400' },
    { title: 'Current Semester', value: 'Fall 2026', sub: 'Mid-term period', icon: Calendar, bg: 'bg-amber-500/10 border-amber-500/20', color: 'text-amber-400' },
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
    <div className="w-full rounded-3xl bg-[#030712] min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="w-10 h-1 bg-cyan-400 rounded-full mb-3 shadow-[0_0_10px_#22d3ee]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Academic Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Manage academic faculties, departmental programs, and term schedules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert('Add Department Modal')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 w-fit"
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
              <div 
                key={idx} 
                className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700/80 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${item.bg} ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="text-xs font-bold text-slate-300 mt-0.5">{item.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Department List Table (2 Columns) */}
          <div className="lg:col-span-2 bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">Academic Faculties</h2>
                <p className="text-xs text-slate-400">Active college departments & leadership</p>
              </div>

              {/* Filter Controls */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search faculty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition w-full sm:w-48"
                  />
                </div>
              </div>
            </div>

            {/* Departments Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Faculty / Code</th>
                    <th className="pb-3">Department Head</th>
                    <th className="pb-3 text-center">Courses</th>
                    <th className="pb-3 text-center">Students</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredDepts.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pr-2">
                        <div className="font-bold text-slate-100 text-sm">{dept.name}</div>
                        <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          {dept.code}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300 font-medium">{dept.head}</td>
                      <td className="py-4 text-center font-bold text-white">{dept.courses}</td>
                      <td className="py-4 text-center font-bold text-white">{dept.students}</td>
                      <td className="py-4 text-right">
                        <button 
                          type="button" 
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                        >
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
          <div className="space-y-6">
            
            {/* Semester Timeline Status Card */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                Academic Calendar Status
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">Course Registration</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">Completed Oct 15, 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-cyan-300">Mid-Term Exams</p>
                    <p className="text-[10px] font-medium text-cyan-400/80 mt-0.5">In Progress (Oct 24 - Nov 05)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-300">Final Term Submissions</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">Scheduled Dec 10, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Quick Links */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                Quick Portal Shortcuts
              </h3>
              
              <div className="space-y-2.5">
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
                    className="flex items-center justify-between p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700/80 rounded-xl text-xs font-bold text-slate-300 hover:text-cyan-400 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      <span>{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}