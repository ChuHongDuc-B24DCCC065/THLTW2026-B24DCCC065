import React, { useEffect } from 'react';
import { Modal, Form, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { HealthRecord } from '../model';

interface HealthFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: any) => void;
  initialData?: HealthRecord | null;
}

const HealthFormModal: React.FC<HealthFormModalProps> = ({ visible, onCancel, onSave, initialData }) => {
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
      title={initialData ? 'Sửa chỉ số' : 'Thêm chỉ số'}
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
        <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="weight" label="Cân nặng (kg)" rules={[{ required: true }]}>
          <InputNumber min={30} max={200} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="height" label="Chiều cao (cm)" rules={[{ required: true }]}>
          <InputNumber min={100} max={250} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="heartRate" label="Nhịp tim (bpm)" rules={[{ required: true }]}>
          <InputNumber min={40} max={200} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="sleepHours" label="Giờ ngủ (giờ)" rules={[{ required: true }]}>
          <InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HealthFormModal;