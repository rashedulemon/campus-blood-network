import { Droplet, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary rounded-md text-white">
                <Droplet size={20} className="fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Campus Blood Network
              </span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Connecting university students to save lives. A modern approach to blood donor management and emergency response.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Built with</span>
              <Heart size={14} className="text-primary fill-primary" />
              <span>for the student community.</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="hover:text-primary transition-colors">Find Blood</Link></li>
              <li><Link to="/emergency" className="hover:text-primary transition-colors">Emergency Requests</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register as Donor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support & Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="https://rashedulemon.github.io/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Campus Blood Network. All rights reserved.
          </p>
          <div className="text-sm text-slate-500">
            University Blood Management System
          </div>
        </div>
      </div>
    </footer>
  );
}
