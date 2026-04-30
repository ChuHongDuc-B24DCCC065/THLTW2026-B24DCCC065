import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { FireOutlined, CalendarOutlined, RiseOutlined, TrophyOutlined } from '@ant-design/icons';

const StatCards: React.FC = () => {
  const stats = {
    totalWorkouts: 28,
    totalCalories: 3420,
    streak: 12,
    goalProgress: 78,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Tổng buổi tập trong tháng"
            value={stats.totalWorkouts}
            prefix={<CalendarOutlined style={{ color: '#ff4d4f' }} />}
            suffix="buổi"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Tổng calo đã đốt"
            value={stats.totalCalories}
            prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
            suffix="kcal"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Số ngày tập liên tiếp"
            value={stats.streak}
            prefix={<RiseOutlined style={{ color: '#ff4d4f' }} />}
            suffix="ngày"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Hoàn thành mục tiêu"
            value={stats.goalProgress}
            prefix={<TrophyOutlined style={{ color: '#ff4d4f' }} />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatCards;