import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, Share2, AlertCircle, ChevronRight, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const mockAvailableEvents = [
  { _id: 'a1', title: 'Community Garden Maintenance', date: '2026-06-25T09:00', time: '09:00 AM', location: '1.2 miles away', category: 'Environment', organizer: 'GreenEarth NGO', spots: 12, img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?q=80&w=800&auto=format&fit=crop' },
  { _id: 'a2', title: 'Local Food Bank Drive', date: '2026-07-02T10:00', time: '10:00 AM', location: '3.4 miles away', category: 'Social Welfare', organizer: 'HelpingHands Org', spots: 5, img: 'https://images.unsplash.com/photo-1593113513832-f45d4cb57fae?q=80&w=800&auto=format&fit=crop' },
  { _id: 'a3', title: 'Animal Shelter Volunteer', date: '2026-07-08T14:00', time: '02:00 PM', location: '5.0 miles away', category: 'Animal Welfare', organizer: 'Paws & Care', spots: 3, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop' },
];

const VolunteerEvents = () => {
  const { user } = useAuthStore();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [extendedFormEventId, setExtendedFormEventId] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    const saved = localStorage.getItem('mockEvents_' + user.email);
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
    date.setDate(date.getDate() - 1);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleRegisterEvent = async (event) => {
    setJoiningId(event._id);
    try {
      await new Promise(r => setTimeout(r, 800));
      const existing = JSON.parse(localStorage.getItem('mockEvents_' + user.email) || '[]');
      if (!existing.find(e => e._id === event._id)) {
        const newEvent = {
          _id: event._id, title: event.title, date: event.date, time: event.time, status: 'Confirmed', distance: event.location, category: event.category, organizer: event.organizer, registeredAt: new Date().toISOString(), extendedFormNeeded: true, img: event.img
        };
        const updated = [newEvent, ...existing];
        setRegisteredEvents(updated);
        localStorage.setItem('mockEvents_' + user.email, JSON.stringify(updated));
        toast.success(`Successfully registered for ${event.title}!`);
      } else {
        toast.error('You are already registered for this event.');
      }
    } catch (error) {
      toast.error('Failed to register');
    } finally {
      setJoiningId(null);
    }
  };

  const submitExtendedForm = async (e) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    await new Promise(r => setTimeout(r, 1000));
    
    const updated = registeredEvents.map(ev => {
      if (ev._id === extendedFormEventId) {
        return { ...ev, extendedFormNeeded: false };
      }
      return ev;
    });
    setRegisteredEvents(updated);
    localStorage.setItem('mockEvents_' + user.email, JSON.stringify(updated));
    
    setIsSubmittingForm(false);
    setExtendedFormEventId(null);
    toast.success('Extended form completed successfully!');
  };

  return (
    <div className="space-y-12 pb-12">
      
      {/* My Applications Section */}
      <section>
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
              <p className="text-gray-500">You haven't registered for any events yet. Check out the available events below!</p>
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 gap-6">
                  <div className="flex items-start">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-md bg-green-500 text-white flex items-center justify-center shadow-sm z-10">
                        <CheckCircle size={18} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-bold text-indigo-900 mt-2 text-center w-24">Registration<br/>Form</span>
                    </div>
                    
                    {/* Connector */}
                    <div className={`w-16 sm:w-24 border-t-2 border-dashed mt-4 -mx-4 z-0 ${!event.extendedFormNeeded ? 'border-green-500' : 'border-gray-300'}`}></div>
                    
                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                      {!event.extendedFormNeeded ? (
                        <div className="w-8 h-8 rounded-md bg-green-500 text-white flex items-center justify-center shadow-sm z-10">
                          <CheckCircle size={18} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center shadow-sm z-10">
                          <span className="text-sm font-bold">2</span>
                        </div>
                      )}
                      <span className={`text-xs font-bold mt-2 text-center w-24 ${event.extendedFormNeeded ? 'text-gray-500' : 'text-indigo-900'}`}>
                        Extended<br/>Form
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                      <Share2 size={20} />
                    </button>
                    
                    {event.extendedFormNeeded ? (
                      <button 
                        onClick={() => setExtendedFormEventId(event._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 text-white font-bold bg-red-500 hover:bg-red-600 px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-red-200"
                      >
                        Complete Now
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-xl">
                        <CheckCircle size={22} strokeWidth={3} /> Completed
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </section>

      {/* Available Events Section */}
      <section>
        <div className="mb-8 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="text-indigo-600" /> Opportunities Near You
          </h2>
          <p className="text-gray-500 text-sm mt-1">Based on your current location and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAvailableEvents.map((event) => {
            const isRegistered = registeredEvents.some(e => e._id === event._id);
            return (
              <div key={event._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                  <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Event" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-700">{event.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon size={16} className="mr-2 text-indigo-500 shrink-0" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-indigo-500 shrink-0" />
                      {event.location}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRegisterEvent(event)}
                    disabled={isRegistered || joiningId === event._id}
                    className={`w-full flex justify-center items-center py-3 rounded-xl font-bold transition-all ${
                      isRegistered ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    {joiningId === event._id ? <Loader2 size={18} className="animate-spin" /> : (isRegistered ? 'Already Registered' : 'Register Now')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Extended Form Modal */}
      <AnimatePresence>
        {extendedFormEventId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="text-indigo-600" /> Additional Details
                </h3>
                <button onClick={() => setExtendedFormEventId(null)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={submitExtendedForm} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Why are you interested in this event?</label>
                  <textarea required rows={3} placeholder="Tell us briefly..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">T-Shirt Size (For uniform)</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    <option value="">Select a size</option>
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Any dietary restrictions or allergies?</label>
                  <input type="text" placeholder="e.g. Vegetarian, Nut allergy (Optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Number</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <div className="pt-4 border-t border-gray-100 flex gap-4">
                  <button type="button" onClick={() => setExtendedFormEventId(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmittingForm} className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 disabled:opacity-70">
                    {isSubmittingForm ? <Loader2 size={20} className="animate-spin" /> : 'Submit Form'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default VolunteerEvents;
