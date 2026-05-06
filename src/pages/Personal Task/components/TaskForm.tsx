import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Space, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Task } from '../model';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (task: Task) => void;
  editingTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ visible, onCancel, onSave, editingTask }) => {
  const [form] = Form.useForm();
  const [inputTag, setInputTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Reset form khi mở modal
  useEffect(() => {
    if (visible) {
      if (editingTask) {
        // Edit mode
        form.setFieldsValue({
          title: editingTask.title,
          description: editingTask.description,
          deadline: dayjs(editingTask.deadline),
          priority: editingTask.priority,
        });
        setTags(editingTask.tags);
      } else {
        // Add mode
        form.resetFields();
        setTags([]);
        form.setFieldsValue({
          priority: 'medium'
        });
      }
    }
  }, [visible, editingTask, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const taskData: Task = {
        id: editingTask?.id || Date.now().toString(),
        title: values.title,
        description: values.description || '',
        status: editingTask?.status || 'todo',
        deadline: values.deadline.toISOString(),
        priority: values.priority,
        tags: tags,
        createdAt: editingTask?.createdAt || new Date().toISOString(),
      };

      onSave(taskData);
      message.success(editingTask ? 'Cập nhật công việc thành công!' : 'Thêm công việc thành công!');
      handleCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setTags([]);
    setInputTag('');
    onCancel();
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Modal
      title={editingTask ? '✏️ Chỉnh sửa công việc' : '➕ Thêm công việc mới'}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingTask ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      ]}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ priority: 'medium' }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề công việc" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <TextArea rows={3} placeholder="Nhập mô tả chi tiết (không bắt buộc)" />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Hạn chót"
          rules={[{ required: true, message: 'Vui lòng chọn hạn chót!' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Độ ưu tiên"
          rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
        >
          <Select>
            <Option value="high">🔴 Cao</Option>
            <Option value="medium">🟡 Trung bình</Option>
            <Option value="low">🟢 Thấp</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Tags">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder="Nhập tag"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onPressEnter={handleAddTag}
                style={{ width: 200 }}
              />
              <Button icon={<PlusOutlined />} onClick={handleAddTag}>
                Thêm tag
              </Button>
            </Space>
            <Space size={[0, 8]} wrap>
              {tags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ fontSize: 13 }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;