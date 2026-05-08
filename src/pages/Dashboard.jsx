import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { User, Calendar, Activity, CheckCircle, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { currentUser, userData } = useAuth();
  const { updateDocument, isPending } = useFirestore('users');
  const [successMsg, setSuccessMsg] = useState('');

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleUpdateAvailability = async () => {
    try {
      await updateDocument(currentUser.uid, {
        available: !userData.available
      });
      setSuccessMsg(`Status updated to ${!userData.available ? 'Available' : 'Unavailable'}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleUpdateDate = async (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    try {
      await updateDocument(currentUser.uid, {
        lastDonationDate: date
      });
      setSuccessMsg("Last donation date updated!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to update date");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Dashboard</h1>
            <p className="text-slate-600">Manage your donor profile and availability.</p>
          </div>
        </div>

        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 flex items-center gap-2 border border-green-200"
          >
            <CheckCircle size={20} />
            <span className="font-medium">{successMsg}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-1">
            <div className="bg-primary px-6 py-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10">
                <span className="text-3xl font-bold text-primary">{userData.bloodGroup}</span>
              </div>
              <h2 className="text-xl font-bold text-white relative z-10">{userData.fullName}</h2>
              <p className="text-red-100 font-medium mt-1 relative z-10">{userData.department}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <User size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Student ID</p>
                  <p className="font-medium text-slate-900">{userData.studentId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Activity size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Donations</p>
                  <p className="font-medium text-slate-900">0</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${userData.available ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {userData.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Availability Toggle */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Activity size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Availability</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Update your status so others know if you can donate blood right now.
                </p>
                <button 
                  onClick={handleUpdateAvailability}
                  disabled={isPending}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    userData.available 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                  }`}
                >
                  {userData.available ? 'Mark as Unavailable' : 'Mark as Available'}
                </button>
              </div>

              {/* Update Donation Date */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Last Donation</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Keep track of when you last donated blood.
                </p>
                <form onSubmit={handleUpdateDate}>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      name="date"
                      required
                      defaultValue={userData.lastDonationDate || ''}
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary focus:border-primary text-sm" 
                    />
                    <button 
                      type="submit"
                      disabled={isPending}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Notifications / Info Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Bell size={20} className="text-amber-500" />
                Important Information
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm">
                  <p className="font-semibold mb-1">Donation Eligibility Reminder</p>
                  <p>You should wait at least 3 months (for men) or 4 months (for women) between whole blood donations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
