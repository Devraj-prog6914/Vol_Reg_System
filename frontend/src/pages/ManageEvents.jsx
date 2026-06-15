import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

const mockEvents = [
  { id: 1, title: 'Beach Cleanup', date: '2026-07-15', time: '08:00 AM', venue: 'Sunny Beach', maxVolunteers: 50, category: 'Environment', status: 'upcoming' },
  { id: 2, title: 'Math Tutoring', date: '2026-07-20', time: '04:00 PM', venue: 'City Library', maxVolunteers: 10, category: 'Education', status: 'upcoming' },
];

const ManageEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
          <p className="text-gray-500 text-sm mt-1">Create, update, and track all organizational events.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200"
        >
          <Plus size={20} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                {event.category}
              </span>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(event.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
            
            <div className="space-y-3 mt-auto">
              <div className="flex items-center text-gray-600 text-sm">
                <CalendarIcon size={16} className="mr-3 text-indigo-500" /> {event.date}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={16} className="mr-3 text-indigo-500" /> {event.time}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={16} className="mr-3 text-indigo-500" /> {event.venue}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Users size={16} className="mr-3 text-indigo-500" /> Max Volunteers: {event.maxVolunteers}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Event</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                  ✕
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows="3" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Volunteers</label>
                    <input type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                      <option>Environment</option>
                      <option>Education</option>
                      <option>Health</option>
                      <option>Community</option>
                      <option>Relief</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
                    Create Event
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

export default ManageEvents;
