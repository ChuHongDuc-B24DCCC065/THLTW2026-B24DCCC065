import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, Input, Select, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { Task, priorityColor, statusLabels } from '../model';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchText('');
    setFilterStatus('all');
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text: string) => text || '---'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Cần làm', value: 'todo' },
        { text: 'Đang làm', value: 'inprogress' },
        { text: 'Hoàn thành', value: 'done' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => statusLabels[status as keyof typeof statusLabels]
    },
    {
      title: 'Hạn chót',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      render: (date: string, record: Task) => {
        const isOverdue = new Date(date) < new Date() && record.status !== 'done';
        return (
          <span style={{ color: isOverdue ? '#ff4d4f' : 'inherit' }}>
            {formatDate(date)}
            {isOverdue && <span style={{ marginLeft: 4 }}>⚠️</span>}
          </span>
        );
      }
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      filters: [
        { text: 'Cao', value: 'high' },
        { text: 'Trung bình', value: 'medium' },
        { text: 'Thấp', value: 'low' }
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority: string) => (
        <Tag color={priorityColor[priority as keyof typeof priorityColor]}>
          {priority === 'high' ? 'Cao' : priority === 'medium' ? 'Trung bình' : 'Thấp'}
        </Tag>
      )
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space size={4} wrap>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag} style={{ fontSize: 11 }}>#{tag}</Tag>
          ))}
          {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
        </Space>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              style={{ padding: 0 }}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa công việc"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        📋 Danh sách công việc
      </h2>
      
      <Space style={{ marginBottom: 16 }} size="middle" wrap>
        <Input
          placeholder="Tìm kiếm theo tiêu đề..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
          allowClear
        />
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: 150 }}
        >
          <Option value="all">Tất cả</Option>
          <Option value="todo">Cần làm</Option>
          <Option value="inprogress">Đang làm</Option>
          <Option value="done">Hoàn thành</Option>
        </Select>
        <Button icon={<ReloadOutlined />} onClick={resetFilters}>
          Đặt lại
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={{ 
          pageSize: 10, 
          showTotal: (total) => `Tổng ${total} công việc`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50']
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TaskTable;