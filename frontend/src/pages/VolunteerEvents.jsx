import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

const mockEvents = [
  { id: 1, title: 'Beach Cleanup', date: '2026-07-15', time: '08:00 AM', venue: 'Sunny Beach', maxVolunteers: 50, category: 'Environment', status: 'upcoming', registered: false },
  { id: 2, title: 'Math Tutoring', date: '2026-07-20', time: '04:00 PM', venue: 'City Library', maxVolunteers: 10, category: 'Education', status: 'upcoming', registered: true },
];

const VolunteerEvents = () => {
  const [events, setEvents] = useState(mockEvents);

  const handleRegister = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, registered: true } : e));
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Browse Events</h2>
        <p className="text-gray-500 text-sm mt-1">Discover opportunities to make an impact in your community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
                {event.category}
              </span>
              {event.registered && (
                <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                  <CheckCircle size={14} /> Registered
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
            
            <div className="space-y-3 mt-auto mb-6">
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

            <button 
              onClick={() => !event.registered && handleRegister(event.id)}
              disabled={event.registered}
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                event.registered 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'
              }`}
            >
              {event.registered ? 'Already Registered' : 'Register Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerEvents;
