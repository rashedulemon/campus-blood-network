import { useState } from 'react';
import { useCollection, useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../context/AuthContext';
import RequestCard from '../components/emergency/RequestCard';
import { AlertCircle, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmergencyPage() {
  const { data: requests, loading } = useCollection('bloodRequests');
  const { addDocument, isPending } = useFirestore('bloodRequests');
  const { currentUser } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    hospital: '',
    requiredDate: '',
    contactNumber: '',
    notes: ''
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter out expired requests AND fulfilled requests, then sort by creation date descending
  const sortedRequests = requests
    .filter(req => {
      if (req.status !== 'active') return false; // Hide fulfilled requests
      if (!req.requiredDate) return true;
      const reqDate = new Date(req.requiredDate);
      return reqDate >= today;
    })
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("You must be logged in to create a request.");

    try {
      await addDocument({
        ...formData,
        createdBy: currentUser.uid,
        status: 'active',
      });
      setShowForm(false);
      setFormData({
        patientName: '',
        bloodGroup: '',
        hospital: '',
        requiredDate: '',
        contactNumber: '',
        notes: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create request.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Emergency Requests</h1>
            <p className="text-slate-600 max-w-2xl">
              Real-time feed of patients who urgently need blood donations.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            <span>{showForm ? 'Cancel' : 'Post Emergency Request'}</span>
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 relative">
                {!currentUser && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 text-center max-w-sm">
                      <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Login Required</h3>
                      <p className="text-slate-600 text-sm mb-4">You must be registered and logged in to post an emergency blood request.</p>
                      <a href="/login" className="block w-full py-2 bg-primary text-white rounded-lg font-medium">Login Now</a>
                    </div>
                  </div>
                )}
                
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-red-500 rounded-full"></span>
                  New Emergency Request
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group Needed *</label>
                    <select
                      required
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50 text-red-600 font-medium"
                    >
                      <option value="">Select Group</option>
                      {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Name & Area *</label>
                    <input
                      type="text"
                      required
                      value={formData.hospital}
                      onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50"
                      placeholder="e.g. Dhaka Medical College Hospital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date Required By *</label>
                    <input
                      type="date"
                      required
                      value={formData.requiredDate}
                      onChange={(e) => setFormData({...formData, requiredDate: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-red-500 focus:border-red-500 bg-slate-50"
                      placeholder="Any specific instructions or details..."
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70"
                    >
                      {isPending ? 'Submitting...' : 'Post Request'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List of Requests */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-64">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-xl"></div>
                  <div className="space-y-2 flex-1 mt-2">
                    <div className="h-5 w-1/3 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No Active Requests</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              There are currently no emergency blood requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
