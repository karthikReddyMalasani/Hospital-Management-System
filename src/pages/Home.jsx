// ============================================================
// Home Page – Hero, Stats, Services, Why Us, Doctors,
//             Testimonials, Emergency Banner, Newsletter, Gallery
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiPhone, FiPlay, FiCheck, FiStar,
  FiMail, FiHeart, FiBriefcase, FiShield
} from 'react-icons/fi';
import {
  FaAmbulance, FaBrain, FaBone, FaBaby, FaLungs,
  FaTooth, FaEye, FaHeartbeat, FaUserMd, FaHospital,
  FaAward, FaCheckCircle
} from 'react-icons/fa';
import { MdLocalHospital, MdStar } from 'react-icons/md';
import DoctorCard from '../components/DoctorCard';
import DepartmentCard from '../components/DepartmentCard';
import { hospitalStats, services, whyChooseUs } from '../data/hospital';
import { doctors } from '../data/doctors';
import { departments } from '../data/departments';
import { testimonials } from '../data/testimonials';
import { useCounter } from '../hooks/useCounter';

// Animated stat counter component
function StatCounter({ stat, index }) {
  const { count, ref } = useCounter(stat.value, 2200);

  const colorMap = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
    purple: 'from-purple-500 to-purple-600',
  };

  const iconMap = {
    doctors: <FaUserMd className="w-7 h-7" />,
    departments: <FaHospital className="w-7 h-7" />,
    patients: <FiHeart className="w-7 h-7" />,
    experience: <FaAward className="w-7 h-7" />,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group text-center"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[stat.color] || colorMap.primary} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {iconMap[stat.icon]}
      </div>
      <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-semibold text-gray-700 dark:text-gray-200 text-base mb-1">{stat.label}</div>
      <div className="text-gray-400 text-sm">{stat.description}</div>
    </motion.div>
  );
}

// Service icon map
function ServiceIcon({ icon }) {
  const iconMap = {
    heart: <FiHeart className="w-7 h-7" />,
    brain: <FaBrain className="w-7 h-7" />,
    bone: <FaBone className="w-7 h-7" />,
    baby: <FaBaby className="w-7 h-7" />,
    lungs: <FaLungs className="w-7 h-7" />,
    tooth: <FaTooth className="w-7 h-7" />,
    eye: <FaEye className="w-7 h-7" />,
    'heart-pulse': <FaHeartbeat className="w-7 h-7" />,
  };
  return iconMap[icon] || <MdLocalHospital className="w-7 h-7" />;
}

const serviceColors = {
  red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-500', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-500', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-500', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-500', badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-500', badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-500', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
};

const galleryImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80',
  'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80',
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const featuredDoctors = doctors.filter(d => d.isFeatured).slice(0, 4);
  const featuredDepts = departments.slice(0, 6);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="font-poppins">
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden hero-gradient min-h-[90vh] flex items-center">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                  NABH Accredited Hospital
                </span>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                  Your Health is{' '}
                  <span className="gradient-text">Our Priority</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                  Experience world-class healthcare with 250+ specialist doctors, advanced technology, and compassionate care. Trusted by 50,000+ patients since 1994.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link to="/appointment" className="btn-primary text-base py-4 px-8">
                    Book Appointment
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                  <a href="tel:+919876543210" className="btn-secondary text-base py-4 px-8">
                    <FiPhone className="w-5 h-5" />
                    Emergency Call
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: '50,000+ Patients', icon: <FaCheckCircle className="text-accent-500" /> },
                    { label: '30+ Years Experience', icon: <FaCheckCircle className="text-accent-500" /> },
                    { label: '24/7 Emergency', icon: <FaCheckCircle className="text-accent-500" /> },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Hospital Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80"
                  alt="MediCare Hospital"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -left-8 bottom-16 glassmorphism rounded-2xl px-5 py-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                      <FiCheck className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">NABH Accredited</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">International Standards</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -right-8 top-16 glassmorphism rounded-2xl px-5 py-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <MdStar className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">4.9/5 Rating</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Patient Satisfaction</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-8 bottom-8 glassmorphism rounded-2xl px-5 py-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <FaAmbulance className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">24/7 Emergency</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Always Available</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== STATS SECTION ====== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Our <span className="gradient-text">Achievements</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle mx-auto"
            >
              Three decades of excellence in healthcare, delivering outstanding results for our patients.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hospitalStats.map((stat, index) => (
              <StatCounter key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== SERVICES SECTION ====== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary-600 font-semibold text-sm uppercase tracking-wide"
            >
              What We Offer
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mt-2"
            >
              Our Medical <span className="gradient-text">Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle mx-auto"
            >
              Comprehensive healthcare services across all specialties, delivered with expertise and compassion.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const colors = serviceColors[service.color] || serviceColors.blue;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.5 }}
                  className="card p-6 group"
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <span className={colors.text}>
                      <ServiceIcon icon={service.icon} />
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{service.description}</p>
                  <div className="space-y-1.5">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                        <FiCheck className="w-3.5 h-3.5 text-accent-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US SECTION ====== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-700 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="text-white/70 font-semibold text-sm uppercase tracking-wide">Why MediCare</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              Why Choose <span className="text-yellow-400">Us?</span>
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">
              We combine medical excellence with compassionate care to provide you the best healthcare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 group hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DEPARTMENTS SECTION ====== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Specialties</span>
              <h2 className="section-title mt-2">Our <span className="gradient-text">Departments</span></h2>
            </div>
            <Link to="/departments" className="btn-secondary text-sm py-2.5 px-5 whitespace-nowrap">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDepts.map((dept, index) => (
              <DepartmentCard key={dept.id} department={dept} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED DOCTORS ====== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Expert Team</span>
              <h2 className="section-title mt-2">Featured <span className="gradient-text">Doctors</span></h2>
            </div>
            <Link to="/doctors" className="btn-secondary text-sm py-2.5 px-5 whitespace-nowrap">
              View All Doctors <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Patient Stories</span>
            <h2 className="section-title mt-2">What Our Patients <span className="gradient-text">Say</span></h2>
            <p className="section-subtitle mx-auto">Real experiences from our valued patients who trusted us with their health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
                  "{testimonial.review.substring(0, 150)}..."
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary-100"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2563eb&color=fff`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.department} • {testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Facility</span>
            <h2 className="section-title mt-2">Hospital <span className="gradient-text">Gallery</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group relative overflow-hidden rounded-2xl shadow-card aspect-video"
              >
                <img
                  src={img}
                  alt={`Hospital Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EMERGENCY BANNER ====== */}
      <section className="bg-red-600 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaAmbulance className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Emergency? We're Here 24/7!</h2>
                <p className="text-red-100 text-sm mt-1">Our emergency team is always ready. Don't hesitate to call.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors">
                <FiPhone className="w-5 h-5" />
                +91 ******3210
              </a>
              <Link to="/appointment" className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Stay Informed</span>
              <h2 className="section-title mt-2 mb-3">
                Subscribe to Our <span className="gradient-text">Newsletter</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                Get health tips, news, and updates from MediCare Hospital delivered to your inbox.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-3 text-accent-600 font-semibold text-lg"
                >
                  <FiCheck className="w-6 h-6 bg-accent-100 rounded-full p-1" />
                  Thank you for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
