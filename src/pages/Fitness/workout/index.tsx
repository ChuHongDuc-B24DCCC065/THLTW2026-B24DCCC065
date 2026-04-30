import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import WorkoutTable from './components/WorkoutTable';
import WorkoutFormModal from './components/WorkoutFormModal';
import WorkoutFilter from './components/WorkoutFilter';
import { Workout } from './model';

const mockWorkouts: Workout[] = [
  { id: '1', date: '2024-10-28', type: 'Cardio', duration: 30, calories: 250, note: 'Chạy bộ buổi sáng', status: 'completed' },
  { id: '2', date: '2024-10-27', type: 'Strength', duration: 45, calories: 320, note: 'Tập ngực và vai', status: 'completed' },
  { id: '3', date: '2024-10-26', type: 'Yoga', duration: 60, calories: 180, note: 'Yoga thư giãn', status: 'completed' },
  { id: '4', date: '2024-10-25', type: 'HIIT', duration: 25, calories: 300, note: 'HIIT cường độ cao', status: 'completed' },
  { id: '5', date: '2024-10-24', type: 'Cardio', duration: 35, calories: 280, note: 'Đạp xe', status: 'missed' },
];

const WorkoutPage : React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ type: '', dateRange: { start: '', end: '' } });

  const handleAdd = () => {
    setEditingWorkout(null);
    setModalVisible(true);
  };

  const handleEdit = (record: Workout) => {
    setEditingWorkout(record);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const handleSave = (data: any) => {
    if (editingWorkout) {
      setWorkouts(workouts.map(w => w.id === editingWorkout.id ? { ...w, ...data } : w));
    } else {
      setWorkouts([...workouts, { ...data, id: Date.now().toString() }]);
    }
    setModalVisible(false);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <WorkoutFilter onSearch={setSearchText} onFilter={setFilters} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ backgroundColor: '#ff4d4f' }}>
          Thêm buổi tập
        </Button>
      </Space>
      <WorkoutTable 
        data={workouts} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        searchText={searchText}
        filters={filters}
      />
      <WorkoutFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
        initialData={editingWorkout}
      />
    </div>
  );
};

export default WorkoutPage;