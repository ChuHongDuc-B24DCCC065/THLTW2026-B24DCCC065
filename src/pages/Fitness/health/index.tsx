import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HealthTable from './components/HealthTable';
import HealthFormModal from './components/HealthFormModal';
import { HealthRecord } from './model';

const calculateBMI = (weight: number, height: number): number => {
  return Number((weight / Math.pow(height / 100, 2)).toFixed(1));
};

const mockHealthRecords: HealthRecord[] = [
  { id: '1', date: '2024-10-28', weight: 70, height: 170, bmi: 24.2, heartRate: 72, sleepHours: 7.5 },
  { id: '2', date: '2024-10-21', weight: 71, height: 170, bmi: 24.6, heartRate: 75, sleepHours: 7 },
  { id: '3', date: '2024-10-14', weight: 72, height: 170, bmi: 24.9, heartRate: 78, sleepHours: 6.5 },
];

const Health: React.FC = () => {
  const [records, setRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);

  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: HealthRecord) => {
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleSave = (data: any) => {
    const bmi = calculateBMI(data.weight, data.height);
    const newRecord = { ...data, bmi, id: editingRecord ? editingRecord.id : Date.now().toString() };
    
    if (editingRecord) {
      setRecords(records.map(r => r.id === editingRecord.id ? newRecord : r));
    } else {
      setRecords([...records, newRecord]);
    }
    setModalVisible(false);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <span></span>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ backgroundColor: '#ff4d4f' }}>
          Thêm chỉ số
        </Button>
      </Space>
      <HealthTable data={records} onEdit={handleEdit} onDelete={handleDelete} />
      <HealthFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
        initialData={editingRecord}
      />
    </div>
  );
};

export default Health;