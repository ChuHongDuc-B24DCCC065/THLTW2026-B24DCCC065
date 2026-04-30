import React from 'react';
import { Row, Col } from 'antd';
import StatCards from './components/StatCards';
import WorkoutBarChart from './components/WorkoutBarChart';
import WeightLineChart from './components/WeightLineChart';
import RecentWorkouts from './components/RecentWorkouts';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <StatCards />
        </Col>
        <Col xs={24} lg={12}>
          <WorkoutBarChart />
        </Col>
        <Col xs={24} lg={12}>
          <WeightLineChart />
        </Col>
        <Col span={24}>
          <RecentWorkouts />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;