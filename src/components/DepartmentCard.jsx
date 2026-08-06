// ============================================================
// DepartmentCard Component
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiHome, FiPhone, FiClock, FiUserCheck, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import { Modal } from './ui';

export default function DepartmentCard({ department, index = 0 }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    setShowModal(false);
    navigate('/appointment', { state: { department: department.name } });
  };

  const handleViewDoctors = () => {
    setShowModal(false);
    navigate('/doctors', { state: { department: department.name } });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="card overflow-hidden group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Department Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Icon badge */}
          <div
            className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg"
            style={{ backgroundColor: department.color }}
          >
            <span className="text-xs">{department.name.charAt(0)}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-lg">{department.name}</h3>
          </div>
        </div>

        {/* Department Info */}
        <div className="p-5">
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
            {department.shortDescription}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
              <FiUsers className="w-3.5 h-3.5 text-primary-500" />
              <span>{department.doctorCount} Doctors</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
              <FiHome className="w-3.5 h-3.5 text-primary-500" />
              <span>{department.bedCount} Beds</span>
            </div>
          </div>

          {/* Services preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {department.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-2 py-0.5 text-xs rounded-full font-medium"
                style={{
                  backgroundColor: department.bgColor,
                  color: department.color,
                }}
              >
                {service}
              </span>
            ))}
            {department.services.length > 3 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium">
                +{department.services.length - 3} more
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:gap-2.5 transition-all duration-200 group"
          >
            Learn More
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </motion.div>

      {/* Detailed Department Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <div>
          {/* Header image & title banner */}
          <div className="relative h-44 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
            <img
              src={department.image}
              alt={department.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
              <div>
                <span
                  className="px-3 py-1 text-xs rounded-full font-bold text-white mb-2 inline-block shadow"
                  style={{ backgroundColor: department.color }}
                >
                  Department of {department.name}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  {department.name} Department
                </h2>
              </div>
            </div>
          </div>

          {/* Department Description */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {department.description}
            </p>
          </div>

          {/* Quick Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <FiUserCheck className="text-primary-500" /> Head of Dept
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-xs truncate">{department.head || 'Senior Specialist'}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <FiClock className="text-primary-500" /> OPD Timings
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">{department.timing || '8:00 AM - 6:00 PM'}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <FiUsers className="text-primary-500" /> Doctors
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">{department.doctorCount} Specialists</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <FiHome className="text-primary-500" /> Beds Capacity
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-xs">{department.bedCount} Dedicated Beds</p>
            </div>
          </div>

          {/* Specialized Services Offered */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Specialized Treatments & Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {department.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/30 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700/50"
                >
                  <FiCheckCircle className="text-accent-500 flex-shrink-0 w-3.5 h-3.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FiPhone className="text-red-500" />
              <span>Direct Line: <strong className="text-gray-800 dark:text-gray-200">{department.phone || '+91 11 2345 6789'}</strong></span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleViewDoctors}
                className="flex-1 sm:flex-initial btn-secondary text-xs py-2.5 px-4"
              >
                View Doctors
              </button>
              <button
                onClick={handleBookAppointment}
                className="flex-1 sm:flex-initial btn-primary text-xs py-2.5 px-4"
              >
                <FiCalendar className="w-3.5 h-3.5" /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
