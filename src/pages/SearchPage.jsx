import { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { useCollection } from '../hooks/useFirestore';
import DonorCard from '../components/donor/DonorCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchPage() {
  const { data: donors, loading } = useCollection('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bloodGroup: '',
    department: '',
    availability: 'all' // 'all', 'available', 'unavailable'
  });
  const [showFilters, setShowFilters] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const departments = [
    "Computer Science", "Electrical Engineering", "Mechanical Engineering", 
    "Civil Engineering", "Business Administration", "Physics", "Chemistry", "Mathematics"
  ];

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      // Don't show admins in the donor list
      if (donor.role === 'admin') return false;

      // Text Search (Name, Area, ID)
      const matchesSearch = 
        donor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.studentId?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filters
      const matchesBloodGroup = filters.bloodGroup ? donor.bloodGroup === filters.bloodGroup : true;
      const matchesDepartment = filters.department ? donor.department === filters.department : true;
      
      let matchesAvailability = true;
      if (filters.availability === 'available') matchesAvailability = donor.available === true;
      if (filters.availability === 'unavailable') matchesAvailability = donor.available === false;

      return matchesSearch && matchesBloodGroup && matchesDepartment && matchesAvailability;
    });
  }, [donors, searchTerm, filters]);

  const handleContactClick = (donor) => {
    // In a real app, this might open a modal with full contact info
    // For now, let's just trigger a mailto or tel action if phone is available
    if (donor.phone) {
      window.location.href = `tel:${donor.phone}`;
    } else {
      alert(`Contact ${donor.fullName} at ${donor.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Find a Blood Donor</h1>
          <p className="text-slate-600 max-w-2xl">
            Search our university database to find available blood donors. You can filter by blood group, department, and location.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, area, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
              {(filters.bloodGroup || filters.department || filters.availability !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-primary ml-1"></span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                    <select
                      value={filters.bloodGroup}
                      onChange={(e) => setFilters(prev => ({ ...prev, bloodGroup: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="">All Blood Groups</option>
                      {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      value={filters.department}
                      onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Availability</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="all">All Donors</option>
                      <option value="available">Available Now</option>
                      <option value="unavailable">Currently Unavailable</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setFilters({ bloodGroup: '', department: '', availability: 'all' })}
                    className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <X size={14} /> Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-56 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-slate-200 rounded"></div>
                    <div className="h-3 w-24 bg-slate-200 rounded"></div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                  <div className="h-3 w-3/5 bg-slate-200 rounded"></div>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredDonors.map(donor => (
                <DonorCard 
                  key={donor.uid} 
                  donor={donor} 
                  onContactClick={handleContactClick} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No donors found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any donors matching your criteria. Try adjusting your search or clearing the filters.
            </p>
            {(filters.bloodGroup || filters.department || filters.availability !== 'all' || searchTerm) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ bloodGroup: '', department: '', availability: 'all' });
                }}
                className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
