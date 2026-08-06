// ============================================================
// Footer Component
// ============================================================
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHospital, FaFacebookF, FaTwitter, FaInstagram,
  FaLinkedinIn, FaYoutube
} from 'react-icons/fa';
import {
  FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight
} from 'react-icons/fi';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/departments', label: 'Departments' },
  { path: '/doctors', label: 'Our Doctors' },
  { path: '/appointment', label: 'Book Appointment' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
  { path: '/dashboard', label: 'Dashboard' },
];

const services = [
  'Emergency Care', 'Cardiology', 'Neurology',
  'Orthopedics', 'Pediatrics', 'Oncology',
  'Gynecology', 'Ophthalmology',
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Hospital Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
                <FaHospital className="text-white text-lg" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">MediCare</div>
                <div className="text-primary-400 text-xs font-medium">Advanced Hospital</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Providing world-class healthcare with compassion since 1994. NABH accredited hospital with 250+ expert doctors and 45+ specialized departments.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 bg-gray-800 ${color} rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 group"
                  >
                    <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Our Services
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="flex items-center gap-2 text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 cursor-pointer group">
                    <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Healthcare Avenue, Medical District, New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+911123456789" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  +91 11 2345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                  Emergency: +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@medicare-hospital.com" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  info@medicare-hospital.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>Mon-Fri: 8AM - 8PM</div>
                  <div>Sat: 8AM - 5PM</div>
                  <div className="text-red-400 font-medium">Emergency: 24/7</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center">
            © 2024 MediCare Advanced Hospital. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
