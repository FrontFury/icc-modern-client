import React from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  Eye,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Notices', value: '128', change: '+12%', icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Views', value: '24.5K', change: '+18%', icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Announcements', value: '14', change: 'Stable', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Scheduled Notices', value: '3', change: '2 due today', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentNotices = [
    { id: 1, title: 'Registration Deadline for Fall 2026', category: 'Academic', priority: 'URGENT', views: '1,420', date: 'Jul 28, 2026' },
    { id: 2, title: 'Mid-Term Examination Schedule Released', category: 'Examination', priority: 'HIGH', views: '980', date: 'Jul 25, 2026' },
    { id: 3, title: 'Campus Maintenance & Library Hours Update', category: 'General', priority: 'NORMAL', views: '512', date: 'Jul 20, 2026' },
    { id: 4, title: 'Annual Sports Day Registration Open', category: 'Events', priority: 'NORMAL', views: '730', date: 'Jul 15, 2026' },
  ];

  return (
    <div className="w-full mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Operator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Overview of broadcast notices, audience activity, and pending updates.
          </p>
        </div>

        <Link
          to="/operator/addNotices"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0d12] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Create Notice
        </Link>
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
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{item.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Notices & Quick System Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Recent Notices Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recently Published Notices</h2>
              <p className="text-[11px] text-slate-500">Live announcements broadcasted to students and staff</p>
            </div>
            <Link to="/notices" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              View Public Feed <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {notice.category}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        notice.priority === 'URGENT'
                          ? 'bg-red-50 text-red-600 border border-red-100'
                          : notice.priority === 'HIGH'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 truncate">{notice.title}</p>
                  <p className="text-[10px] text-slate-400">Published on {notice.date}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {notice.views}
                  </span>
                  <span className="text-[10px] text-slate-400">total views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Status & Info Cards */}
        <div className="space-y-5">
          
          {/* Quick Notice Action Panel */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold">Fast Announcement Entry</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Need to quickly dispatch an urgent update to campus? Use the streamlined editor.
              </p>
            </div>
            <Link
              to="/operator/notices"
              className="w-full inline-flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              Open Notice Form
            </Link>
          </div>

          {/* System Alert Card */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <h4 className="text-xs font-bold">System Status</h4>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              All notification services and ImgBB media attachments are fully operational.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}