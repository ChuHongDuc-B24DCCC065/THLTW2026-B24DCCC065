import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber, Button } from 'antd';
import dayjs from 'dayjs';
import { Workout } from '../model';

interface WorkoutFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: any) => void;
  initialData?: Workout | null;
}

const WorkoutFormModal: React.FC<WorkoutFormModalProps> = ({ visible, onCancel, onSave, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        date: dayjs(initialData.date),
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSave({
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    });
    form.resetFields();
  };

  return (
    <Modal
      title={initialData ? 'Sửa buổi tập' : 'Thêm buổi tập'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} style={{ backgroundColor: '#ff4d4f' }}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="date" label="Ngày tập" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="type" label="Loại bài tập" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Cardio">Cardio</Select.Option>
            <Select.Option value="Strength">Strength</Select.Option>
            <Select.Option value="Yoga">Yoga</Select.Option>
            <Select.Option value="HIIT">HIIT</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="duration" label="Thời lượng (phút)" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="calories" label="Calo đốt" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="completed">Hoàn thành</Select.Option>
            <Select.Option value="missed">Bỏ lỡ</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkoutFormModal;