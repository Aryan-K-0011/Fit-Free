import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Trophy, Users, Activity } from 'lucide-react';
import Button from '../components/Button';
import WorkoutCard from '../components/WorkoutCard';
import BMICalculator from '../components/BMICalculator';
import { WORKOUTS } from '../constants';

const Home: React.FC = () => {
  const featuredWorkouts = WORKOUTS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-20 grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/30 border border-orange-500/30 text-orange-400 text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
              <Zap className="h-4 w-4" /> No Gym? No Limits.
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
              Forged <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">At Home.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-xl mb-10 leading-relaxed font-light">
              Master your bodyweight with intense, equipment-free workouts designed for the busy warrior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/workouts" variant="primary" className="text-lg px-8 py-4 shadow-orange-500/20">
                Start Training <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button to="/quick-workouts" variant="outline" className="text-lg px-8 py-4">
                Quick Sessions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features & BMI Grid */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* Features Column */}
             <div className="lg:col-span-2 space-y-12">
                <div className="mb-12">
                   <h2 className="text-3xl font-black text-white uppercase italic mb-4">Why FitFree?</h2>
                   <p className="text-slate-400 text-lg">We strip away the excuses. Pure fitness logic applied to home environments.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                    <div className="w-12 h-12 bg-orange-900/30 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Activity className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">High Intensity</h3>
                    <p className="text-slate-400">Condensed intervals to spike metabolism and burn fat in minutes.</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                    <div className="w-12 h-12 bg-orange-900/30 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Zero Gear</h3>
                    <p className="text-slate-400">Bodyweight mastery. Push-ups, squats, and core work anytime.</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                    <div className="w-12 h-12 bg-orange-900/30 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">All Levels</h3>
                    <p className="text-slate-400">Scalable movements for beginners to elite athletes.</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                    <div className="w-12 h-12 bg-orange-900/30 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Track Progress</h3>
                    <p className="text-slate-400">Stay consistent with our structured plans and AI guidance.</p>
                  </div>
                </div>
             </div>

             {/* BMI Column */}
             <div className="lg:col-span-1">
                <BMICalculator />
             </div>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-white uppercase italic">Trending Workouts</h2>
              <p className="mt-2 text-slate-400">Popular routines crushing it this week.</p>
            </div>
            <Link to="/workouts" className="flex items-center text-orange-500 font-bold uppercase tracking-wider hover:text-white transition-colors">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Coach Teaser */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600">
             <div className="absolute inset-0 bg-black opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-black/40"></div>
        </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-orange-200 font-bold uppercase tracking-widest mb-2 block">Powered by Gemini AI</span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-6">Your Pocket Personal Trainer</h2>
              <p className="text-white/90 text-xl mb-10 leading-relaxed">
                Stuck? Need a custom plan? Our AI Coach creates tailored routines based on your time, energy, and goals instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button to="/ai-coach" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 bg-white/10 backdrop-blur-sm">
                    Ask AI Coach
                  </Button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
                <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-700/50 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                   <div className="space-y-4">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">AI</div>
                         <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-200 text-sm">
                            Ready to crush it today? How much time do you have?
                         </div>
                      </div>
                      <div className="flex gap-4 flex-row-reverse">
                         <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">ME</div>
                         <div className="bg-orange-600 p-4 rounded-2xl rounded-tr-none text-white text-sm">
                            Only 15 mins. Focus on abs!
                         </div>
                      </div>
                       <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">AI</div>
                         <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-200 text-sm">
                            Got it. Here is a high-intensity core circuit...
                         </div>
                      </div>
                   </div>
                </div>
            </div>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;