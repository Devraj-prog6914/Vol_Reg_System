import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Award, Star, Activity, MapPin, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const VolunteerDashboard = () => {
  const { user } = useAuthStore();
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('mockEvents_' + user?.email);
    if (saved) return JSON.parse(saved);
    return [
      { _id: 'e1', title: 'Community Garden Maintenance', date: '2026-06-15T09:00', status: 'Confirmed', distance: '1.2 miles' },
      { _id: 'e2', title: 'Local Food Bank Drive', date: '2026-06-20T10:00', status: 'Pending', distance: '3.4 miles' }
    ];
  });

  const [recommendedEvents, setRecommendedEvents] = useState(() => {
    const saved = localStorage.getItem('mockRecommended');
    if (saved) return JSON.parse(saved);
    return [
      { _id: 'r1', name: 'City Park Cleanup', distance: '2.5 miles', spots: 5 },
      { _id: 'r2', name: 'Elderly Tech Support', distance: '4.1 miles', spots: 2 },
    ];
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [joiningId, setJoiningId] = useState(null);

  const percentage = 75;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleJoin = async (id, name) => {
    setJoiningId(id);
    try {
      // Mocking API call for joining since we might not have the event endpoint fully seeded
      await new Promise(r => setTimeout(r, 1000)); 
      toast.success(`Successfully joined ${name}!`);
      
      // Move from recommended to my timeline
      const joinedEvent = recommendedEvents.find(e => e._id === id);
      const newRecommended = recommendedEvents.filter(e => e._id !== id);
      setRecommendedEvents(newRecommended);
      localStorage.setItem('mockRecommended', JSON.stringify(newRecommended));
      
      if (joinedEvent) {
        const newEvents = [{
          _id: joinedEvent._id,
          title: joinedEvent.name,
          date: new Date(Date.now() + 86400000).toISOString(),
          status: 'Confirmed',
          distance: joinedEvent.distance
        }, ...events];
        setEvents(newEvents);
        localStorage.setItem('mockEvents_' + user?.email, JSON.stringify(newEvents));
      }
    } catch (error) {
      toast.error('Failed to join event');
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 pb-12 relative z-10">
        <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-indigo-900 to-violet-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back!</h2>
            <p className="text-indigo-200 mt-2 text-lg">You are 15 hours away from the Gold Level Impact Badge.</p>
          </div>
          <div className="relative z-10 hidden md:block">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-900/50" />
                <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226.2" strokeDashoffset={226.2 - (226.2 * percentage) / 100} className="text-yellow-400" strokeLinecap="round" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col">
                <Star className="text-yellow-400" size={20} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Upcoming Shifts', value: events.length, icon: CalendarIcon, color: 'blue' },
            { label: 'Hours Served', value: '45', icon: Clock, color: 'green' },
            { label: 'Certificates Earned', value: '3', icon: Award, color: 'purple' }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-white">
              <div className={`bg-${stat.color}-100 text-${stat.color}-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                <stat.icon size={28} />
              </div>
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
              <div className="text-4xl font-black text-gray-900 mt-2">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Simple, Understandable Timeline */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-white">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="text-indigo-600" /> Your Upcoming Events
            </h3>
            
            {events.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-gray-100">
                You have no upcoming events. Join one from the recommendations!
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={event._id} className="flex gap-4 items-start relative group">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md z-10 relative ${event.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {event.status === 'Confirmed' ? <Check size={18} /> : <Clock size={18} />}
                      </div>
                      {i !== events.length - 1 && <div className="w-0.5 h-16 bg-gray-200 absolute top-10"></div>}
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:border-indigo-200 transition-colors">
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{new Date(event.date).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${event.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                          {event.status}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={12}/> {event.distance}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Suggested Events */}
          <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-3xl shadow-inner border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900">Recommended Near You</h3>
              <button onClick={() => setIsMapOpen(true)} className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1">
                <MapPin size={16} /> View Map
              </button>
            </div>
            
            {recommendedEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No more recommendations right now.</div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {recommendedEvents.map((rec) => (
                    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: -20 }} key={rec._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{rec.name}</h4>
                        <div className="flex items-center text-sm text-gray-500 gap-3">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {rec.distance}</span>
                          <span className="text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-md text-xs">{rec.spots} spots left</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJoin(rec._id, rec.name)} 
                        disabled={joiningId === rec._id}
                        className="text-sm font-bold text-white bg-indigo-600 px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[100px] shadow-md shadow-indigo-200 disabled:opacity-70"
                      >
                        {joiningId === rec._id ? <Loader2 size={16} className="animate-spin" /> : 'Join'}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white relative"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                  <MapPin className="text-indigo-600" /> Event Locations
                </h3>
                <button onClick={() => setIsMapOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="h-[60vh] w-full bg-gray-100 relative">
                <iframe 
                  title="Map View"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.51,37.70,-122.35,37.81&layer=mapnik&marker=37.7749,-122.4194" 
                  allowFullScreen
                ></iframe>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl font-bold text-sm text-gray-800 flex gap-4">
                  <span className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Available</span>
                  <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Joined</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VolunteerDashboard;
