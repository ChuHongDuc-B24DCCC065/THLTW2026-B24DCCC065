import React from 'react';
import { Segmented } from 'antd';

interface GoalFilterProps {
  onFilter: (status: string) => void;
}

const GoalFilter: React.FC<GoalFilterProps> = ({ onFilter }) => {
  return (
    <Segmented
      options={[
        { label: 'Tất cả', value: 'all' },
        { label: 'Đang thực hiện', value: 'active' },
        { label: 'Hoàn thành', value: 'completed' },
        { label: 'Thất bại', value: 'failed' },
      ]}
      onChange={(value) => onFilter(value as string)}
    />
  );
};

export default GoalFilter;