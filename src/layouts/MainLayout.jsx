// ============================================================
// Main Layout – wraps all public pages with Navbar + Footer
// ============================================================
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, ScrollToTop, WhatsAppButton, EmergencyButton } from '../components/ui';

export default function MainLayout() {
  const { darkMode, initDarkMode, toasts, removeToast } = useApp();

  useEffect(() => {
    initDarkMode();
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <EmergencyButton />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
}
