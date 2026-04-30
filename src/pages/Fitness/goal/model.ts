export interface Goal {
  id: string;
  name: string;
  type: 'weight' | 'workout' | 'calorie';
  targetValue: number;
  currentValue: number;
  deadline: string;
  status: 'active' | 'completed' | 'failed';
}