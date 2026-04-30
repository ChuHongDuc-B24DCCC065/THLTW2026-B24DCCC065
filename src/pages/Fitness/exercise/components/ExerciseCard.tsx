import React from 'react';
import { Card, Tag, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, FireOutlined } from '@ant-design/icons';
import { Exercise } from '../model';

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onEdit, onDelete }) => {
  const getLevelColor = () => {
    switch (exercise.level) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'blue';
      case 'Advanced': return 'red';
      default: return 'default';
    }
  };

  return (
    <Card
      hoverable
      bordered={false}
      style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      actions={[
        <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => onEdit(exercise)}>
          Sửa
        </Button>,
        <Popconfirm key="delete" title="Xóa bài tập này?" onConfirm={() => onDelete(exercise.id)}>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ]}
    >
      <Card.Meta
        title={exercise.name}
        description={
          <div>
            <Tag color="purple">{exercise.muscleGroup}</Tag>
            <Tag color={getLevelColor()}>{exercise.level}</Tag>
            <p style={{ marginTop: 8 }}>{exercise.description}</p>
            <p><FireOutlined style={{ color: '#ff4d4f' }} /> {exercise.caloriesPerHour} cal/giờ</p>
          </div>
        }
      />
    </Card>
  );
};

export default ExerciseCard;