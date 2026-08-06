// ============================================================
// Contact Page – Address, Phone, Email, Map Placeholder, Form, FAQ
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiUser, FiMessageSquare, FiCheck } from 'react-icons/fi';
import { FAQAccordion, PageHero } from '../components/ui';
import { faqs } from '../data/faqs';
import { useApp } from '../context/AppContext';

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Our Address',
    lines: ['123 Healthcare Avenue', 'Medical District', 'New Delhi - 110001'],
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: FiPhone,
    title: 'Call Us',
    lines: ['+91 11 2345 6789 (General)', '+91 ******3210 (Emergency)'],
    color: 'text-primary-600',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
  },
  {
    icon: FiMail,
    title: 'Email Us',
    lines: ['info@medicare-hospital.com', 'appointments@medicare-hospital.com'],
    color: 'text-accent-600',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    lines: ['Mon-Fri: 8:00 AM – 8:00 PM', 'Saturday: 8:00 AM – 5:00 PM', 'Emergency: 24/7'],
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const { addEnquiry, showToast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = 'Name required';
    if (!f.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!f.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit phone required';
    if (!f.message.trim() || f.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

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
    addEnquiry({ ...form, subject: 'Contact Form' });
    showToast('Message sent! We will contact you shortly.', 'success');
    setSubmitted(true);
    setForm(initialForm);
    setLoading(false);
  };

  const Field = ({ label, name, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor={`contact-${name}`}>
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team. We're here to help with any questions about our services."
        breadcrumbs={[{ label: 'Contact' }]}
        bgGradient="from-secondary-700 to-accent-700"
      />

      {/* Contact Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center group"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className={`text-xs ${i === item.lines.length - 1 && item.title === 'Working Hours' ? 'text-red-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-card bg-gray-100 dark:bg-gray-800 min-h-[400px] flex items-center justify-center relative"
            >
              {/* Google Maps Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center gap-4">
                <div className="text-6xl">📍</div>
                <div className="text-center px-8">
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">MediCare Advanced Hospital</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">123 Healthcare Avenue, Medical District</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">New Delhi - 110001</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 btn-primary text-sm py-2.5 px-6 inline-flex"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-8"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary text-sm py-2.5 px-6">
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} id="contact-form" className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name" name="name" error={errors.name}>
                        <div className="relative">
                          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                            placeholder="John Doe" className={`input-field pl-10 ${errors.name ? 'border-red-400' : ''}`} />
                        </div>
                      </Field>
                      <Field label="Phone" name="phone" error={errors.phone}>
                        <div className="relative">
                          <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                            placeholder="9876543210" className={`input-field pl-10 ${errors.phone ? 'border-red-400' : ''}`} />
                        </div>
                      </Field>
                    </div>

                    <Field label="Email" name="email" error={errors.email}>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder="john@example.com" className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`} />
                      </div>
                    </Field>

                    <Field label="Message" name="message" error={errors.message}>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                        <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={handleChange}
                          placeholder="How can we help you?" className={`input-field pl-10 resize-none ${errors.message ? 'border-red-400' : ''}`} />
                      </div>
                    </Field>

                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                      {loading ? (
                        <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                      ) : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Common Questions</span>
            <h2 className="section-title mt-2">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p className="section-subtitle mx-auto">Find answers to our most commonly asked questions below.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
