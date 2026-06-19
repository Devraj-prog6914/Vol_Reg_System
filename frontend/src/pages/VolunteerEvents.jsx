import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, Share2, AlertCircle, ChevronRight } from 'lucide-react';
import useAuthStore from '../store/authStore';

const VolunteerEvents = () => {
  const { user } = useAuthStore();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('mockEvents');
    if (saved) {
      setRegisteredEvents(JSON.parse(saved));
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) + ', ' + 
           date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';
  };

  const getDeadline = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1); // Deadline 1 day before
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const toggleExtendedForm = (id) => {
    const updated = registeredEvents.map(e => {
      if (e._id === id) {
        return { ...e, extendedFormNeeded: false };
      }
      return e;
    });
    setRegisteredEvents(updated);
    localStorage.setItem('mockEvents', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Applications & Events</h2>
        <p className="text-gray-500 text-sm mt-1">Track the status of your event registrations and forms.</p>
      </div>

      <div className="space-y-6">
        {registeredEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Registered Events</h3>
            <p className="text-gray-500">You haven't registered for any events yet. Check out the dashboard to find opportunities!</p>
          </div>
        ) : (
          registeredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
              
              {/* Email Notifications Toggle */}
              <div className="absolute top-8 right-8 flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 hidden sm:block">Email Notifications:</span>
                <button 
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute transition-transform shadow-sm ${emailNotifications ? 'translate-x-7' : 'translate-x-1'}`}></span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-8 pr-32">
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 shadow-inner">
                  {event.img ? (
                    <img src={event.img} className="w-full h-full object-cover rounded-2xl" alt="Event" />
                  ) : (
                    <span className="text-2xl font-bold text-indigo-600 text-center leading-none">
                      {event.title.split(' ').map(w => w[0]).join('').substring(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-2 font-medium">
                    <span>Registered on: {formatDate(event.registeredAt || new Date().toISOString())}</span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span>By: You ({user?.email || 'user@example.com'})</span>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Deadline: {getDeadline(event.date)}
                  </div>
                </div>
              </div>

              {/* Timeline UI */}
              <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mt-12 gap-6">
                <div className="flex items-start">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md bg-green-500 text-white flex items-center justify-center shadow-sm z-10">
                      <CheckCircle size={18} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-bold text-indigo-900 mt-2 text-center w-24">Registration<br/>Form</span>
                  </div>
                  
                  {/* Connector */}
                  <div className="w-16 sm:w-24 border-t-2 border-dashed border-green-500 mt-4 -mx-4 z-0"></div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    {event.extendedFormNeeded ? (
                      <button onClick={() => toggleExtendedForm(event._id)} className="w-8 h-8 rounded-md border-2 border-indigo-500 text-indigo-500 bg-white flex items-center justify-center hover:bg-indigo-50 transition-colors shadow-sm z-10 cursor-pointer group">
                         <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                      </button>
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-green-500 text-white flex items-center justify-center shadow-sm z-10">
                        <CheckCircle size={18} strokeWidth={3} />
                      </div>
                    )}
                    <span className={`text-xs font-bold mt-2 text-center w-24 ${event.extendedFormNeeded ? 'text-indigo-600' : 'text-indigo-900'}`}>
                      Extended<br/>Form
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 size={20} />
                  </button>
                  
                  {event.extendedFormNeeded ? (
                    <div className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl">
                      <AlertCircle size={18} /> Action Required
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                      <CheckCircle size={22} strokeWidth={3} /> Completed
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VolunteerEvents;
