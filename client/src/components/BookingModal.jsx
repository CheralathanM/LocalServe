import React, { useState } from 'react';
import axios from 'axios';
import { X, Calendar, Edit3, AlertCircle, CheckCircle } from 'lucide-react';

const BookingModal = ({ service, isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullNotes = `Service Requested: ${service.name}\n\n${notes}`;
      await axios.post('http://localhost:5000/api/bookings', {
        providerId: service.providerId._id || service.providerId,
        serviceDate: date,
        notes: fullNotes
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setDate('');
        setNotes('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all animate-fade-in-up">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Book Service: {service.name}</h3>
          <button onClick={onClose} className="text-indigo-100 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="py-10 flex flex-col items-center text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Requested!</h4>
              <p className="text-gray-500">The provider will review your request shortly.</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-50 p-3 rounded-xl flex items-start text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Details & Notes</label>
                  <div className="relative">
                    <Edit3 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      rows="4"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                      placeholder="Describe what you need help with..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Request Booking'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
