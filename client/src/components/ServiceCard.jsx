import React, { useState, useContext } from 'react';
import { BadgeCheck, Clock, DollarSign, Tag, Info } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal';

const ServiceCard = ({ service }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'provider') {
      alert("Providers cannot book services using this portal.");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-xl ring-2 ring-white shadow-sm">
                {service.providerId?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center">
                  {service.name}
                </h3>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  By {service.providerId?.name || 'Unknown Provider'}
                  <BadgeCheck className="w-4 h-4 text-blue-500 ml-1" />
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="font-extrabold text-emerald-700 text-lg">{service.price}</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
              <Tag className="w-3 h-3 mr-1" /> {service.category}
            </span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 relative">
            {service.description || "No description provided."}
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end">
          <button 
            onClick={handleBookClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 flex justify-center items-center"
          >
            <Clock className="w-4 h-4 mr-2" /> Request Service
          </button>
        </div>
      </div>

      <BookingModal 
        service={service} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ServiceCard;
