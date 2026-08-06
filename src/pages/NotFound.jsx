// ============================================================
// 404 Not Found Page
// ============================================================
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
          <div className="text-6xl mb-6">🏥</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
            The page you're looking for doesn't exist or has been moved. Let us guide you back to health!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <FiHome className="w-5 h-5" />
              Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <FiArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
