import React from 'react';
import { Tag } from 'antd';

interface BMITagProps {
  bmi: number;
}

const BMITag: React.FC<BMITagProps> = ({ bmi }) => {
  let color = '';
  let text = '';

  if (bmi < 18.5) {
    color = 'blue';
    text = 'Thiếu cân';
  } else if (bmi < 25) {
    color = 'green';
    text = 'Bình thường';
  } else if (bmi < 30) {
    color = 'gold';
    text = 'Thừa cân';
  } else {
    color = 'red';
    text = 'Béo phì';
  }

  return <Tag color={color}>{`${bmi} - ${text}`}</Tag>;
};

export default BMITag;