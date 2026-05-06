import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined, RocketOutlined } from '@ant-design/icons';
import { Task } from '../model';

interface DashboardCardProps {
  tasks: Task[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({ tasks }) => {
  // Tính toán các thống kê
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  const overdueTasks = tasks.filter(task => {
    if (task.status === 'done') return false;
    const deadline = new Date(task.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline < today;
  }).length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(0) : 0;

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        📈 Tổng quan công việc
      </h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng công việc"
              value={totalTasks}
              prefix={<UnorderedListOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              <span>📝 Cần làm: {todoTasks}</span>
              <span style={{ marginLeft: 12 }}>⚡ Đang làm: {inProgressTasks}</span>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Hoàn thành"
              value={completedTasks}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
              suffix={`/ ${totalTasks}`}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Tỷ lệ hoàn thành: {completionRate}%
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Đang thực hiện"
              value={inProgressTasks}
              prefix={<RocketOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14', fontWeight: 'bold' }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Tiến độ: {((inProgressTasks / totalTasks) * 100).toFixed(0)}%
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Quá hạn"
              value={overdueTasks}
              prefix={<ClockCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f', fontWeight: 'bold' }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Cần xử lý gấp!
            </div>
          </Card>
        </Col>
      </Row>

      {/* Phần biểu đồ đơn giản */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Tiến độ công việc" bordered={false} style={{ borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  height: 8, 
                  background: '#f0f0f0', 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${completionRate}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              <div style={{ minWidth: 60, textAlign: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 'bold', color: '#667eea' }}>
                  {completionRate}%
                </span>
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <div style={{ fontSize: 12, color: '#666' }}>✅ Đã xong</div>
                <div style={{ fontSize: 20, fontWeight: 'bold' }}>{completedTasks}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#666' }}>⚡ Đang làm</div>
                <div style={{ fontSize: 20, fontWeight: 'bold' }}>{inProgressTasks}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#666' }}>📝 Chưa làm</div>
                <div style={{ fontSize: 20, fontWeight: 'bold' }}>{todoTasks}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCard;