import React from 'react';
import { Timer } from 'lucide-react';
import WorkoutCard from '../components/WorkoutCard';
import { WORKOUTS } from '../constants';

const QuickWorkouts: React.FC = () => {
  // Filter for workouts 15 minutes or less
  const quickWorkouts = WORKOUTS.filter(workout => workout.duration <= 15);

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="p-4 bg-orange-900/20 rounded-full mb-6 ring-1 ring-orange-500/50">
            <Timer className="h-10 w-10 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-4">Quick <span className="text-orange-500">Hits</span></h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Short on time? These effective routines take 15 minutes or less. High impact, low time commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
        
        {quickWorkouts.length === 0 && (
          <p className="text-center text-slate-500">No quick workouts found at the moment. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default QuickWorkouts;