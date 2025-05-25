/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/newlog.png";
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
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-black"
      } text-gray-800 dark:text-white fixed z-50 transition-all duration-300`}
      style={{
        width: "100%",
        height: "10vh",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="flex items-center justify-between px-6 lg:px-8"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo */}
        <div
          className="flex justify-center items-center cursor-pointer"
          style={{
            width: "30%",
            height: "100%",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="object-cover"
            style={{
              width: "70%",
              height: "70%",
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
              style={{
                padding: "8px 16px",
                margin: "0 4px",
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center" style={{ gap: "12px" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`rounded-full transition-colors ${
              isDark
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
            style={{
              padding: "10px",
              width: "44px",
              height: "44px",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
            style={{
              padding: "10px 20px",
              height: "44px",
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center" style={{ gap: "8px" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`rounded-full ${
              isDark
                ? "bg-gray-800 text-yellow-400"
                : "bg-blue-50 text-blue-600"
            }`}
            style={{
              padding: "8px",
              width: "40px",
              height: "40px",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-lg transition-colors ${
              mobileMenuOpen
                ? "bg-gray-200 dark:bg-gray-800"
                : "text-gray-800 dark:text-gray-200"
            }`}
            style={{
              padding: "8px",
              width: "40px",
              height: "40px",
            }}
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
        className={`fixed z-50 transition-all duration-300 transform md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          left: 0,
          right: 0,
          top: "60px",
        }}
      >
        <div
          className={`border-t ${isDark ? "border-gray-800" : "border-gray-200"}
          bg-white dark:bg-gray-900 shadow-xl rounded-b-xl`}
          style={{
            width: "100%",
            paddingBottom: "16px",
          }}
        >
          <div
            className="flex flex-col"
            style={{
              padding: "16px 24px 0",
            }}
          >
            {/* Nav Links */}
            <div
              className="flex flex-col"
              style={{
                gap: "4px",
                marginBottom: "16px",
              }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                  style={{
                    padding: "12px 16px",
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              style={{
                width: "100%",
                padding: "12px 20px",
                marginBottom: "8px",
              }}
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
