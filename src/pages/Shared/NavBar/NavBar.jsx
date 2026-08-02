import { Menu, X, ChevronDown, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/icc-logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();

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

  const departments = [
    { name: "Science", to: "/departments/science" },
    { name: "Commerce", to: "/departments/commerce" },
    { name: "Arts", to: "/departments/arts" },
  ];

  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Notice", to: "/notices" },
    { name: "Departments", isDropdown: true },
    { name: "Faculty", to: "/faculty" },
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
            if (item.isDropdown) {
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

                  {/* Desktop Dropdown Submenu */}
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

        {/* Auth Action Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            >
              <LogOut className="w-4 h-4 text-cyan-400" />
              <span>Log Out</span>
            </button>
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
              if (item.isDropdown) {
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

                    {/* Mobile Submenu Options */}
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

          {/* Auth Action Button (Mobile) */}
          <div className="pt-2 border-t border-slate-800/80">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4 text-cyan-400" />
                <span>Log Out</span>
              </button>
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
    </nav>
  );
};

export default NavBar;
