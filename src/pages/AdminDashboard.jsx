import { useState } from 'react';
import { useCollection, useFirestore } from '../hooks/useFirestore';
import { Users, Activity, Shield, Trash2, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { data: users, loading: usersLoading } = useCollection('users');
  const { data: requests, loading: reqLoading } = useCollection('bloodRequests');
  const { updateDocument: updateUser, deleteDocument: deleteUser } = useFirestore('users');
  const { updateDocument: updateRequest, deleteDocument: deleteRequest } = useFirestore('bloodRequests');
  
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'requests'

  const totalDonors = users.length;
  const availableDonors = users.filter(u => u.available).length;
  const activeRequests = requests.filter(r => r.status === 'active').length;

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await deleteUser(userId);
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  const handleMakeAdmin = async (userId) => {
    if (window.confirm("Are you sure you want to promote this user to Admin?")) {
      try {
        await updateUser(userId, { role: 'admin' });
      } catch (err) {
        console.error("Error updating user:", err);
      }
    }
  };

  const handleDeleteRequest = async (reqId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteRequest(reqId);
      } catch (err) {
        console.error("Error deleting request:", err);
        alert("Failed to delete request.");
      }
    }
  };

  const handleMarkFulfilled = async (reqId) => {
    try {
      await updateRequest(reqId, { status: 'fulfilled' });
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
            <Shield className="text-primary" size={32} />
            Admin Dashboard
          </h1>
          <p className="text-slate-600">Platform overview and user management.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Registered</p>
              <h3 className="text-2xl font-bold text-slate-900">{usersLoading ? '...' : totalDonors}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Available Now</p>
              <h3 className="text-2xl font-bold text-slate-900">{usersLoading ? '...' : availableDonors}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Requests</p>
              <h3 className="text-2xl font-bold text-slate-900">{reqLoading ? '...' : activeRequests}</h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 flex">
            <button 
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('users')}
            >
              Manage Users
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'requests' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('requests')}
            >
              Blood Requests
            </button>
          </div>

          <div className="p-0">
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Blood Group</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Student ID</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{user.fullName}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                            {user.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.studentId}</td>
                        <td className="px-6 py-4">
                          {user.available ? 
                            <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Available</span> : 
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">Unavailable</span>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700 capitalize">{user.role}</span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {user.role !== 'admin' && (
                            <button 
                              onClick={() => handleMakeAdmin(user.id)}
                              className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-medium"
                            >
                              Make Admin
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Patient & Hospital</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Blood Group</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Required Date</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {requests.map(req => (
                      <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{req.patientName}</div>
                          <div className="text-sm text-slate-500">{req.hospital}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 font-bold text-sm">
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{req.requiredDate}</td>
                        <td className="px-6 py-4">
                          {req.status === 'active' ? 
                            <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Active</span> : 
                            <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Fulfilled</span>
                          }
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {req.status === 'active' && (
                            <button 
                              onClick={() => handleMarkFulfilled(req.id)}
                              className="px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-medium transition-colors"
                            >
                              Mark Fulfilled
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteRequest(req.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {requests.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                          No emergency requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
