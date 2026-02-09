import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black uppercase italic mb-6">Who We Are</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Democratizing fitness for everyone. No fees. No excuses. Just results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic mb-6">The Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              FitFree was forged from a simple belief: elite fitness shouldn't be gated by expensive memberships or complex equipment. 
              We are a collective of digital fitness enthusiasts building the ultimate open platform for home warriors.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Whether you're squeezing in 15 minutes before work or crushing a weekend session, 
              we provide the structure you need to perform at your peak.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Home Workout" 
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-orange-500/50 transition-all hover:-translate-y-1">
             <div className="inline-flex p-4 bg-slate-800 rounded-full mb-6">
                <Target className="h-8 w-8 text-orange-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-3 uppercase">Precision</h3>
             <p className="text-slate-400">Targeted routines designed to hit specific muscle groups efficiently.</p>
           </div>
           <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-orange-500/50 transition-all hover:-translate-y-1">
             <div className="inline-flex p-4 bg-slate-800 rounded-full mb-6">
                <Heart className="h-8 w-8 text-red-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-3 uppercase">Vitality</h3>
             <p className="text-slate-400">Sustainable habits that improve cardiovascular health and longevity.</p>
           </div>
           <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-orange-500/50 transition-all hover:-translate-y-1">
             <div className="inline-flex p-4 bg-slate-800 rounded-full mb-6">
                <Award className="h-8 w-8 text-yellow-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-3 uppercase">Excellence</h3>
             <p className="text-slate-400">Curated by experts to ensure form, safety, and maximum output.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;