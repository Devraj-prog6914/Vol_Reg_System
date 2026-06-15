import { Outlet, Link } from 'react-router-dom';
import { Heart, LayoutDashboard, Users, Calendar, Megaphone, Settings, LogOut, Bell } from 'lucide-react';
import useAuthStore from '../store/authStore';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-gray-950 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-lg text-white">
              <Heart size={20} />
            </div>
            <span className="text-xl font-bold text-white">
              Admin Panel
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-gray-800 text-white rounded-xl font-medium transition-colors">
            <LayoutDashboard size={20} className="text-indigo-400" /> Dashboard
          </Link>
          <Link to="/admin/volunteers" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-medium transition-colors">
            <Users size={20} /> Volunteers
          </Link>
          <Link to="/admin/events" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-medium transition-colors">
            <Calendar size={20} /> Events
          </Link>
          <Link to="/admin/announcements" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-medium transition-colors">
            <Megaphone size={20} /> Announcements
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={() => { useAuthStore.getState().logout(); window.location.href = '/login'; }} className="flex w-full items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-medium transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Admin Control</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-indigo-600 transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
              AD
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

export default AdminLayout;
