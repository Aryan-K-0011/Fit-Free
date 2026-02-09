import React from 'react';
import { Navigate } from 'react-router-dom';
import { Clock, Trophy, Flame, Calendar, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            Dashboard
          </h1>
          <p className="text-xl text-slate-400 mt-2">
            Welcome back, <span className="text-orange-500 font-bold">{user.name}</span>. Let's look at your numbers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Workouts Completed */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Trophy className="h-24 w-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                 <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-slate-400 font-bold uppercase text-sm tracking-wider">Total Workouts</h3>
              <p className="text-4xl font-black text-white mt-1">{user.stats.totalWorkouts}</p>
            </div>
          </div>

          {/* Minutes Trained */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Clock className="h-24 w-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-900/30 text-green-400 rounded-xl flex items-center justify-center mb-4">
                 <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-slate-400 font-bold uppercase text-sm tracking-wider">Minutes Trained</h3>
              <p className="text-4xl font-black text-white mt-1">{user.stats.totalMinutes}</p>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Flame className="h-24 w-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-900/30 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                 <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-slate-400 font-bold uppercase text-sm tracking-wider">Current Streak</h3>
              <p className="text-4xl font-black text-white mt-1">{user.stats.streak} <span className="text-base text-slate-500 font-normal">days</span></p>
            </div>
          </div>
        </div>

        {/* Workout History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
               <h2 className="text-xl font-bold text-white uppercase italic">Recent Activity</h2>
               <Button to="/workouts" variant="outline" className="text-xs px-4 py-2">Start New</Button>
             </div>
             
             {user.history.length > 0 ? (
               <div className="divide-y divide-slate-800">
                 {user.history.slice(0, 5).map((session, idx) => (
                   <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="bg-slate-800 p-3 rounded-lg text-orange-500">
                           <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">{session.workoutTitle}</h4>
                           <p className="text-slate-500 text-sm flex items-center gap-2">
                             <Calendar className="h-3 w-3" />
                             {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="block font-bold text-white text-lg">+{session.duration}</span>
                        <span className="text-xs text-slate-500 uppercase font-bold">Mins</span>
                     </div>
                   </div>
                 ))}
                 {user.history.length > 5 && (
                    <div className="p-4 text-center text-slate-500 text-sm">
                        Showing last 5 sessions
                    </div>
                 )}
               </div>
             ) : (
               <div className="p-12 text-center flex flex-col items-center">
                  <div className="bg-slate-800 p-6 rounded-full mb-4">
                    <Activity className="h-8 w-8 text-slate-500" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">No activity yet</h3>
                  <p className="text-slate-400 mb-6">Complete your first workout to see your stats here.</p>
                  <Button to="/workouts">Browse Workouts</Button>
               </div>
             )}
           </div>

           {/* Motivation / Next Steps */}
           <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
                 <h2 className="text-2xl font-black uppercase italic mb-4">Keep Pushing</h2>
                 <p className="text-orange-100 text-lg mb-6 leading-relaxed">
                    "Success isn't always about greatness. It's about consistency. Consistent hard work gains success. Greatness will come."
                 </p>
                 <div className="h-1 w-20 bg-white/30 rounded-full"></div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
                 <h2 className="text-xl font-bold text-white uppercase italic mb-4">Recommended Next</h2>
                 <p className="text-slate-400 mb-6">Based on your activity, we recommend trying something different today.</p>
                 <div className="grid grid-cols-1 gap-4">
                    <Button to="/workouts" variant="secondary" className="w-full justify-between group">
                       Browse Strength Training <Clock className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                    </Button>
                     <Button to="/ai-coach" variant="outline" className="w-full justify-between">
                       Ask Coach for Plan <Calendar className="h-5 w-5" />
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;