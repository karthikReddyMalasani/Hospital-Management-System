// ============================================================
// Dashboard Page – Admin-style dashboard without auth
// Stats, Appointments Table, Enquiries Table with delete
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiCalendar, FiMessageSquare, FiUsers, FiGrid } from 'react-icons/fi';
import { Modal, PageHero } from '../components/ui';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { doctors } from '../data/doctors';
import { departments } from '../data/departments';

function StatCard({ title, value, icon: Icon, color, delay = 0 }) {
  const colorClasses = {
    blue: 'from-primary-500 to-primary-600 shadow-primary-200 dark:shadow-primary-900',
    teal: 'from-secondary-500 to-secondary-600 shadow-secondary-200 dark:shadow-secondary-900',
    green: 'from-accent-500 to-accent-600 shadow-accent-200 dark:shadow-accent-900',
    purple: 'from-purple-500 to-purple-600 shadow-purple-200 dark:shadow-purple-900',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    Confirmed: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Read: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };
  return (
    <span className={`badge text-xs ${styles[status] || styles.New}`}>
      {status}
    </span>
  );
}

function maskPhone(phone) {
  if (!phone) return null;
  const str = String(phone);
  if (str.length <= 4) return str;
  return '*'.repeat(str.length - 4) + str.slice(-4);
}

export default function Dashboard() {
  const { appointments, deleteAppointment, enquiries, deleteEnquiry, showToast } = useApp();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appointments');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  const stats = [
    { title: t('dash_total_appointments'), value: appointments.length, icon: FiCalendar, color: 'blue' },
    { title: t('dash_total_enquiries'),    value: enquiries.length,    icon: FiMessageSquare, color: 'teal' },
    { title: t('dash_total_doctors'),      value: doctors.length,      icon: FiUsers, color: 'green' },
    { title: t('dash_total_departments'),  value: departments.length,  icon: FiGrid, color: 'purple' },
  ];

  const confirmDelete = (id, type) => {
    setDeleteTarget(id);
    setDeleteType(type);
  };

  const handleDelete = () => {
    if (deleteType === 'appointment') {
      deleteAppointment(deleteTarget);
      showToast('Appointment deleted successfully', 'success');
    } else {
      deleteEnquiry(deleteTarget);
      showToast('Enquiry deleted successfully', 'success');
    }
    setDeleteTarget(null);
    setDeleteType('');
  };

  const formatDate = (iso) => {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <PageHero
        title={t('dash_title')}
        subtitle={t('dash_subtitle')}
        breadcrumbs={[{ label: t('dash_title') }]}
        bgGradient="from-gray-800 to-gray-900"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { key: 'appointments', label: t('dash_tab_appointments'), count: appointments.length },
              { key: 'enquiries',    label: t('dash_tab_enquiries'),    count: enquiries.length },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-card'
                }`}
              >
                {tab.label}
                <span className={`badge text-xs ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Appointments Table */}
          {activeTab === 'appointments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden"
            >
              {appointments.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">📅</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{t('dash_no_appointments')}</p>
                  <p className="text-gray-400 text-sm">{t('dash_no_appointments_sub')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_id')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_patient')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden md:table-cell">{t('dash_col_doctor')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">{t('dash_col_department')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">{t('dash_col_date')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_status')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((apt) => (
                        <tr
                          key={apt.id}
                          className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-5 py-4 font-mono text-xs text-primary-600 dark:text-primary-400 font-medium">{apt.id}</td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-gray-900 dark:text-white">{apt.patientName}</div>
                            <div className="text-gray-400 text-xs">{maskPhone(apt.phone)}</div>
                          </td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">{apt.doctor}</td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{apt.department}</td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                            {apt.date} <span className="text-gray-400">{apt.time}</span>
                          </td>
                          <td className="px-5 py-4"><StatusBadge status={apt.status} /></td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => confirmDelete(apt.id, 'appointment')}
                              className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                              aria-label={`Delete appointment ${apt.id}`}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Enquiries Table */}
          {activeTab === 'enquiries' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden"
            >
              {enquiries.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">✉️</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{t('dash_no_enquiries')}</p>
                  <p className="text-gray-400 text-sm">{t('dash_no_enquiries_sub')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_id')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_patient')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden md:table-cell">{t('dash_col_source')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">{t('dash_col_subject')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">{t('dash_col_date')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_status')}</th>
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">{t('dash_col_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((enq) => (
                        <tr
                          key={enq.id}
                          className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-5 py-4 font-mono text-xs text-secondary-600 dark:text-secondary-400 font-medium">{enq.id}</td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-gray-900 dark:text-white">{enq.name || t('dash_anonymous')}</div>
                            <div className="text-gray-400 text-xs">{maskPhone(enq.phone) || enq.email || t('dash_no_contact')}</div>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <div className="flex gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${enq.channel === 'WhatsApp' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : enq.channel === 'Kiosk' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : enq.channel === 'IVR' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                                {enq.channel || 'Web'}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs font-medium uppercase">{enq.language || 'EN'}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{enq.subject}</td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{formatDate(enq.createdAt)}</td>
                          <td className="px-5 py-4"><StatusBadge status={enq.status} /></td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => confirmDelete(enq.id, 'enquiry')}
                              className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                              aria-label={`Delete enquiry ${enq.id}`}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTrash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('dash_delete_title')}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {t('dash_delete_msg')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors text-sm"
            >
              {t('dash_delete_btn')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
