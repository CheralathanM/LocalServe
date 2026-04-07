import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Star, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Local Pros</span> for Any Job
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto font-light mb-10">
            Connect with trusted plumbers, electricians, cleaners, and more in your neighborhood instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/providers" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              Hire a Professional
            </Link>
            <Link to="/register" className="bg-indigo-700/50 backdrop-blur-sm border border-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-600/60 transition-all transform hover:-translate-y-1">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose LocalFinder?</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: 'Verified Professionals', desc: 'Every service provider is thoroughly vetted for your safety and peace of mind.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: Zap, title: 'Instant Booking', desc: 'Find and book services in seconds. No more waiting for quotes or callbacks.', color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: Star, title: 'Top Rated Service', desc: 'Read genuine reviews from your neighbors to ensure you always get the best.', color: 'text-indigo-500', bg: 'bg-indigo-50' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-indigo-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
