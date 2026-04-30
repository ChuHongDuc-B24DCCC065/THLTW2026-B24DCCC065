import React from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BMITag from './BMITag';
import { HealthRecord } from '../model';

interface HealthTableProps {
  data: HealthRecord[];
  onEdit: (record: HealthRecord) => void;
  onDelete: (id: string) => void;
}

const HealthTable: React.FC<HealthTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Cân nặng (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Chiều cao (cm)', dataIndex: 'height', key: 'height' },
    { 
      title: 'BMI', 
      dataIndex: 'bmi', 
      key: 'bmi',
      render: (bmi: number, record: HealthRecord) => <BMITag bmi={bmi} />
    },
    { title: 'Nhịp tim (bpm)', dataIndex: 'heartRate', key: 'heartRate' },
    { title: 'Giờ ngủ (giờ)', dataIndex: 'sleepHours', key: 'sleepHours' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: HealthRecord) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm title="Xóa chỉ số này?" onConfirm={() => onDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default HealthTable;