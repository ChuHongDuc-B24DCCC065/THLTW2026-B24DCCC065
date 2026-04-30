export interface Workout {
  id: string;
  date: string;
  type: 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
  duration: number;
  calories: number;
  note: string;
  status: 'completed' | 'missed';
}

export interface WorkoutFormData {
  date: string;
  type: 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
  duration: number;
  calories: number;
  note: string;
  status: 'completed' | 'missed';
}