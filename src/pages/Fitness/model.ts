export interface StatData {
  totalWorkouts: number;
  totalCalories: number;
  streak: number;
  goalProgress: number;
}

export interface WeeklyWorkout {
  week: string;
  workouts: number;
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface RecentWorkout {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
}