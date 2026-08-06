// ============================================================
// Enquiry Page – with validation and LocalStorage
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiBookOpen, FiCheck } from 'react-icons/fi';
import { Modal, PageHero } from '../components/ui';
import { useApp } from '../context/AppContext';

const subjects = [
  'General Enquiry',
  'Appointment Related',
  'Treatment Information',
  'Insurance & Billing',
  'Feedback & Complaints',
  'Emergency Services',
  'Other',
];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required';
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email is required';
  if (!form.phone.match(/^[6-9]\d{9}$/)) errors.phone = 'Enter valid 10-digit Indian mobile number';
  if (!form.subject) errors.subject = 'Please select a subject';
  if (!form.message.trim() || form.message.length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

export default function Enquiry() {
  const { addEnquiry } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const enq = addEnquiry(form);
    setEnquiryId(enq.id);
    setShowModal(true);
    setForm(initialForm);
    setErrors({});
    setLoading(false);
  };

  const Field = ({ label, name, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor={name}>
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div>
      <PageHero
        title="Send an Enquiry"
        subtitle="Have a question or need assistance? Our team is here to help you. We respond within 24 hours."
        breadcrumbs={[{ label: 'Enquiry' }]}
        bgGradient="from-purple-700 to-primary-700"
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5" id="enquiry-form" noValidate>
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" name="name" error={errors.name}>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`input-field pl-10 ${errors.name ? 'border-red-400' : ''}`}
                        />
                      </div>
                    </Field>

                    <Field label="Phone Number" name="phone" error={errors.phone}>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          className={`input-field pl-10 ${errors.phone ? 'border-red-400' : ''}`}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email Address" name="email" error={errors.email}>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`}
                      />
                    </div>
                  </Field>

                  {/* Subject */}
                  <Field label="Subject" name="subject" error={errors.subject}>
                    <div className="relative">
                      <FiBookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.subject ? 'border-red-400' : ''}`}
                      >
                        <option value="">Select Subject</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </Field>

                  {/* Message */}
                  <Field label="Message" name="message" error={errors.message}>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your enquiry here... (min. 20 characters)"
                        className={`input-field pl-10 resize-none ${errors.message ? 'border-red-400' : ''}`}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} chars</p>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    {loading ? (
                      <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><FiMessageSquare className="w-5 h-5" /> Send Enquiry</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-5">
              {[
                {
                  icon: '📞',
                  title: 'Call Us',
                  content: '+91 11 2345 6789',
                  sub: 'Mon-Sat: 8AM - 8PM',
                },
                {
                  icon: '✉️',
                  title: 'Email Us',
                  content: 'info@medicare-hospital.com',
                  sub: 'Reply within 24 hours',
                },
                {
                  icon: '📍',
                  title: 'Visit Us',
                  content: '123 Healthcare Avenue',
                  sub: 'Medical District, New Delhi',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{item.content}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl p-5"
              >
                <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm mb-2">💡 Response Time</h3>
                <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2"><FiCheck className="text-accent-500 w-3.5 h-3.5" />General: within 24 hours</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-accent-500 w-3.5 h-3.5" />Urgent: within 4 hours</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-accent-500 w-3.5 h-3.5" />Emergency: immediate (call)</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="sm">
        <div className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <FiCheck className="w-10 h-10 text-accent-600" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enquiry Submitted!</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Thank you for reaching out! Our team will contact you within 24 hours.
          </p>
          <p className="text-xs text-gray-400 mb-6">Reference ID: <strong className="text-primary-600">{enquiryId}</strong></p>
          <button onClick={() => setShowModal(false)} className="btn-primary w-full justify-center">
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
