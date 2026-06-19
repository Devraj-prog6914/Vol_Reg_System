import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col w-full scroll-smooth">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113513832-f45d4cb57fae?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 filter blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-40 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Make a Difference, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                One Act at a Time.
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Join our global community of volunteers. Discover meaningful events, track your impact, and earn certificates for your dedication to creating positive change.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-300 hover:shadow-indigo-400 hover:-translate-y-1">
                Start Volunteering <ArrowRight size={20} />
              </Link>
              <a href="#about" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-700 border border-gray-200 font-semibold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:-translate-y-1">
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Active Volunteers', value: '10K+' },
              { label: 'Successful Events', value: '500+' },
              { label: 'Hours Donated', value: '1M+' },
              { label: 'Cities Worldwide', value: '50+' }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">{stat.value}</div>
                <div className="text-indigo-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Why Join VolunLink?</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">We provide the tools and opportunities you need to make a lasting impact while growing personally and professionally.</motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: Calendar, title: 'Flexible Scheduling', desc: "Find opportunities that fit your schedule. From weekend drives to virtual mentoring, there's always a way to help.", color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: Users, title: 'Community Networking', desc: "Connect with like-minded individuals, build your professional network, and make lifelong friends.", color: 'text-green-600', bg: 'bg-green-100' },
              { icon: Award, title: 'Earn Certificates', desc: "Automatically generate verified PDF certificates for your served hours to boost your resume.", color: 'text-yellow-600', bg: 'bg-yellow-100' }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 transition-all">
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Section (Mock) */}
      <section id="events" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Upcoming Events</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">Discover opportunities to make a difference near you.</motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: 'Local Park Cleanup', img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?q=80&w=800&auto=format&fit=crop' },
              { title: 'Food Bank Drive', img: 'https://images.unsplash.com/photo-1593113513832-f45d4cb57fae?q=80&w=800&auto=format&fit=crop' },
              { title: 'Elderly Tech Support', img: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=800&auto=format&fit=crop' }
            ].map((event, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                  <img src={event.img} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-indigo-600 font-bold mb-2">Community • This Weekend</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">Join us to make a lasting impact in the community for the upcoming season.</p>
                  <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1">Register Now <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-6 text-white">Get in Touch</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-10">Have questions about organizing an event or partnering with us? We'd love to hear from you.</motion.p>
          <motion.form 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} 
            className="max-w-md mx-auto space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              import('react-hot-toast').then(toast => {
                toast.default.success("Message sent successfully! We'll get back to you soon.");
                e.target.reset();
              });
            }}
          >
            <input required type="email" placeholder="Your Email Address" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea required placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            <button type="submit" className="w-full py-3 px-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors">Send Message</button>
          </motion.form>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
