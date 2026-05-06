import React from 'react';
import { Card, Tag, Typography, Space, Tooltip } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Task, priorityColor } from '../model';

const { Text } = Typography;

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, index }) => {
  // Kiểm tra task có bị quá hạn không
  const isOverdue = () => {
    if (task.status === 'done') return false;
    const deadline = new Date(task.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline < today;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        borderRadius: 8,
        cursor: 'pointer',
        border: isOverdue() ? '1px solid #ff4d4f' : '1px solid #f0f0f0',
        backgroundColor: isOverdue() ? '#fff2f0' : 'white',
        transition: 'all 0.3s ease'
      }}
      hoverable
      bodyStyle={{ padding: '12px' }}
      onClick={() => onEdit(task)}
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text strong style={{ fontSize: 14, width: '80%' }}>
            {task.title}
          </Text>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined style={{ color: '#1890ff', fontSize: 14 }} />
          </Tooltip>
        </div>

        {/* Priority và deadline */}
        <Space size={8} wrap>
          <Tag color={priorityColor[task.priority]} style={{ margin: 0, fontSize: 11 }}>
            {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
          </Tag>
          
          <Tooltip title={isOverdue() ? 'Quá hạn' : 'Hạn chót'}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <CalendarOutlined /> {formatDate(task.deadline)}
              {isOverdue() && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>(Quá hạn)</span>}
            </Text>
          </Tooltip>
        </Space>

        {/* Tags */}
        {task.tags.length > 0 && (
          <Space size={4} wrap>
            {task.tags.slice(0, 3).map(tag => (
              <Tag key={tag} style={{ fontSize: 10, margin: 0 }}>
                #{tag}
              </Tag>
            ))}
          </Space>
        )}
      </Space>
    </Card>
  );
};

export default TaskCard;