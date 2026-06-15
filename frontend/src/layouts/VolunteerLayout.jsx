import { Outlet, Link } from 'react-router-dom';
import { Heart, LayoutDashboard, User, Calendar, Award, LogOut, Bell } from 'lucide-react';
import useAuthStore from '../store/authStore';

const VolunteerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Heart size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              VolunLink
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/volunteer" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-medium transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/volunteer/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
            <User size={20} /> Profile
          </Link>
          <Link to="/volunteer/events" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
            <Calendar size={20} /> Events
          </Link>
          <Link to="/volunteer/certificates" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
            <Award size={20} /> Certificates
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => { useAuthStore.getState().logout(); window.location.href = '/login'; }} className="flex w-full items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-indigo-600 transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              JD
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VolunteerLayout;
