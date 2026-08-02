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
    { title: 'Server Health', value: '99.9%', sub: 'Uptime (Last 30 Days)', icon: Activity, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { title: 'Database Connection', value: 'Connected', sub: 'Latency: 14ms', icon: Database, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'CDN & ImgBB Storage', value: '42.8 GB', sub: 'Of 100 GB Limit', icon: HardDrive, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { title: 'CPU Usage', value: '18%', sub: '4 Cores Operational', icon: Cpu, bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-800">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            System Settings & Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor infrastructure health, manage API keys, and configure global system switches.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0d12] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-sm w-fit"
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
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Live
                </span>
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

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: System Controls & Integrations (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Global Operations Toggles */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Operational Switches</h2>
              <p className="text-[11px] text-slate-500">Configure global application behaviors and access modes</p>
            </div>

            <div className="divide-y divide-slate-100">
              
              {/* Maintenance Mode Toggle */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    Maintenance Mode
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Temporarily lock out public access to portal features during system upgrades.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    maintenanceMode ? 'bg-amber-600' : 'bg-slate-200'
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
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <BellRing className="w-4 h-4 text-blue-500" />
                    Emergency Notice Banner
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Allow urgent broadcasts to override student portal headers instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmergencyAlerts(!emergencyAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emergencyAlerts ? 'bg-blue-600' : 'bg-slate-200'
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
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    Automated Email Notifications
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Send automated email digests to faculty when new internal announcements are posted.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emailNotifications ? 'bg-emerald-600' : 'bg-slate-200'
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
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">API & Service Keys</h2>
              <p className="text-[11px] text-slate-500">Manage credentials for external media hostings and messaging gateways</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ImgBB Image Upload API Key
                </label>
                <div className="relative">
                  <Key className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    value={imgbbKey}
                    onChange={(e) => setImgbbKey(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100/70 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Used by Notice Board image attachment uploaders.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Maintenance & Actions */}
        <div className="space-y-5">
          
          {/* Quick Actions Panel */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              System Maintenance
            </h3>

            <div className="space-y-3">
              {/* Purge Cache Button */}
              <button
                type="button"
                onClick={() => alert('Application cache purged successfully.')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-bold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                  Clear App Cache
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Flush Redis</span>
              </button>

              {/* Backup Database */}
              <button
                type="button"
                onClick={handleTriggerBackup}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-bold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <DownloadCloud className="w-4 h-4 text-slate-500" />
                  Export DB Backup
                </span>
                <span className="text-[10px] font-semibold text-slate-400">JSON Format</span>
              </button>

              {backupStatus && (
                <p className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 text-center">
                  {backupStatus}
                </p>
              )}
            </div>
          </div>

          {/* Environment Summary Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold">Production Node 01</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Running Node v20.x, React 18 with Vite build pipeline.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
              <span>Region: Asia-East (Dhaka)</span>
              <span className="font-mono text-slate-300">v2.4.1</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}