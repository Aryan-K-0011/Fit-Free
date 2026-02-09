import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Quick Routines', path: '/quick-workouts' },
    { name: 'AI Coach', path: '/ai-coach' },
    { name: 'About', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "text-orange-500 font-bold" 
      : "text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-md px-3 py-2 transition-all";
  };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-orange-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-orange-900/50">
                <Dumbbell className="h-6 w-6 text-white rotate-45" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter italic">
                FIT<span className="text-orange-500">FREE</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-wider ${isActive(link.path)}`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-800">
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-2 text-sm uppercase font-bold ${isActive('/dashboard')}`}
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm uppercase font-bold text-slate-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="ml-4 px-5 py-2.5 rounded-lg bg-orange-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 flex items-center gap-2"
              >
                <User className="h-4 w-4" /> Login
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-bold uppercase ${
                  location.pathname === link.path 
                    ? "bg-slate-800 text-orange-500" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
             
             <div className="border-t border-slate-800 mt-2 pt-2">
               {user ? (
                 <>
                   <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-bold uppercase text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-3 rounded-md text-base font-bold uppercase text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Logout
                    </button>
                 </>
               ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-bold uppercase text-orange-500 hover:bg-slate-800 hover:text-white"
                  >
                    Login / Register
                  </Link>
               )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;