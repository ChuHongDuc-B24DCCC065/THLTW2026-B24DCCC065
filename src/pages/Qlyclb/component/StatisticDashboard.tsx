// components/StatisticDashboard.tsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ClubRegistration } from '../clb';
import { Club } from '../clb';

interface StatisticDashboardProps {
  registrations: ClubRegistration[];
  clubs: Club[];
}

const StatisticDashboard: React.FC<StatisticDashboardProps> = ({ registrations, clubs }) => {

  // Thống kê số lượng
  const stats = {
    totalClubs: clubs.length,
    totalPending: registrations.filter(r => r.status === 'Pending').length,
    totalApproved: registrations.filter(r => r.status === 'Approved').length,
    totalRejected: registrations.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic title="Tổng Câu Lạc Bộ" value={stats.totalClubs} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic title="Đơn Đang Chờ" value={stats.totalPending} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic title="Đã Chấp Thuận" value={stats.totalApproved} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic title="Đã Từ Chối" value={stats.totalRejected} valueStyle={{ color: '#f5222d' }} />
          </Card>
        </Col>
      </Row>

      <Card title="Biểu đồ thống kê đơn đăng ký theo từng CLB" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', padding: 50, color: '#999' }}>
          Biểu đồ sẽ được thêm sau
        </div>
      </Card>
    </div>
  );
};

export default StatisticDashboard;