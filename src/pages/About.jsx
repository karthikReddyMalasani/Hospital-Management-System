// ============================================================
// About Page – Hospital intro, Mission, Vision, Values, Achievements, Facilities, Team
// ============================================================
import { motion } from 'framer-motion';
import { FiCheck, FiTarget, FiEye, FiHeart, FiAward } from 'react-icons/fi';
import { FaUserMd, FaHospital, FaTrophy, FaCertificate, FaStar } from 'react-icons/fa';
import { PageHero } from '../components/ui';
import { achievements, facilities } from '../data/hospital';
import { doctors } from '../data/doctors';

const coreValues = [
  { icon: FiHeart, title: 'Compassion', description: 'We treat every patient with empathy, kindness, and genuine care.' },
  { icon: FiCheck, title: 'Excellence', description: 'We pursue the highest standards in medical care, research, and service.' },
  { icon: FiTarget, title: 'Integrity', description: 'We act honestly, ethically, and transparently in all we do.' },
  { icon: FiEye, title: 'Innovation', description: 'We embrace the latest medical advancements to deliver better outcomes.' },
];

const IconMap = {
  trophy: FaTrophy,
  certificate: FaCertificate,
  star: FaStar,
  heart: FiHeart,
  bulb: FiTarget,
};

function FacilityIcon({ icon }) {
  const icons = {
    bed: '🛏️', monitor: '🖥️', syringe: '💉', flask: '🧪',
    pill: '💊', droplet: '🩸', coffee: '☕', car: '🚗',
  };
  return <span className="text-2xl">{icons[icon] || '🏥'}</span>;
}

export default function About() {
  const teamDoctors = doctors.filter(d => d.isFeatured).slice(0, 6);

  return (
    <div>
      <PageHero
        title="About MediCare"
        subtitle="Delivering excellence in healthcare for 30 years with a commitment to compassion and innovation."
        breadcrumbs={[{ label: 'About' }]}
        bgGradient="from-primary-800 to-secondary-700"
      />

      {/* Hospital Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Story</span>
              <h2 className="section-title mt-2 mb-5">
                Three Decades of <span className="gradient-text">Healthcare Excellence</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-4">
                Founded in 1994, MediCare Advanced Hospital has grown from a modest clinic to one of India's premier multi-specialty hospitals. With over 500 beds, 45 departments, and 250+ specialist doctors, we serve thousands of patients each year.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                NABH and JCI accredited, we combine cutting-edge medical technology with genuine human compassion to deliver exceptional patient outcomes. Our commitment to affordable, accessible healthcare for all remains our guiding principle.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '1994' },
                  { label: 'Beds', value: '500+' },
                  { label: 'Departments', value: '45+' },
                  { label: 'Doctors', value: '250+' },
                ].map(item => (
                  <div key={item.label} className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{item.value}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=80"
                alt="MediCare Hospital"
                className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                To provide accessible, affordable, and high-quality healthcare to all patients, regardless of their socioeconomic background. We strive to combine cutting-edge medical technology with compassionate, patient-centered care to achieve the best possible health outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <FiEye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                To be recognized as India's leading multi-specialty hospital, setting new benchmarks in clinical excellence, patient safety, and healthcare innovation. We envision a future where every individual has access to world-class medical care within their community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Principles</span>
            <h2 className="section-title mt-2">Core <span className="gradient-text">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center group"
              >
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Recognition</span>
            <h2 className="section-title mt-2">Awards & <span className="gradient-text">Achievements</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach, index) => {
              const Icon = IconMap[ach.icon] || FaTrophy;
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="card p-6 flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">{ach.year}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mt-2 mb-1">{ach.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ach.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Infrastructure</span>
            <h2 className="section-title mt-2">World-Class <span className="gradient-text">Facilities</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="card p-5 text-center group hover:border-primary-200 dark:hover:border-primary-700 border border-transparent"
              >
                <div className="text-3xl mb-3">
                  <FacilityIcon icon={facility.icon} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{facility.name}</h3>
                <p className="text-gray-400 text-xs">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Leadership</span>
            <h2 className="section-title mt-2">Meet Our <span className="gradient-text">Expert Team</span></h2>
            <p className="section-subtitle mx-auto">Our department heads bring decades of specialized experience and international training.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=fff&size=400`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{doctor.department} Head</p>
                  <p className="text-gray-400 text-xs mt-1">{doctor.qualification}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
