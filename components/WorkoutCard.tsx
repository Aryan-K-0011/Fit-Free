import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-950/30 border-green-900/50',
    Intermediate: 'text-yellow-400 bg-yellow-950/30 border-yellow-900/50',
    Advanced: 'text-red-400 bg-red-950/30 border-red-900/50',
  };

  return (
    <Link to={`/workout/${workout.id}`} className="group flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/10">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={workout.imageUrl} 
          alt={workout.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-slate-950/80 text-white border border-slate-700 backdrop-blur-sm">
            {workout.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative">
        <h3 className="text-xl font-black text-white mb-2 group-hover:text-orange-500 transition-colors uppercase italic tracking-tight">
          {workout.title}
        </h3>
        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
          {workout.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>{workout.duration} min</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${difficultyColor[workout.difficulty]} flex items-center gap-1`}>
             <Zap className="h-3 w-3" />
            {workout.difficulty}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;