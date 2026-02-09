import React, { useState, useMemo } from 'react';
import { Search, Filter, Dumbbell } from 'lucide-react';
import WorkoutCard from '../components/WorkoutCard';
import { WORKOUTS } from '../constants';

const Workouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Flexibility'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredWorkouts = useMemo(() => {
    return WORKOUTS.filter(workout => {
      const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || workout.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchTerm, selectedDifficulty, selectedCategory]);

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-4">Workout Library</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Browse our complete collection of equipment-free routines.</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search workouts..."
                className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-xl leading-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="sr-only">Category</label>
              <select
                id="category"
                className="block w-full pl-4 pr-10 py-3 text-base bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent rounded-xl transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty" className="sr-only">Difficulty</label>
              <select
                id="difficulty"
                className="block w-full pl-4 pr-10 py-3 text-base bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent rounded-xl transition-all"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(d => <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="inline-flex p-4 bg-slate-800 rounded-full mb-4">
               <Dumbbell className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white">No workouts found</h3>
            <p className="mt-2 text-slate-400">Try adjusting your search or filters.</p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                }}
                className="inline-flex items-center px-6 py-3 border border-slate-700 shadow-sm text-sm font-bold rounded-lg text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all uppercase"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;