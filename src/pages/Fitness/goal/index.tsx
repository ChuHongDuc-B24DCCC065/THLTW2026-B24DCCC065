import React, { useState } from 'react';
import { Button, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GoalCard from './components/GoalCard';
import GoalDrawer from './components/GoalDrawer';
import GoalFilter from './components/GoalFilter';
import { Goal } from './model';

const mockGoals: Goal[] = [
  { id: '1', name: 'Giảm cân xuống 68kg', type: 'weight', targetValue: 68, currentValue: 70, deadline: '2024-12-31', status: 'active' },
  { id: '2', name: 'Tập 50 buổi trong tháng', type: 'workout', targetValue: 50, currentValue: 28, deadline: '2024-11-30', status: 'active' },
  { id: '3', name: 'Đốt 15,000 calo', type: 'calorie', targetValue: 15000, currentValue: 3420, deadline: '2024-12-31', status: 'active' },
];

const GoalPage : React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleAdd = () => {
    setEditingGoal(null);
    setDrawerVisible(true);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setDrawerVisible(true);
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleUpdateInline = (id: string, currentValue: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, currentValue } : g));
  };

  const handleSave = (data: any) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...data, id: g.id } : g));
    } else {
      setGoals([...goals, { ...data, id: Date.now().toString(), status: 'active' }]);
    }
    setDrawerVisible(false);
  };

  const filteredGoals = filterStatus === 'all' 
    ? goals 
    : goals.filter(g => g.status === filterStatus);

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <GoalFilter onFilter={setFilterStatus} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ backgroundColor: '#ff4d4f' }}>
          Thêm mục tiêu
        </Button>
      </Space>
      <Row gutter={[16, 16]}>
        {filteredGoals.map(goal => (
          <Col xs={24} sm={12} lg={8} key={goal.id}>
            <GoalCard 
              goal={goal} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onUpdateInline={handleUpdateInline}
            />
          </Col>
        ))}
      </Row>
      <GoalDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSave={handleSave}
        initialData={editingGoal}
      />
    </div>
  );
};

export default GoalPage;