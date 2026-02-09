export interface Exercise {
  name: string;
  reps?: string;
  duration?: string;
  description: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Flexibility';
  imageUrl: string;
  exercises: Exercise[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface WorkoutHistory {
  workoutId: string;
  workoutTitle: string;
  date: string; // ISO string
  duration: number;
}

export interface User {
  email: string;
  name: string;
  password?: string; // In a real app, never store plain text passwords
  stats: {
    totalWorkouts: number;
    totalMinutes: number;
    streak: number;
    lastWorkoutDate: string | null;
  };
  history: WorkoutHistory[];
}