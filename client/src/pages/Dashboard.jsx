import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status });
      // Refresh list
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center"><Clock size={12} className="mr-1"/> Pending</span>;
      case 'accepted': return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center"><CheckCircle size={12} className="mr-1"/> Accepted</span>;
      case 'completed': return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center"><CheckCircle size={12} className="mr-1"/> Completed</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center"><XCircle size={12} className="mr-1"/> Cancelled</span>;
      default: return null;
    }
  };

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  
  const stats = [
    { label: 'Pending', value: pendingCount.toString(), icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: 'Completed', value: completedCount.toString(), icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { label: 'Total Mng', value: bookings.length.toString(), icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="flex-1 bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-indigo-100 text-lg">
              Manage your local services and bookings below.
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-semibold flex items-center space-x-2">
            <span className="capitalize">{user.role} Dashboard</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {user.role === 'provider' ? 'Job Requests' : 'Your Bookings'}
          </h2>

          {loading ? (
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white flex flex-col md:flex-row justify-between animate-pulse">
                   <div className="space-y-3 flex-1">
                     <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                     <div className="h-10 bg-gray-100 rounded-xl w-full mt-2"></div>
                   </div>
                   <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
                     <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                     <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                   </div>
                 </div>
               ))}
             </div>
          ) : error ? (
             <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" />{error}</div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <Clock className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">No bookings found</h3>
              <p className="text-gray-500 mt-2">
                {user.role === 'provider' ? 'You have no job requests yet.' : 'Explore providers and request a service to see bookings here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {user.role === 'provider' ? booking.customer?.name : booking.provider?.user?.name || 'Unknown Provider'}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(booking.serviceDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    {booking.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-2 max-w-2xl border border-gray-100">
                        <span className="font-semibold text-xs uppercase text-gray-400 block mb-1">Notes from Customer</span>
                        {booking.notes}
                      </div>
                    )}
                  </div>

                  {user.role === 'provider' && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0 ml-0 md:ml-4 flex-shrink-0">
                      {booking.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(booking._id, 'accepted')}
                          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
                        >
                          Accept Job
                        </button>
                      )}
                      {booking.status === 'accepted' && (
                        <button 
                          onClick={() => updateStatus(booking._id, 'completed')}
                          className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition"
                        >
                          Mark Completed
                        </button>
                      )}
                      <button 
                        onClick={() => updateStatus(booking._id, 'cancelled')}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
