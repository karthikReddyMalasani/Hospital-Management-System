// ============================================================
// Navbar Component – Sticky navigation with dark mode + language toggle
// ============================================================
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiPhone, FiSun, FiMoon, FiGlobe
} from 'react-icons/fi';
import { FaHospital } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';

const allLangs = [
  { code: 'en', label: 'English',   native: 'English' },
  { code: 'hi', label: 'Hindi',     native: 'हिंदी' },
  { code: 'te', label: 'Telugu',    native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil',     native: 'தமிழ்' },
  { code: 'bn', label: 'Bengali',   native: 'বাংলা' },
  { code: 'mr', label: 'Marathi',   native: 'मराठी' },
  { code: 'gu', label: 'Gujarati',  native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada',   native: 'ಕನ್ನಡ' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { darkMode, toggleDarkMode, language, setLanguage } = useApp();
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { path: '/',            key: 'nav_home' },
    { path: '/departments', key: 'nav_departments' },
    { path: '/doctors',     key: 'nav_doctors' },
    { path: '/appointment', key: 'nav_appointment' },
    { path: '/enquiry',     key: 'nav_enquiry' },
    { path: '/about',       key: 'nav_about' },
    { path: '/contact',     key: 'nav_contact' },
    { path: '/dashboard',   key: 'nav_dashboard' },
  ];

  const currentLang = allLangs.find(l => l.code === language) || allLangs[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLangOpen(false);
  }, [location]);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e) => {
      if (!e.target.closest('#lang-dropdown')) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-700 text-white text-xs py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <span className="flex items-center gap-1">
            <FiPhone className="w-3 h-3" />
            {t('nav_emergency')}: +91 ******3210
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
                  {t(link.key)}
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

              {/* Language Switcher */}
              <div id="lang-dropdown" className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-3 h-9 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-sm font-semibold"
                  aria-label="Change language"
                >
                  <FiGlobe className="w-4 h-4" />
                  <span className="uppercase">{language}</span>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      {allLangs.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                          className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${
                            language === lang.code
                              ? 'text-primary-600 font-bold bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className="text-gray-400 dark:text-gray-500 text-xs">{lang.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Emergency CTA */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <FiPhone className="w-4 h-4" />
                {t('nav_emergency')}
              </a>

              {/* Book Appointment */}
              <Link
                to="/appointment"
                className="hidden md:flex btn-primary text-sm py-2 px-4"
              >
                {t('nav_book')}
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
                    {t(link.key)}
                  </NavLink>
                ))}

                {/* Mobile Language Switcher */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                  <p className="px-4 text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider flex items-center gap-1">
                    <FiGlobe className="w-3 h-3" /> Language
                  </p>
                  <div className="grid grid-cols-4 gap-2 px-2">
                    {allLangs.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`py-2 rounded-xl text-xs font-bold transition-colors ${
                          language === lang.code
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <a
                    href="tel:+919876543210"
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white text-sm font-semibold px-4 py-3 rounded-xl"
                  >
                    <FiPhone className="w-4 h-4" />
                    {t('nav_emergency')}
                  </a>
                  <Link
                    to="/appointment"
                    className="flex-1 btn-primary text-sm py-3 justify-center"
                  >
                    {t('book_now')}
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
