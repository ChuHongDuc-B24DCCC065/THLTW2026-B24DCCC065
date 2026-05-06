import { Task } from './model';

const STORAGE_KEY = 'kanban_tasks';

// Lấy danh sách tasks từ localStorage
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  if (!tasks) {
    // Khởi tạo dữ liệu mẫu nếu chưa có
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Thiết kế UI cho Kanban Board',
        description: 'Tạo giao diện hiện đại, responsive',
        status: 'todo',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        tags: ['design', 'ui'],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Xử lý logic drag and drop',
        description: 'Tích hợp react-beautiful-dnd',
        status: 'inprogress',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        tags: ['development', 'dnd'],
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Viết unit tests',
        description: 'Test các component chính',
        status: 'done',
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'low',
        tags: ['testing'],
        createdAt: new Date().toISOString()
      }
    ];
    saveTasks(sampleTasks);
    return sampleTasks;
  }
  return JSON.parse(tasks);
};

// Lưu danh sách tasks vào localStorage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};