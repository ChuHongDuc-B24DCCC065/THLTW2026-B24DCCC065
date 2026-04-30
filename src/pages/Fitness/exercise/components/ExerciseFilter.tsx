import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ExerciseFilterProps {
  onSearch: (value: string) => void;
  onFilter: (filters: any) => void;
}

const ExerciseFilter: React.FC<ExerciseFilterProps> = ({ onSearch, onFilter }) => {
  return (
    <Space>
      <Input
        placeholder="Tìm bài tập"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Nhóm cơ"
        allowClear
        onChange={(value) => onFilter({ muscleGroup: value })}
        style={{ width: 150 }}
      >
        <Select.Option value="Chest">Ngực</Select.Option>
        <Select.Option value="Back">Lưng</Select.Option>
        <Select.Option value="Legs">Chân</Select.Option>
        <Select.Option value="Shoulders">Vai</Select.Option>
        <Select.Option value="Arms">Tay</Select.Option>
        <Select.Option value="Core">Core</Select.Option>
        <Select.Option value="Cardio">Cardio</Select.Option>
      </Select>
      <Select
        placeholder="Cấp độ"
        allowClear
        onChange={(value) => onFilter({ level: value })}
        style={{ width: 150 }}
      >
        <Select.Option value="Beginner">Cơ bản</Select.Option>
        <Select.Option value="Intermediate">Trung cấp</Select.Option>
        <Select.Option value="Advanced">Nâng cao</Select.Option>
      </Select>
    </Space>
  );
};

export default ExerciseFilter;