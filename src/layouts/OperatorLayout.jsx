
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  Users,
  Settings,
} from 'lucide-react';

export default function OperatorLayout() {
  const navItems = [
    { name: 'Dashboard', path: '/operator/dashboard', icon: LayoutDashboard },
    { name: 'Notices', path: '/operator/notices', icon: Megaphone },
    { name: 'Academic', path: '/operator/academic', icon: GraduationCap },
    { name: 'Users', path: '/operator/users', icon: Users },
    { name: 'System', path: '/operator/system', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased">
      
      {/* Sidebar: OperatorNavBar */}
      <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col shrink-0">
        <div className="p-6">
          <h2 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
            ADMIN CONTROL
          </h2>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
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
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}