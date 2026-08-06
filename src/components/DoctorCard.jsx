// ============================================================
// DoctorCard Component
// ============================================================
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiCalendar } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card overflow-hidden group"
    >
      {/* Doctor Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=fff&size=400`;
          }}
        />
        {/* Overlay badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className={`badge text-xs font-semibold ${
            doctor.isAvailable
              ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {doctor.isAvailable ? '● Available' : '● Unavailable'}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <FiStar className="fill-current" />
            <span className="font-semibold text-white">{doctor.rating}</span>
            <span className="text-white/70 text-xs">({doctor.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-1">
              {doctor.name}
              <MdVerified className="text-primary-500 w-4 h-4" />
            </h3>
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{doctor.department}</p>
          </div>
          <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs whitespace-nowrap">
            {doctor.experience} yrs exp
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 font-medium">{doctor.qualification}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
            <FiCalendar className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
            <span>{doctor.availability}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
            <FiClock className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
            <span>{doctor.timing}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-sm">
            <span className="text-gray-400 text-xs">Consultation Fee</span>
            <p className="font-bold text-gray-900 dark:text-white">₹{doctor.fee}</p>
          </div>
          <Link
            to="/appointment"
            state={{ doctor }}
            className={`btn-primary text-xs py-2 px-4 ${!doctor.isAvailable ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
