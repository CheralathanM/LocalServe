import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, AlertCircle } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const ProvidersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm) {
        setSearchParams({ search: searchTerm });
      } else {
        setSearchParams({});
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError('');
      try {
        const queryParams = debouncedSearch ? `?search=${debouncedSearch}` : '';
        const res = await axios.get(`http://localhost:5000/api/services${queryParams}`);
        setServices(res.data.data);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [debouncedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDebouncedSearch(searchTerm);
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Find Local Services
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover trusted experts for your next project, right in your neighborhood.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="relative group flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-32 py-4 border-2 border-gray-100 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-indigo-500 hover:border-gray-200 transition-all text-gray-900 sm:text-lg shadow-sm"
                placeholder="What service do you need? (e.g. Roof Cleaning)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-indigo-700 transition-colors flex items-center"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {services.length} {services.length === 1 ? 'service' : 'services'} found
          </h2>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 border border-gray-200 hover:border-indigo-100 bg-white rounded-xl shadow-sm transition-all">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-start mb-8">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse flex flex-col h-64">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-6 flex-1 mt-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-xl w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find any services matching your search. Try using different keywords or categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersList;
