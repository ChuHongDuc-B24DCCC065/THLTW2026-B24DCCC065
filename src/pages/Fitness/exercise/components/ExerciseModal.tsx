import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import { Exercise } from '../model';

interface ExerciseModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: any) => void;
  initialData?: Exercise | null;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ visible, onCancel, onSave, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSave(values);
    form.resetFields();
  };

  return (
    <Modal
      title={initialData ? 'Sửa bài tập' : 'Thêm bài tập'}
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
        <Form.Item name="name" label="Tên bài tập" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="muscleGroup" label="Nhóm cơ" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Chest">Ngực</Select.Option>
            <Select.Option value="Back">Lưng</Select.Option>
            <Select.Option value="Legs">Chân</Select.Option>
            <Select.Option value="Shoulders">Vai</Select.Option>
            <Select.Option value="Arms">Tay</Select.Option>
            <Select.Option value="Core">Core</Select.Option>
            <Select.Option value="Cardio">Cardio</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="level" label="Cấp độ" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Beginner">Cơ bản</Select.Option>
            <Select.Option value="Intermediate">Trung cấp</Select.Option>
            <Select.Option value="Advanced">Nâng cao</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="caloriesPerHour" label="Calo/giờ" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExerciseModal;