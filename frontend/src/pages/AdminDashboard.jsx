import { useState, useEffect } from 'react';
import { Users, CheckCircle, Calendar as CalendarIcon, Clock, Activity, ArrowUpRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const mockChartData = [
  { name: 'Jan', volunteers: 400, hours: 2400 },
  { name: 'Feb', volunteers: 300, hours: 1398 },
  { name: 'Mar', volunteers: 200, hours: 9800 },
  { name: 'Apr', volunteers: 278, hours: 3908 },
  { name: 'May', volunteers: 189, hours: 4800 },
  { name: 'Jun', volunteers: 239, hours: 3800 },
  { name: 'Jul', volunteers: 349, hours: 4300 },
];

const AdminDashboard = () => {
  const [liveFeed, setLiveFeed] = useState([
    { id: 1, message: 'Sarah J. just registered.', time: '2 mins ago', type: 'user' },
    { id: 2, message: 'Beach Cleanup is now full.', time: '15 mins ago', type: 'event' },
    { id: 3, message: 'Michael R. logged 5 hours.', time: '1 hr ago', type: 'hours' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = ['New volunteer application received.', 'System backup completed.', 'Event "Park Drive" starts tomorrow.'];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setLiveFeed(prev => [{ id: Date.now(), message: randomMsg, time: 'Just now', type: 'system' }, ...prev.slice(0, 4)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 pb-12">
      <div className="flex justify-between items-center mb-8 bg-white/50 backdrop-blur-lg p-6 rounded-3xl border border-white/60 shadow-sm">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Command Center</h2>
          <p className="text-gray-500 mt-1">Real-time overview of VolunLink activity.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
          Generate Full Report <ArrowUpRight size={18} />
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Volunteers', value: '1,245', icon: Users, color: 'blue', trend: '+12%' },
          { label: 'Pending Approvals', value: '12', icon: CheckCircle, color: 'green', trend: '-2%' },
          { label: 'Active Events', value: '8', icon: CalendarIcon, color: 'indigo', trend: '+1' },
          { label: 'Total Hours Served', value: '14K', icon: Clock, color: 'yellow', trend: '+8%' }
        ].map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-white">
            <div className="flex justify-between items-start mb-4">
              <div className={`bg-${stat.color}-100 text-${stat.color}-600 p-3.5 rounded-2xl shadow-inner`}>
                <stat.icon size={26} />
              </div>
              <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                <TrendingUp size={12} /> {stat.trend}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
            <div className="text-4xl font-black text-gray-900 mt-2 tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-extrabold text-gray-900">Growth Metrics (2026)</h3>
            <select className="bg-gray-50 border-none text-sm font-bold rounded-xl focus:ring-0 cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="volunteers" stroke="#4f46e5" strokeWidth={4} fill="url(#colorVolunteers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <Activity className="text-indigo-400" />
            <h3 className="text-xl font-extrabold">Live Activity</h3>
            <span className="flex h-3 w-3 ml-auto relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div className="space-y-4 relative z-10">
            {liveFeed.map((feed) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={feed.id} className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-sm font-medium">{feed.message}</p>
                <span className="text-xs text-gray-400 mt-2 block">{feed.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Tables Section */}
      <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-gray-200/50 border border-white overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-gray-900">Pending Actions Required</h3>
          <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-bold">3 Urgent</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-100">
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">SJ</div>
                  Sarah Jenkins
                </td>
                <td className="px-6 py-4 text-gray-500">sarah.j@example.com</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-extrabold">Pending Approval</span></td>
                <td className="px-6 py-4 text-right"><button className="text-indigo-600 hover:text-indigo-800 font-extrabold bg-indigo-50 px-4 py-2 rounded-lg">Review</button></td>
              </tr>
              <tr className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">MR</div>
                  Michael Ross
                </td>
                <td className="px-6 py-4 text-gray-500">m.ross@example.com</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-extrabold">Active</span></td>
                <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600 font-extrabold bg-gray-50 px-4 py-2 rounded-lg">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
