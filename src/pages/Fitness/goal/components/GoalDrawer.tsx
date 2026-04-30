import React, { useEffect } from 'react';
import { Drawer, Form, Input, Select, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { Goal } from '../model';

interface GoalDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: Goal | null;
}

const GoalDrawer: React.FC<GoalDrawerProps> = ({ visible, onClose, onSave, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        deadline: dayjs(initialData.deadline),
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSave({
      ...values,
      deadline: values.deadline.format('YYYY-MM-DD'),
    });
    form.resetFields();
  };

  return (
    <Drawer
      title={initialData ? 'Sửa mục tiêu' : 'Thêm mục tiêu'}
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      extra={
        <Button type="primary" onClick={handleSubmit} style={{ backgroundColor: '#ff4d4f' }}>
          Lưu
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên mục tiêu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="weight">Cân nặng</Select.Option>
            <Select.Option value="workout">Buổi tập</Select.Option>
            <Select.Option value="calorie">Calo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="targetValue" label="Giá trị mục tiêu" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="currentValue" label="Giá trị hiện tại" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="deadline" label="Hạn hoàn thành" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="active">Đang thực hiện</Select.Option>
            <Select.Option value="completed">Hoàn thành</Select.Option>
            <Select.Option value="failed">Thất bại</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default GoalDrawer;