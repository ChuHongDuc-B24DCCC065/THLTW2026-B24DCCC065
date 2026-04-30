import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Workout } from '../model';

interface WorkoutTableProps {
  data: Workout[];
  onEdit: (record: Workout) => void;
  onDelete: (id: string) => void;
  searchText: string;
  filters: any;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ data, onEdit, onDelete, searchText, filters }) => {
  const filteredData = data.filter(item => {
    const matchSearch = item.type.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.note.toLowerCase().includes(searchText.toLowerCase());
    const matchType = !filters.type || item.type === filters.type;
    const matchDate = !filters.dateRange.start || 
                      (item.date >= filters.dateRange.start && 
                       (!filters.dateRange.end || item.date <= filters.dateRange.end));
    return matchSearch && matchType && matchDate;
  });

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Loại bài tập', dataIndex: 'type', key: 'type' },
    { title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
    { title: 'Calo đốt', dataIndex: 'calories', key: 'calories' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'red'}>
          {status === 'completed' ? 'Hoàn thành' : 'Bỏ lỡ'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Workout) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm title="Xóa buổi tập này?" onConfirm={() => onDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={filteredData} rowKey="id" />;
};

export default WorkoutTable;