import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplet, Heart, Search, Activity, Users, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useFirestore';

export default function LandingPage() {
  const { currentUser } = useAuth();
  const { data: users } = useCollection('users');
  const { data: requests } = useCollection('bloodRequests');

  const donorCount = users ? users.length : 0;
  const activeDonorsCount = users ? users.filter(u => u.available).length : 0;
  const requestsCount = requests ? requests.length : 0;

  const stats = [
    { label: "Registered Donors", value: donorCount.toString(), icon: <Users className="text-primary" /> },
    { label: "Available Donors", value: activeDonorsCount.toString(), icon: <Heart className="text-primary" /> },
    { label: "Emergency Requests", value: requestsCount.toString(), icon: <Activity className="text-primary" />, link: "/emergency" }
  ];

  const features = [
    {
      title: "Quick Search",
      description: "Find blood donors matching your exact needs within seconds.",
      icon: <Search size={24} className="text-primary" />
    },
    {
      title: "Real-time Requests",
      description: "Post emergency requirements and get instant responses from nearby donors.",
      icon: <Activity size={24} className="text-primary" />
    },
    {
      title: "Verified Community",
      description: "All our donors are verified university students ensuring safety and trust.",
      icon: <Shield size={24} className="text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-primary font-medium text-sm mb-8 border border-red-100 shadow-sm"
            >
              <Heart size={16} className="fill-current" />
              <span>Donate Blood, Save Lives</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              The University's Trusted <br className="hidden md:block" />
              <span className="text-primary">Blood Donation</span> Network
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Join the largest student community dedicated to emergency blood response. 
              Find donors instantly or become a hero today.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            >
              <Link 
                to="/search" 
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Find Blood Now
              </Link>
              
              <Link 
                to="/emergency" 
                className="px-8 py-4 bg-red-50 text-red-700 rounded-xl font-semibold text-lg border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Activity size={20} />
                Emergencies
              </Link>

              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={20} />
                  Go to Dashboard
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Droplet size={20} />
                  Register as Donor
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center overflow-hidden ${stat.link ? 'hover:border-primary/30 hover:shadow-md transition-all cursor-pointer' : ''}`}
              >
                {stat.link ? (
                  <Link to={stat.link} className="w-full h-full p-8 flex flex-col items-center">
                    <div className="p-4 bg-red-50 rounded-2xl mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                    <p className="text-slate-500 font-medium hover:text-primary transition-colors">{stat.label} &rarr;</p>
                  </Link>
                ) : (
                  <div className="w-full h-full p-8 flex flex-col items-center">
                    <div className="p-4 bg-red-50 rounded-2xl mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                    <p className="text-slate-500 font-medium">{stat.label}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Network?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've built a platform that makes finding and donating blood as seamless as possible for the university community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-center">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to make a difference?</h2>
          <p className="text-xl text-slate-300 mb-10">
            A single donation can save up to three lives. Join our community of student heroes.
          </p>
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light transition-all shadow-lg"
            >
              Go to your Dashboard
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light transition-all shadow-lg"
            >
              Become a Hero Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
