import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import VolunteerLayout from './layouts/VolunteerLayout';
import AdminLayout from './layouts/AdminLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerProfile from './pages/VolunteerProfile';
import VolunteerEvents from './pages/VolunteerEvents';
import VolunteerCertificates from './pages/VolunteerCertificates';

import AdminDashboard from './pages/AdminDashboard';
import ManageVolunteers from './pages/ManageVolunteers';
import ManageEvents from './pages/ManageEvents';

import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import { useEffect } from 'react';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Volunteer Routes */}
        <Route path="/volunteer" element={<VolunteerLayout />}>
          <Route index element={<VolunteerDashboard />} />
          <Route path="profile" element={<VolunteerProfile />} />
          <Route path="events" element={<VolunteerEvents />} />
          <Route path="certificates" element={<VolunteerCertificates />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="volunteers" element={<ManageVolunteers />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="announcements" element={<div className="p-4 bg-white rounded-2xl shadow-sm">Manage Announcements placeholder</div>} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
