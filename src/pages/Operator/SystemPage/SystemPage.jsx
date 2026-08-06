import React, { useState } from 'react';
import {
  Server,
  Activity,
  HardDrive,
  Database,
  RefreshCw,
  ShieldAlert,
  BellRing,
  CheckCircle2,
  Lock,
  DownloadCloud,
  Save,
  Key,
  Cpu
} from 'lucide-react';

export default function SystemPage() {
  // Toggle states
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Form input states
  const [imgbbKey, setImgbbKey] = useState('●●●●●●●●●●●●●●●●a8f2');
  const [backupStatus, setBackupStatus] = useState('');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('System configurations saved successfully.');
  };

  const handleTriggerBackup = () => {
    setBackupStatus('Creating backup...');
    setTimeout(() => {
      setBackupStatus('Backup downloaded successfully!');
      setTimeout(() => setBackupStatus(''), 3000);
    }, 1500);
  };

  const systemMetrics = [
    { 
      title: 'Server Health', 
      value: '99.9%', 
      sub: 'Uptime (Last 30 Days)', 
      icon: Activity, 
      bg: 'bg-emerald-500/10 border-emerald-500/20', 
      color: 'text-emerald-400' 
    },
    { 
      title: 'Database Connection', 
      value: 'Connected', 
      sub: 'Latency: 14ms', 
      icon: Database, 
      bg: 'bg-cyan-500/10 border-cyan-500/20', 
      color: 'text-cyan-400' 
    },
    { 
      title: 'CDN & ImgBB Storage', 
      value: '42.8 GB', 
      sub: 'Of 100 GB Limit', 
      icon: HardDrive, 
      bg: 'bg-indigo-500/10 border-indigo-500/20', 
      color: 'text-indigo-400' 
    },
    { 
      title: 'CPU Usage', 
      value: '18%', 
      sub: '4 Cores Operational', 
      icon: Cpu, 
      bg: 'bg-amber-500/10 border-amber-500/20', 
      color: 'text-amber-400' 
    },
  ];

  return (
    <div className="w-full mx-auto space-y-6 font-sans text-slate-100 min-h-screen bg-[#030712] p-4 sm:p-6 rounded-2xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            System Settings & Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor infrastructure health, manage API keys, and configure global system switches.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/5 w-fit"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Infrastructure Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Live
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="text-xs font-bold text-slate-300 mt-0.5">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: System Controls & Integrations (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Global Operations Toggles */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-4 shadow-xl">
            <div className="border-b border-slate-800/80 pb-3">
              <h2 className="text-sm font-bold text-white">Operational Switches</h2>
              <p className="text-[11px] text-slate-400">Configure global application behaviors and access modes</p>
            </div>

            <div className="divide-y divide-slate-800/60">
              
              {/* Maintenance Mode Toggle */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Maintenance Mode
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Temporarily lock out public access to portal features during system upgrades.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    maintenanceMode ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Emergency Broadcasts */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <BellRing className="w-4 h-4 text-cyan-400" />
                    Emergency Notice Banner
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Allow urgent broadcasts to override student portal headers instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmergencyAlerts(!emergencyAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emergencyAlerts ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emergencyAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Email Notifications */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    Automated Email Notifications
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Send automated email digests to faculty when new internal announcements are posted.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emailNotifications ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* Third-Party API Integrations */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-4 shadow-xl">
            <div className="border-b border-slate-800/80 pb-3">
              <h2 className="text-sm font-bold text-white">API & Service Keys</h2>
              <p className="text-[11px] text-slate-400">Manage credentials for external media hostings and messaging gateways</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ImgBB Image Upload API Key
                </label>
                <div className="relative">
                  <Key className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={imgbbKey}
                    onChange={(e) => setImgbbKey(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5">Used by Notice Board image attachment uploaders.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Maintenance & Actions */}
        <div className="space-y-5">
          
          {/* Quick Actions Panel */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-white border-b border-slate-800/80 pb-2.5">
              System Maintenance
            </h3>

            <div className="space-y-3">
              {/* Purge Cache Button */}
              <button
                type="button"
                onClick={() => alert('Application cache purged successfully.')}
                className="w-full flex items-center justify-between p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-cyan-400" />
                  Clear App Cache
                </span>
                <span className="text-[10px] font-semibold text-slate-500">Flush Redis</span>
              </button>

              {/* Backup Database */}
              <button
                type="button"
                onClick={handleTriggerBackup}
                className="w-full flex items-center justify-between p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
              >
                <span className="flex items-center gap-2">
                  <DownloadCloud className="w-4 h-4 text-cyan-400" />
                  Export DB Backup
                </span>
                <span className="text-[10px] font-semibold text-slate-500">JSON Format</span>
              </button>

              {backupStatus && (
                <p className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center">
                  {backupStatus}
                </p>
              )}
            </div>
          </div>

          {/* Environment Summary Card */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/90 border border-slate-800/80 text-white rounded-2xl p-5 backdrop-blur-md space-y-3 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Production Node 01</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Running Node v20.x, React 18 with Vite build pipeline.
              </p>
            </div>
            <div className="pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between">
              <span>Region: Asia-East (Dhaka)</span>
              <span className="font-mono text-cyan-400">v2.4.1</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}