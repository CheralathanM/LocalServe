import React, { useState, useContext } from 'react';
import { Star, MapPin, BadgeCheck, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal';

const ProviderCard = ({ provider }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'provider') {
      alert("Providers cannot book other providers using this portal.");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-xl ring-2 ring-white shadow-sm">
                {provider.user?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center">
                  {provider.user?.name || 'Unknown Provider'}
                  <BadgeCheck className="w-4 h-4 text-blue-500 ml-1" />
                </h3>
                <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  {provider.serviceCategory}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="font-bold text-gray-900 text-sm">{provider.rating || 'New'}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 mb-6 relative">
            {provider.description}
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
              {provider.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
              ${provider.hourlyRate}/hr
            </div>
          </div>
          <button 
            onClick={handleBookClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingModal 
        provider={provider} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ProviderCard;
