import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ExerciseCard from './components/ExerciseCard';
import ExerciseModal from './components/ExerciseModal';
import ExerciseFilter from './components/ExerciseFilter';
import { IExercise } from './model';

const mockExercises: IExercise[] = [
  { id: '1', name: 'Bench Press', muscleGroup: 'Chest', level: 'Intermediate', description: 'Tập ngực với tạ đòn', caloriesPerHour: 400 },
  { id: '2', name: 'Pull Up', muscleGroup: 'Back', level: 'Advanced', description: 'Kéo xà', caloriesPerHour: 350 },
  { id: '3', name: 'Squat', muscleGroup: 'Legs', level: 'Intermediate', description: 'Squat với tạ', caloriesPerHour: 380 },
  { id: '4', name: 'Shoulder Press', muscleGroup: 'Shoulders', level: 'Beginner', description: 'Đẩy vai với tạ đơn', caloriesPerHour: 320 },
  { id: '5', name: 'Bicep Curl', muscleGroup: 'Arms', level: 'Beginner', description: 'Cuốn tạ tay', caloriesPerHour: 280 },
  { id: '6', name: 'Plank', muscleGroup: 'Core', level: 'Intermediate', description: 'Plank giữ thăng bằng', caloriesPerHour: 300 },
];

const ExercisePage : React.FC = () => {
  const [exercises, setExercises] = useState<IExercise[]>(mockExercises);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState<IExercise | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ muscleGroup: '', level: '' });

  const handleAdd = () => {
    setEditingExercise(null);
    setModalVisible(true);
  };

  const handleEdit = (exercise: IExercise) => {
    setEditingExercise(exercise);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  const handleSave = (data: any) => {
    if (editingExercise) {
      setExercises(exercises.map(e => e.id === editingExercise.id ? { ...data, id: e.id } : e));
    } else {
      setExercises([...exercises, { ...data, id: Date.now().toString() }]);
    }
    setModalVisible(false);
  };

  const filteredExercises = exercises.filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        ex.description.toLowerCase().includes(searchText.toLowerCase());
    const matchMuscle = !filters.muscleGroup || ex.muscleGroup === filters.muscleGroup;
    const matchLevel = !filters.level || ex.level === filters.level;
    return matchSearch && matchMuscle && matchLevel;
  });

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <ExerciseFilter onSearch={setSearchText} onFilter={setFilters} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ backgroundColor: '#ff4d4f' }}>
          Thêm bài tập
        </Button>
      </Space>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
        {filteredExercises.map(exercise => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      <ExerciseModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
        initialData={editingExercise}
      />
    </div>
  );
};

export default ExercisePage;