import { Menu, X, ChevronDown, LogOut, LogIn, User, LayoutDashboard, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import logo from "../../../assets/icc-logo.png";
import AdmissionMarquee from "../../Home/AdmissionMarquee/AdmissionMarquee";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const location = useLocation();
  const { user, logOut } = useAuth();
  const { role } = useRole();

  // Profile dropdown dismiss on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isDeptActive = location.pathname.startsWith("/departments");
  const isFacultyActive =
    location.pathname.startsWith("/faculty") || location.pathname.startsWith("/staff");

  const userRole = role?.role;
  const isAdminOrOperator = userRole === "admin" || userRole === "operator";

  const departments = [
    { name: "Science", to: "/departments/science" },
    { name: "Business Studies", to: "/departments/commerce" },
    { name: "Humanities", to: "/departments/arts" },
  ];

  const facultyStaffItems = [
    { name: "Faculty Members", to: "/faculty" },
    { name: "Staff Members", to: "/staff" },
  ];

  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Notice", to: "/notices" },
    { name: "Groups", isDeptDropdown: true },
    { name: "Faculty & Staff", isFacultyDropdown: true },
    { name: "Admission", to: "/admission" },
    { name: "Alumni", to: "/alumni" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#030712]/80 -mb-32 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800/80">
      <div className="w-11/12 md:w-5/6 mx-auto px-3 md:px-6 h-20 flex items-center justify-between">
        {/* College Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="College Logo"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-0 group-hover:invert"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center space-x-7">
          {navItems.map((item) => {
            // Departments Dropdown
            if (item.isDeptDropdown) {
              return (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setIsDeptOpen(true)}
                  onMouseLeave={() => setIsDeptOpen(false)}
                >
                  <button
                    onClick={() => setIsDeptOpen(!isDeptOpen)}
                    className={`relative py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 focus:outline-none ${
                      isDeptActive
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDeptOpen
                          ? "rotate-180 text-cyan-400"
                          : "text-slate-400"
                      }`}
                    />
                    {isDeptActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </button>

                  {/* Desktop Departments Submenu */}
                  {isDeptOpen && (
                    <div className="absolute top-full left-0 w-48 bg-[#0b1120] border border-slate-800 shadow-2xl rounded-xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      {departments.map((dept) => (
                        <NavLink
                          key={dept.name}
                          to={dept.to}
                          onClick={() => setIsDeptOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                              isActive
                                ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                                : "text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400"
                            }`
                          }
                        >
                          {dept.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              );
            }

            // Faculty & Staff Dropdown
            if (item.isFacultyDropdown) {
              return (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setIsFacultyOpen(true)}
                  onMouseLeave={() => setIsFacultyOpen(false)}
                >
                  <button
                    onClick={() => setIsFacultyOpen(!isFacultyOpen)}
                    className={`relative py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 focus:outline-none ${
                      isFacultyActive
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isFacultyOpen
                          ? "rotate-180 text-cyan-400"
                          : "text-slate-400"
                      }`}
                    />
                    {isFacultyActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </button>

                  {/* Desktop Faculty & Staff Submenu */}
                  {isFacultyOpen && (
                    <div className="absolute top-full left-0 w-52 bg-[#0b1120] border border-slate-800 shadow-2xl rounded-xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      {facultyStaffItems.map((fs) => (
                        <NavLink
                          key={fs.name}
                          to={fs.to}
                          onClick={() => setIsFacultyOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                              isActive
                                ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                                : "text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400"
                            }`
                          }
                        >
                          {fs.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              );
            }

            // Standard Navigation Items
            return (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition-colors block ${
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-cyan-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Auth / Profile Area (Desktop) */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <div className="relative" ref={profileRef}>
              {/* Profile Image Trigger */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none group"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.3)] group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-cyan-400/80 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-200">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0b1120] border border-slate-800 shadow-2xl rounded-2xl py-3 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info Section */}
                  <div className="px-4 pb-3 border-b border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
                      <User className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate">{user?.displayName || "User"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user?.email || "No email"}</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    {/* Conditional Dashboard Link */}
                    {isAdminOrOperator && (
                      <Link
                        to="/operator/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/signIn"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-cyan-400 bg-slate-900/60 border border-slate-800 rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#030712]/95 border-b border-slate-800 px-6 pt-4 pb-6 space-y-4 backdrop-blur-xl">
          <ul className="space-y-3">
            {navItems.map((item) => {
              // Mobile Departments Dropdown
              if (item.isDeptDropdown) {
                return (
                  <li key={item.name} className="space-y-2">
                    <button
                      onClick={() => setIsDeptOpen(!isDeptOpen)}
                      className={`w-full flex items-center justify-between py-2 text-sm font-bold tracking-wider uppercase focus:outline-none ${
                        isDeptActive
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-cyan-400"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDeptOpen
                            ? "rotate-180 text-cyan-400"
                            : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Departments Submenu Options */}
                    {isDeptOpen && (
                      <div className="pl-4 space-y-2 border-l-2 border-slate-800 my-1">
                        {departments.map((dept) => (
                          <NavLink
                            key={dept.name}
                            to={dept.to}
                            onClick={() => {
                              setIsOpen(false);
                              setIsDeptOpen(false);
                            }}
                            className={({ isActive }) =>
                              `block py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                                isActive
                                  ? "text-cyan-400"
                                  : "text-slate-400 hover:text-slate-200"
                              }`
                            }
                          >
                            {dept.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              // Mobile Faculty & Staff Dropdown
              if (item.isFacultyDropdown) {
                return (
                  <li key={item.name} className="space-y-2">
                    <button
                      onClick={() => setIsFacultyOpen(!isFacultyOpen)}
                      className={`w-full flex items-center justify-between py-2 text-sm font-bold tracking-wider uppercase focus:outline-none ${
                        isFacultyActive
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-cyan-400"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isFacultyOpen
                            ? "rotate-180 text-cyan-400"
                            : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Faculty & Staff Submenu Options */}
                    {isFacultyOpen && (
                      <div className="pl-4 space-y-2 border-l-2 border-slate-800 my-1">
                        {facultyStaffItems.map((fs) => (
                          <NavLink
                            key={fs.name}
                            to={fs.to}
                            onClick={() => {
                              setIsOpen(false);
                              setIsFacultyOpen(false);
                            }}
                            className={({ isActive }) =>
                              `block py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                                isActive
                                  ? "text-cyan-400"
                                  : "text-slate-400 hover:text-slate-200"
                              }`
                            }
                          >
                            {fs.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              // Mobile Standard Links
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-bold tracking-wider uppercase transition-colors ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-cyan-400"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* User Info & Actions (Mobile) */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-cyan-400 flex items-center justify-center text-cyan-400">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-100 truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {isAdminOrOperator && (
                    <Link
                      to="/operator/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/signIn"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      )}
      <AdmissionMarquee />
    </nav>
  );
};

export default NavBar;