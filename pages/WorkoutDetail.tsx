import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, BarChart, ArrowLeft, Play, Square, CheckCircle, RotateCcw, Lock } from 'lucide-react';
import { WORKOUTS } from '../constants';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const workout = WORKOUTS.find(w => w.id === id);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  
  // Auth Context
  const { user, addWorkoutToHistory } = useAuth();
  const navigate = useNavigate();
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Parse duration string to seconds (e.g., "60s" -> 60, "2m" -> 120)
  const parseDuration = (durStr: string | undefined): number => {
    if (!durStr) return 0;
    if (durStr.includes('m')) return parseInt(durStr) * 60;
    if (durStr.includes('s')) return parseInt(durStr);
    return 0;
  };

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // When active exercise changes, set timer if applicable
  useEffect(() => {
    if (activeExercise !== null && workout) {
      const exercise = workout.exercises[activeExercise];
      if (exercise.duration) {
        setTimeLeft(parseDuration(exercise.duration));
        setIsTimerRunning(false); // Auto-start optional, forcing manual start for safety
      } else {
        setTimeLeft(0);
        setIsTimerRunning(false);
      }
    }
  }, [activeExercise, workout]);

  const toggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeExercise !== null && workout) {
      setTimeLeft(parseDuration(workout.exercises[activeExercise].duration));
      setIsTimerRunning(false);
    }
  };

  const markWorkoutComplete = () => {
    if (!user) {
      // If user is not logged in, redirect to login or show alert
      const confirmLogin = window.confirm("You need to be logged in to track progress. Login now?");
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    if (workout) {
      addWorkoutToHistory(workout.id, workout.title, workout.duration);
      setCompleted(true);
    }
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center flex-col text-white">
        <h2 className="text-3xl font-bold mb-4">Workout not found</h2>
        <Button to="/workouts">Back to Workouts</Button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-80 lg:h-[500px] w-full">
        <img 
          src={workout.imageUrl} 
          alt={workout.title} 
          className="w-full h-full object-cover fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30"></div>
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link to="/workouts" className="inline-flex items-center text-slate-300 hover:text-white transition-colors bg-black/40 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10">
            <ArrowLeft className="h-5 w-5 mr-1" /> Back
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-orange-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-900/50">{workout.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tight">{workout.title}</h1>
          <div className="flex items-center space-x-8 text-sm sm:text-lg font-medium text-slate-300">
             <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                {workout.duration} mins
             </div>
             <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-orange-500" />
                {workout.difficulty}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 md:p-10">
          
          <div className="mb-10">
            <h2 className="text-2xl font-black text-white uppercase italic mb-4">Briefing</h2>
            <p className="text-slate-400 leading-relaxed text-lg">{workout.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-black text-white uppercase italic">Session Flow <span className="text-orange-500">({workout.exercises.length})</span></h2>
              {completed ? (
                  <div className="flex items-center text-green-500 font-bold px-4 py-2 bg-green-900/20 rounded-lg border border-green-900 animate-fade-in">
                      <CheckCircle className="h-5 w-5 mr-2" /> Workout Completed
                  </div>
              ) : (
                   <div className="flex flex-col items-end">
                      <Button onClick={markWorkoutComplete} variant="primary" className="text-sm py-2">
                        Mark as Complete
                      </Button>
                      {!user && <span className="text-xs text-slate-500 mt-1 flex items-center"><Lock className="w-3 h-3 mr-1"/> Login to track</span>}
                   </div>
              )}
            </div>

            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className={`border rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                    activeExercise === index 
                      ? 'border-orange-500 bg-slate-800 ring-1 ring-orange-500 shadow-lg shadow-orange-900/20' 
                      : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                  }`}
                  onClick={() => setActiveExercise(index === activeExercise ? null : index)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center font-black text-lg mr-5 transition-colors ${
                      activeExercise === index ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h3 className={`text-lg font-bold uppercase ${activeExercise === index ? 'text-white' : 'text-slate-300'}`}>
                          {exercise.name}
                        </h3>
                        <span className="inline-block mt-1 sm:mt-0 text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded border border-slate-700 uppercase tracking-wide w-fit">
                          {exercise.reps ? `x${exercise.reps}` : exercise.duration}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{exercise.description}</p>
                      
                      {/* Interactive Timer for Duration Exercises */}
                      {activeExercise === index && exercise.duration && (
                        <div className="mt-6 p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-3xl font-bold text-orange-500 w-24">
                                    {formatTime(timeLeft)}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={toggleTimer}
                                        className={`p-2 rounded-lg flex items-center justify-center transition-colors ${isTimerRunning ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
                                    >
                                        {isTimerRunning ? <Square className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                                    </button>
                                    <button 
                                        onClick={resetTimer}
                                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                                    >
                                        <RotateCcw className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <span className="text-xs uppercase font-bold text-slate-500 hidden sm:block">Timer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;