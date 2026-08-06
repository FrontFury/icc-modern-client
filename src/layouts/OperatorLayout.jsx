import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  Users,
  Settings,
  Menu,
  X,
  Home,
  LogOut,
  User as UserIcon,
  FilePlusCorner,
} from "lucide-react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

export default function OperatorLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  let navItems = [];

  if (role?.role === "admin") {
    navItems = [
      {
        name: "Dashboard",
        path: "/operator/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Users",
        path: "/operator/users",
        icon: Users,
      },
    ];
  } else if (role?.role === "operator") {
    navItems = [
      {
        name: "Dashboard",
        path: "/operator/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Add Notices",
        path: "/operator/addNotices",
        icon: FilePlusCorner,
      },
      {
        name: "All Notices",
        path: "/operator/allNotices",
        icon: Megaphone,
      },
      {
        name: "Academic",
        path: "/operator/academic",
        icon: GraduationCap,
      },
      {
        name: "System",
        path: "/operator/system",
        icon: Settings,
      },
    ];
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-800 antialiased">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-20">
        <h2 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
          ADMIN CONTROL
        </h2>

        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-50 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
            ADMIN CONTROL
          </h2>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
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
                      ? "bg-blue-50/80 text-blue-600 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
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

        {/* Bottom User Info & Actions Section */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 space-y-3 shrink-0">
          {/* User Profile Card */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-[10px] font-medium text-slate-500 capitalize truncate">
                {role?.role || "Member"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              title="Go to Home"
            >
              <Home className="w-3.5 h-3.5 text-slate-500" />
              <span>Home</span>
            </NavLink>

            {/* Logout Button with Red BG */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
}