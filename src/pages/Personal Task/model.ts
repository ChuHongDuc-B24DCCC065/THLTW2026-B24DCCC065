// Định nghĩa các kiểu dữ liệu cho ứng dụng

export type TaskStatus = 'todo' | 'inprogress' | 'done';
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string; // ISO date string
  priority: Priority;
  tags: string[];
  createdAt: string; // ISO date string
}

// Mapping cho màu sắc theo priority
export const priorityColor = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a'
};

// Mapping cho tên hiển thị status
export const statusLabels = {
  todo: '📝 Cần làm',
  inprogress: '⚡ Đang làm',
  done: '✅ Hoàn thành'
};