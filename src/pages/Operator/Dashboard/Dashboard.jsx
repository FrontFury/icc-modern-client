import React, { useState } from 'react';
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
  AlertCircle,
  Users,
  ShieldCheck,
  Settings,
  Activity,
  UserPlus,
  BarChart3,
  Server
} from 'lucide-react';

export default function Dashboard({ userRole = 'admin' }) {
  // Demo state to toggle role inside dashboard preview (you can sync with actual auth context)
  const [currentRole, setCurrentRole] = useState(userRole); 
  const isAdmin = currentRole === 'admin';

  // Base Operator Stats
  const operatorStats = [
    { 
      title: 'Total Notices', 
      value: '128', 
      change: '+12%', 
      icon: Megaphone, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10 border-cyan-500/20' 
    },
    { 
      title: 'Total Views', 
      value: '24.5K', 
      change: '+18%', 
      icon: Eye, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10 border-emerald-500/20' 
    },
    { 
      title: 'Active Announcements', 
      value: '14', 
      change: 'Stable', 
      icon: CheckCircle2, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10 border-indigo-500/20' 
    },
    { 
      title: 'Scheduled Notices', 
      value: '3', 
      change: '2 due today', 
      icon: Clock, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10 border-amber-500/20' 
    },
  ];

  // Admin Specific Extra Stats Cards
  const adminStats = [
    { 
      title: 'Total Operators', 
      value: '18', 
      change: '+2 Active', 
      icon: Users, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10 border-purple-500/20' 
    },
    { 
      title: 'Pending Approvals', 
      value: '05', 
      change: 'Needs Action', 
      icon: ShieldCheck, 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10 border-rose-500/20' 
    },
    { 
      title: 'System Server Load', 
      value: '24%', 
      change: 'Optimal', 
      icon: Server, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10 border-cyan-500/20' 
    },
    { 
      title: 'System Audit Logs', 
      value: '1.2k', 
      change: 'Today', 
      icon: Activity, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10 border-emerald-500/20' 
    },
  ];

  const displayStats = isAdmin ? adminStats : operatorStats;

  const recentNotices = [
    { id: 1, title: 'Registration Deadline for Fall 2026', category: 'Academic', priority: 'URGENT', views: '1,420', date: 'Jul 28, 2026' },
    { id: 2, title: 'Mid-Term Examination Schedule Released', category: 'Examination', priority: 'HIGH', views: '980', date: 'Jul 25, 2026' },
    { id: 3, title: 'Campus Maintenance & Library Hours Update', category: 'General', priority: 'NORMAL', views: '512', date: 'Jul 20, 2026' },
    { id: 4, title: 'Annual Sports Day Registration Open', category: 'Events', priority: 'NORMAL', views: '730', date: 'Jul 15, 2026' },
  ];

  // Admin Recent Activity Logs
  const adminLogs = [
    { id: 1, action: 'User Permissions Updated', target: 'Operator #04', time: '10 mins ago', status: 'Success' },
    { id: 2, action: 'Notice Deleted', target: 'Draft Notice #88', time: '45 mins ago', status: 'Warning' },
    { id: 3, action: 'New Operator Added', target: 'sarah.admin@college.edu', time: '2 hours ago', status: 'Success' },
  ];

  return (
    <div className="w-full mx-auto space-y-6 font-sans text-slate-100 min-h-screen bg-[#030712] p-4 sm:p-6 rounded-2xl">
      
      {/* Top Bar with Role Indicator & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isAdmin ? 'System Admin Control Center' : 'Operator Dashboard'}
            </h1>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
              isAdmin 
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            }`}>
              {isAdmin ? 'ADMIN PRIVILEGES' : 'OPERATOR'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {isAdmin 
              ? 'Complete overview of platform analytics, user role privileges, and notice moderation.'
              : 'Overview of broadcast notices, audience activity, and pending updates.'}
          </p>
        </div>

        {/* Header Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Demo Switch Role Button */}
          <button
            onClick={() => setCurrentRole(isAdmin ? 'operator' : 'admin')}
            className="px-3 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition"
          >
            Switch View: <strong className="text-cyan-400 capitalize">{currentRole}</strong>
          </button>

          <Link
            to="/operator/addNotices"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black rounded-xl transition shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Notice
          </Link>
        </div>
      </div>

      {/* Dynamic Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3 shadow-xl hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="text-xs font-bold text-slate-300 mt-0.5">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Public Feed / System Logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Notices Panel */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white">Recently Published Notices</h2>
                <p className="text-[11px] text-slate-400">Live announcements broadcasted to students and staff</p>
              </div>
              <Link to="/notices" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition">
                View Public Feed <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-800/60">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {notice.category}
                      </span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                          notice.priority === 'URGENT'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : notice.priority === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700/50'
                        }`}
                      >
                        {notice.priority}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-100 truncate">{notice.title}</p>
                    <p className="text-[10px] text-slate-500">Published on {notice.date}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1 justify-end">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      {notice.views}
                    </span>
                    <span className="text-[10px] text-slate-500">total views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC CONTENT FOR ADMIN: Audit Log Trail */}
          {isAdmin && (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> System Audit Logs
                  </h2>
                  <p className="text-[11px] text-slate-400">Real-time administrative operations & safety logs</p>
                </div>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-bold">
                  ADMIN ONLY
                </span>
              </div>

              <div className="space-y-2">
                {adminLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-200">{log.action}</p>
                      <p className="text-[10px] text-slate-500">Target: {log.target}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400">{log.time}</span>
                      <p className="text-[9px] text-emerald-400 font-semibold">{log.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Actions & Controls */}
        <div className="space-y-5">
          
          {/* DYNAMIC FOR ADMIN: Operator Management Tools */}
          {isAdmin ? (
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Admin Management Panel</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Manage operator permissions, assign new administrative roles, and adjust system limits.
                </p>
              </div>
              <div className="space-y-2 pt-1">
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-purple-500/20">
                  <UserPlus className="w-3.5 h-3.5" /> Manage Operators
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition">
                  <Settings className="w-3.5 h-3.5" /> System Settings
                </button>
              </div>
            </div>
          ) : (
            /* Operator Quick Action Panel */
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Fast Announcement Entry</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Need to quickly dispatch an urgent update to campus? Use the streamlined editor.
                </p>
              </div>
              <Link
                to="/operator/addNotices"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black transition shadow-lg shadow-cyan-500/20"
              >
                Open Notice Form
              </Link>
            </div>
          )}

          {/* System Alert Card */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <h4 className="text-xs font-bold">System Status</h4>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              All notification services and ImgBB media attachments are fully operational.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}