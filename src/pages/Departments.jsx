// ============================================================
// Departments Page – with search and filter
// ============================================================
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DepartmentCard from '../components/DepartmentCard';
import { SearchBar, FilterDropdown, PageHero, Pagination } from '../components/ui';
import { departments } from '../data/departments';

const ITEMS_PER_PAGE = 9;

export default function Departments() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...departments];

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(s) ||
          d.shortDescription.toLowerCase().includes(s) ||
          d.services.some(sv => sv.toLowerCase().includes(s))
      );
    }

    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'doctors') result.sort((a, b) => b.doctorCount - a.doctorCount);
    if (sortBy === 'beds') result.sort((a, b) => b.bedCount - a.bedCount);

    return result;
  }, [search, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleSort = (val) => { setSortBy(val); setCurrentPage(1); };

  return (
    <div>
      <PageHero
        title="Our Departments"
        subtitle="World-class specialists across 10 departments, providing comprehensive care for all your health needs."
        breadcrumbs={[{ label: 'Departments' }]}
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search departments or services..."
              className="flex-1"
            />
            <FilterDropdown
              value={sortBy}
              onChange={handleSort}
              placeholder="Sort By"
              options={[
                { value: 'name', label: 'Name A-Z' },
                { value: 'doctors', label: 'Most Doctors' },
                { value: 'beds', label: 'Most Beds' },
              ]}
              className="w-full sm:w-48"
            />
          </div>

          {/* Results count */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Showing <strong className="text-gray-800 dark:text-gray-200">{filtered.length}</strong> department{filtered.length !== 1 ? 's' : ''}
            {search && <span> for "<em>{search}</em>"</span>}
          </p>

          {/* Cards */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((dept, index) => (
                <DepartmentCard key={dept.id} department={dept} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🏥</p>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No departments found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </section>
    </div>
  );
}
