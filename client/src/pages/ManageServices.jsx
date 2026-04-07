import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit2, Trash2, X, Check, Package, DollarSign, Tag, AlertCircle } from 'lucide-react';

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/services/my');
      setServices(res.data.data);
    } catch (err) {
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price,
        description: service.description || ''
      });
    } else {
      setCurrentService(null);
      setFormData({ name: '', category: '', price: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentService) {
        await axios.put(`http://localhost:5000/api/services/${currentService._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/services', formData);
      }
      closeModal();
      fetchServices();
    } catch (err) {
      console.error(err);
      alert('Failed to save service. Please check your inputs.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert('Failed to delete service.');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 flex items-center"><Package className="mr-3" size={32} /> Manage Services</h1>
            <p className="text-indigo-100 text-lg">
              Add, update, or remove services that you offer to customers.
            </p>
          </div>
          <button 
            onClick={() => openModal()}
            className="mt-6 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={20} />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          {loading ? (
             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" />{error}</div>
          ) : services.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
              <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No Services Found</h3>
              <p className="text-gray-500 mt-1 mb-6">You haven't added any services yet. Start offering your skills!</p>
              <button 
                onClick={() => openModal()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Add Your First Service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service._id} className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow relative group">
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openModal(service)}
                      className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition"
                      title="Edit Service"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mb-4 pr-16">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{service.name}</h3>
                    <p className="text-2xl font-black text-indigo-600">${service.price}</p>
                  </div>
                  
                  {service.description && (
                    <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50 line-clamp-3">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-900/75 backdrop-blur-sm" onClick={closeModal} />

            <div className="relative inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900">
                  {currentService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Tag size={18} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 hover:bg-white focus:bg-white"
                        placeholder="e.g. Deep Home Cleaning"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
                      <input
                        type="text"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 hover:bg-white focus:bg-white"
                        placeholder="e.g. Cleaning"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Price ($) *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <DollarSign size={18} />
                        </div>
                        <input
                          type="number"
                          name="price"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 hover:bg-white focus:bg-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      maxLength={500}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 hover:bg-white focus:bg-white resize-none"
                      placeholder="Describe what is included in this service..."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition flex items-center"
                  >
                    <Check size={18} className="mr-2" />
                    {currentService ? 'Save Changes' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
