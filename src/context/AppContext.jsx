// Global App Context for dark mode, appointments, and enquiries
import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Dark mode
  const [darkMode, setDarkMode] = useLocalStorage('hms-dark-mode', false);

  // Appointments stored in LocalStorage
  const [appointments, setAppointments] = useLocalStorage('hms-appointments', []);

  // Enquiries stored in LocalStorage
  const [enquiries, setEnquiries] = useLocalStorage('hms-enquiries', []);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
    // Apply dark class to root element
    document.documentElement.classList.toggle('dark');
  }, [setDarkMode]);

  // Initialize dark mode on load
  const initDarkMode = useCallback(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  // Add appointment
  const addAppointment = useCallback((appointment) => {
    const newAppointment = {
      ...appointment,
      id: `APT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  }, [setAppointments]);

  // Delete appointment
  const deleteAppointment = useCallback((id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, [setAppointments]);

  // Add enquiry
  const addEnquiry = useCallback((enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: `ENQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  }, [setEnquiries]);

  // Delete enquiry
  const deleteEnquiry = useCallback((id) => {
    setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
  }, [setEnquiries]);

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        initDarkMode,
        appointments,
        addAppointment,
        deleteAppointment,
        enquiries,
        addEnquiry,
        deleteEnquiry,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
