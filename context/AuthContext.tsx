import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, WorkoutHistory } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addWorkoutToHistory: (workoutId: string, title: string, duration: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fitfree_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('fitfree_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password from state for security
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('fitfree_current_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('fitfree_users') || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      return false; // User exists
    }

    const newUser: User = {
      name,
      email,
      password,
      stats: {
        totalWorkouts: 0,
        totalMinutes: 0,
        streak: 0,
        lastWorkoutDate: null
      },
      history: []
    };

    users.push(newUser);
    localStorage.setItem('fitfree_users', JSON.stringify(users));
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('fitfree_current_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitfree_current_user');
  };

  const addWorkoutToHistory = (workoutId: string, title: string, duration: number) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const newHistoryItem: WorkoutHistory = {
      workoutId,
      workoutTitle: title,
      date: new Date().toISOString(),
      duration
    };

    // Calculate Streak
    let newStreak = user.stats.streak;
    const lastDate = user.stats.lastWorkoutDate ? user.stats.lastWorkoutDate.split('T')[0] : null;

    if (lastDate === today) {
      // Already worked out today, streak stays same
    } else if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      if (lastDate === yesterdayString) {
        newStreak += 1;
      } else {
        newStreak = 1; // Streak broken
      }
    } else {
      newStreak = 1; // First workout
    }

    const updatedUser: User = {
      ...user,
      stats: {
        totalWorkouts: user.stats.totalWorkouts + 1,
        totalMinutes: user.stats.totalMinutes + duration,
        streak: newStreak,
        lastWorkoutDate: new Date().toISOString()
      },
      history: [newHistoryItem, ...user.history]
    };

    setUser(updatedUser);
    localStorage.setItem('fitfree_current_user', JSON.stringify(updatedUser));

    // Update the main database as well
    const users = JSON.parse(localStorage.getItem('fitfree_users') || '[]');
    const updatedUsers = users.map((u: User) => u.email === user.email ? { ...updatedUser, password: u.password } : u);
    localStorage.setItem('fitfree_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, addWorkoutToHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};