import React from 'react';
import { Input, Select, DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface WorkoutFilterProps {
  onSearch: (value: string) => void;
  onFilter: (filters: any) => void;
}

const WorkoutFilter: React.FC<WorkoutFilterProps> = ({ onSearch, onFilter }) => {
  return (
    <Space>
      <Input
        placeholder="Tìm theo tên bài tập"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Lọc theo loại"
        allowClear
        onChange={(value) => onFilter({ type: value })}
        style={{ width: 150 }}
      >
        <Select.Option value="Cardio">Cardio</Select.Option>
        <Select.Option value="Strength">Strength</Select.Option>
        <Select.Option value="Yoga">Yoga</Select.Option>
        <Select.Option value="HIIT">HIIT</Select.Option>
      </Select>
      <RangePicker onChange={(dates) => {
        if (dates) {
          onFilter({ dateRange: { start: dates[0]?.format('YYYY-MM-DD'), end: dates[1]?.format('YYYY-MM-DD') } });
        } else {
          onFilter({ dateRange: { start: '', end: '' } });
        }
      }} />
    </Space>
  );
};

export default WorkoutFilter;