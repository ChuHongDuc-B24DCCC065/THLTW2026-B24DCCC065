import React from 'react';
import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: '01/10', weight: 72 },
  { date: '08/10', weight: 71.5 },
  { date: '15/10', weight: 71 },
  { date: '22/10', weight: 70.5 },
  { date: '29/10', weight: 70 },
];

const WeightLineChart: React.FC = () => {
  return (
    <Card title="Biểu đồ cân nặng" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[65, 75]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#ff4d4f" name="Cân nặng (kg)" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeightLineChart;