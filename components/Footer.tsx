import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-6 w-6 text-orange-500 rotate-45" />
              <span className="text-xl font-black text-white italic">FIT<span className="text-orange-500">FREE</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Unleash your potential. Gym-free workouts designed to build strength, endurance, and confidence. Anytime. Anywhere.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/workouts" className="hover:text-orange-500 transition-colors">Workouts</Link></li>
              <li><Link to="/quick-workouts" className="hover:text-orange-500 transition-colors">Quick Routines</Link></li>
              <li><Link to="/ai-coach" className="hover:text-orange-500 transition-colors">AI Coach</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-orange-600 transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-orange-600 transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-orange-600 transition-all"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} FitFree. Train Hard. Live Free.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;