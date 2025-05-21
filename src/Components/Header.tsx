/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/theLogo.png";
import { useTheme } from "../Context/theme";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`${
        scrolled
          ? "py-2 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg"
          : "py-3 bg-white dark:bg-black"
      } text-gray-800 dark:text-white fixed w-full z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center"
          onClick={() => navigate("/")}
          role="button"
        >
          <img src={logo} alt="Logo" className="h-12 object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors mx-1 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-colors ${
              isDark
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark
                ? "bg-gray-800 text-yellow-400"
                : "bg-blue-50 text-blue-600"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              mobileMenuOpen
                ? "bg-gray-200 dark:bg-gray-800"
                : "text-gray-800 dark:text-gray-200"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <RiCloseLine
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            ) : (
              <RiMenu4Line
                size={24}
                className="text-gray-800 dark:text-gray-200"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed inset-x-0 top-[60px] z-50 transition-all duration-300 transform md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`
          w-full border-t ${isDark ? "border-gray-800" : "border-gray-200"}
          bg-white dark:bg-gray-900 shadow-xl pb-4 rounded-b-xl
        `}
        >
          <div className="container mx-auto px-6 pt-4 flex flex-col">
            {/* Nav Links */}
            <div className="flex flex-col space-y-1 mb-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all mb-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
