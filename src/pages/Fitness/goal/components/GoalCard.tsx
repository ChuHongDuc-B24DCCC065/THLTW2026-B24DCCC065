import React from 'react';
import { Card, Progress, Tag, Space, Button, Popconfirm, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Goal } from '../model';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateInline: (id: string, value: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, onUpdateInline }) => {
  const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  
  const getStatusColor = () => {
    if (goal.status === 'completed') return 'green';
    if (goal.status === 'failed') return 'red';
    return 'blue';
  };

  const getUnit = () => {
    switch (goal.type) {
      case 'weight': return 'kg';
      case 'workout': return 'buổi';
      case 'calorie': return 'calo';
      default: return '';
    }
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      actions={[
        <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => onEdit(goal)}>
          Sửa
        </Button>,
        <Popconfirm key="delete" title="Xóa mục tiêu này?" onConfirm={() => onDelete(goal.id)}>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ]}
    >
      <div>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <h3>{goal.name}</h3>
          <Tag color={getStatusColor()}>{goal.status}</Tag>
        </Space>
        <p>Loại: {goal.type === 'weight' ? 'Cân nặng' : goal.type === 'workout' ? 'Buổi tập' : 'Calo'}</p>
        <p>Mục tiêu: {goal.targetValue} {getUnit()}</p>
        <div>
          <span>Hiện tại: </span>
          <InputNumber
            value={goal.currentValue}
            onChange={(value) => onUpdateInline(goal.id, value || 0)}
            style={{ width: 100 }}
          />
          <span> {getUnit()}</span>
        </div>
        <Progress percent={progress} strokeColor="#ff4d4f" />
        <p>Hạn: {goal.deadline}</p>
      </div>
    </Card>
  );
};

export default GoalCard;