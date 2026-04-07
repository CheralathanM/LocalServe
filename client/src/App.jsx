import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProvidersList from './pages/ProvidersList';
import ManageServices from './pages/ManageServices';

// Guard for preventing providers from accessing customer/public pages
const CustomerOrGuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (user && user.role === 'provider') return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CustomerOrGuestRoute><Home /></CustomerOrGuestRoute>} />
              <Route 
                path="providers" 
                element={
                  <CustomerOrGuestRoute>
                    <ProvidersList />
                  </CustomerOrGuestRoute>
                } 
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* General Protected Routes (Both Roles) */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>

              {/* Provider Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
                <Route path="services/manage" element={<ManageServices />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
