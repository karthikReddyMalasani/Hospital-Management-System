// ============================================================
// Appointment Page – Booking form with validation + LocalStorage + Modal
// ============================================================
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiCalendar, FiUser, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';
import { Modal, PageHero } from '../components/ui';
import { useApp } from '../context/AppContext';
import { departments } from '../data/departments';
import { doctors } from '../data/doctors';

const initialForm = {
  patientName: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  department: '',
  doctor: '',
  date: '',
  time: '',
  reason: '',
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM',
];

function validate(form) {
  const errors = {};
  if (!form.patientName.trim()) errors.patientName = 'Full name is required';
  if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120) errors.age = 'Valid age is required (1-120)';
  if (!form.gender) errors.gender = 'Gender is required';
  if (!form.phone.match(/^[6-9]\d{9}$/)) errors.phone = 'Enter valid 10-digit Indian mobile number';
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email is required';
  if (!form.department) errors.department = 'Please select a department';
  if (!form.doctor) errors.doctor = 'Please select a doctor';
  if (!form.date) errors.date = 'Appointment date is required';
  else {
    const selected = new Date(form.date);
    const today = new Date(); today.setHours(0,0,0,0);
    if (selected < today) errors.date = 'Date cannot be in the past';
  }
  if (!form.time) errors.time = 'Please select a time slot';
  if (!form.reason.trim()) errors.reason = 'Reason for visit is required';
  return errors;
}

export default function Appointment() {
  const location = useLocation();
  const { addAppointment, showToast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null);

  // Pre-fill if navigated from doctor card
  useEffect(() => {
    if (location.state?.doctor) {
      const doc = location.state.doctor;
      setForm(prev => ({
        ...prev,
        department: doc.department,
        doctor: doc.name,
      }));
    }
  }, [location.state]);

  const filteredDoctors = form.department
    ? doctors.filter(d => d.department === form.department && d.isAvailable)
    : doctors.filter(d => d.isAvailable);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    // Reset doctor when department changes
    if (name === 'department') setForm(prev => ({ ...prev, [name]: value, doctor: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate loading

    const apt = addAppointment(form);
    setAppointment(apt);
    setShowModal(true);
    setForm(initialForm);
    setErrors({});
    setLoading(false);
  };

  const minDate = new Date().toISOString().split('T')[0];

  const InputWrapper = ({ label, name, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor={name}>
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">{error}</p>}
    </div>
  );

  return (
    <div>
      <PageHero
        title="Book an Appointment"
        subtitle="Schedule your consultation with our expert doctors. We'll confirm your appointment within 30 minutes."
        breadcrumbs={[{ label: 'Appointment' }]}
        bgGradient="from-accent-600 to-primary-700"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appointment Details</h2>

                <form onSubmit={handleSubmit} className="space-y-5" id="appointment-form" noValidate>
                  {/* Row 1: Name + Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputWrapper label="Patient Full Name" name="patientName" error={errors.patientName}>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="patientName"
                          name="patientName"
                          type="text"
                          value={form.patientName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`input-field pl-10 ${errors.patientName ? 'border-red-400 focus:ring-red-400' : ''}`}
                        />
                      </div>
                    </InputWrapper>

                    <InputWrapper label="Age" name="age" error={errors.age}>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="e.g. 35"
                        min="1" max="120"
                        className={`input-field ${errors.age ? 'border-red-400 focus:ring-red-400' : ''}`}
                      />
                    </InputWrapper>
                  </div>

                  {/* Row 2: Gender + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputWrapper label="Gender" name="gender" error={errors.gender}>
                      <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className={`input-field ${errors.gender ? 'border-red-400 focus:ring-red-400' : ''}`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </InputWrapper>

                    <InputWrapper label="Phone Number" name="phone" error={errors.phone}>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          className={`input-field pl-10 ${errors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
                        />
                      </div>
                    </InputWrapper>
                  </div>

                  {/* Email */}
                  <InputWrapper label="Email Address" name="email" error={errors.email}>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`input-field pl-10 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                      />
                    </div>
                  </InputWrapper>

                  {/* Row: Department + Doctor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputWrapper label="Department" name="department" error={errors.department}>
                      <select
                        id="department"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className={`input-field ${errors.department ? 'border-red-400 focus:ring-red-400' : ''}`}
                      >
                        <option value="">Select Department</option>
                        {departments.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </InputWrapper>

                    <InputWrapper label="Doctor" name="doctor" error={errors.doctor}>
                      <select
                        id="doctor"
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        className={`input-field ${errors.doctor ? 'border-red-400 focus:ring-red-400' : ''}`}
                      >
                        <option value="">Select Doctor</option>
                        {filteredDoctors.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </InputWrapper>
                  </div>

                  {/* Row: Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputWrapper label="Appointment Date" name="date" error={errors.date}>
                      <div className="relative">
                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={form.date}
                          onChange={handleChange}
                          min={minDate}
                          className={`input-field pl-10 ${errors.date ? 'border-red-400 focus:ring-red-400' : ''}`}
                        />
                      </div>
                    </InputWrapper>

                    <InputWrapper label="Preferred Time" name="time" error={errors.time}>
                      <select
                        id="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className={`input-field ${errors.time ? 'border-red-400 focus:ring-red-400' : ''}`}
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </InputWrapper>
                  </div>

                  {/* Reason */}
                  <InputWrapper label="Reason for Visit" name="reason" error={errors.reason}>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                      <textarea
                        id="reason"
                        name="reason"
                        rows={4}
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        className={`input-field pl-10 resize-none ${errors.reason ? 'border-red-400 focus:ring-red-400' : ''}`}
                      />
                    </div>
                  </InputWrapper>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <FiCalendar className="w-5 h-5" />
                        Confirm Appointment
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white"
              >
                <h3 className="font-bold text-lg mb-4">📋 Appointment Info</h3>
                <ul className="space-y-3 text-sm text-white/90">
                  {[
                    'Confirmation within 30 minutes',
                    'Please arrive 15 min early',
                    'Bring previous medical records',
                    'Valid photo ID required',
                    'Cancellation: 24 hours notice',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-accent-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
              >
                <h3 className="font-bold text-red-700 dark:text-red-400 text-base mb-3">🚨 Emergency?</h3>
                <p className="text-red-600 dark:text-red-300 text-sm mb-4">For medical emergencies, don't book an appointment. Call immediately:</p>
                <a href="tel:+919876543210" className="flex items-center gap-2 bg-red-500 text-white font-bold px-4 py-3 rounded-xl hover:bg-red-600 transition-colors text-sm">
                  <FiPhone className="w-4 h-4" />
                  +91 ******3210
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card"
              >
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3">⏰ Working Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Monday – Friday</span>
                    <span className="font-medium">8AM – 8PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Saturday</span>
                    <span className="font-medium">8AM – 5PM</span>
                  </div>
                  <div className="flex justify-between text-red-600 font-semibold">
                    <span>Emergency</span>
                    <span>24/7</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <div className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <FiCheck className="w-10 h-10 text-accent-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appointment Booked!</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Your appointment has been successfully scheduled. Our team will contact you within 30 minutes for confirmation.
          </p>
          {appointment && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Appointment ID</span>
                <span className="font-bold text-primary-600">{appointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Doctor</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{appointment.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Department</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{appointment.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date & Time</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{appointment.date} at {appointment.time}</span>
              </div>
            </div>
          )}
          <button onClick={() => setShowModal(false)} className="btn-primary w-full justify-center">
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
