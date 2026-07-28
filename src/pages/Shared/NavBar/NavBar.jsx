import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);

  const departments = [
    { name: 'Science', to: '/departments/science' },
    { name: 'Commerce', to: '/departments/commerce' },
    { name: 'Arts', to: '/departments/arts' },
  ];

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Departments', isDropdown: true },
    { name: 'Admission', to: '/admission' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Notice', to: '/notice' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav className="w-full bg-[#f8f9fa] border-b border-gray-200">
      <div className="w-5/6 mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* College Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/src/assets/icc-logo.png" 
              alt="College Logo" 
              className="h-12 w-auto object-contain" 
            />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
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
                    className="relative py-2 text-sm font-medium transition-colors flex items-center gap-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDeptOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown Submenu */}
                  {isDeptOpen && (
                    <div className="absolute top-full left-0 w-44 bg-white border border-gray-100 shadow-lg rounded-md py-2 z-50">
                      {departments.map((dept) => (
                        <NavLink
                          key={dept.name}
                          to={dept.to}
                          onClick={() => setIsDeptOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm ${
                              isActive 
                                ? 'text-blue-600 font-semibold bg-blue-50' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
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
                    `relative py-2 text-sm font-medium transition-colors block ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Login Button */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/login"
            className="bg-[#192231] hover:bg-[#111722] text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f8f9fa] border-t border-gray-200 px-6 pt-2 pb-6 space-y-3">
          <ul className="space-y-3">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <li key={item.name} className="space-y-1">
                    <button
                      onClick={() => setIsDeptOpen(!isDeptOpen)}
                      className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-600 focus:outline-none"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDeptOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Submenu Options */}
                    {isDeptOpen && (
                      <div className="pl-4 space-y-2 border-l-2 border-gray-200 my-1">
                        {departments.map((dept) => (
                          <NavLink
                            key={dept.name}
                            to={dept.to}
                            onClick={() => {
                              setIsOpen(false);
                              setIsDeptOpen(false);
                            }}
                            className={({ isActive }) =>
                              `block py-1 text-sm ${
                                isActive 
                                  ? 'text-blue-600 font-semibold' 
                                  : 'text-gray-600 hover:text-gray-900'
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
                      `block py-2 text-base font-medium ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-600'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-4 bg-[#192231] text-white text-sm font-medium py-2.5 rounded-md"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;