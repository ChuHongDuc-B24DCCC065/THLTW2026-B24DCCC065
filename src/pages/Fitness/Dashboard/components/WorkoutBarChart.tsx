import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Tuần 1', workouts: 7 },
  { week: 'Tuần 2', workouts: 9 },
  { week: 'Tuần 3', workouts: 6 },
  { week: 'Tuần 4', workouts: 8 },
];

const WorkoutBarChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Chỉ render biểu đồ sau khi component đã mount để tránh lỗi SSR/Version
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card title="Số buổi tập theo tuần" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="workouts" fill="#ff4d4f" radius={[4, 4, 0, 0]} name="Số buổi tập" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WorkoutBarChart;