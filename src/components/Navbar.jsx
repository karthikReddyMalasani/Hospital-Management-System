// ============================================================
// Navbar Component – Sticky navigation with dark mode toggle
// ============================================================
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiPhone, FiSun, FiMoon, FiChevronDown
} from 'react-icons/fi';
import { FaHospital } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/departments', label: 'Departments' },
  { path: '/doctors', label: 'Doctors' },
  { path: '/appointment', label: 'Appointment' },
  { path: '/enquiry', label: 'Enquiry' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-700 text-white text-xs py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <span className="flex items-center gap-1">
            <FiPhone className="w-3 h-3" />
            Emergency: +91 98765 43210
          </span>
          <span>Mon-Sat: 8AM - 8PM | Emergency 24/7</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <FaHospital className="text-white text-base" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                  MediCare
                </div>
                <div className="text-primary-600 text-xs font-medium leading-tight">
                  Advanced Hospital
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Emergency CTA */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <FiPhone className="w-4 h-4" />
                Emergency
              </a>

              {/* Book Appointment */}
              <Link
                to="/appointment"
                className="hidden md:flex btn-primary text-sm py-2 px-4"
              >
                Book Appointment
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <div className="container-custom py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="flex gap-2 mt-2">
                  <a
                    href="tel:+919876543210"
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white text-sm font-semibold px-4 py-3 rounded-xl"
                  >
                    <FiPhone className="w-4 h-4" />
                    Emergency
                  </a>
                  <Link
                    to="/appointment"
                    className="flex-1 btn-primary text-sm py-3 justify-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
