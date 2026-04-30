import React from 'react';
import { Card, Timeline, Tag } from 'antd';
import { ClockCircleOutlined, FireOutlined } from '@ant-design/icons';

const recentWorkouts = [
  { id: '1', date: '2024-10-28', type: 'Cardio', duration: 30, calories: 250, status: 'completed' },
  { id: '2', date: '2024-10-27', type: 'Strength', duration: 45, calories: 320, status: 'completed' },
  { id: '3', date: '2024-10-26', type: 'Yoga', duration: 60, calories: 180, status: 'completed' },
  { id: '4', date: '2024-10-25', type: 'HIIT', duration: 25, calories: 300, status: 'completed' },
  { id: '5', date: '2024-10-24', type: 'Cardio', duration: 35, calories: 280, status: 'missed' },
];

const RecentWorkouts: React.FC = () => {
  return (
    <Card title="5 buổi tập gần nhất" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Timeline>
  {recentWorkouts.map((workout) => (
    <Timeline.Item
      key={workout.id}
      dot={workout.status === 'completed' ? <ClockCircleOutlined /> : <FireOutlined />}
      color={workout.status === 'completed' ? 'green' : 'red'}
    >
      <div>
        <strong>{workout.date}</strong> - {workout.type}
        <br />
        <Tag color={workout.status === 'completed' ? 'green' : 'red'}>
          {workout.status === 'completed' ? 'Hoàn thành' : 'Bỏ lỡ'}
        </Tag>
        <span style={{ marginLeft: 8 }}>{workout.duration} phút</span>
      </div>
    </Timeline.Item>
  ))}
</Timeline>
    </Card>
  );
};

export default RecentWorkouts;