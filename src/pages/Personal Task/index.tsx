import { useState, useEffect } from 'react';
import { Layout, Typography, ConfigProvider, Button, Tabs } from 'antd';
import { PlusOutlined, DashboardOutlined, TableOutlined, AppstoreOutlined as KanbanOutlined } from '@ant-design/icons';

import DashboardCard from './components/DashboardCard';
import KanbanBoard from './components/KanbanBoard';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import { getTasks, saveTasks } from './localStorage';
import { Task } from './model';
import { DropResult } from 'react-beautiful-dnd';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load tasks từ localStorage khi component mount
  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks mỗi khi tasks thay đổi
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  // Thêm hoặc cập nhật task
  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      // Cập nhật task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      // Thêm task mới
      setTasks([...tasks, task]);
    }
    setIsModalVisible(false);
  };

  // Xóa task
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Mở modal chỉnh sửa
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  // Xử lý drag & drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Nếu không có destination hoặc drop vào vị trí cũ
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Cập nhật status của task
    const updatedTasks = tasks.map(task => {
      if (task.id === draggableId) {
        return {
          ...task,
          status: destination.droppableId as 'todo' | 'inprogress' | 'done'
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Mở modal thêm mới
  const openAddModal = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  // Cấu hình các tab
  const tabItems = [
    {
      key: 'dashboard',
      label: (
        <span>
          <DashboardOutlined />
          <span style={{ marginLeft: 8 }}>Dashboard</span>
        </span>
      ),
      children: <DashboardCard tasks={tasks} />,
    },
    {
      key: 'kanban',
      label: (
        <span>
          <KanbanOutlined />
          <span style={{ marginLeft: 8 }}>Kanban Board</span>
        </span>
      ),
      children: (
        <KanbanBoard 
          tasks={tasks} 
          onDragEnd={handleDragEnd}
          onEditTask={handleEditTask}
        />
      ),
    },
    {
      key: 'table',
      label: (
        <span>
          <TableOutlined />
          <span style={{ marginLeft: 8 }}>Task Table</span>
        </span>
      ),
      children: (
        <TaskTable 
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ),
    },
  ];

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Title level={3} style={{ color: 'white', margin: 0, fontWeight: 600 }}>
            📊 Fitness Kanban Board
          </Title>
          <div style={{ flex: 1 }} />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={openAddModal}
            style={{ backgroundColor: '#fff', color: '#667eea', border: 'none' }}
          >
            Thêm công việc
          </Button>
        </Header>

        <Content style={{ padding: '24px 32px' }}>
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            size="large"
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            {tabItems.map(item => (
              <Tabs.TabPane key={item.key} tab={item.label}>
                {item.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Content>

        <TaskForm
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSave={handleSaveTask}
          editingTask={editingTask}
        />
      </Layout>
    </ConfigProvider>
  );
}