import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { LogOut, User as UserIcon, Briefcase, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 shadow-sm">LocalFinder</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <button 
              onClick={toggleTheme} 
              className="text-gray-500 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {(!user || user.role !== 'provider') && (
              <Link to="/providers" className="text-gray-600 hover:text-indigo-600 font-semibold transition-colors">Find Services</Link>
            )}
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
                {user.role === 'provider' && (
                  <Link to="/services/manage" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Manage Services</Link>
                )}
                <div className="flex items-center space-x-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <UserIcon size={16} className="text-indigo-500" />
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full capitalize hidden lg:block">{user.role}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                    title="Log Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Log in</Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden space-x-2">
            <button 
              onClick={toggleTheme} 
              className="text-gray-500 hover:text-indigo-600 transition-colors p-2 rounded-full"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 shadow-md absolute w-full animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {(!user || user.role !== 'provider') && (
              <Link 
                to="/providers" 
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50"
              >
                Find Services
              </Link>
            )}
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Dashboard
                </Link>
                {user.role === 'provider' && (
                  <Link 
                    to="/services/manage" 
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Manage Services
                  </Link>
                )}
                <div className="border-t border-gray-100 mt-2 pt-4 px-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm font-medium text-indigo-600 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100 px-3">
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className="w-full text-center py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 font-medium"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeMenu}
                  className="w-full text-center py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
