import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplet, User, LogOut, Shield } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Blood', path: '/search' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg text-white">
                <Droplet size={24} className="fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
                Campus Blood Network
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 transition-colors ${
                    link.name === 'Emergency' 
                      ? 'text-red-600 hover:text-red-700 font-bold' 
                      : 'text-slate-600 hover:text-primary font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l pl-6 border-slate-200">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to={userData?.role === 'admin' ? '/admin' : '/dashboard'}
                    className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors font-medium"
                  >
                    {userData?.role === 'admin' ? <Shield size={18} className="text-primary" /> : <User size={18} />}
                    <span className={userData?.role === 'admin' ? 'text-primary font-bold' : ''}>
                      {userData?.role === 'admin' ? 'Admin Dashboard' : (userData?.fullName?.split(' ')[0] || 'Dashboard')}
                    </span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-primary transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-primary font-medium transition-colors">
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
                  >
                    Become a Donor
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium ${
                    link.name === 'Emergency'
                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-slate-200 pt-4 mt-2">
                {currentUser ? (
                  <>
                    <Link
                      to={userData?.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50"
                    >
                      {userData?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2 px-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2 border border-slate-300 rounded-lg text-slate-700 font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2 bg-primary text-white rounded-lg font-medium"
                    >
                      Become a Donor
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
