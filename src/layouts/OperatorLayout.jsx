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
  UserRoundPlus,
  ImagePlus,
  Users2,
  UserRoundArrowLeft,
  DatabaseBackup,
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
        name: "Add Faculty",
        path: "/operator/addFaculty",
        icon: UserRoundPlus,
      },
      {
        name: "All Faculty",
        path: "/operator/allFaculty",
        icon: Users2,
      },
      {
        name: "Add Gallery",
        path: "/operator/addGallery",
        icon: ImagePlus ,
      },
      {
        name: "Manage Gallery",
        path: "/operator/manageGallery",
        icon: DatabaseBackup ,
      },
      {
        name: "Add Staff",
        path: "/operator/addStaff",
        icon: UserRoundArrowLeft ,
      },
      {
        name: "Manage Staff",
        path: "/operator/manageStaff",
        icon: UserRoundArrowLeft ,
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
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#030712] font-sans text-slate-100 antialiased">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md shrink-0 z-20">
        <h2 className="text-[11px] font-black text-cyan-400 tracking-widest uppercase">
          ADMIN CONTROL
        </h2>

        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-50 w-60 bg-slate-900/40 border-r border-slate-800/80 backdrop-blur-md flex flex-col transition-transform duration-300 ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-[11px] font-black text-cyan-400 tracking-widest uppercase">
            ADMIN CONTROL
          </h2>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-cyan-400" : "text-slate-500"
                      }`}
                    />
                    <span>{item.name}</span>

                    {isActive && (
                      <span className="absolute right-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-l shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Info & Actions Section */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 space-y-3 shrink-0">
          {/* User Profile Card */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-slate-700/60 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 border border-slate-700/60">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-100 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-[10px] font-semibold text-cyan-400/80 capitalize truncate">
                {role?.role || "Member"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              title="Go to Home"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
            </NavLink>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl transition-colors shadow-sm"
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