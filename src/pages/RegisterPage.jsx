import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Droplet, AlertCircle } from 'lucide-react';
import { cn } from '../utils/utils';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    department: '',
    session: '',
    bloodGroup: '',
    phone: '',
    email: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
    available: true,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      
      // eslint-disable-next-line no-unused-vars
      const { password, confirmPassword, email, ...additionalData } = formData;
      
      await register(email, password, {
        email,
        ...additionalData,
        lastDonationDate: null
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // Simplify firebase errors
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Electrical and Electronic Engineering", "Computer Science and Engineering", "Business Administration", 
    "Economics", "English", "Islamic History and Culture", "Journalism, Communication and Media Studies", "Law and Human Rights", "Nutrition and Food Engineering",
    "Pharmacy", "Political Science", "Public Health", "Sociology"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 border border-primary/20"
          >
            <Droplet size={32} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-slate-900"
          >
            Register as a Donor
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-slate-600"
          >
            Join the university blood donor network and save lives.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-100 flex items-center gap-3 text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information */}
            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-6">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="Your Full Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group *</label>
                <select
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm font-medium text-primary"
                >
                  <option value="">Select Group</option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="+880 1XXXXXXXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Address/Area *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="University Hall / Nearby Area"
                />
              </div>
            </div>

            {/* Academic Information */}
            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-6">
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student ID *</label>
                <input
                  type="text"
                  name="studentId"
                  required
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="e.g. 20-XXXXX-1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Session / Batch <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="e.g. 2019-2020 or Batch 21"
                />
              </div>
            </div>

            {/* Account Credentials */}
            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-6">
              Account Credentials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">University Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="student@university.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary bg-slate-50 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 flex items-start gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  checked={formData.available}
                  onChange={handleChange}
                  className="focus:ring-primary h-5 w-5 text-primary border-slate-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="available" className="font-medium text-slate-900">
                  Available to donate blood
                </label>
                <p className="text-sm text-slate-500">
                  By checking this, your profile will be visible to those searching for blood donors. You can turn this off later from your dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                  Log in
                </Link>
              </p>
              
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full sm:w-auto px-8 py-3 rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
