// ============================================================
// Doctors Page – with search, department filter, and gender filter
// ============================================================
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '../components/DoctorCard';
import { SearchBar, FilterDropdown, PageHero, Pagination } from '../components/ui';
import { doctors } from '../data/doctors';
import { departments } from '../data/departments';

const ITEMS_PER_PAGE = 8;

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [availability, setAvailability] = useState('');
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...doctors];

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(s) ||
          d.department.toLowerCase().includes(s) ||
          d.specialization.toLowerCase().includes(s)
      );
    }

    if (department) result = result.filter(d => d.department === department);
    if (availability === 'available') result = result.filter(d => d.isAvailable);
    if (availability === 'unavailable') result = result.filter(d => !d.isAvailable);
    if (gender) result = result.filter(d => d.gender === gender);

    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'experience') result.sort((a, b) => b.experience - a.experience);
    if (sortBy === 'fee-asc') result.sort((a, b) => a.fee - b.fee);
    if (sortBy === 'fee-desc') result.sort((a, b) => b.fee - a.fee);

    return result;
  }, [search, department, availability, gender, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const reset = () => { setSearch(''); setDepartment(''); setAvailability(''); setGender(''); setSortBy(''); setCurrentPage(1); };
  const handleChange = (setter) => (val) => { setter(val); setCurrentPage(1); };

  const deptOptions = departments.map(d => ({ value: d.name, label: d.name }));

  return (
    <div>
      <PageHero
        title="Our Doctors"
        subtitle="Meet our team of 20+ board-certified specialists dedicated to providing exceptional patient care."
        breadcrumbs={[{ label: 'Doctors' }]}
        bgGradient="from-secondary-700 to-primary-700"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <SearchBar
                value={search}
                onChange={handleChange(setSearch)}
                placeholder="Search doctor or specialty..."
                className="lg:col-span-2"
              />
              <FilterDropdown
                value={department}
                onChange={handleChange(setDepartment)}
                placeholder="All Departments"
                options={deptOptions}
              />
              <FilterDropdown
                value={availability}
                onChange={handleChange(setAvailability)}
                placeholder="Availability"
                options={[
                  { value: 'available', label: 'Available' },
                  { value: 'unavailable', label: 'Unavailable' },
                ]}
              />
              <FilterDropdown
                value={sortBy}
                onChange={handleChange(setSortBy)}
                placeholder="Sort By"
                options={[
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'experience', label: 'Most Experienced' },
                  { value: 'fee-asc', label: 'Fee: Low to High' },
                  { value: 'fee-desc', label: 'Fee: High to Low' },
                ]}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Found <strong className="text-gray-800 dark:text-gray-200">{filtered.length}</strong> doctors
              </p>
              {(search || department || availability || gender || sortBy) && (
                <button onClick={reset} className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Doctor Cards */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginated.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">👨‍⚕️</p>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No doctors found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              <button onClick={reset} className="mt-4 btn-primary text-sm py-2.5 px-6">Clear Filters</button>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </section>
    </div>
  );
}
