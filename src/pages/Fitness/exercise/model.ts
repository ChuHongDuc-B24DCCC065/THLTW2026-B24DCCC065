export interface IExercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  caloriesPerHour: number;
}