import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  Users,
  Settings,
  Menu,
  X,
} from 'lucide-react';

export default function OperatorLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/operator/dashboard', icon: LayoutDashboard },
    { name: 'Add Notices', path: '/operator/addNotices', icon: Megaphone },
    { name: 'All Notices', path: '/operator/allNotices', icon: Megaphone },
    { name: 'Academic', path: '/operator/academic', icon: GraduationCap },
    { name: 'Users', path: '/operator/users', icon: Users },
    { name: 'System', path: '/operator/system', icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-800 antialiased">
      
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-20">
        <h2 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
          ADMIN CONTROL
        </h2>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar (Mobile Drawer + Desktop/Tablet Fixed Sidebar) */}
      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-50 w-60 bg-white border-r border-slate-200/80 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
            ADMIN CONTROL
          </h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute right-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-l" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Outlet Display Section */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        <Outlet />
      </main>

    </div>
  );
}